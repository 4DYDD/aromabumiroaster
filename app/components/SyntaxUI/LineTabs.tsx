import { FaCoffee, FaEnvelope, FaHome, FaInfoCircle } from "react-icons/fa";

import { cn } from "../../../lib/utils";
import Tab from "./Tab";
import CartTab from "./CartTab";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Menu", href: "/menu", icon: FaCoffee },
  { name: "About", href: "/about", icon: FaInfoCircle },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
];

interface LineTabProps {
  hasAnimated: boolean;
  pathname: string;
  notRoot: boolean;
  needBackground?: boolean; // Tambahkan prop untuk background detection
  center?: boolean;
  className?: string; // Tambahkan className sebagai properti opsional
}

const LineTabs = ({
  hasAnimated,
  pathname,
  notRoot,
  needBackground = false,
  center,
  className,
}: LineTabProps) => {
  // Render interactive version setelah client hydrated
  return (
    <div className="w-full flexc justify-center px-4 lg:px-8">
      {/* Navigation Tabs - Center aligned */}
      <motion.div
        initial={notRoot || hasAnimated ? undefined : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          notRoot || hasAnimated
            ? undefined
            : { duration: 1, ease: "easeOut", delay: 3 }
        }
        className={cn(
          "flexc gap-0.5 lg:gap-1 relative pt-3.5 justify-center",
          center && "justify-center",
          className
        )}
      >
        {navLinks.slice(0, 2).map((link, index) => (
          <Tab
            text={link.name}
            selected={pathname === link.href}
            goTo={link.href}
            icon={link.icon}
            key={index}
            needBackground={needBackground}
          />
        ))}

        {/* Cart Tab di tengah */}
        <CartTab needBackground={needBackground} hasAnimated={hasAnimated} />

        {navLinks.slice(2).map((link, index) => (
          <Tab
            text={link.name}
            selected={pathname === link.href}
            goTo={link.href}
            icon={link.icon}
            key={index + 2}
            needBackground={needBackground}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LineTabs;
