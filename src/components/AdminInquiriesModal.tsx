import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle2, Clock, Calendar, RefreshCw, Send, ShieldAlert, User, MessageSquare, Phone } from 'lucide-react';
import { ChatInquiry, getInquiries, updateInquiryStatus, buildDigestMailtoUrl, CTA_EMAIL } from '../lib/inquiries';
import { useAuth } from '../contexts/AuthContext';

interface AdminInquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminInquiriesModal({ isOpen, onClose }: AdminInquiriesModalProps) {
  const { isAdmin, user } = useAuth();
  const [inquiries, setInquiries] = useState<ChatInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  const handleStatusToggle = async (inquiry: ChatInquiry) => {
    const nextStatus = inquiry.status === 'pending' ? 'reviewed' : 'pending';
    try {
      await updateInquiryStatus(inquiry.id, nextStatus);
      setInquiries(prev => prev.map(item => item.id === inquiry.id ? { ...item, status: nextStatus } : item));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

  const copyDigestToClipboard = (type: 'Daily' | 'Weekly') => {
    const subset = type === 'Daily' 
      ? inquiries.filter(i => i.frequency === 'daily' || i.status === 'pending')
      : inquiries;

    let text = `Being You Path - ${type} Inquiries Digest for ${CTA_EMAIL}\nDate: ${new Date().toLocaleDateString()}\n\n`;
    subset.forEach((item, idx) => {
      text += `#${idx + 1}: ${item.name} (${item.email})\n`;
      text += `Schedule: ${item.frequency} | Date: ${new Date(item.createdAt).toLocaleString()}\n`;
      text += `Question: ${item.question}\n\n`;
    });

    navigator.clipboard.writeText(text);
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
          <div className="bg-[#1A5F5F] text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-2xl">
                <MessageSquare className="w-6 h-6 text-[#E6A157]" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold">Chatbot Inquiries & Digest Center</h2>
                <p className="text-xs text-white/80">
                  Target CTA Mailbox: <span className="font-semibold text-[#E6A157]">{CTA_EMAIL}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Actions & Digest Dispatch Bar */}
          <div className="bg-[#FDFBF7] p-4 sm:p-6 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Collected Questions</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1A5F5F]/10 text-[#1A5F5F]">
                  {inquiries.length} Total
                </span>
                {pendingCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C85C3E]/10 text-[#C85C3E]">
                    {pendingCount} Pending Review
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Dispatch daily or weekly digests directly to your inbox at <span className="font-medium text-gray-700">{CTA_EMAIL}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={buildDigestMailtoUrl(inquiries.filter(i => i.frequency === 'daily' || i.status === 'pending'), 'Daily')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A5F5F] hover:bg-[#144747] text-white text-xs font-medium transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Email Daily Digest
              </a>
              <a
                href={buildDigestMailtoUrl(inquiries, 'Weekly')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C85C3E] hover:bg-[#b04f34] text-white text-xs font-medium transition-all shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                Email Weekly Digest
              </a>
              <button
                onClick={() => copyDigestToClipboard('Weekly')}
                className="px-3.5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium transition-colors"
              >
                {copiedNotification ? '✓ Copied Summary' : 'Copy Text'}
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="px-6 pt-4 flex items-center gap-2 border-b border-gray-100">
            <button
              onClick={() => setFilter('all')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors ${
                filter === 'all'
                  ? 'border-[#1A5F5F] text-[#1A5F5F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors ${
                filter === 'pending'
                  ? 'border-[#C85C3E] text-[#C85C3E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending ({inquiries.filter(i => i.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('reviewed')}
              className={`pb-3 px-2 text-xs font-medium border-b-2 transition-colors ${
                filter === 'reviewed'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviewed ({inquiries.filter(i => i.status === 'reviewed').length})
            </button>
          </div>

          {/* Inquiries list content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-[#1A5F5F]" />
                <p className="text-sm">Loading visitor questions from Firestore...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-base font-medium">No inquiries found in this category.</p>
                <p className="text-xs text-gray-400 mt-1">Questions submitted via the wellness guide will appear here.</p>
              </div>
            ) : (
              filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="bg-[#FDFBF7]/60 rounded-2xl p-5 border border-gray-200/70 hover:border-[#1A5F5F]/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/50 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1A5F5F]/10 text-[#1A5F5F] flex items-center justify-center text-xs font-bold">
                        {inquiry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{inquiry.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                          <a
                            href={`mailto:${inquiry.email}?subject=Response from Being You Path - Regarding Your Question`}
                            className="text-xs text-[#1A5F5F] hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {inquiry.email}
                          </a>
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
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                        inquiry.frequency === 'weekly' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {inquiry.frequency} digest
                      </span>

                      <button
                        onClick={() => handleStatusToggle(inquiry)}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${
                          inquiry.status === 'reviewed'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                      >
                        {inquiry.status === 'reviewed' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Reviewed
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
                    <p className="text-xs font-medium text-gray-400 mb-1">User Question / Topic:</p>
                    <p className="whitespace-pre-wrap">{inquiry.question}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span>Received: {new Date(inquiry.createdAt).toLocaleString()}</span>
                    <a
                      href={`mailto:${inquiry.email}?subject=Response from Being You Path: Re: Your Question`}
                      className="text-[#C85C3E] hover:underline font-medium"
                    >
                      Reply to visitor &rarr;
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
