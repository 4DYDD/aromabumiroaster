import { create } from "zustand";

interface HeroAnimationState {
  hasAnimated: boolean;
  animationsComplete: boolean;
  currentPathname: string;
  shouldSkipAnimation: boolean;
  setHasAnimated: (value: boolean) => void;
  setAnimationsComplete: (value: boolean) => void;
  setCurrentPathname: (pathname: string) => void;
  resetAnimations: () => void;
  getShouldSkipAnimation: (pathname: string) => boolean;
}

export const useHeroAnimationStore = create<HeroAnimationState>((set, get) => ({
  hasAnimated: false,
  animationsComplete: false,
  currentPathname: "",
  shouldSkipAnimation: true, // Default true untuk safety

  setHasAnimated: (value) => set({ hasAnimated: value }),
  setAnimationsComplete: (value) => set({ animationsComplete: value }),

  setCurrentPathname: (pathname) => {
    const state = get();

    // Logic: Skip animation kecuali jika di homepage "/" DAN belum pernah animasi
    const shouldSkip = !(pathname === "/" && !state.hasAnimated);

    set({
      currentPathname: pathname,
      shouldSkipAnimation: shouldSkip,
    });
  },

  resetAnimations: () =>
    set({
      hasAnimated: false,
      animationsComplete: false,
      shouldSkipAnimation: true,
    }),

  getShouldSkipAnimation: (pathname) => {
    const state = get();
    // Logic: Skip animation kecuali jika di homepage "/" DAN belum pernah animasi
    return !(pathname === "/" && !state.hasAnimated);
  },
}));
