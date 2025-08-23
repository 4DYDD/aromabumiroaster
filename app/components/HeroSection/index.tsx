"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ButtonHoverTopFlip from "../UILayouts/ButtonHoverTopFlip";
import { useHeroAnimationStore } from "../../store/heroAnimationStore";

const HeroSection = () => {
  const {
    hasAnimated,
    animationsComplete,
    setHasAnimated,
    setAnimationsComplete,
  } = useHeroAnimationStore();

  const videoRef = useRef<HTMLVideoElement>(null);

  // Menghitung durasi animasi terpanjang + delay
  // ButtonHoverTopFlip: delay 2.6s + duration 2.6s = 5.2s total
  const longestAnimationTime = 5200; // 5.2 detik dalam milidetik

  // Simple video handler - langsung play aja tanpa ribet
  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.3; // Tetap percepat dikit
      videoRef.current.play().catch(() => {
        // Kalau gagal autoplay ya sudah, santai aja
        console.log("Autoplay prevented, but that's okay 😊");
      });
    }
  };

  useEffect(() => {
    if (!hasAnimated) {
      // Jalankan animasi untuk pertama kali
      const timer = setTimeout(() => {
        setAnimationsComplete(true);
        setHasAnimated(true);
      }, longestAnimationTime);

      return () => clearTimeout(timer);
    } else {
      // Animasi sudah pernah dijalankan, langsung set ke state selesai
      setAnimationsComplete(true);
    }
  }, [
    hasAnimated,
    setAnimationsComplete,
    setHasAnimated,
    longestAnimationTime,
  ]);

  return (
    <>
      <section className="h-[100vh] w-full bg-red-500">
        <main className="w-full h-full relative overflow-hidden">
          <div className="atranscenter w-[100%] h-[100%] bg-primary z-[1]">
            <video
              ref={videoRef}
              src="/video/falling_coffee_beans.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={handleVideoCanPlay} // Simple handler
              onLoadStart={() => {
                console.log("Video started loading... 🎬");
              }}
              onError={(e) => {
                console.log("Video error, but let's keep going! 😅", e);
              }}
              className="object-cover h-full w-full relative pointer-events-none select-none"
              style={{
                opacity: 1,
                transition: "none",
              }}
            />
          </div>

          <motion.div
            className="z-[5] relative w-full h-full flexcc text-white"
            initial={
              hasAnimated
                ? { backgroundColor: "rgba(0, 0, 0, 0.6)" }
                : { backgroundColor: "rgba(0, 0, 0, 1)" }
            }
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            transition={
              hasAnimated
                ? { duration: 0 }
                : { duration: 2.2, ease: "easeOut", delay: 0.8 }
            }
          >
            {/* Animation Overlay - hanya mencegah interaksi dengan konten, bukan video */}
            {!animationsComplete && (
              <div className="absolute inset-0 z-[999] bg-transparent cursor-wait pointer-events-auto" />
            )}
            <motion.h1
              className="font-bold font-playfair text-[1.6rem] lg:text-6xl mb-3 uppercase text-secondary/90"
              initial={
                hasAnimated
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={
                hasAnimated
                  ? { duration: 0 }
                  : {
                      duration: 3,
                      times: [0, 1], // Perbaikan: nilai harus antara 0-1
                      ease: "easeOut",
                    }
              }
            >
              Aroma Bumi Roasters
            </motion.h1>
            <motion.h2
              className="font-semibold text-[0.9rem] lg:text-[1.3rem] px-16 mb-8 text-secondary/70"
              initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                hasAnimated
                  ? { duration: 0 }
                  : { duration: 2.8, ease: "easeOut", delay: 1.5 }
              }
            >
              Crafting the Perfect Cup of Indonesian Coffee
            </motion.h2>

            <ButtonHoverTopFlip skipAnimation={hasAnimated} />
          </motion.div>
        </main>
      </section>
    </>
  );
};

export default HeroSection;
