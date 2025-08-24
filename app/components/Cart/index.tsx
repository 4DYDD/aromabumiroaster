"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { motion } from "framer-motion";
import CartModal from "./CartModal";

const FloatingCartButton = () => {
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = items.length;

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-secondary rounded-full shadow-2xl hover:bg-primary_dark transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent/30 z-[100] flexcc"
        onClick={handleCartClick}
        title={`Cart (${itemCount} items)`}
      >
        <FaShoppingCart className="text-2xl" />

        {/* Badge untuk jumlah item */}
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute -top-2 -right-2 min-w-[24px] h-6 bg-red-500 text-white rounded-full flexcc text-sm font-bold"
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

export default FloatingCartButton;
