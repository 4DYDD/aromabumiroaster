"use client";

import React from "react";
import {
  useVideoProgress,
  useVideoLoaded,
  useVideoError,
  useVideoFullyDownloaded,
  useNeedLoadingScreen,
} from "../store/videoStore";

const VideoStatusIndicator = () => {
  const progress = useVideoProgress();
  const isLoaded = useVideoLoaded();
  const error = useVideoError();
  const isFullyDownloaded = useVideoFullyDownloaded();
  const needLoadingScreen = useNeedLoadingScreen();

  // Jangan tampilkan jika video sudah selesai loading
  if (isLoaded && isFullyDownloaded) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-primary_dark/90 backdrop-blur-sm text-secondary p-3 rounded-lg shadow-lg border border-secondary/20">
      <div className="text-xs font-bold mb-1">Video Status</div>

      <div className="text-xs space-y-1">
        <div>Progress: {progress}%</div>
        <div>Loaded: {isLoaded ? "✅" : "⏳"}</div>
        <div>Fully Downloaded: {isFullyDownloaded ? "✅" : "⏳"}</div>
        <div>Show Loading: {needLoadingScreen ? "✅" : "❌"}</div>

        {error && (
          <div className="text-red-400 text-xs mt-2">Error: {error}</div>
        )}
      </div>

      {progress > 0 && progress < 100 && (
        <div className="w-full h-1 bg-secondary/30 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoStatusIndicator;
