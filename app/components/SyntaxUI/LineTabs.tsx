import {
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";

import { cn } from "../../../lib/utils";
import Tab from "./Tab";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Order", href: "/order", icon: FaShoppingCart },
  { name: "About", href: "/about", icon: FaInfoCircle },
  { name: "Contact", href: "/contact", icon: FaEnvelope },
];

interface LineTabProps {
  hasAnimated: boolean;
  pathname: string;
  notRoot: boolean;
  center?: boolean;
  className?: string; // Tambahkan className sebagai properti opsional
}

const LineTabs = ({
  hasAnimated,
  pathname,
  notRoot,
  center,
  className,
}: LineTabProps) => {
  // Render interactive version setelah client hydrated
  return (
    <motion.div
      initial={notRoot || hasAnimated ? undefined : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        notRoot || hasAnimated
          ? undefined
          : { duration: 1, ease: "easeOut", delay: 3 }
      }
      className={cn(
        "flexc gap-1 lg:gap-3 relative pt-3.5",
        center && "justify-center",
        className
      )}
    >
      {navLinks.map((link, index) => (
        <Tab
          text={link.name}
          selected={pathname === link.href}
          goTo={link.href}
          icon={link.icon}
          key={index}
          notRoot={notRoot}
        />
      ))}
    </motion.div>
  );
};

export default LineTabs;
