"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "./FramerMotionClient";
import { FaCoffee } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Order", href: "/order" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <FaCoffee className="h-8 w-8 text-yellow-900 mr-2" />
          <h1 className="text-2xl font-bold text-yellow-900">
            Aroma Bumi Roasters
          </h1>
        </Link>
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`py-2 px-3 rounded-lg text-gray-700 hover:text-yellow-900 relative ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-900"
                    layoutId="underline"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
