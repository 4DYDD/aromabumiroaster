"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaShoppingCart,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Order", href: "/order", icon: FaShoppingCart },
  { name: "About", href: "/about", icon: FaInfoCircle },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className="bg-black shadow-lg rounded px-6 py-3 border border-white/30"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: [100, 10, 0], // 0% -> 60% -> 100%
          opacity: [0, 0.4, 1], // 0% -> 40% -> 100%
        }}
        transition={{
          duration: 2.5,
          delay: 1.6,
          times: [0, 0.5, 1], // Timing untuk setiap keyframe
          ease: "easeOut",
        }}
      >
        <div className="flex items-center space-x-8">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;

            return (
              <Link href={link.href} key={link.name} className="relative group">
                <motion.div
                  className={`flexcc px-2 py-1 lg:px-5 lg:py-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 3 + index * 0.4, // Staggered animation dengan delay berurutan
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background circle for active state */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[var(--accent)]/20 rounded-full" />
                  )}

                  {/* Icon */}
                  <IconComponent className="h-5 w-5 mb-1 relative z-10" />

                  {/* Label */}
                  <span className="text-xs font-medium relative z-10">
                    {link.name}
                  </span>

                  {/* Tooltip for better UX */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {link.name}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}
