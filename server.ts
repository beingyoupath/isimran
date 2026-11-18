import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const DEFAULT_LEAD_RECIPIENT = 'beingyoupath@gmail.com';

const SYSTEM_INSTRUCTION = `You are Path Guide, an AI assistant at Being You Path in Pune, India. You are an AI assistant, not a clinician, and you cannot diagnose, prescribe, or provide therapy.

CORE GUIDELINES:
- Keep replies warm, calm, and clear: strictly UNDER 80 words per reply (2 to 4 short sentences).
- Ask at most ONE clarifying question per reply.
- Only share verified facts listed below. Never invent prices, credentials, or services. Never mention trauma-informed therapy, somatic counselling, exposure protocols, or Functional Yoga.
- Explain clearly that you are an AI assistant, not a clinician, whenever asked about your role or diagnosis.

VERIFIED CLINIC FACTS:
- Practice: Being You Path — psychological counselling in Pune and online across India.
- Address: 119/17, Dr. Sripati Shastri Path, Near Prabhat Road, Deccan Gymkhana, Pune 411004.
- Hours: Monday – Sunday, 10:00 AM – 9:00 PM (by appointment).
- Phones / WhatsApp: +91 7387772573, +91 7387779238 | WhatsApp: https://wa.me/917387772573
- Email: hello@beingyoupath.com
- Practitioners: Imran Hussain (Psychologist and CBT practitioner, clinical training at NIMHANS) and Tejaswini Joshi (Counselling Psychologist, LSE-certified L&D specialist).
- Languages offered: Hindi, Marathi, English.
- Session length: 50–60 minutes for individual sessions; 75 minutes for couples/family sessions.
- Fees: Shared transparently during the free 15-minute clarity call.
- Services: CBT Therapy; Stress & Anxiety Counselling; Overthinking Therapy; Self-Esteem & Identity Therapy; Burnout & Workplace Stress Counselling; Depression & Low Mood Therapy; Everyday Talk Therapy; Relationship & Couples Counselling; Parenting & Family Well-Being; Career Counselling; Student & Adolescent Counselling (including exam stress); Mindfulness & Meditation; Behavioural Change & Habit Coaching; Corporate Wellness Workshops; Gen Z in the Workplace Workshop; Online Therapy Across India; Prabhat Road Clinic, Pune.
- Booking: Free 15-minute clarity call or consultation at https://calendly.com/beingyoupathappointment, WhatsApp https://wa.me/917387772573, or calling +91 7387772573 / +91 7387779238.

WHEN A USER SHARES NON-CRISIS STRESS OR QUESTIONS:
- Validate briefly, offer at most one gentle general reflection or clarity tip, and guide them toward a free 15-minute clarity call (Calendly or WhatsApp).

CRISIS PROTOCOL (SELF-HARM, SUICIDE, HARM TO OTHERS, ONGOING ABUSE, OR ACUTE CRISIS):
- Stop all wellbeing tips and booking pitches immediately.
- Respond in 2–3 empathetic sentences encouraging them to reach out to someone nearby right now, and share Tele-MANAS 14416 (or 1800-891-4416) and emergency number 112.

At the very end of your response on a new line, include internal metadata:
<!--DATA: {"topic": "brief 1-3 word topic", "sentiment": "calm|curious|anxious|sad|stressed|crisis", "readiness": "high|medium|low"}-->`;

const CRISIS_PATTERN =
  /\b(suicid(?:e|al)?|self[- ]?harm(?:ing)?|hurt(?:ing)?\s+(?:myself|someone|others|him|her|them)|kill(?:ing)?\s+(?:myself|someone|him|her|them)|harm(?:ing)?\s+(?:someone|others|my\s+(?:partner|child|family))|end(?:ing)?\s+(?:my\s+life|it\s+all)|want\s+to\s+die|don'?t\s+want\s+to\s+live|cutting\s+myself|overdos(?:e|ing)|hang(?:ing)?\s+myself|being\s+abused\s+right\s+now|domestic\s+violence\s+now|emergency\s+crisis)\b/i;

const MODELS = ['gemini-3.1-flash-lite', 'gemini-4-hydrogen'] as const;

interface HistoryMessage {
  role: 'user' | 'model';
  text: string;
}

interface ChatRequestBody {
  message?: string;
  history?: HistoryMessage[];
  visitorName?: string;
}

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('MISSING_GEMINI_API_KEY');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getEmailProviderInfo(): {
  configured: boolean;
  provider: 'resend' | 'smtp' | 'none';
} {
  if (process.env.RESEND_API_KEY) {
    return { configured: true, provider: 'resend' };
  }
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return { configured: true, provider: 'smtp' };
  }
  return { configured: false, provider: 'none' };
}

interface EmailPayload {
  to?: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

interface EmailSendOutcome {
  sent: boolean;
  configured: boolean;
  provider: 'resend' | 'smtp' | 'none';
  recipient: string;
  error?: string;
}

async function sendEmailViaProvider(payload: EmailPayload): Promise<EmailSendOutcome> {
  const recipient = (payload.to || process.env.LEAD_TO_EMAIL || DEFAULT_LEAD_RECIPIENT).trim();
  const { configured, provider } = getEmailProviderInfo();

  if (!configured) {
    return {
      sent: false,
      configured: false,
      provider: 'none',
      recipient,
      error: 'No server email provider configured yet. Add SMTP_USER & SMTP_PASS or RESEND_API_KEY in Settings > Secrets.',
    };
  }

  if (provider === 'resend') {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Being You Path <onboarding@resend.dev>';
    const recipients = recipient.split(',').map((r) => r.trim()).filter(Boolean);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      return {
        sent: false,
        configured: true,
        provider: 'resend',
        recipient,
        error: `Resend API error (${res.status}): ${errBody || 'Failed to deliver email'}`,
      };
    }

    return {
      sent: true,
      configured: true,
      provider: 'resend',
      recipient,
    };
  }

  // SMTP via nodemailer (supports Gmail App Passwords & custom SMTP)
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Being You Path Concierge" <${user}>`,
    to: recipient,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });

  return {
    sent: true,
    configured: true,
    provider: 'smtp',
    recipient,
  };
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  // Ensure Accept-CH / Critical-CH / client-hint headers are never sent
  app.use((_req, res, next) => {
    res.removeHeader('Accept-CH');
    res.removeHeader('Critical-CH');
    res.removeHeader('Accept-CH-Lifetime');
    const originalSetHeader = res.setHeader.bind(res);
    res.setHeader = ((name: string, value: number | string | readonly string[]) => {
      const lower = name.toLowerCase();
      if (lower === 'accept-ch' || lower === 'critical-ch' || lower === 'accept-ch-lifetime') {
        return res;
      }
      return originalSetHeader(name, value);
    }) as typeof res.setHeader;
    next();
  });

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    const emailInfo = getEmailProviderInfo();
    res.json({
      ok: true,
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      emailConfigured: emailInfo.configured,
      emailProvider: emailInfo.provider,
    });
  });

  app.post('/api/chat', async (req, res) => {
    const body = (req.body || {}) as ChatRequestBody;
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      res.status(400).json({ error: 'Please enter a message before sending.' });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({ error: 'Message is too long. Please keep it under 2000 characters.' });
      return;
    }

    if (CRISIS_PATTERN.test(message)) {
      res.json({
        reply:
          "I'm really glad you spoke up, and I want you to have real human support right now. Please reach out to someone nearby you trust and call India's free 24/7 Tele-MANAS helpline on 14416 (or 1800-891-4416), or emergency services on 112.\n\nIf you need non-emergency follow-up with a psychologist later, you can contact our clinic (+91 7387772573 / +91 7387779238) or book via https://calendly.com/beingyoupathappointment.",
        isCrisis: true,
        topic: 'Crisis Support',
        sentiment: 'crisis',
        readiness: 'high',
      });
      return;
    }

    let ai: GoogleGenAI;
    try {
      ai = getGenAIClient();
    } catch {
      res.status(503).json({
        error: 'The AI Wellness Guide is not configured yet. Please check GEMINI_API_KEY in Settings > Secrets, or reach us directly via WhatsApp or Call below.',
      });
      return;
    }

    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const safeHistory = rawHistory
      .filter(
        (m): m is HistoryMessage =>
          Boolean(m) &&
          (m.role === 'user' || m.role === 'model') &&
          typeof m.text === 'string' &&
          m.text.trim().length > 0
      )
      .slice(-8);

    const contents = safeHistory.map((m) => ({
      role: m.role,
      parts: [{ text: m.text.replace(/<!--DATA:.*?-->/gs, '').trim().slice(0, 600) }],
    }));

    const visitorContext =
      typeof body.visitorName === 'string' && body.visitorName.trim()
        ? `Visitor's first name: ${body.visitorName.trim().split(/\s+/)[0]}`
        : '';

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const systemInstruction = visitorContext
      ? `${SYSTEM_INSTRUCTION}\n\n${visitorContext}`
      : SYSTEM_INSTRUCTION;

    let rawText = '';
    let lastError: unknown = null;

    for (const modelName of MODELS) {
      try {
        const config =
          modelName === 'gemini-3.1-flash-lite'
            ? {
                systemInstruction,
                temperature: 0.3,
              }
            : {
                systemInstruction,
                thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
              };

        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config,
        });

        const text = response?.text?.trim();
        if (text) {
          rawText = text;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Gemini model ${modelName} failed:`, err);
      }
    }

    if (!rawText) {
      const errMessage = lastError instanceof Error ? lastError.message : String(lastError || '');
      const status =
        errMessage.includes('403') || errMessage.includes('PERMISSION_DENIED')
          ? 403
          : errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED')
            ? 429
            : 502;

      res.status(status).json({
        error:
          status === 403
            ? 'API access permission denied. Please verify your Gemini API key in Settings > Secrets.'
            : status === 429
              ? 'Our wellness guide is receiving high traffic right now. Please try again in a moment or message us on WhatsApp below.'
              : 'Unable to reach the Wellness Guide right now. Please try again or connect directly via WhatsApp or Call below.',
      });
      return;
    }

    let topic = '';
    let sentiment = '';
    let readiness = '';

    const dataMatch = rawText.match(/<!--DATA:\s*(\{.*?\})\s*-->/s);
    if (dataMatch && dataMatch[1]) {
      try {
        const parsed = JSON.parse(dataMatch[1]) as Record<string, unknown>;
        if (typeof parsed.topic === 'string') topic = parsed.topic;
        if (typeof parsed.sentiment === 'string') sentiment = parsed.sentiment;
        if (typeof parsed.readiness === 'string') readiness = parsed.readiness;
      } catch {
        // Ignore malformed metadata JSON
      }
    }

    const cleanReply = rawText.replace(/<!--DATA:.*?-->/gs, '').trim();

    res.json({
      reply: cleanReply,
      topic,
      sentiment,
      readiness,
    });
  });

  app.post('/api/leads/notify', async (req, res) => {
    const body = (req.body || {}) as Record<string, unknown>;
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 150) : '';
    const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim().slice(0, 40) : '';
    const question = typeof body.question === 'string' ? body.question.trim().slice(0, 2000) : '';
    const source = typeof body.source === 'string' ? body.source.trim().slice(0, 100) : 'Website';
    const topic = typeof body.topic === 'string' ? body.topic.trim().slice(0, 80) : '';
    const sentiment = typeof body.sentiment === 'string' ? body.sentiment.trim().slice(0, 40) : '';
    const readiness = typeof body.readiness === 'string' ? body.readiness.trim().slice(0, 20) : '';
    const createdAt = typeof body.createdAt === 'string' ? body.createdAt : new Date().toISOString();

    if (!name || !question) {
      res.status(400).json({ error: 'Lead name and question are required.' });
      return;
    }

    const isPlaceholderEmail =
      !email || email.endsWith('@beingyoupath.client') || email.endsWith('@booking.beingyoupath.com');
    const cleanPhoneDigits = whatsapp.replace(/[^0-9]/g, '');
    const waLink = cleanPhoneDigits ? `https://wa.me/${cleanPhoneDigits}` : '';

    const subjectPrefix = topic ? `[${topic}] ` : '';
    const subject = `New Being You Path Lead: ${subjectPrefix}${name} (${source})`;

    const textLines = [
      `New Visitor Lead / Question — Being You Path`,
      `-----------------------------------------`,
      `Name: ${name}`,
      `Email: ${email || 'Not provided'}`,
      `WhatsApp / Phone: ${whatsapp || 'Not provided'}`,
      `Source: ${source}`,
      topic ? `AI Detected Topic: ${topic}` : '',
      sentiment ? `Sentiment: ${sentiment}` : '',
      readiness ? `Readiness: ${readiness}` : '',
      `Received: ${new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
      ``,
      `Message / Question:`,
      question,
      ``,
      waLink ? `Quick WhatsApp Reply: ${waLink}` : '',
    ].filter(Boolean);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #1A5F5F; color: #F5F0E6; padding: 18px 24px;">
          <h2 style="margin: 0; font-size: 18px;">New Visitor Lead — Being You Path</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #E6A157;">Source: ${escapeHtml(source)}</p>
        </div>
        <div style="padding: 20px 24px; background: #ffffff; color: #1f2937; font-size: 14px; line-height: 1.5;">
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : 'Not provided'}</p>
          <p style="margin: 0 0 8px;"><strong>WhatsApp / Phone:</strong> ${whatsapp ? (waLink ? `<a href="${waLink}">${escapeHtml(whatsapp)}</a>` : escapeHtml(whatsapp)) : 'Not provided'}</p>
          ${topic ? `<p style="margin: 0 0 8px;"><strong>Topic:</strong> ${escapeHtml(topic)}${readiness ? ` (Readiness: ${escapeHtml(readiness)})` : ''}</p>` : ''}
          <div style="margin-top: 16px; padding: 14px; background: #FDFBF7; border-left: 4px solid #C85C3E; border-radius: 6px;">
            <strong style="display: block; margin-bottom: 6px; color: #0B3A42;">Question / Details:</strong>
            <div style="white-space: pre-wrap;">${escapeHtml(question)}</div>
          </div>
          ${waLink ? `<p style="margin-top: 18px;"><a href="${waLink}" style="display: inline-block; background: #25D366; color: #ffffff; padding: 10px 16px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 12px;">Reply on WhatsApp</a></p>` : ''}
        </div>
      </div>
    `;

    try {
      const outcome = await sendEmailViaProvider({
        subject,
        text: textLines.join('\n'),
        html,
        ...(isPlaceholderEmail ? {} : { replyTo: email }),
      });
      res.status(outcome.sent ? 200 : outcome.configured ? 502 : 200).json(outcome);
    } catch (err) {
      console.error('Lead notification email error:', err);
      res.status(500).json({
        sent: false,
        configured: true,
        error: err instanceof Error ? err.message : 'Failed to send lead notification email.',
      });
    }
  });

  app.post('/api/leads/digest', async (req, res) => {
    const body = (req.body || {}) as Record<string, unknown>;
    const type = typeof body.type === 'string' ? body.type : 'Daily';
    const recipientEmail =
      typeof body.recipientEmail === 'string' && body.recipientEmail.trim()
        ? body.recipientEmail.trim()
        : undefined;
    const rawInquiries = Array.isArray(body.inquiries) ? body.inquiries : [];

    if (rawInquiries.length === 0) {
      res.status(400).json({ error: 'No inquiries selected for digest dispatch.' });
      return;
    }

    const items = rawInquiries.slice(0, 100).map((raw) => {
      const item = (raw || {}) as Record<string, unknown>;
      return {
        name: typeof item.name === 'string' ? item.name : 'Visitor',
        email: typeof item.email === 'string' ? item.email : '',
        whatsapp: typeof item.whatsapp === 'string' ? item.whatsapp : '',
        question: typeof item.question === 'string' ? item.question : '',
        status: typeof item.status === 'string' ? item.status : 'pending',
        createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
      };
    });

    const subject = `Being You Path - ${type} Inquiries Digest (${items.length} lead${items.length === 1 ? '' : 's'})`;
    const textBody = items
      .map((item, idx) => {
        return [
          `#${idx + 1} | ${item.name} (${item.status.toUpperCase()})`,
          `Email: ${item.email || 'N/A'} | WhatsApp: ${item.whatsapp || 'N/A'}`,
          `Date: ${new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
          `Question: ${item.question}`,
          `-----------------------------------------`,
        ].join('\n');
      })
      .join('\n\n');

    const htmlCards = items
      .map((item, idx) => {
        const waDigits = item.whatsapp.replace(/[^0-9]/g, '');
        return `
          <div style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin-bottom: 12px; background: #FDFBF7;">
            <div style="font-weight: bold; color: #0B3A42; margin-bottom: 4px;">#${idx + 1} · ${escapeHtml(item.name)} <span style="font-size: 11px; color: #C85C3E;">[${escapeHtml(item.status.toUpperCase())}]</span></div>
            <div style="font-size: 12px; color: #4b5563; margin-bottom: 8px;">
              Email: ${item.email ? `<a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a>` : 'N/A'} ·
              WhatsApp: ${waDigits ? `<a href="https://wa.me/${waDigits}">${escapeHtml(item.whatsapp)}</a>` : escapeHtml(item.whatsapp || 'N/A')}
            </div>
            <div style="font-size: 13px; color: #1f2937; white-space: pre-wrap; background: #ffffff; padding: 10px; border-radius: 6px;">${escapeHtml(item.question)}</div>
          </div>
        `;
      })
      .join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto;">
        <div style="background: #1A5F5F; color: #F5F0E6; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0;">Being You Path — ${escapeHtml(type)} Inquiries Digest</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #E6A157;">${items.length} lead(s) compiled on ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; background: #ffffff;">
          ${htmlCards}
        </div>
      </div>
    `;

    try {
      const outcome = await sendEmailViaProvider({
        to: recipientEmail,
        subject,
        text: `Being You Path - ${type} Inquiries Digest\n\n${textBody}`,
        html,
      });
      res.status(outcome.sent ? 200 : outcome.configured ? 502 : 200).json({
        ...outcome,
        count: items.length,
      });
    } catch (err) {
      console.error('Lead digest email error:', err);
      res.status(500).json({
        sent: false,
        configured: true,
        error: err instanceof Error ? err.message : 'Failed to dispatch digest email.',
      });
    }
  });

  // Explicit 301 redirects for retired service URLs (works in both dev and production)
  app.get(['/services/trauma-counselling-pune', '/services/trauma-counselling-pune/'], (_req, res) => {
    res.redirect(301, '/services/stress-anxiety-counselling-pune');
  });
  app.get(['/services/corporate-workshops-pune', '/services/corporate-workshops-pune/'], (_req, res) => {
    res.redirect(301, '/workshops');
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      if (req.path.startsWith('/api/') || /\.[a-zA-Z0-9]+$/.test(req.path)) {
        return next();
      }
      try {
        const rawTemplate = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const transformedTemplate = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const { html, headTags, isNotFound } = render(req.originalUrl);
        let finalHtml = transformedTemplate
          .replace('<!--HEAD_TAGS-->', headTags)
          .replace('<!--APP_HTML-->', html);

        if (req.path === '/hi' || req.path.startsWith('/hi/')) {
          finalHtml = finalHtml.replace('<html lang="en-IN">', '<html lang="hi-IN">');
        }

        res
          .status(isNotFound ? 404 : 200)
          .set({ 'Content-Type': 'text/html; charset=utf-8' })
          .end(finalHtml);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { index: false, redirect: false }));

    app.get('*', (req, res) => {
      const cleanPath = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
      const targetHtml =
        cleanPath === '/'
          ? path.join(distPath, 'index.html')
          : path.resolve(distPath, cleanPath.replace(/^\/+/, ''), 'index.html');

      if (
        (targetHtml === path.join(distPath, 'index.html') ||
          targetHtml.startsWith(distPath + path.sep)) &&
        fs.existsSync(targetHtml)
      ) {
        return res.status(200).sendFile(targetHtml);
      }

      const notFoundHtml = path.join(distPath, '404.html');
      if (fs.existsSync(notFoundHtml)) {
        return res.status(404).sendFile(notFoundHtml);
      }

      return res.status(404).send('Not Found');
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Being You Path server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
