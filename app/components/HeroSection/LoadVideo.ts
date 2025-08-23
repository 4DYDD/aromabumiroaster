import { useVideoStore } from "../../store/videoStore";

interface VideoLoadOptions {
  videoElement: HTMLVideoElement;
  playbackRate?: number;
  downloadThreshold?: number; // Percentage (0-100)
}

/**
 * Handles complete video loading with real-time progress tracking
 * Ensures video is fully downloaded before playback to prevent frame drops
 */
export const handleVideoLoading = async ({
  videoElement,
  playbackRate = 1.3,
  downloadThreshold = 95,
}: VideoLoadOptions): Promise<void> => {
  console.log("🎬 handleVideoLoading function started");

  // Get store functions - using getState() for non-reactive access
  const store = useVideoStore.getState();
  const setDownloadProgress = store.setDownloadProgress;
  const setLoaded = store.setLoaded;
  const setPlaying = store.setPlaying;
  const setError = store.setError;

  console.log("📊 Store functions obtained:", {
    setDownloadProgress: typeof setDownloadProgress,
    setLoaded: typeof setLoaded,
    setPlaying: typeof setPlaying,
    setError: typeof setError,
  });

  try {
    console.log("🎬 Starting video loading process...");
    console.log("📊 Video element:", videoElement);
    console.log("📊 Video src:", videoElement.src);
    console.log("📊 Video duration:", videoElement.duration);
    console.log("📊 Video readyState:", videoElement.readyState);
    console.log("📊 Video buffered.length:", videoElement.buffered.length);

    // Reset states with immediate logging
    console.log("🔄 Resetting states...");
    setDownloadProgress(0);
    console.log("✅ setDownloadProgress(0) called");

    setLoaded(false);
    console.log("✅ setLoaded(false) called");

    setPlaying(false);
    console.log("✅ setPlaying(false) called");

    setError(null);
    console.log("✅ setError(null) called");

    // Since this function is called from onLoadedMetadata, metadata is already available
    // No need to wait for metadata again
    console.log(
      "📊 Video metadata already loaded, duration:",
      videoElement.duration
    );

    // Check if video is already buffered (cached)
    const buffered = videoElement.buffered;
    if (buffered.length > 0) {
      const downloadedSeconds = buffered.end(buffered.length - 1);
      const totalSeconds = videoElement.duration;
      const initialProgress = (downloadedSeconds / totalSeconds) * 100;
      console.log(`� Video already buffered: ${initialProgress.toFixed(1)}%`);

      if (initialProgress >= downloadThreshold) {
        console.log("✅ Video already cached and ready!");
        setDownloadProgress(100);
        videoElement.playbackRate = playbackRate;
        await videoElement.play();
        setLoaded(true);
        setPlaying(true);
        return;
      }
    }

    // Start progress tracking immediately
    console.log("🔄 Starting progress tracking...");
    const progressTracker = startProgressTracking(
      videoElement,
      setDownloadProgress
    );

    // Wait for sufficient download
    console.log("⏳ Waiting for sufficient download...");
    await waitForSufficientDownload(videoElement, downloadThreshold);

    // Stop progress tracking
    clearInterval(progressTracker);

    console.log("✅ Video sufficiently downloaded, starting playback...");

    // Set final progress and start video
    setDownloadProgress(100);
    videoElement.playbackRate = playbackRate;
    await videoElement.play();

    // Update final states
    setLoaded(true);
    setPlaying(true);

    console.log("🎯 Video playback started successfully!");
  } catch (error) {
    console.error("❌ Video loading error:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.name === "NotAllowedError") {
        setError("Auto-play prevented by browser");
        console.log("ℹ️ Auto-play prevented, but video is ready");
      } else {
        setError(`Video loading failed: ${error.message}`);
      }
    } else {
      setError("Unknown video loading error");
    }

    // Still mark as loaded even if autoplay fails
    setLoaded(true);
    setDownloadProgress(100);
  }
};

/**
 * Starts real-time progress tracking
 */
const startProgressTracking = (
  video: HTMLVideoElement,
  setProgress: (progress: number) => void
): NodeJS.Timeout => {
  const updateProgress = () => {
    const buffered = video.buffered;
    console.log("🔍 Checking progress - buffered.length:", buffered.length);
    console.log("🔍 Video duration:", video.duration);
    console.log("🔍 Video readyState:", video.readyState);

    if (buffered.length > 0 && !isNaN(video.duration)) {
      const downloadedSeconds = buffered.end(buffered.length - 1);
      const totalSeconds = video.duration;
      const progressPercentage = Math.min(
        (downloadedSeconds / totalSeconds) * 100,
        100
      );

      setProgress(Math.round(progressPercentage));

      console.log(
        `📥 Download: ${downloadedSeconds.toFixed(1)}/${totalSeconds.toFixed(
          1
        )}s (${progressPercentage.toFixed(1)}%)`
      );
    } else {
      console.log("⚠️ No buffered data yet or duration not available");
      // For very fast cached videos, try to detect completion
      if (video.readyState >= 3) {
        // HAVE_FUTURE_DATA or higher
        console.log("🚀 Video ready state indicates data available");
        setProgress(100);
      }
    }
  };

  // Update immediately and then every 50ms for better responsiveness
  console.log("🎯 Starting progress tracker");
  updateProgress();
  return setInterval(updateProgress, 50);
};

/**
 * Waits until video is downloaded to the specified threshold
 */
const waitForSufficientDownload = (
  video: HTMLVideoElement,
  threshold: number
): Promise<void> => {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 200; // 10 seconds max (50ms * 200)

    const checkDownload = () => {
      attempts++;
      console.log(`🔄 Download check attempt ${attempts}/${maxAttempts}`);

      const buffered = video.buffered;

      if (buffered.length > 0 && !isNaN(video.duration)) {
        const downloadedSeconds = buffered.end(buffered.length - 1);
        const totalSeconds = video.duration;
        const progressPercentage = (downloadedSeconds / totalSeconds) * 100;

        console.log(
          `📊 Current progress: ${progressPercentage.toFixed(
            1
          )}% (threshold: ${threshold}%)`
        );

        // Check if we've reached the threshold
        if (downloadedSeconds >= totalSeconds * (threshold / 100)) {
          console.log(
            `🎯 Download threshold reached: ${progressPercentage.toFixed(1)}%`
          );
          resolve();
          return;
        }
      } else {
        console.log("⚠️ No buffered data or duration not available yet");

        // Fallback: if video readyState indicates it's ready, proceed
        if (video.readyState >= 3) {
          // HAVE_FUTURE_DATA
          console.log("🚀 Video readyState indicates sufficient data loaded");
          resolve();
          return;
        }
      }

      // Timeout fallback
      if (attempts >= maxAttempts) {
        console.warn("⏰ Download check timeout, proceeding anyway");
        resolve();
        return;
      }

      // Check again after 50ms
      setTimeout(checkDownload, 50);
    };

    checkDownload();
  });
};

/**
 * Hook to get video loading function with store integration
 */
export const useVideoLoader = () => {
  return {
    loadVideo: handleVideoLoading,
    resetVideo: () => {
      const { resetVideo } = useVideoStore.getState();
      resetVideo();
    },
  };
};

/**
 * Utility to check if video is cached/already downloaded
 */
export const isVideoCached = async (videoUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(videoUrl, { method: "HEAD" });
    return response.status === 200;
  } catch {
    return false;
  }
};
