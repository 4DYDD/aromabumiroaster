import { IconType } from "react-icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHeroAnimationStore } from "../../store/heroAnimationStore";

interface TabProps {
  text: string;
  selected: boolean;
  goTo: string;
  icon: IconType;
  notRoot?: boolean;
  needBackground?: boolean; // Tambahkan prop untuk styling dengan background
}

const Tab = ({
  text,
  selected,
  goTo,
  icon: Icon,
  needBackground = false,
}: TabProps) => {
  const { isAnimating } = useHeroAnimationStore();

  // Tentukan warna berdasarkan kondisi navbar
  const getTextColor = () => {
    if (needBackground) {
      // Jika ada background (scroll/non-home), gunakan primary_dark
      return selected
        ? "text-primary_dark hover:text-primary_dark/90"
        : "text-primary_dark/70 hover:text-primary_dark/90";
    } else {
      // Jika transparent (home page, no scroll), gunakan secondary
      return selected
        ? "text-secondary/80 hover:text-secondary/90"
        : "text-secondary/50 hover:text-secondary/90";
    }
  };

  const getUnderlineColor = () => {
    return needBackground ? "bg-primary_dark" : "bg-secondary/80";
  };

  return (
    <Link
      href={goTo}
      className={`${getTextColor()} 
        ${isAnimating ? "pointer-events-none" : "pointer-events-auto"}
        relative flexcc rounded-md w-[4rem] lg:w-[6rem] h-[4rem] lg:h-[5rem] cursor-pointer text-[0.75rem] lg:text-sm font-bold transition-all duration-500 ease-out !outline-none gap-1.5`}
    >
      <Icon className="h-[1.85em] w-[1.85em] relative" />
      <span className="relative">{text}</span>
      {selected && (
        <motion.div
          key={`underline-${text}`} // Key unik per tab untuk reset position
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3,
          }}
          style={{ originX: 0.5, originY: 1 }} // Anchor point di tengah bawah
          className="absolute left-0 bottom-0 flex w-full justify-center"
        >
          <span
            className={`z-0 h-[1.5px] lg:h-[3px] w-[60%] rounded-t-full ${getUnderlineColor()}`}
          />
        </motion.div>
      )}
    </Link>
  );
};

export default Tab;
