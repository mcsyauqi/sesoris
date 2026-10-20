"use client";

import { useEffect, useRef, useState } from "react";

const SHOW_AFTER_PX = 400;

/**
 * Progress baca (garis tipis di tepi atas viewport, menempel di tepi atas header sticky) + tombol kembali ke atas.
 * Dipasang sekali di root layout supaya ada di semua halaman, termasuk artikel baru. Listener passive + rAF,
 * semua elemen position: fixed jadi tanpa layout shift. Gaya di CSS global (blok "ScrollUX").
 */
export default function ScrollUX({ label = "Back to top" }: { label?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="sux-progress" aria-hidden="true" data-reading-progress="">
        <div ref={barRef} className="sux-progress-bar" />
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={label}
        title={label}
        tabIndex={visible ? 0 : -1}
        data-back-to-top=""
        className={visible ? "sux-top is-visible" : "sux-top"}
      >
        <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
