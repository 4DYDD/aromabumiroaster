import React from "react";
import FillUp from "../Buttons/FillUp";
import { motion } from "../FramerMotionClient";

const HeroSection = () => {
  return (
    <>
      <section className="h-[100dvh] w-full bg-red-500">
        <main className="w-full h-full bg-teal-500 relative overflow-hidden">
          <div className="atranscenter w-[130%] h-[130%] bg-blue-700 z-[1]">
            <video
              src="/video/Video_Biji_Kopi_Jatuh_Slow_Motion.mp4"
              autoPlay
              loop
              muted
              className="object-cover h-full relative"
            />
          </div>

          <motion.div
            className="z-[2] relative w-full h-full flexcc text-white"
            initial={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.8 }}
          >
            <motion.h1
              className="font-bold text-[1.6rem] lg:text-6xl mb-2.5 uppercase text-secondary/90"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: [0, 1],
                scale: [0.95, 1],
              }}
              transition={{
                duration: 3,
                times: [0, 1], // Perbaikan: nilai harus antara 0-1
                ease: "easeOut",
              }}
            >
              Aroma Bumi Roasters
            </motion.h1>
            <motion.h2
              className="font-semibold text-[0.9rem] lg:text-[1.2rem] px-14 mb-5 text-secondary/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.8, ease: "easeOut", delay: 1.5 }}
            >
              Crafting the Perfect Cup of Indonesian Coffee
            </motion.h2>
            <FillUp
              primaryText="Explore Our Beans"
              hoverText="Discover the Flavors"
              className="w-[170px] !lg:w-[220px] transall rounded cursor-pointer"
            />
          </motion.div>
        </main>
      </section>
    </>
  );
};

export default HeroSection;
