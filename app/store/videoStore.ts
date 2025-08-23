import { create } from "zustand";

interface VideoState {
  isLoaded: boolean;
  isPlaying: boolean;
  loadingError: string | null;
  downloadProgress: number; // 0-100 percentage
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

  setLoaded: (value) => set({ isLoaded: value }),
  setPlaying: (value) => set({ isPlaying: value }),
  setError: (error) => set({ loadingError: error }),
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),

  resetVideo: () =>
    set({
      isLoaded: false,
      isPlaying: false,
      loadingError: null,
      downloadProgress: 0,
    }),
}));

// Convenience hooks untuk penggunaan yang lebih mudah
export const useVideoLoaded = () => useVideoStore((state) => state.isLoaded);
export const useVideoPlaying = () => useVideoStore((state) => state.isPlaying);
export const useVideoError = () => useVideoStore((state) => state.loadingError);
export const useVideoProgress = () =>
  useVideoStore((state) => state.downloadProgress);
