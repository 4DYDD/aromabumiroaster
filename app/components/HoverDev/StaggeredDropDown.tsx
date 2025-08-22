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
import { useRouter, usePathname } from "next/navigation";
import { useHeroAnimationStore } from "../../store/heroAnimationStore";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getShouldSkipAnimation, setCurrentPathname } =
    useHeroAnimationStore();
  const pathname = usePathname();

  useEffect(() => {
    // Update pathname di store
    setCurrentPathname(pathname);
  }, [pathname, setCurrentPathname]);

  // Gunakan store logic untuk skip animation
  const skipAnimation = getShouldSkipAnimation(pathname);

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

  // Handle click outside untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika dropdown sedang tertutup atau sedang animasi, tidak perlu handle
      if (!open || isAnimating) return;

      // Jika click terjadi di luar dropdown element
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Set animating state
        setIsAnimating(true);

        // Tutup dropdown
        setOpen(false);

        // Clear timeout sebelumnya jika ada
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        // Reset animating state setelah animasi selesai
        animationTimeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 200); // Durasi untuk menutup dropdown
      }
    };

    // Tambahkan event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, isAnimating]); // Dependencies: open dan isAnimating

  return (
    <motion.div
      ref={dropdownRef}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flexc"
      initial={skipAnimation ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        skipAnimation
          ? { duration: 0 }
          : {
              duration: 2.4,
              ease: "easeOut",
              delay: 3.2, // Mulai setelah tombol selesai animasi
            }
      }
    >
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
    </motion.div>
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
      className={`flex items-center justify-start gap-2 w-full border-l border-secondary/30 hover:border-secondary/50 px-3 h-8 my-0.5 text-xs font-medium whitespace-nowrap text-secondary/90 hover:text-white transall 
        ${isAnimating ? "cursor-wait pointer-events-none" : "cursor-pointer"} 
        ${isDisabled ? "cursor-not-allowed !text-secondary/60" : "clicked"}`}
    >
      <motion.span variants={actionIconVariants}>
        <Icon className="w-4 h-4" />
      </motion.span>
      <motion.span variants={actionTextVariants}>{text}</motion.span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.15, // Tambah durasi cepat untuk wrapper
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
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
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.02,
      duration: 0.15, // Percepat item muncul
    },
  },
  closed: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02,
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

const actionTextVariants = {
  open: {
    opacity: 1,
    transition: { duration: 0.1 }, // Percepat teks action
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.08 }, // Lebih cepat saat menutup
  },
};
