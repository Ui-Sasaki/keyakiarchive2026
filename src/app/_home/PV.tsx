"use client";

import { lazy, memo, Suspense, useEffect, useState } from "react";
const VideoInside = lazy(() => import("./PVInside"));

export function PVInside({ url }: { url: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1400) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return show ? (
    <Suspense
      fallback={<div className="text-black">Vimeo を読み込んでいます...</div>}
    >
      <VideoInside url={url} />
    </Suspense>
  ) : (
    <button onClick={() => setShow(true)} className="text-black mx-auto block">
      Vimeo を表示
    </button>
  );
}

const PV = memo(PVInside);

export default PV;
