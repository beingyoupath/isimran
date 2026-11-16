/**
 * Google Analytics 4 (GA4) Event Helper
 * Uses placeholder ID G-XXXXXXXXXX as configured in index.html.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
    // Debug logging in development mode
    if ((import.meta as any)?.env?.DEV) {
      console.log(`[GA4 Event] ${eventName}:`, params);
    }
  } catch (err) {
    console.warn(`[GA4 Event Error] Failed to track ${eventName}:`, err);
  }
}

export const trackCallClick = (source: string = 'website') => {
  trackEvent('call_click', {
    phone: '+917387772573',
    source,
  });
};

export const trackWhatsAppClick = (source: string = 'website') => {
  trackEvent('whatsapp_click', {
    phone: '+917387772573',
    source,
  });
};

export const trackFormSubmit = (formType: string = 'consultation_booking') => {
  trackEvent('form_submit', {
    form_type: formType,
  });
};

export const trackDirectionsClick = (locationName: string = 'prabhat_road_clinic') => {
  trackEvent('directions_click', {
    destination: locationName,
  });
};
