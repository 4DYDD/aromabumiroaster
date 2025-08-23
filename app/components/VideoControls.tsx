"use client";

import React from "react";
import { useVideoStore } from "../store/videoStore";

const VideoControls = () => {
  const { resetVideo, isLoaded, downloadProgress } = useVideoStore();

  // Jangan tampilkan jika video belum mulai loading
  if (downloadProgress === 0 && !isLoaded) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-primary_dark/90 backdrop-blur-sm text-secondary p-3 rounded-lg shadow-lg border border-secondary/20">
      <div className="text-xs font-bold mb-2">Video Controls</div>

      <button
        onClick={resetVideo}
        className="px-3 py-1 bg-accent text-white text-xs rounded hover:bg-accent/80 transition-colors"
      >
        Reset Video
      </button>

      <div className="text-xs mt-2 text-secondary/70">
        Click to reload video from scratch
      </div>
    </div>
  );
};

export default VideoControls;
