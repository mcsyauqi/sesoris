'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-V2Y9KVBKFP';
const CLARITY_PROJECT_ID = 'xutrh8d0dz';

type ClarityQueue = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  clarity?: ClarityQueue;
};

export function AnalyticsScripts() {
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
      const gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, { page_path: window.location.pathname });

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
