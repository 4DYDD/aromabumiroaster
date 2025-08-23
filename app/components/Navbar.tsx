"use client";

import { usePathname } from "next/navigation";
import LineTabs from "./SyntaxUI/LineTabs";
import { useHeroAnimationStore } from "../store/heroAnimationStore";
import { useEffect } from "react";

interface NavbarProps {
  notRoot: boolean;
}

export default function Navbar({ notRoot }: NavbarProps) {
  const pathname = usePathname();
  const { hasAnimated, isAnimating, startAnimation } = useHeroAnimationStore();

  useEffect(() => {
    // Gunakan startAnimation dari store yang mengembalikan cleanup function
    const cleanup = startAnimation(pathname);

    return cleanup; // Cleanup timeout saat component unmount atau pathname berubah
  }, [pathname, startAnimation]);

  return (
    <div
      className={`fixed top-0 left-0 w-full transform z-50 
      ${isAnimating ? "pointer-events-none" : "pointer-events-auto"}
    `}
    >
      <LineTabs
        hasAnimated={hasAnimated}
        pathname={pathname}
        notRoot={notRoot}
      />
    </div>
  );
}
