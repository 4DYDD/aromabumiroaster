import { create } from "zustand";

interface HeroAnimationState {
  hasAnimated: boolean;
  animationsComplete: boolean;
  animateDuration: number;
  currentPathname: string;
  shouldSkipAnimation: boolean;
  isAnimating: boolean;
  setHasAnimated: (value: boolean) => void;
  setAnimationsComplete: (value: boolean) => void;
  setCurrentPathname: (pathname: string) => void;
  setIsAnimating: (value: boolean) => void;
  startAnimation: (pathname: string) => void;
  resetAnimations: () => void;
  getShouldSkipAnimation: (pathname: string) => boolean;
}

export const useHeroAnimationStore = create<HeroAnimationState>((set, get) => ({
  hasAnimated: false,
  animationsComplete: false,
  animateDuration: 3000,
  currentPathname: "",
  shouldSkipAnimation: false, // Default false untuk homepage animation
  isAnimating: false,

  setHasAnimated: (value) => set({ hasAnimated: value }),
  setAnimationsComplete: (value) => set({ animationsComplete: value }),
  setIsAnimating: (value) => set({ isAnimating: value }),

  startAnimation: (pathname) => {
    const state = get();
    let timeout: NodeJS.Timeout;

    if (!state.hasAnimated && pathname === "/") {
      set({ isAnimating: true });

      timeout = setTimeout(() => {
        set({
          hasAnimated: true,
          isAnimating: false,
        });
      }, state.animateDuration);
    } else {
      set({ isAnimating: false });
    }

    // Return cleanup function
    return () => {
      clearTimeout(timeout);
    };
  },

  setCurrentPathname: (pathname) => {
    const state = get();

    console.log("=== Store setCurrentPathname ===");
    console.log("Input pathname:", pathname);
    console.log("Current hasAnimated:", state.hasAnimated);

    // Logic: Skip animation kecuali jika di homepage "/" DAN belum pernah animasi
    const shouldSkip = !(pathname === "/" && !state.hasAnimated);

    console.log("Calculated shouldSkip:", shouldSkip);
    console.log("Logic breakdown:");
    console.log("  pathname === '/':", pathname === "/");
    console.log("  !state.hasAnimated:", !state.hasAnimated);
    console.log(
      "  pathname === '/' && !state.hasAnimated:",
      pathname === "/" && !state.hasAnimated
    );
    console.log(
      "  !(pathname === '/' && !state.hasAnimated):",
      !(pathname === "/" && !state.hasAnimated)
    );

    set({
      currentPathname: pathname,
      shouldSkipAnimation: shouldSkip,
    });

    console.log("=== Store state updated ===");
  },

  resetAnimations: () =>
    set({
      hasAnimated: false,
      animationsComplete: false,
      shouldSkipAnimation: true,
      isAnimating: false,
    }),

  getShouldSkipAnimation: (pathname) => {
    const state = get();
    // Logic: Skip animation kecuali jika di homepage "/" DAN belum pernah animasi
    return !(pathname === "/" && !state.hasAnimated);
  },
}));
