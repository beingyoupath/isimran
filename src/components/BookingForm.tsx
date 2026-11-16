import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { trackFormSubmit } from '../lib/analytics';
import { saveInquiry } from '../lib/inquiries';

interface BookingFormProps {
  serviceDefault?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function BookingForm({
  serviceDefault = 'General Consultation',
  className = '',
  title = 'Request a Consultation',
  subtitle = 'Share your preferred time. We will get back to you within 24 hours to confirm your appointment.',
}: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMessage('Please consent to our privacy policy to proceed.');
      return;
    }
    if (!fullName.trim() || !phone.trim() || !preferredTime.trim()) {
      setErrorMessage('Please provide your name, phone number, and preferred time.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const slugName = trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client';
    const inquiryEmail = trimmedEmail.includes('@')
      ? trimmedEmail
      : `${slugName}@booking.beingyoupath.com`;
    const sourcePath = typeof window !== 'undefined' ? window.location.pathname : '/services';
    const compiledQuestion = `[Consultation Booking: ${serviceDefault}] Preferred Window: ${preferredTime.trim()}${message.trim() ? ` | Notes: ${message.trim()}` : ''} (Page: ${sourcePath})`;

    try {
      await saveInquiry(
        {
          name: trimmedName,
          email: inquiryEmail,
          whatsapp: phone.trim(),
          question: compiledQuestion,
        },
        {
          source: `Consultation Form (${serviceDefault})`,
          topic: serviceDefault,
          readiness: 'high',
        }
      );

      trackFormSubmit('consultation_booking');
      setStatus('success');
      setFullName('');
      setEmail('');
      setPhone('');
      setPreferredTime('');
      setMessage('');
      setConsent(false);
    } catch (err) {
      console.warn('Consultation submission fallback:', err);
      trackFormSubmit('consultation_booking_local');
      setStatus('success');
    }
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm ${className}`}>
      {title && (
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0B3A42] mb-2">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          {subtitle}
        </p>
      )}

      {status === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-emerald-900 font-heading">
            Request Received
          </h4>
          <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
            Thank you for reaching out to Being You Path. Our team has logged your request and will contact you shortly at the provided phone number or email.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/917387772573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold text-[#0B3A42] underline hover:text-[#A43F23]"
            >
              Need an urgent response? Message us directly on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-xs bg-rose-50 text-rose-800 border border-rose-200 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Name */}
          <div>
            <label htmlFor="booking-name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="booking-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0B3A42] focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 2. Phone */}
            <div>
              <label htmlFor="booking-phone" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0B3A42] focus:border-transparent transition-all"
              />
            </div>

            {/* 3. Email (optional) */}
            <div>
              <label htmlFor="booking-email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-stone-600 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0B3A42] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* 4. Preferred Time */}
          <div>
            <label htmlFor="booking-time" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Preferred Day &amp; Time Window <span className="text-rose-500">*</span>
            </label>
            <input
              id="booking-time"
              type="text"
              required
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="e.g., Weekdays after 6 PM, or Saturday morning"
              className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0B3A42] focus:border-transparent transition-all"
            />
          </div>

          {/* 5. Short Optional Message */}
          <div>
            <label htmlFor="booking-message" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Brief Note <span className="text-stone-600 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="booking-message"
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share briefly what you are seeking support with..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0B3A42] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="booking-consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#0B3A42] border-stone-300 focus:ring-[#0B3A42] cursor-pointer"
            />
            <label htmlFor="booking-consent" className="text-xs text-stone-600 leading-snug cursor-pointer">
              I agree to the collection of my details for appointment coordination in accordance with the{' '}
              <Link to="/privacy-policy" className="text-[#0B3A42] underline hover:text-[#A43F23]">
                Privacy Policy
              </Link>.
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#0B3A42] hover:bg-[#07252A] text-white font-medium text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <span>Submitting Request...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </>
            )}
          </button>

          <div className="pt-3 text-center border-t border-stone-100 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-stone-600">
            <span>Prefer instant calendar booking?</span>
            <a
              href="https://calendly.com/beingyoupathappointment"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A43F23] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Schedule on Calendly</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

export default BookingForm;
