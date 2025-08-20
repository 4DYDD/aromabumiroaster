"use client";

import { useState, useEffect } from "react";
import { motion } from "./FramerMotionClient";
import { useCartStore } from "../store/cartStore";
import { BarLoader } from "react-spinners";
import { Product } from "../types";

// Mock data for products
const mockProducts: Product[] = [
  { id: "1", name: "Aceh Gayo", price: 120000, origin: "Aceh" },
  { id: "2", name: "Toraja Sapan", price: 150000, origin: "Sulawesi" },
  { id: "3", name: "Kintamani", price: 135000, origin: "Bali" },
  { id: "4", name: "Java Preanger", price: 110000, origin: "Jawa Barat" },
];

// This component simulates a data fetch
export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <BarLoader color="#78350f" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Placeholder for product image */}
          <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Ingat untuk menambahkan gambar produk disini.
          </p>
          <div className="p-6">
            <h3 className="text-xl font-bold text-yellow-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.origin}</p>
            <p className="text-lg font-semibold text-gray-800">
              Rp{product.price.toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-yellow-900 text-white py-2 rounded-lg hover:bg-yellow-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
