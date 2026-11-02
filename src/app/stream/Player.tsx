"use client";

import { createRef, useEffect } from "react";
import ReactPlayer from "react-player";

export const Player = ({ url }: { url: string }) => {
  const playerRef = createRef<{ wrapper: { style: CSSStyleDeclaration } }>();
  useEffect(() => {
    // 画面幅に合わせて動画の高さを調整
    const resize = () => {
      console.log(playerRef.current);
      if (playerRef.current) {
        playerRef.current.wrapper.style.height = `${Math.min(window.innerWidth * 0.32, 310)}px`;
        playerRef.current.wrapper.style.marginTop = `${Math.max(Math.min(window.innerWidth * 0.03 - 3, 23), 0)}px`;
      }
    };
    resize();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [playerRef]);
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      controls={true}
      // @ts-expect-error ref type is not correct
      ref={playerRef}
      className="react-player"
      suppressHydrationWarning
    />
  );
};
