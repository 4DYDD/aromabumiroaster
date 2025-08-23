import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonHoverTopFlipProps {
  skipAnimation?: boolean;
}

const ButtonHoverTopFlip = ({
  skipAnimation = false,
}: ButtonHoverTopFlipProps) => {
  return (
    <>
      <motion.div
        initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          skipAnimation
            ? { duration: 0 }
            : {
                duration: 2.6,
                ease: "easeOut",
                delay: 2.6,
              }
        }
      >
        <Link
          href="#product-list"
          className="group clicked !duration-200 relative text-[0.9rem] lg:text-[1.1rem] font-bold inline-flex h-12 w-[160px] lg:w-[220px] items-center justify-center overflow-hidden rounded-md border-2 border-secondary"
        >
          <div
            className="
          inline-flex
          h-12
          w-full
          translate-y-0
          items-center
          justify-center
          text-secondary
          transition
          active:bg-secondary 
          active:text-primary 
          lg:group-hover:opacity-0
          opacity-100
          lg:group-hover:-translate-y-[150%]"
          >
            Explore Our Beans
          </div>
          <div
            className="
          absolute
          inline-flex
          h-12
          w-full
          translate-y-[100%]
          items-center
          justify-center
          bg-secondary
          text-primary
          transition
          duration-300
          lg:group-hover:opacity-100
          lg:group-hover:translate-y-0"
          >
            Discover the Flavors
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default ButtonHoverTopFlip;
