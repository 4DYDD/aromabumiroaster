"use client";

import { motion } from "../components/FramerMotionClient";
import { useHeroAnimationStore } from "../store/heroAnimationStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function AnimatedNavbar() {
  const pathname = usePathname();
  const { setCurrentPathname, getShouldSkipAnimation } =
    useHeroAnimationStore();

  useEffect(() => {
    // Update pathname di store dan let store handle logic
    setCurrentPathname(pathname);
  }, [pathname, setCurrentPathname]);

  // Get skip animation status dari store
  const skipAnimation = getShouldSkipAnimation(pathname);

  // Jika bukan homepage, render static navbar
  if (pathname !== "/") {
    return <Navbar pathname={pathname} />;
  }

  // Untuk homepage, render dengan animasi
  return (
    <motion.div
      initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        skipAnimation
          ? { duration: 0 }
          : {
              duration: 2.0,
              ease: "easeOut",
              delay: 4, // Mulai setelah ButtonHoverTopFlip selesai
            }
      }
    >
      <Navbar pathname={pathname} />
    </motion.div>
  );
}
