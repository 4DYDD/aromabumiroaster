import { useVideoStore } from "../../store/videoStore";

interface VideoLoadOptions {
  videoElement: HTMLVideoElement;
  playbackRate?: number;
  downloadThreshold?: number; // Percentage (0-100)
}

/**
 * COMPLETELY REWRITTEN: Simple and direct video loading with aggressive debugging
 * Handles complete video loading with real-time progress tracking
 */
export const handleVideoLoading = async ({
  videoElement,
  playbackRate = 1.3,
  downloadThreshold = 95,
}: VideoLoadOptions): Promise<void> => {
  console.log("=== STARTING VIDEO LOADING PROCESS ===");
  console.log("🎬 handleVideoLoading function started");
  console.log("📊 Video element:", videoElement);
  console.log("📊 Video src:", videoElement.src);
  console.log("📊 Video duration:", videoElement.duration);
  console.log("📊 Video readyState:", videoElement.readyState);
  console.log("📊 Video buffered.length:", videoElement.buffered.length);

  // Get store functions with extensive logging
  try {
    const store = useVideoStore.getState();
    console.log("📊 Store obtained:", store);

    const { setDownloadProgress, setLoaded, setPlaying, setError } = store;
    console.log("📊 Store functions:", {
      setDownloadProgress: typeof setDownloadProgress,
      setLoaded: typeof setLoaded,
      setPlaying: typeof setPlaying,
      setError: typeof setError,
    });

    // STEP 1: Reset states with immediate verification
    console.log("=== STEP 1: RESETTING STATES ===");

    console.log("🔄 Calling setDownloadProgress(0)...");
    setDownloadProgress(0);
    console.log("✅ setDownloadProgress(0) completed");

    console.log("🔄 Calling setLoaded(false)...");
    setLoaded(false);
    console.log("✅ setLoaded(false) completed");

    console.log("🔄 Calling setPlaying(false)...");
    setPlaying(false);
    console.log("✅ setPlaying(false) completed");

    console.log("🔄 Calling setError(null)...");
    setError(null);
    console.log("✅ setError(null) completed");

    // STEP 2: Check current buffered state
    console.log("=== STEP 2: CHECKING BUFFERED STATE ===");
    const buffered = videoElement.buffered;
    console.log("📊 Buffered ranges:", buffered.length);

    if (buffered.length > 0) {
      for (let i = 0; i < buffered.length; i++) {
        console.log(
          `📊 Buffered range ${i}: ${buffered.start(i)} - ${buffered.end(i)}`
        );
      }

      const downloadedSeconds = buffered.end(buffered.length - 1);
      const totalSeconds = videoElement.duration;
      const initialProgress = (downloadedSeconds / totalSeconds) * 100;

      console.log(
        `📊 Downloaded: ${downloadedSeconds}/${totalSeconds} seconds`
      );
      console.log(`📊 Initial progress: ${initialProgress.toFixed(1)}%`);

      if (initialProgress >= downloadThreshold) {
        console.log("=== CACHED VIDEO DETECTED ===");
        console.log("✅ Video already cached and ready!");

        console.log("🔄 Setting final progress to 100%...");
        setDownloadProgress(100);
        console.log("✅ setDownloadProgress(100) completed for cached video");

        console.log("🔄 Setting playback rate...");
        videoElement.playbackRate = playbackRate;
        console.log("✅ Playback rate set to:", playbackRate);

        console.log("🔄 Starting video playback...");
        await videoElement.play();
        console.log("✅ Video playback started");

        console.log("🔄 Setting loaded state...");
        setLoaded(true);
        setPlaying(true);
        console.log("✅ States updated - loading complete!");

        return;
      } else {
        console.log(
          "📊 Partial buffer detected, starting progress tracking..."
        );
        console.log("🔄 Setting initial progress...");
        setDownloadProgress(Math.round(initialProgress));
        console.log(
          `✅ Initial progress set to: ${Math.round(initialProgress)}%`
        );
      }
    } else {
      console.log("⚠️ No buffered data found, will track from 0%");
    }

    // STEP 3: Start aggressive progress tracking
    console.log("=== STEP 3: STARTING PROGRESS TRACKING ===");
    let progressUpdateCount = 0;
    let isCompleted = false;

    const progressTracker = setInterval(() => {
      if (isCompleted) {
        console.log(
          "🛑 Progress tracking already completed, clearing interval"
        );
        clearInterval(progressTracker);
        return;
      }

      progressUpdateCount++;
      console.log(`=== PROGRESS CHECK #${progressUpdateCount} ===`);

      try {
        const currentBuffered = videoElement.buffered;
        console.log("🔍 Current buffered.length:", currentBuffered.length);
        console.log("🔍 Current duration:", videoElement.duration);
        console.log("🔍 Current readyState:", videoElement.readyState);
        console.log("🔍 Current networkState:", videoElement.networkState);

        if (
          currentBuffered.length > 0 &&
          !isNaN(videoElement.duration) &&
          videoElement.duration > 0
        ) {
          const currentDownloaded = currentBuffered.end(
            currentBuffered.length - 1
          );
          const currentTotal = videoElement.duration;
          const currentProgress = Math.min(
            (currentDownloaded / currentTotal) * 100,
            100
          );

          console.log(
            `📥 PROGRESS: ${currentDownloaded.toFixed(
              2
            )}/${currentTotal.toFixed(2)}s = ${currentProgress.toFixed(1)}%`
          );

          console.log(
            `🔄 Updating progress to ${Math.round(currentProgress)}%...`
          );
          setDownloadProgress(Math.round(currentProgress));
          console.log(
            `✅ setDownloadProgress(${Math.round(currentProgress)}) completed`
          );

          // Check if threshold reached
          if (currentProgress >= downloadThreshold) {
            console.log("=== DOWNLOAD THRESHOLD REACHED ===");
            console.log(
              `🎯 Threshold ${downloadThreshold}% reached with ${currentProgress.toFixed(
                1
              )}%`
            );

            isCompleted = true;
            clearInterval(progressTracker);

            // Complete the loading process
            setTimeout(async () => {
              try {
                console.log("🔄 Finalizing video loading...");
                setDownloadProgress(100);
                console.log("✅ Final progress set to 100%");

                videoElement.playbackRate = playbackRate;
                console.log("✅ Playback rate set");

                await videoElement.play();
                console.log("✅ Video playback started");

                setLoaded(true);
                setPlaying(true);
                console.log("✅ All states updated - LOADING COMPLETE!");
              } catch (playError) {
                console.error("❌ Playback error:", playError);
                setLoaded(true); // Still mark as loaded
                setError("Auto-play prevented");
              }
            }, 100);
            return;
          }
        } else {
          console.log("⚠️ No valid buffered data or duration not available");
          console.log("🔍 Buffered length:", currentBuffered.length);
          console.log("🔍 Duration:", videoElement.duration);
          console.log("🔍 Duration isNaN:", isNaN(videoElement.duration));

          // Fallback: Check readyState for immediate availability
          if (videoElement.readyState >= 3) {
            // HAVE_FUTURE_DATA or higher
            console.log("=== READYSTATE FALLBACK TRIGGERED ===");
            console.log("🚀 ReadyState indicates sufficient data loaded");

            isCompleted = true;
            clearInterval(progressTracker);

            setTimeout(async () => {
              try {
                setDownloadProgress(100);
                videoElement.playbackRate = playbackRate;
                await videoElement.play();
                setLoaded(true);
                setPlaying(true);
                console.log("✅ Video started via readyState fallback!");
              } catch (playError) {
                console.error("❌ Playback error in fallback:", playError);
                setLoaded(true);
                setError("Auto-play prevented");
              }
            }, 100);
            return;
          }
        }

        // Safety timeout
        if (progressUpdateCount >= 300) {
          // 15 seconds max
          console.warn("=== PROGRESS TRACKING TIMEOUT ===");
          console.warn("⏰ Progress tracking timeout after 15 seconds!");

          isCompleted = true;
          clearInterval(progressTracker);
          setDownloadProgress(100);
          setLoaded(true);
          setError("Loading timeout - proceeding anyway");
          return;
        }
      } catch (progressError) {
        console.error(
          "❌ Error in progress tracking iteration:",
          progressError
        );
        if (progressError instanceof Error) {
          console.error("❌ Error stack:", progressError.stack);
        }
      }
    }, 50); // Check every 50ms for smooth updates

    console.log(
      "⏳ Progress tracker started successfully, waiting for completion..."
    );
  } catch (error) {
    console.error("❌ CRITICAL ERROR in handleVideoLoading:", error);
    if (error instanceof Error) {
      console.error("❌ Error stack:", error.stack);
    }

    // Emergency fallback
    try {
      const emergencyStore = useVideoStore.getState();
      emergencyStore.setDownloadProgress(100);
      emergencyStore.setLoaded(true);
      emergencyStore.setError("Loading error - emergency fallback");
      console.log("🚨 Emergency fallback executed");
    } catch (emergencyError) {
      console.error("❌ Emergency fallback also failed:", emergencyError);
    }

    throw error;
  }
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
