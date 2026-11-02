"use client";

import { memo } from "react";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";

function VideoInside({ url }: { url: string }) {
  if (isMobile) {
    return (
      <ReactPlayer
        src={url}
        width="100%"
        height="200px"
        controls
        className="react-player mx-auto my-4"
      />
    );
  }
  return (
    <ReactPlayer
      src={url}
      width="800px"
      height="50vh"
      controls
      className="react-player mx-auto my-4"
    />
  );
}

const Video = memo(VideoInside);

export default Video;
