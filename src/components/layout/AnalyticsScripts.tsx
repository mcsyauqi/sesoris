'use client';

import { useEffect } from 'react';
import { installLinkTracking } from '@/lib/analytics';

const GA_MEASUREMENT_ID = 'G-V2Y9KVBKFP';
const CLARITY_PROJECT_ID = 'xutrh8d0dz';

type ClarityQueue = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  clarity?: ClarityQueue;
  gtag?: (...args: unknown[]) => void;
};

export function AnalyticsScripts() {
  useEffect(() => installLinkTracking(), []);

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]' || hostname.endsWith('.local')) {
      return;
    }

    let loaded = false;
    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      const analyticsWindow = window as AnalyticsWindow;
      analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
      // gtag.js only processes Arguments objects pushed to dataLayer. Pushing a plain
      // array (rest params) is silently ignored, which stopped all GA4 hits from
      // 2026-08-05 (commit bb340d6) until this fix.
      const gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        analyticsWindow.dataLayer?.push(arguments);
      } as (...args: unknown[]) => void;
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, { page_path: window.location.pathname });
      // Expose gtag only AFTER config is queued: src/lib/analytics.ts buffers
      // e-commerce events until window.gtag exists, so this is what releases
      // view_item / add_to_cart / begin_checkout / purchase. Without it they
      // were dropped after 30s (none reached GA4 in 90 days).
      analyticsWindow.gtag = analyticsWindow.gtag || gtag;

      const ga = document.createElement('script');
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(ga);

      const clarity: ClarityQueue = (...args: unknown[]) => {
        clarity.q = clarity.q || [];
        clarity.q.push(args);
      };
      analyticsWindow.clarity = analyticsWindow.clarity || clarity;
      const clarityScript = document.createElement('script');
      clarityScript.async = true;
      clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
      document.head.appendChild(clarityScript);
    };

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll'];
    events.forEach((event) => window.addEventListener(event, loadAnalytics, { once: true, passive: true }));
    const timer = window.setTimeout(loadAnalytics, 10_000);

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, loadAnalytics));
    };
  }, []);

  return null;
}
