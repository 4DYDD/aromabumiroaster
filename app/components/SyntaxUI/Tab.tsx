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
}

const Tab = ({ text, selected, goTo, icon: Icon, notRoot }: TabProps) => {
  const { isAnimating } = useHeroAnimationStore();

  return (
    <Link
      href={goTo}
      className={` 
        ${
          notRoot
            ? ` ${
                selected
                  ? "text-primary/70 hover:text-primary/90"
                  : "text-primary/50 hover:text-primary/90"
              }`
            : `${
                selected
                  ? "text-secondary/80 hover:text-secondary/90"
                  : "text-secondary/50 hover:text-secondary/90"
              }`
        } 
        ${isAnimating ? "pointer-events-none" : "pointer-events-auto"}
        relative flexcc rounded-md w-[4.8rem] lg:w-[7rem] h-[4rem] lg:h-[5rem] cursor-pointer text-[0.7rem] lg:text-sm font-bold transition-colors duration-200 !outline-none gap-1.5`}
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
            className={`z-0 h-[1.5px] lg:h-[3px] w-[60%] rounded-t-full 
          ${!notRoot ? "bg-secondary/80" : "bg-primary/80"}
            `}
          />
        </motion.div>
      )}
    </Link>
  );
};

export default Tab;
