"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LineTabs from "./SyntaxUI/LineTabs";
import { useHeroAnimationStore } from "../store/heroAnimationStore";

interface NavbarProps {
  notRoot: boolean;
}

export default function Navbar({ notRoot }: NavbarProps) {
  const pathname = usePathname();
  const { hasAnimated, isAnimating, startAnimation } = useHeroAnimationStore();

  // State untuk scroll detection
  const [isScrolled, setIsScrolled] = useState(false);

  // Tentukan apakah navbar perlu background
  const isHomePage = pathname === "/";
  const needBackground = notRoot || !isHomePage || isScrolled;

  useEffect(() => {
    // Gunakan startAnimation dari store yang mengembalikan cleanup function
    const cleanup = startAnimation(pathname);

    return cleanup; // Cleanup timeout saat component unmount atau pathname berubah
  }, [pathname, startAnimation]);

  // Scroll listener untuk detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80); // Threshold 80px untuk transisi yang lebih smooth
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full transform z-[100] transition-all duration-500 ease-out
      ${isAnimating ? "pointer-events-none" : "pointer-events-auto"}
      ${
        needBackground
          ? "bg-secondary/98 backdrop-blur-lg shadow-lg border-b border-primary_dark/10"
          : "bg-transparent border-b-transparent"
      }
    `}
    >
      <LineTabs
        hasAnimated={hasAnimated}
        pathname={pathname}
        notRoot={notRoot}
        needBackground={needBackground}
      />
    </div>
  );
}
