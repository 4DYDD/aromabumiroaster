import {
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";

// Data navigasi yang sama dengan LineTabs
const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Order (developed)", href: "/", icon: FaShoppingCart },
  { name: "About (developed)", href: "/", icon: FaInfoCircle },
  { name: "Contact (developed)", href: "/", icon: FaEnvelope },
];

interface OptionProps {
  text: string;
  Icon: IconType;
  href: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  isDisabled: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
}

const StaggeredDropDown = () => {
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fungsi toggle yang aman dengan debouncing
  const handleToggle = () => {
    // Jika sedang animasi, ignore click
    if (isAnimating) return;

    // Set flag animasi sedang berjalan
    setIsAnimating(true);

    // Toggle state
    setOpen((prev) => !prev);

    // Clear timeout sebelumnya jika ada
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Set timeout berdasarkan durasi animasi terpanjang
    // Durasi total: wrapper (0.15s) + stagger (0.03s * 4 items) = ~0.27s
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Buffer 50ms tambahan untuk keamanan
  };

  // Cleanup timeout saat component unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flexc">
      <motion.div animate={open ? "open" : "closed"} className="relative w-48">
        <button
          onClick={handleToggle}
          disabled={isAnimating} // Disable button saat animasi
          className={`flexc gap-2 w-32 py-2.5 rounded-md font-bold text-secondary border border-secondary/30 transition-colors ease-in-out duration-300 ${
            isAnimating ? "cursor-wait opacity-70" : "cursor-pointer"
          }`}
        >
          <span className="text-sm ps-1">Navigation</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-3 p-3 rounded-lg border border-secondary/30 shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          {navLinks.map((link) => {
            const isDisabled = link.name.includes("(developed)");
            return (
              <Option
                key={link.name}
                setOpen={setOpen}
                Icon={link.icon}
                text={link.name}
                href={link.href}
                isDisabled={isDisabled}
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
              />
            );
          })}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  href,
  setOpen,
  isDisabled,
  isAnimating,
  setIsAnimating,
}: OptionProps) => {
  const router = useRouter();

  const handleClick = () => {
    // Jika sedang animasi, ignore click
    if (isAnimating) return;

    // Set animating state
    setIsAnimating(true);

    // Tutup dropdown
    setOpen(false);

    // Navigate to href
    router.push(href);

    // Reset animating state setelah animasi selesai
    setTimeout(() => {
      setIsAnimating(false);
    }, 200); // Durasi untuk menutup dropdown
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={isDisabled ? undefined : handleClick}
      className={`flex items-center gap-2 w-full border-l border-secondary/30 hover:border-secondary/50 px-3 py-2 text-xs font-medium whitespace-nowrap text-secondary/90 hover:text-white transall 
        ${isAnimating ? "cursor-wait pointer-events-none" : "cursor-pointer"} 
        ${isDisabled ? "cursor-not-allowed !text-secondary/60" : "clicked"}`}
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.03, // Dipercepat dari 0.1 ke 0.03
      duration: 0.15, // Tambah durasi cepat untuk wrapper
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02, // Dipercepat dari 0.1 ke 0.02
      duration: 0.1, // Durasi cepat untuk menutup
    },
  },
};

const iconVariants = {
  open: {
    rotate: 180,
    transition: { duration: 0.2 }, // Percepat rotasi icon
  },
  closed: {
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren" as const,
      duration: 0.15, // Percepat item muncul
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren" as const,
      duration: 0.1, // Percepat item hilang
    },
  },
};

const actionIconVariants = {
  open: {
    scale: 1,
    y: 0,
    transition: { duration: 0.1 }, // Percepat icon action
  },
  closed: {
    scale: 0,
    y: -7,
    transition: { duration: 0.08 }, // Lebih cepat saat menutup
  },
};
