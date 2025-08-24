"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { useEffect } from "react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, removeFromCart, clearCart } = useCartStore();

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  // Handle escape key only
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Backdrop - tidak blur, tidak block scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent w-full h-screen z-[90]"
          />

          {/* Cart Modal */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 flexcc h-[100dvh] w-full max-w-[80vw] lg:max-w-[25vw] bg-secondary shadow-2xl z-[95] overflow-hidden border-l-2 border-primary/20"
          >
            {/* Header */}
            <div className="bg-primary text-secondary h-[100px] px-6 w-full flexc justify-between relative">
              <div className="flexc gap-3">
                <h2 className="text-xl font-bold">Keranjangmu</h2>
              </div>
              <button
                onClick={onClose}
                className="p-3.5 mr-2 hover:bg-primary_dark rounded-lg transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-[100%] overflow-hidden w-full">
              {/* Items List */}
              <div className="flexcc flex-1 !justify-start lg:pr-4 overflow-y-auto">
                {itemCount === 0 ? (
                  <div className="flexcc flex-col gap-4 p-8 text-center">
                    <FaShoppingCart className="text-4xl text-accent/50" />
                    <div>
                      <p className="text-lg font-semibold text-primary">
                        Keranjang Kosong
                      </p>
                      <p className="text-sm text-accent mt-1">
                        Tambahkan produk kopi untuk memulai belanja
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 gap-2.5 w-full flexcc">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white w-full rounded-lg p-4 shadow-sm border border-secondary"
                      >
                        <div className="flexc w-full justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary text-sm">
                              {item.name}
                            </h3>
                            <p className="text-xs text-accent mb-2">
                              {item.origin}
                            </p>
                            <p className="font-bold text-accent">
                              Rp{item.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus dari keranjang"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {itemCount > 0 && (
                <div className="border-t border-accent/20 p-6 bg-white">
                  {/* Total */}
                  <div className="flexc justify-between mb-4">
                    <span className="text-sm font-semibold text-primary">
                      Total ({itemCount} item{itemCount > 1 ? "s" : ""})
                    </span>
                    <span className="text-base font-bold text-accent">
                      Rp{totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 text-sm">
                    <button className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary_dark transition-colors">
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full border-2 border-red-500 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Kosongkan Keranjang
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
