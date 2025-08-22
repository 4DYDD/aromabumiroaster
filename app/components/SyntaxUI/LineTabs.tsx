"use client";

import {
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { cn } from "../../../lib/utils";
import { motion } from "../FramerMotionClient";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Order", href: "/order", icon: FaShoppingCart },
  { name: "About", href: "/about", icon: FaInfoCircle },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
];

interface TabProps {
  text: string;
  selected: boolean;
  goTo: string;
  customID?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Tab = ({ text, selected, goTo, customID, icon: Icon }: TabProps) => {
  const router = useRouter();

  const handleTabClick = () => {
    router.push(goTo);
  };

  return (
    <button
      onClick={handleTabClick}
      className={` ${
        selected
          ? "text-secondary/80"
          : " hover:text-gray-900 dark:hover:text-gray-100"
      } relative flexcc rounded-md w-[4rem] h-[4.2rem] text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-red-500/50 flex items-center gap-2`}
    >
      <Icon className="h-5 w-5 relative" />
      <span className="relative">{text}</span>
      {selected && (
        <motion.div
          className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center"
          layoutId={customID + "linetab"}
          transition={{ type: "spring", duration: 0.4, bounce: 0, delay: 0.1 }}
        >
          <span className="z-0 h-[3px] w-[60%] rounded-t-full bg-secondary/80"></span>
        </motion.div>
      )}
    </button>
  );
};

interface LineTabProps {
  center?: boolean;
  customID?: string;
  className?: string; // Tambahkan className sebagai properti opsional
}

const LineTabs = ({ center, customID, className }: LineTabProps) => {
  const pathname = usePathname();

  const getCurrentPage = () => {
    const currentLink = navLinks.find((link) => link.href === pathname);
    return currentLink ? currentLink.name : navLinks[0].name;
  };

  const [selected, setSelected] = useState<string>(getCurrentPage());

  useEffect(() => {
    const currentLink = navLinks.find((link) => link.href === pathname);
    const currentPage = currentLink ? currentLink.name : navLinks[0].name;
    setSelected(currentPage);
  }, [pathname]);

  return (
    <div
      className={cn(
        "mb-2 flexc gap-2 border-b border-gray-200 dark:border-secondary/80",
        center && "justify-center",
        className // Tambahkan className di sini
      )}
    >
      {navLinks.map((link) => (
        <Tab
          text={link.name}
          selected={selected === link.name}
          goTo={link.href}
          icon={link.icon}
          key={link.name}
          customID={customID}
        />
      ))}
    </div>
  );
};

export default LineTabs;
