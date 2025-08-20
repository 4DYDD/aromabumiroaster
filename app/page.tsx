"use client";

import { motion } from "./components/FramerMotionClient";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-yellow-700 to-black opacity-80"></div>
        <div className="absolute inset-0">
          {/* Placeholder for a background video or image */}
          <div className="w-full h-full bg-cover bg-center" />
          <p className="absolute bottom-4 right-4 text-white text-xs">
            Ingat untuk menambahkan video atau gambar latar belakang disini.
          </p>
        </div>

        <div className="relative z-10 text-white p-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Aroma Bumi Roasters
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Crafting the Perfect Cup of Indonesian Coffee
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link
              href="/order"
              className="bg-white text-yellow-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-100 transition-colors"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-yellow-900 mb-12">
            Our Signature Beans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for featured products */}
            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full mx-auto mb-4 shadow-lg"></div>
              <h3 className="text-xl font-semibold text-yellow-900">
                Aceh Gayo
              </h3>
              <p className="text-gray-600">Rich & Earthy</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-red-200 to-red-400 rounded-full mx-auto mb-4 shadow-lg"></div>
              <h3 className="text-xl font-semibold text-yellow-900">
                Toraja Sapan
              </h3>
              <p className="text-gray-600">Fruity & Complex</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full mx-auto mb-4 shadow-lg"></div>
              <h3 className="text-xl font-semibold text-yellow-900">
                Bali Kintamani
              </h3>
              <p className="text-gray-600">Citrus & Floral</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Ingat untuk mengganti placeholder ini dengan komponen produk
            unggulan.
          </p>
        </div>
      </section>
    </div>
  );
}
