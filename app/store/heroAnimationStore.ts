import { create } from "zustand";

interface HeroAnimationState {
  hasAnimated: boolean;
  animationsComplete: boolean;
  setHasAnimated: (value: boolean) => void;
  setAnimationsComplete: (value: boolean) => void;
  resetAnimations: () => void;
}

export const useHeroAnimationStore = create<HeroAnimationState>((set) => ({
  hasAnimated: false,
  animationsComplete: false,
  setHasAnimated: (value) => set({ hasAnimated: value }),
  setAnimationsComplete: (value) => set({ animationsComplete: value }),
  resetAnimations: () => set({ hasAnimated: false, animationsComplete: false }),
}));
