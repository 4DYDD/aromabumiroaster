"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PulseLoader, ScaleLoader } from "react-spinners";
import ButtonHoverTopFlip from "../UILayouts/ButtonHoverTopFlip";
import { useHeroAnimationStore } from "../../store/heroAnimationStore";
import { useVideoStore } from "../../store/videoStore";

const HeroSection = () => {
  // State untuk device detection yang hydration-safe
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // Animasi store
  const {
    hasAnimated,
    animationsComplete,
    setHasAnimated,
    setAnimationsComplete,
  } = useHeroAnimationStore();

  // Video store untuk menyimpan progress dan status
  const {
    videoSource,
    isLoaded: isVideoReady,
    downloadProgress: progress,
    setLoaded: setIsVideoReady,
    setDownloadProgress: setProgress,
    setError,
  } = useVideoStore();

  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect untuk device detection yang hydration-safe
  useEffect(() => {
    setIsClient(true);

    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // handle video loading
  useEffect(() => {
    // Jika video sudah pernah dimuat, skip loading
    if (isVideoReady) {
      return;
    }

    console.log(
      `🎬 Loading Full HD video for ${
        isMobile ? "mobile" : "desktop"
      }: ${videoSource}`
    );

    const loadVideoWithProgress = async () => {
      try {
        const response = await fetch(videoSource);
        const contentLength = response.headers.get("content-length");
        console.log({ contentLength, videoSource });
        if (!contentLength) throw new Error("Content-Length header missing");

        const total = parseInt(contentLength, 10);
        let loaded = 0;

        const reader = response.body?.getReader();
        if (!reader) throw new Error("ReadableStream not supported");

        const chunks: Uint8Array[] = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            loaded += value.length;
            setProgress(Math.floor((loaded / total) * 100));
          }
        }

        // Gabungkan semua chunks jadi blob
        const blob = new Blob(chunks as BlobPart[], { type: "video/mp4" });
        const objectURL = URL.createObjectURL(blob);

        // Tempel ke video
        if (videoRef.current) {
          videoRef.current.src = objectURL;
        }

        // Tambahkan delay minimal
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsVideoReady(true);
        console.log(`✅ Full HD video loaded successfully`);
      } catch (err) {
        console.error("Error loading video:", err);
        setError(err instanceof Error ? err.message : "Video loading failed");

        // Fallback: tetap set ready agar user tidak stuck
        if (!animationsComplete) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setIsVideoReady(true);
      }
    };

    loadVideoWithProgress();
    // setIsVideoReady(true);
  }, [
    isVideoReady,
    setProgress,
    setIsVideoReady,
    setError,
    animationsComplete,
    videoSource,
    isMobile,
  ]);

  // Durasi animasi
  const longestAnimationTime = 5200;

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.3;
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setAnimationsComplete(true);
        setHasAnimated(true);
      }, longestAnimationTime);
      return () => clearTimeout(timer);
    } else {
      setAnimationsComplete(true);
    }
  }, [hasAnimated, setAnimationsComplete, setHasAnimated]);

  if (!isVideoReady) {
    return (
      <section className="h-[100vh] w-full flex flex-col items-center justify-center bg-primary_dark text-secondary px-6">
        {/* React Spinners DotLoader - seperti butiran kopi */}
        <ScaleLoader className="mb-5" color="#f0ebe3" speedMultiplier={0.8} />

        <div className="w-full max-w-[300px] mb-0">
          <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-base font-bold gap-1 antialiased flexc !items-end">
            <span>Loading video for background</span>
            <PulseLoader
              className="mb-1"
              color="#f0ebe3"
              size={4}
              speedMultiplier={0.8}
            />
          </div>
        </div>

        <div className="text-center mt-2 text-xs text-secondary/70 animate-pulseku">
          <div>
            • {isClient ? (isMobile ? "Mobile" : "Desktop") : "Loading"}{" "}
            optimized •
          </div>
          <div>Preparing your premium coffee journey </div>
        </div>
      </section>
    );
  }

  return (
    <section className="h-[100vh] w-full">
      <main className="w-full h-full relative overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 bg-primary z-[1]">
          {/* VIDEO FULL HD */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={handleVideoCanPlay}
            src={videoSource}
            className="object-cover h-full w-full pointer-events-none select-none"
          />
        </div>

        <motion.div
          className="z-[5] relative w-full h-full flexcc text-white"
          initial={
            hasAnimated
              ? isClient && isMobile
                ? { backgroundColor: "rgba(0, 0, 0, 0.5)" }
                : { backgroundColor: "rgba(0, 0, 0, 0.2)" }
              : { backgroundColor: "rgba(0, 0, 0, 1)" }
          }
          animate={
            isClient && isMobile
              ? { backgroundColor: "rgba(0, 0, 0, 0.5)" }
              : { backgroundColor: "rgba(0, 0, 0, 0.2)" }
          }
          transition={
            hasAnimated
              ? { duration: 0 }
              : { duration: 2.2, ease: "easeOut", delay: 0.8 }
          }
        >
          {!animationsComplete && (
            <div className="absolute inset-0 z-[999] bg-transparent cursor-wait pointer-events-auto" />
          )}
          <motion.h1
            className="font-bold font-playfair text-[1.6rem] lg:text-6xl mb-3 text-secondary/90"
            initial={
              hasAnimated
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={
              hasAnimated ? { duration: 0 } : { duration: 3, ease: "easeOut" }
            }
          >
            AROMA BUMI ROASTERS
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
  );
};

export default HeroSection;
