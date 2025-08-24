"use client";

import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { motion } from "framer-motion";
import CartModal from "../Cart/CartModal";

interface CartTabProps {
  needBackground?: boolean;
  hasAnimated?: boolean;
}

const CartTab = ({
  needBackground = false,
  hasAnimated = false,
}: CartTabProps) => {
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = items.length;

  // Tentukan warna berdasarkan kondisi navbar
  const getButtonColor = () => {
    if (needBackground) {
      return "text-primary_dark hover:text-primary_dark/80";
    } else {
      return "text-secondary/80 hover:text-secondary";
    }
  };

  const getBadgeColor = () => {
    return needBackground
      ? "bg-primary_dark text-secondary"
      : "bg-secondary text-primary_dark";
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <motion.button
        initial={hasAnimated ? undefined : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          hasAnimated ? undefined : { duration: 1, ease: "easeOut", delay: 3 }
        }
        className={`relative cursor-pointer flexcc rounded-md w-[4rem] lg:w-[6rem] h-[4rem] lg:h-[5rem] transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 ${getButtonColor()}`}
        onClick={handleCartClick}
        title={`Cart (${itemCount} items)`}
      >
        <FaShoppingBasket className="text-2xl lg:text-3xl" />

        {/* Badge untuk jumlah item */}
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-3.5 right-3.5 min-w-[18px] h-[18px] rounded-full flexcc text-xs font-bold ${getBadgeColor()}`}
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.div>
        )}
      </motion.button>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartTab;
