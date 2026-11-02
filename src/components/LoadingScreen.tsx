"use client";

import { useEffect, useState } from "react";

const criticalImages = [
  "/logo.webp",
  "/home/tree.svg",
  "/home/school.svg",
  "/home/Frame 13.svg",
];

const minimumDisplayTime = 280;
const maximumDisplayTime = 2500;

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();

    const finish = () => {
      if (cancelled) return;

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minimumDisplayTime - elapsed);

      window.setTimeout(() => {
        if (cancelled) return;
        setProgress(100);
        setIsExiting(true);
        window.setTimeout(() => {
          if (!cancelled) setIsVisible(false);
        }, 180);
      }, remaining);
    };

    const prepare = async () => {
      const imageProgress = Promise.all(
        criticalImages.map((src, index) =>
          loadImage(src).then(() => {
            if (!cancelled) {
              setProgress(
                Math.round(((index + 1) / criticalImages.length) * 80),
              );
            }
          }),
        ),
      );

      const fontProgress = document.fonts?.ready.then(() => {
        if (!cancelled) setProgress((current) => Math.max(current, 92));
      });

      await Promise.all([imageProgress, fontProgress]);
      finish();
    };

    const timeout = window.setTimeout(finish, maximumDisplayTime);
    void prepare().finally(() => window.clearTimeout(timeout));

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#CE2D2D] text-white transition-opacity duration-200 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="ページを読み込んでいます"
    >
      <div className="w-[min(76vw,280px)] text-center">
        <p className="font-serif text-5xl tracking-[0.18em]">燈灯</p>
        <p className="mt-3 text-[10px] tracking-[0.28em]">KEYAKI FESTIVAL</p>
        <div className="mt-12 h-px w-full bg-white/30">
          <div
            className="h-full bg-white transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm tabular-nums">{progress}%</p>
      </div>
    </div>
  );
}
