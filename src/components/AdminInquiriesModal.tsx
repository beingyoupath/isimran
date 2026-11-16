import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  CheckCircle2,
  Clock,
  Calendar,
  RefreshCw,
  Send,
  ShieldAlert,
  MessageSquare,
  Phone,
  ExternalLink,
  AlertCircle,
  Check,
} from 'lucide-react';
import {
  ChatInquiry,
  getInquiries,
  updateInquiryStatus,
  buildDigestMailtoUrl,
  buildGmailComposeUrl,
  formatDigestText,
  sendDigestViaServer,
  CTA_EMAIL,
} from '../lib/inquiries';
import { useAuth } from '../contexts/AuthContext';

interface AdminInquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminInquiriesModal({ isOpen, onClose }: AdminInquiriesModalProps) {
  const { isAdmin } = useAuth();
  const [inquiries, setInquiries] = useState<ChatInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'emailed'>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [emailProvider, setEmailProvider] = useState<string>('none');
  const [isSendingDigest, setIsSendingDigest] = useState(false);
  const [digestFeedback, setDigestFeedback] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  const checkServerEmailStatus = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json().catch(() => ({}));
      setEmailConfigured(Boolean(data?.emailConfigured));
      setEmailProvider(typeof data?.emailProvider === 'string' ? data.emailProvider : 'none');
    } catch {
      setEmailConfigured(false);
    }
  };

  const fetchLeads = async () => {
    if (!isAdmin) return;
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      setLoadError(
        'Could not load inquiries from Firestore. Please confirm you are signed in with a verified admin Google account.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkServerEmailStatus();
      fetchLeads();
      setDigestFeedback(null);
    }
  }, [isOpen, isAdmin]);

  const handleStatusChange = async (
    inquiry: ChatInquiry,
    nextStatus: 'pending' | 'reviewed' | 'emailed'
  ) => {
    try {
      await updateInquiryStatus(inquiry.id, nextStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === inquiry.id ? { ...item, status: nextStatus } : item))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSendServerDigest = async (type: 'Daily' | 'Weekly') => {
    const subset =
      type === 'Daily'
        ? inquiries.filter((i) => i.status === 'pending')
        : inquiries;

    if (subset.length === 0) {
      setDigestFeedback({
        type: 'info',
        text: `No ${type === 'Daily' ? 'pending ' : ''}inquiries available to send right now.`,
      });
      return;
    }

    setIsSendingDigest(true);
    setDigestFeedback(null);

    try {
      const result = await sendDigestViaServer(subset, type);
      if (result.sent) {
        // Mark sent inquiries as 'emailed' in Firestore
        await Promise.all(
          subset
            .filter((item) => item.status === 'pending')
            .map((item) =>
              updateInquiryStatus(item.id, 'emailed')
                .then(() => {
                  setInquiries((prev) =>
                    prev.map((p) => (p.id === item.id ? { ...p, status: 'emailed' } : p))
                  );
                })
                .catch(() => {})
            )
        );
        setDigestFeedback({
          type: 'success',
          text: `${type} digest (${subset.length} lead${subset.length === 1 ? '' : 's'}) sent to ${result.recipient || CTA_EMAIL} via ${result.provider}.`,
        });
      } else if (!result.configured) {
        setDigestFeedback({
          type: 'info',
          text:
            result.error ||
            'Automatic server email requires SMTP_USER/SMTP_PASS or RESEND_API_KEY in Settings > Secrets. Use "Open in Gmail" or "Copy Text" below in the meantime.',
        });
      } else {
        setDigestFeedback({
          type: 'error',
          text: result.error || 'Could not dispatch digest email.',
        });
      }
    } catch (err) {
      setDigestFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to send digest email.',
      });
    } finally {
      setIsSendingDigest(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const pendingInquiries = inquiries.filter((i) => i.status === 'pending');
  const reviewedCount = inquiries.filter((i) => i.status === 'reviewed').length;
  const emailedCount = inquiries.filter((i) => i.status === 'emailed').length;

  const digestSource = pendingInquiries.length > 0 ? pendingInquiries : inquiries;

  const copyDigestToClipboard = (type: 'Daily' | 'Weekly') => {
    const subset = type === 'Daily' ? digestSource : inquiries;
    const { subject, body } = formatDigestText(subset, type);
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100"
        >
          {/* Modal Header */}
          <div className="section-dark bg-[#1A5F5F] text-[#FAF9F6] p-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-2xl">
                <MessageSquare className="w-6 h-6 text-[#E6A157]" />
              </div>
              <div>
                <h2 className="card-title text-xl font-heading font-semibold text-[#FAF9F6]">
                  Chatbot &amp; Booking Leads Digest Center
                </h2>
                <p className="text-xs text-[#FAF9F6]">
                  Target Mailbox:{' '}
                  <span className="font-semibold text-[#F8C988]">{CTA_EMAIL}</span>
                  {emailConfigured !== null && (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          emailConfigured ? 'bg-emerald-400' : 'bg-amber-300'
                        }`}
                      />
                      {emailConfigured
                        ? `Auto-Email Active (${emailProvider.toUpperCase()})`
                        : 'Manual / Gmail Relay Mode'}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchLeads}
                disabled={loading}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Actions & Digest Dispatch Bar */}
          <div className="bg-[#FDFBF7] p-4 sm:p-5 border-b border-gray-200 space-y-3 shrink-0">
            <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Collected Leads
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1A5F5F]/10 text-[#1A5F5F]">
                    {inquiries.length} Total
                  </span>
                  {pendingInquiries.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#A43F23]/10 text-[#A43F23]">
                      {pendingInquiries.length} Pending Review
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  Send pending leads directly to <span className="font-medium text-gray-800">{CTA_EMAIL}</span> or compose via Gmail.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isSendingDigest || inquiries.length === 0}
                  onClick={() => handleSendServerDigest('Daily')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1A5F5F] hover:bg-[#144747] text-white text-xs font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingDigest ? 'Sending...' : 'Send Pending Digest'}</span>
                </button>
                <a
                  href={buildGmailComposeUrl(digestSource, 'Daily')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#A43F23] hover:bg-[#823018] text-white text-xs font-medium transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Gmail</span>
                </a>
                <a
                  href={buildDigestMailtoUrl(inquiries, 'Weekly')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Mail App</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyDigestToClipboard('Weekly')}
                  className="px-3.5 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedNotification ? '✓ Copied Summary' : 'Copy Text'}
                </button>
              </div>
            </div>

            {digestFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  digestFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : digestFeedback.type === 'error'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                {digestFeedback.type === 'success' ? (
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{digestFeedback.text}</span>
              </div>
            )}
          </div>

          {/* Filter tabs */}
          <div className="px-6 pt-3 flex items-center gap-3 border-b border-gray-100 shrink-0 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'border-[#1A5F5F] text-[#1A5F5F]'
                  : 'border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              All Leads ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('pending')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'pending'
                  ? 'border-[#A43F23] text-[#A43F23]'
                  : 'border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              Pending ({pendingInquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('emailed')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'emailed'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              Emailed ({emailedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('reviewed')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'reviewed'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              Reviewed ({reviewedCount})
            </button>
          </div>

          {/* Inquiries list content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!isAdmin ? (
              <div className="text-center py-12 text-amber-800 bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <p className="text-sm font-semibold">Admin Sign-In Required</p>
                <p className="text-xs text-amber-700 mt-1">
                  Please sign in with an authorized clinic administrator Google account to view and manage client leads.
                </p>
              </div>
            ) : loadError ? (
              <div className="text-center py-10 bg-rose-50 rounded-2xl p-6 border border-rose-200 space-y-3">
                <AlertCircle className="w-7 h-7 mx-auto text-rose-600" />
                <p className="text-sm font-medium text-rose-900">{loadError}</p>
                <button
                  type="button"
                  onClick={fetchLeads}
                  className="px-4 py-2 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Retry Loading Leads
                </button>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-600 gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-[#1A5F5F]" />
                <p className="text-sm">Loading visitor questions from Firestore...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-gray-700">
                <p className="text-base font-medium">No inquiries found in this category.</p>
                <p className="text-xs text-gray-600 mt-1">
                  Leads captured via the Path Guide chatbot and booking forms will appear here.
                </p>
              </div>
            ) : (
              filteredInquiries.map((inquiry) => {
                const safeName = inquiry.name || 'Visitor';
                const nextStatus =
                  inquiry.status === 'pending'
                    ? 'reviewed'
                    : inquiry.status === 'reviewed'
                      ? 'emailed'
                      : 'pending';

                return (
                  <div
                    key={inquiry.id}
                    className="bg-[#FDFBF7]/60 rounded-2xl p-5 border border-gray-200/70 hover:border-[#1A5F5F]/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/50 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#1A5F5F]/10 text-[#1A5F5F] flex items-center justify-center text-xs font-bold">
                          {safeName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">{safeName}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                            {inquiry.email && (
                              <a
                                href={`mailto:${inquiry.email}?subject=Response from Being You Path - Regarding Your Question`}
                                className="text-xs text-[#1A5F5F] hover:underline flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3" />
                                {inquiry.email}
                              </a>
                            )}
                            {inquiry.whatsapp && (
                              <a
                                href={`https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-700 hover:underline flex items-center gap-1"
                                title="Chat on WhatsApp"
                              >
                                <Phone className="w-3 h-3" />
                                WhatsApp: {inquiry.whatsapp}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                            inquiry.frequency === 'weekly'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {inquiry.frequency || 'daily'} digest
                        </span>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(inquiry, nextStatus)}
                          title="Click to cycle status (Pending → Reviewed → Emailed)"
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                            inquiry.status === 'reviewed'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : inquiry.status === 'emailed'
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          }`}
                        >
                          {inquiry.status === 'reviewed' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Reviewed
                            </>
                          ) : inquiry.status === 'emailed' ? (
                            <>
                              <Mail className="w-3.5 h-3.5" />
                              Emailed
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              Pending
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-gray-700 text-sm leading-relaxed bg-white p-3.5 rounded-xl border border-gray-100">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        User Question / Topic:
                      </p>
                      <p className="whitespace-pre-wrap">{inquiry.question}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1">
                      <span>Received: {new Date(inquiry.createdAt).toLocaleString()}</span>
                      {inquiry.email &&
                        !inquiry.email.endsWith('@beingyoupath.client') &&
                        !inquiry.email.endsWith('@booking.beingyoupath.com') && (
                          <a
                            href={`mailto:${inquiry.email}?subject=Response from Being You Path: Re: Your Question`}
                            className="text-[#A43F23] hover:underline font-medium"
                          >
                            Reply to visitor &rarr;
                          </a>
                        )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
