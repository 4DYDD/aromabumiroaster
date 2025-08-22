"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeroAnimationContextType {
  hasAnimated: boolean;
  setHasAnimated: (value: boolean) => void;
  animationsComplete: boolean;
  setAnimationsComplete: (value: boolean) => void;
}

const HeroAnimationContext = createContext<
  HeroAnimationContextType | undefined
>(undefined);

interface HeroAnimationProviderProps {
  children: ReactNode;
}

export const HeroAnimationProvider = ({
  children,
}: HeroAnimationProviderProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  return (
    <HeroAnimationContext.Provider
      value={{
        hasAnimated,
        setHasAnimated,
        animationsComplete,
        setAnimationsComplete,
      }}
    >
      {children}
    </HeroAnimationContext.Provider>
  );
};

export const useHeroAnimation = () => {
  const context = useContext(HeroAnimationContext);
  if (context === undefined) {
    throw new Error(
      "useHeroAnimation must be used within a HeroAnimationProvider"
    );
  }
  return context;
};
