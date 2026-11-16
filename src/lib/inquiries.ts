import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface ChatInquiry {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  question: string;
  userId?: string;
  status: 'pending' | 'reviewed' | 'emailed';
  frequency?: 'daily' | 'weekly';
  createdAt: string;
}

export interface LeadEmailMeta {
  source?: string;
  topic?: string;
  sentiment?: string;
  readiness?: string;
  skipEmail?: boolean;
}

export interface EmailDispatchResult {
  sent: boolean;
  configured: boolean;
  provider?: string;
  recipient?: string;
  error?: string;
}

export const CTA_EMAIL = 'beingyoupath@gmail.com';

/**
 * Dispatches a lead notification to the backend email relay.
 * Non-fatal when email credentials are not configured yet.
 */
export async function dispatchLeadEmail(
  inquiry: ChatInquiry,
  meta?: LeadEmailMeta
): Promise<EmailDispatchResult> {
  if (meta?.skipEmail) {
    return { sent: false, configured: false };
  }

  try {
    const res = await fetch('/api/leads/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        whatsapp: inquiry.whatsapp,
        question: inquiry.question,
        createdAt: inquiry.createdAt,
        source: meta?.source || 'Website',
        topic: meta?.topic || '',
        sentiment: meta?.sentiment || '',
        readiness: meta?.readiness || '',
      }),
    });

    const data = await res.json().catch(() => ({}));
    return {
      sent: Boolean(data?.sent),
      configured: Boolean(data?.configured),
      provider: typeof data?.provider === 'string' ? data.provider : undefined,
      recipient: typeof data?.recipient === 'string' ? data.recipient : undefined,
      error: typeof data?.error === 'string' ? data.error : undefined,
    };
  } catch (err) {
    return {
      sent: false,
      configured: false,
      error: err instanceof Error ? err.message : 'Network error dispatching lead email',
    };
  }
}

/**
 * Saves a user inquiry captured via chatbot or consultation form to Firestore
 * and triggers server-side lead email notification when configured.
 */
export async function saveInquiry(
  data: {
    name: string;
    email: string;
    whatsapp?: string;
    question: string;
    userId?: string;
    frequency?: 'daily' | 'weekly';
  },
  meta?: LeadEmailMeta
): Promise<string> {
  const id = 'inq_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const newInquiry: ChatInquiry = {
    id,
    name: data.name.trim().slice(0, 100),
    email: data.email.trim().toLowerCase().slice(0, 150),
    whatsapp: (data.whatsapp || '').trim().slice(0, 40),
    question: data.question.trim().slice(0, 2000),
    userId: data.userId || '',
    status: 'pending',
    frequency: data.frequency || 'daily',
    createdAt: now,
  };

  // Fire email notification cleanly in parallel so UI never stalls
  dispatchLeadEmail(newInquiry, meta).catch((err) => {
    console.warn('Lead email dispatch warning:', err);
  });

  const path = `inquiries/${id}`;
  try {
    await setDoc(doc(db, 'inquiries', id), newInquiry);
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

/**
 * Fetches all inquiries (accessible by administrators).
 */
export async function getInquiries(): Promise<ChatInquiry[]> {
  const path = 'inquiries';
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: ChatInquiry[] = [];
    snapshot.forEach((docSnap) => {
      const raw = docSnap.data() as Partial<ChatInquiry> & {
        fullName?: string;
        phone?: string;
        message?: string;
        serviceRequested?: string;
      };
      // Normalize defensively in case any legacy doc shape exists
      list.push({
        id: raw.id || docSnap.id,
        name: raw.name || raw.fullName || 'Visitor',
        email: raw.email || '',
        whatsapp: raw.whatsapp || raw.phone || '',
        question:
          raw.question ||
          (raw.message
            ? `${raw.serviceRequested ? `[${raw.serviceRequested}] ` : ''}${raw.message}`
            : ''),
        userId: raw.userId,
        status: raw.status || 'pending',
        frequency: raw.frequency || 'daily',
        createdAt:
          typeof raw.createdAt === 'string'
            ? raw.createdAt
            : new Date().toISOString(),
      });
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

/**
 * Updates status of an inquiry.
 */
export async function updateInquiryStatus(
  id: string,
  status: 'pending' | 'reviewed' | 'emailed'
): Promise<void> {
  const path = `inquiries/${id}`;
  try {
    await updateDoc(doc(db, 'inquiries', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    throw error;
  }
}

/**
 * Dispatches an inquiries digest directly via the server email endpoint.
 */
export async function sendDigestViaServer(
  inquiries: ChatInquiry[],
  type: 'Daily' | 'Weekly' | 'Summary'
): Promise<EmailDispatchResult & { count?: number }> {
  const res = await fetch('/api/leads/digest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      inquiries,
      recipientEmail: CTA_EMAIL,
    }),
  });

  const data = await res.json().catch(() => ({}));
  return {
    sent: Boolean(data?.sent),
    configured: Boolean(data?.configured),
    provider: typeof data?.provider === 'string' ? data.provider : undefined,
    recipient: typeof data?.recipient === 'string' ? data.recipient : undefined,
    count: typeof data?.count === 'number' ? data.count : undefined,
    error: typeof data?.error === 'string' ? data.error : undefined,
  };
}

export function formatDigestText(
  inquiries: ChatInquiry[],
  type: 'Daily' | 'Weekly' | 'Summary',
  maxItems?: number
): { subject: string; body: string } {
  const subject = `Being You Path - ${type} Inquiries Digest (${new Date().toLocaleDateString()})`;
  const slice = typeof maxItems === 'number' ? inquiries.slice(0, maxItems) : inquiries;

  let bodyContent = `Hello Imran & Tejaswini,\n\nHere is the latest ${type.toLowerCase()} digest of leads and questions collected from your website (${inquiries.length} total):\n\n`;

  if (slice.length === 0) {
    bodyContent += `No pending inquiries in this selection.\n`;
  } else {
    slice.forEach((item, index) => {
      const dateStr = new Date(item.createdAt).toLocaleString();
      bodyContent += `------------------------------------\n`;
      bodyContent += `#${index + 1} | Visitor: ${item.name || 'Visitor'} [${item.status.toUpperCase()}]\n`;
      if (item.email) {
        bodyContent += `Email: ${item.email}\n`;
      }
      if (item.whatsapp) {
        bodyContent += `WhatsApp: ${item.whatsapp}\n`;
      }
      bodyContent += `Date Received: ${dateStr}\n`;
      bodyContent += `Question / Inquiry:\n"${item.question}"\n\n`;
    });

    if (typeof maxItems === 'number' && inquiries.length > maxItems) {
      bodyContent += `...and ${inquiries.length - maxItems} more inquiries in the Admin Inquiries Digest dashboard.\n\n`;
    }
  }

  bodyContent += `------------------------------------\nBeing You Path Wellness Concierge`;
  return { subject, body: bodyContent };
}

/**
 * Prepares a formatted email digest mailto link to beingyoupath@gmail.com.
 * Caps items cleanly so mailto URL length stays within OS/browser limits.
 */
export function buildDigestMailtoUrl(
  inquiries: ChatInquiry[],
  type: 'Daily' | 'Weekly' | 'Summary'
): string {
  const { subject, body } = formatDigestText(inquiries, type, 10);
  return `mailto:${CTA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Prepares a Gmail web-compose URL (works reliably inside browser tabs & iframes).
 */
export function buildGmailComposeUrl(
  inquiries: ChatInquiry[],
  type: 'Daily' | 'Weekly' | 'Summary'
): string {
  const { subject, body } = formatDigestText(inquiries, type, 12);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CTA_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const recordInquiry = saveInquiry;
