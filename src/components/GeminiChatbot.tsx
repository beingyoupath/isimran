import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Loader2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  PhoneCall,
  Heart,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { saveInquiry } from '../lib/inquiries';

const WHATSAPP_NUMBER_1 = '+91 7387772573';
const WHATSAPP_LINK_1 =
  'https://wa.me/917387772573?text=Hi%20Being%20You%20Path%2C%20I%20would%20like%20to%20consult%20with%20Imran%20%26%20Tejaswini%20for%20the%20rest%20of%20my%20healing%20journey';
const CALL_NUMBER = '+91 7387779238';
const CALL_LINK = 'tel:+917387779238';
const EMAIL_LINK =
  'mailto:hello@beingyoupath.com?subject=1-on-1%20Session%20Inquiry%20-%20Being%20You%20Path';

const CALENDLY_BOOKING_URL = 'https://calendly.com/beingyoupathappointment';
const CHAT_HISTORY_KEY = 'being_you_path_guide_history_v5';
const VISITOR_KEY = 'being_you_visitor';

const WELCOME_MESSAGE_TEXT =
  "Hi, I'm Path Guide, an AI assistant for general wellbeing tips and help with booking. I can't give diagnosis or therapy, and I'm not for emergencies. In a crisis, call Tele-MANAS 14416.";

const CRISIS_PATTERN =
  /\b(suicid(?:e|al)?|self[- ]?harm(?:ing)?|hurt(?:ing)?\s+myself|kill(?:ing)?\s+myself|end(?:ing)?\s+(?:my\s+life|it\s+all)|want\s+to\s+die|don'?t\s+want\s+to\s+live|cutting\s+myself|overdos(?:e|ing)|hang(?:ing)?\s+myself)\b/i;

const CRISIS_MESSAGE_TEXT =
  "Because you mentioned self-harm or suicide, I've stopped general wellbeing tips so you can connect directly with human support right away.\n\nPlease call India's free 24/7 crisis helpline Tele-MANAS on 14416 (or 1800-891-4416) immediately. If you also want to arrange outpatient follow-up care, use the booking link below.";

interface VisitorDetails {
  name: string;
  email: string;
  whatsapp: string;
}

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  isCrisis?: boolean;
  retryPrompt?: string;
};

function createWelcomeMessage(): Message {
  return {
    id: 'welcome',
    role: 'model',
    text: WELCOME_MESSAGE_TEXT,
  };
}

export default function GeminiChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);

  // Visitor intake state
  const [visitor, setVisitor] = useState<VisitorDetails | null>(() => {
    try {
      const saved = localStorage.getItem(VISITOR_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && parsed?.email && parsed?.whatsapp) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Could not parse saved visitor details', e);
    }
    return null;
  });

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formWhatsapp, setFormWhatsapp] = useState('');
  const [formError, setFormError] = useState('');
  const [isStartingChat, setIsStartingChat] = useState(false);

  // Sync Google user details if logged in
  useEffect(() => {
    if (user) {
      if (!formName && user.displayName) setFormName(user.displayName);
      if (!formEmail && user.email) setFormEmail(user.email);
    }
  }, [user, formName, formEmail]);

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      // Purge legacy keys from earlier iterations
      localStorage.removeItem('being_you_chat_history');
      localStorage.removeItem('being_you_chat_history_v2');
      localStorage.removeItem('being_you_chat_history_v3');
      localStorage.removeItem('being_you_chat_history_v4');

      const saved = localStorage.getItem(CHAT_HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (m): m is Message =>
              Boolean(m) &&
              typeof m.id === 'string' &&
              (m.role === 'user' || m.role === 'model') &&
              typeof m.text === 'string' &&
              !m.isError
          );
        }
      }
    } catch {
      // Ignore storage parse error
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasCrisisTriggered = messages.some((m) => m.isCrisis);

  // Persist messages cleanly
  useEffect(() => {
    try {
      const clean = messages.filter((m) => !m.isError).slice(-40);
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(clean));
    } catch {
      // Ignore storage quota errors
    }
  }, [messages]);

  // Initial Path Guide greeting
  useEffect(() => {
    if (visitor && messages.length === 0) {
      setMessages([createWelcomeMessage()]);
    }
  }, [visitor, messages.length]);

  useEffect(() => {
    if (messages.length > 4 && !isExpanded && !hasManuallyToggled) {
      setIsExpanded(true);
    }
  }, [messages.length, isExpanded, hasManuallyToggled]);

  // Close on Escape key & focus input when opened
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, visitor]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = formName.trim();
    const trimmedEmail = formEmail.trim();
    const trimmedWhatsapp = formWhatsapp.trim();

    if (!trimmedName || !trimmedEmail || !trimmedWhatsapp) {
      setFormError('Please provide your name, email, and WhatsApp number to proceed.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (trimmedWhatsapp.replace(/[^0-9]/g, '').length < 7) {
      setFormError('Please enter a valid WhatsApp phone number.');
      return;
    }

    setIsStartingChat(true);

    const newVisitor: VisitorDetails = {
      name: trimmedName,
      email: trimmedEmail,
      whatsapp: trimmedWhatsapp,
    };

    try {
      localStorage.setItem(VISITOR_KEY, JSON.stringify(newVisitor));
    } catch {
      // Ignore storage error
    }

    setVisitor(newVisitor);
    setMessages([createWelcomeMessage()]);
    setIsStartingChat(false);

    // Record initial connection into Firestore & email relay asynchronously so network latency never blocks the UI
    saveInquiry(
      {
        name: trimmedName,
        email: trimmedEmail,
        whatsapp: trimmedWhatsapp,
        question: 'Visitor initiated Path Guide chat session',
        userId: user?.uid,
      },
      {
        source: 'Path Guide Intake',
        readiness: 'medium',
      }
    ).catch((error) => {
      console.error('Error registering visitor inquiry:', error);
    });
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {
      // Ignore
    }

    if (visitor) {
      setMessages([createWelcomeMessage()]);
    } else {
      setMessages([]);
    }
  };

  // Clean markdown/link renderer preserving full AI guidance
  const renderMessageText = (rawText: string) => {
    const text = rawText.replace(/<!--DATA:.*?-->/gs, '').trim();
    const combinedRegex =
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(\+91\s?\d{10}|\+91\s?\d{5}\s?\d{5})/g;
    const paragraphs = text.split('\n');

    return (
      <div className="space-y-2">
        {paragraphs.map((line, lineIdx) => {
          if (!line.trim()) {
            return <div key={lineIdx} className="h-1" />;
          }

          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match: RegExpExecArray | null;

          const parseBold = (subText: string) => {
            const boldRegex = /\*\*(.*?)\*\*/g;
            const boldParts: React.ReactNode[] = [];
            let boldLastIdx = 0;
            let bMatch: RegExpExecArray | null;

            while ((bMatch = boldRegex.exec(subText)) !== null) {
              if (bMatch.index > boldLastIdx) {
                boldParts.push(subText.slice(boldLastIdx, bMatch.index));
              }
              boldParts.push(
                <strong key={bMatch.index} className="font-semibold">
                  {bMatch[1]}
                </strong>
              );
              boldLastIdx = boldRegex.lastIndex;
            }
            if (boldLastIdx < subText.length) {
              boldParts.push(subText.slice(boldLastIdx));
            }
            return boldParts.length > 0 ? boldParts : [subText];
          };

          combinedRegex.lastIndex = 0;
          while ((match = combinedRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
              parts.push(...parseBold(line.slice(lastIndex, match.index)));
            }

            const matchText = match[0];
            if (match[1]) {
              parts.push(
                <a
                  key={match.index}
                  href={`mailto:${matchText}`}
                  className="underline font-semibold text-[#1A5F5F] hover:text-[#0B3A42] transition-colors"
                >
                  {matchText}
                </a>
              );
            } else if (match[2]) {
              const cleanNum = matchText.replace(/[^0-9]/g, '');
              parts.push(
                <a
                  key={match.index}
                  href={`https://wa.me/${cleanNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-[#1A5F5F] hover:text-[#0B3A42] inline-flex items-center gap-0.5"
                  title="Connect on WhatsApp"
                >
                  {matchText}
                </a>
              );
            }
            lastIndex = combinedRegex.lastIndex;
          }

          if (lastIndex < line.length) {
            parts.push(...parseBold(line.slice(lastIndex)));
          }

          const trimmed = line.trim();
          const isBullet =
            trimmed.startsWith('•') ||
            trimmed.startsWith('- ') ||
            trimmed.startsWith('* ') ||
            /^\d+\./.test(trimmed);

          return (
            <p key={lineIdx} className={`${isBullet ? 'pl-2' : ''} leading-relaxed`}>
              {parts.length > 0 ? parts : parseBold(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const sendMessage = async (rawMessageText: string, options?: { isRetry?: boolean }) => {
    const userText = rawMessageText.trim();
    if (!userText || isLoading) return;

    // Build history from existing clean messages before appending the new turn
    const historySnapshot = messages
      .filter((m) => m.id !== 'welcome' && !m.isError)
      .slice(-8)
      .map((m) => ({
        role: m.role,
        text: m.text.replace(/<!--DATA:.*?-->/gs, '').trim().slice(0, 600),
      }));

    if (options?.isRetry) {
      // Remove previous error bubble before retrying
      setMessages((prev) => prev.filter((m) => !m.isError));
    } else {
      const userMessage: Message = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        role: 'user',
        text: userText,
      };
      setMessages((prev) => [...prev.filter((m) => !m.isError), userMessage]);
      setInput('');
    }

    // Immediate self-harm / suicide crisis intercept: show Tele-MANAS 14416 & booking link at once and stop giving tips
    if (CRISIS_PATTERN.test(userText) || hasCrisisTriggered) {
      const crisisMessage: Message = {
        id: `${Date.now()}_crisis_${Math.random().toString(36).slice(2, 6)}`,
        role: 'model',
        text: CRISIS_MESSAGE_TEXT,
        isCrisis: true,
      };
      setMessages((prev) => [...prev, crisisMessage]);

      if (visitor && !options?.isRetry) {
        saveInquiry(
          {
            name: visitor.name,
            email: visitor.email,
            whatsapp: visitor.whatsapp,
            question: `${userText} [Urgent Crisis Resource Shown]`,
            userId: user?.uid,
          },
          {
            source: 'Path Guide Crisis Intercept',
            topic: 'Crisis Support',
            sentiment: 'crisis',
            readiness: 'high',
          }
        ).catch((err) => console.error('Auto-recording crisis inquiry:', err));
      }
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: historySnapshot,
          visitorName: visitor?.name,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.reply) {
        const errorText =
          typeof data?.error === 'string' && data.error.trim()
            ? data.error
            : 'Unable to reach Path Guide right now. Please try again or reach us directly via WhatsApp or Call below.';
        throw new Error(errorText);
      }

      const extractedTopic =
        typeof data.topic === 'string' && data.topic.trim() ? ` [Topic: ${data.topic.trim()}]` : '';

      // Persist inquiry & question to Firestore and trigger server email notification
      if (visitor && !options?.isRetry) {
        saveInquiry(
          {
            name: visitor.name,
            email: visitor.email,
            whatsapp: visitor.whatsapp,
            question: `${userText}${extractedTopic}`,
            userId: user?.uid,
          },
          {
            source: 'Path Guide Chat',
            topic: typeof data.topic === 'string' ? data.topic : undefined,
            sentiment: typeof data.sentiment === 'string' ? data.sentiment : undefined,
            readiness: typeof data.readiness === 'string' ? data.readiness : undefined,
          }
        ).catch((err) => console.error('Auto-recording inquiry:', err));
      }

      const modelMessage: Message = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        role: 'model',
        text: data.isCrisis ? CRISIS_MESSAGE_TEXT : data.reply,
        isCrisis: Boolean(data.isCrisis),
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      const errMsg =
        error instanceof Error && error.message
          ? error.message
          : 'Something interrupted our connection. Please retry or message us directly via WhatsApp or Call below.';

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}_err`,
          role: 'model',
          text: errMsg,
          isError: true,
          retryPrompt: userText,
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleSendPrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[132px] right-3.5 sm:bottom-[172px] sm:right-6 z-40 items-center justify-center group ${
          isOpen ? 'hidden' : 'flex'
        }`}
        aria-label="Chat with Path Guide (AI)"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-[#1A5F5F] opacity-25 animate-ping"
          style={{ animationDuration: '2s', animationDelay: '0.4s' }}
        />

        {/* Call to action tooltip (shown only on hover/focus so it never covers page content at rest) */}
        <div className="hidden sm:flex absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#0B3A42] font-semibold text-[13px] px-4 py-2.5 rounded-2xl rounded-br-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] whitespace-nowrap border border-gray-200 items-center gap-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none origin-right">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          Chat with Path Guide (AI)
        </div>

        <motion.div
          className="relative bg-[#0B3A42] text-white p-2.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow cursor-pointer min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
          whileHover={{ scale: 1.08 }}
        >
          <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${
              isExpanded
                ? 'inset-0 md:inset-4 md:rounded-2xl rounded-none w-auto h-auto max-h-none'
                : 'bottom-[80px] sm:bottom-[100px] right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[420px] max-w-[420px] h-[550px] max-h-[82vh] rounded-2xl'
            }`}
          >
            {/* Header */}
            <div className="section-dark bg-[#0B3A42] text-[#FAF9F6] p-4 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="flex items-center gap-3 relative z-10 min-w-0">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm shrink-0">
                  <Bot className="w-5 h-5 text-[#FAF9F6]" />
                </div>
                <div className="min-w-0">
                  <h3 className="card-title font-heading font-bold tracking-wide text-[14px] text-[#FAF9F6] leading-snug">
                    Path Guide · AI assistant, not a clinician
                  </h3>
                  <p className="text-[11px] text-[#F5F0E6] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    General wellbeing tips &amp; booking help
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10 shrink-0">
                {visitor && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="text-[#FAF9F6] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                    title="Reset Chat"
                    aria-label="Reset Chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    setHasManuallyToggled(true);
                  }}
                  className="text-[#FAF9F6] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                  aria-label={isExpanded ? 'Minimize Chat' : 'Expand Chat'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[#FAF9F6] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content: Gate if visitor details not provided */}
            {!visitor ? (
              <div className="flex-1 overflow-y-auto p-6 bg-[#FDFBF7] flex flex-col justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
                  <div className="text-center space-y-1.5 pb-2 border-b border-gray-100">
                    <div className="w-12 h-12 mx-auto bg-[#0B3A42]/10 rounded-full flex items-center justify-center text-[#0B3A42] mb-2">
                      <Heart className="w-6 h-6 text-[#A43F23]" />
                    </div>
                    <h4 className="font-heading font-semibold text-[#0B3A42] text-base">
                      Chat with Path Guide (AI)
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed max-w-xs mx-auto">
                      Enter your details below to start chatting. <strong>AI assistant, not a clinician</strong> — in a crisis, call Tele-MANAS <strong>14416</strong>.
                    </p>
                  </div>

                  <form onSubmit={handleStartChat} className="space-y-3 pt-1">
                    {formError && (
                      <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11.5px] font-medium text-gray-800 mb-1">
                        Full Name <span className="text-red-700">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full bg-[#FDFBF7] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#0B3A42] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-medium text-gray-800 mb-1">
                        Email Address <span className="text-red-700">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#FDFBF7] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#0B3A42] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-medium text-gray-800 mb-1">
                        WhatsApp Number <span className="text-red-700">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input
                          type="tel"
                          required
                          value={formWhatsapp}
                          onChange={(e) => setFormWhatsapp(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#FDFBF7] border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#0B3A42] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isStartingChat}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isStartingChat ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Start Conversation</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <div className="px-4 py-1.5 bg-[#FDFBF7] border-b border-stone-200 text-[11px] font-medium text-[#0B3A42] text-center shrink-0">
                  Path Guide · AI assistant, not a clinician · In a crisis call Tele-MANAS 14416
                </div>
                {/* Messages Screen */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7]/50">
                  {messages.map((msg) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id}
                      className={`flex items-start gap-2 ${
                        msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-[#A43F23]/15 text-[#A43F23]'
                            : msg.isCrisis || msg.isError
                              ? 'bg-red-100 text-red-800'
                              : 'bg-[#0B3A42]/10 text-[#0B3A42]'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          user?.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || 'User'}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4" />
                          )
                        ) : msg.isCrisis || msg.isError ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-[13.5px] leading-relaxed relative ${
                          msg.role === 'user'
                            ? 'bg-[#A43F23] text-white rounded-tr-sm shadow-[0_2px_10px_-4px_rgba(164,63,35,0.4)]'
                            : msg.isCrisis
                              ? 'bg-rose-50 text-rose-950 rounded-tl-sm border-2 border-rose-300 shadow-xs'
                              : msg.isError
                                ? 'bg-red-50/90 text-red-900 rounded-tl-sm border border-red-200/80 shadow-xs'
                                : 'bg-white text-gray-800 rounded-tl-sm border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'
                        }`}
                      >
                        <div>{renderMessageText(msg.text)}</div>

                        {msg.isCrisis && (
                          <div className="mt-3 pt-3 border-t border-rose-200 flex flex-col gap-2">
                            <a
                              href="tel:14416"
                              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold transition-colors"
                            >
                              <PhoneCall className="w-4 h-4" />
                              <span>Call Tele-MANAS 14416 (24/7 Free Crisis Helpline)</span>
                            </a>
                            <a
                              href={CALENDLY_BOOKING_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B3A42] hover:bg-[#07252A] text-white text-xs font-bold transition-colors"
                            >
                              <span>Book a Consultation with a Psychologist</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                        {msg.isError && msg.retryPrompt && (
                          <button
                            type="button"
                            onClick={() => sendMessage(msg.retryPrompt!, { isRetry: true })}
                            disabled={isLoading}
                            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-red-100 text-red-800 border border-red-200 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Try Again</span>
                          </button>
                        )}

                        {/* Direct booking & contact links (non-crisis turns) */}
                        {msg.role === 'model' && !msg.isCrisis && (
                          <div className="mt-3.5 pt-2.5 border-t border-gray-100">
                            <p className="text-[11px] font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#A43F23]" />
                              <span>Ready for 1-on-1 personalized guidance?</span>
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <a
                                href={WHATSAPP_LINK_1}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-[11px] font-medium transition-colors"
                              >
                                <Phone className="w-3 h-3 text-emerald-800" />
                                WhatsApp ({WHATSAPP_NUMBER_1})
                              </a>
                              <a
                                href={CALL_LINK}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 text-[11px] font-medium transition-colors"
                              >
                                <PhoneCall className="w-3 h-3 text-blue-800" />
                                Call ({CALL_NUMBER})
                              </a>
                              <a
                                href={EMAIL_LINK}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200/80 text-[11px] font-medium transition-colors"
                              >
                                <Mail className="w-3 h-3 text-amber-800" />
                                Email Us
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0B3A42]/10 text-[#0B3A42] flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-2 text-xs text-gray-700">
                        <Loader2 className="w-4 h-4 animate-spin text-[#A43F23]" />
                        <span>Thinking calmly...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Chips (stopped once crisis protocol activates) */}
                {!hasCrisisTriggered && (
                  <div className="px-3 py-2 bg-[#FDFBF7] border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                    <span className="text-[10.5px] text-gray-700 font-medium whitespace-nowrap">
                      Suggested:
                    </span>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() =>
                        handleSendPrompt(
                          'I feel overwhelmed and anxious lately. Can you help me understand what is happening?'
                        )
                      }
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-300 text-gray-700 hover:text-[#0B3A42] hover:border-[#0B3A42] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Feeling Overwhelmed
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() =>
                        handleSendPrompt(
                          "My mind won't stop overthinking at night. Why does my brain do this?"
                        )
                      }
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-300 text-gray-700 hover:text-[#0B3A42] hover:border-[#0B3A42] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Overthinking at Night
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() =>
                        handleSendPrompt(
                          'How can I explore 1-on-1 personalized sessions with Imran & Tejaswini?'
                        )
                      }
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-300 text-gray-700 hover:text-[#0B3A42] hover:border-[#0B3A42] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
                    >
                      1-on-1 Sessions
                    </button>
                  </div>
                )}

                {/* Input Form */}
                <div className="p-3 bg-white border-t border-gray-100 relative shrink-0">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Share what is on your mind..."
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 text-[13.5px] text-gray-900 focus:outline-none focus:border-[#0B3A42] focus:ring-1 focus:ring-[#0B3A42] transition-all duration-300 placeholder:text-gray-600"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-[#0B3A42] text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover:bg-[#07252A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
