"use client";

import { motion } from "framer-motion";
import LineTabs from "./SyntaxUI/LineTabs";
import StaggeredDropDown from "./HoverDev/StaggeredDropDown";

export default function Navbar() {
  return (
    <nav className="fixed top-[0%] left-[32%] transform -translate-x-1/2 z-50">
      {/* <motion.div
        className="shadow-lg rounded px-6 py-3 border border-white/5 backdrop-blur-xs"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: [100, 0], // 0% -> 60% -> 100%
          opacity: [0, 1], // 0% -> 30% -> 100%
        }}
        transition={{
          duration: 2.5,
          delay: 1.6,
          times: [0, 1], // Timing untuk setiap keyframe
          ease: "easeOut",
        }}
      >
        <LineTabs />
      </motion.div> */}

      <StaggeredDropDown />
    </nav>
  );
}
