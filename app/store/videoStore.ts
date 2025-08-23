import { create } from "zustand";

interface VideoState {
  isLoaded: boolean;
  isPlaying: boolean;
  loadingError: string | null;
  downloadProgress: number; // 0-100 percentage
  isFullyDownloaded: boolean; // true when progress reaches 100%
  setLoaded: (value: boolean) => void;
  setPlaying: (value: boolean) => void;
  setError: (error: string | null) => void;
  setDownloadProgress: (progress: number) => void;
  resetVideo: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  isLoaded: false,
  isPlaying: false,
  loadingError: null,
  downloadProgress: 0,
  isFullyDownloaded: false,

  setLoaded: (value) => set({ isLoaded: value }),
  setPlaying: (value) => set({ isPlaying: value }),
  setError: (error) => set({ loadingError: error }),
  setDownloadProgress: (progress) =>
    set({
      downloadProgress: progress,
      isFullyDownloaded: progress >= 100,
    }),

  resetVideo: () =>
    set({
      isLoaded: false,
      isPlaying: false,
      loadingError: null,
      downloadProgress: 0,
      isFullyDownloaded: false,
    }),
}));

// Convenience hooks untuk penggunaan yang lebih mudah
export const useVideoLoaded = () => useVideoStore((state) => state.isLoaded);
export const useVideoPlaying = () => useVideoStore((state) => state.isPlaying);
export const useVideoError = () => useVideoStore((state) => state.loadingError);
export const useVideoProgress = () =>
  useVideoStore((state) => state.downloadProgress);
export const useVideoFullyDownloaded = () =>
  useVideoStore((state) => state.isFullyDownloaded);

// Hook untuk mengecek apakah perlu tampil loading screen
export const useNeedLoadingScreen = () => {
  return useVideoStore(
    (state) => !state.isLoaded && state.downloadProgress < 100
  );
};
