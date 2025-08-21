import React, { useState } from "react";
import { motion, AnimatePresence } from "../FramerMotionClient";

/**
 * Props for the FillUp button component.
 * Extends standard HTML button attributes.
 */
interface FillUpProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text to display when the button is not hovered. */
  primaryText: string;
  /** The text to display when the button is hovered. */
  hoverText: string;
}

/**
 * A button component with a "fill up" animation on hover and text transition.
 * The effect is created using Tailwind CSS utilities by animating an inset box-shadow.
 * Text transitions are handled by Framer Motion with fade effects.
 *
 * @param {FillUpProps} props - The props for the component.
 * @returns {JSX.Element} The rendered button component.
 */
const FillUp: React.FC<FillUpProps> = ({
  primaryText,
  hoverText,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // A helper to combine and clean up Tailwind classes.
  const combineClasses = (...classes: (string | undefined | null)[]) =>
    classes.filter(Boolean).join(" ").replace(/\s+/g, " ");

  const buttonClasses = combineClasses(
    // --- Base Styles ---
    "m-2 px-2 py-1 lg:px-8 lg:py-3", // Margin and padding
    "border-2 border-secondary", // Border color
    "bg-transparent", // Start with a transparent background
    "font-semibold text-sm lg:text-base text-secondary", // Text styling
    "relative overflow-hidden", // Needed for effects that might overflow
    "min-h-[3.5rem]", // Minimum height to prevent layout shift

    // --- Transition ---
    "transition-all duration-300 ease-out", // Smooth transition for all properties

    // --- Fill-Up Effect (using box-shadow) ---
    // Initial state: no inset shadow. The shadow will animate from this state.
    "shadow-[inset_0_0_0_0_var(--color-secondary)]",

    // Hover state: Animate an inset shadow from the bottom to fill the button.
    // A negative Y-offset on an inset shadow makes it come from the bottom.
    // The size (e.g., -4em) should be large enough to cover the button's height.
    "hover:shadow-[inset_0_-4em_0_0_var(--color-secondary)]",

    // --- Text and Border Color on Hover ---
    "hover:text-primary", // Change text color to black on hover for contrast with secondary fill
    "hover:border-secondary", // Change border color to secondary on hover

    // Allow for additional classes to be passed in
    className
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 2.6,
        ease: "easeOut",
        delay: 2.6,
      }}
    >
      <button
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isHovered ? "hover" : "primary"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.1,
              ease: "linear",
            }}
            className="block"
          >
            {isHovered ? hoverText : primaryText}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default FillUp;
