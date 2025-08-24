"use client";

import Image from "next/image";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";

// Mock data for products - ini bisa diganti dengan fetch dari API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Aceh Gayo Premium",
    price: 25000,
    origin: "Aceh, Sumatera",
    description:
      "Kopi single origin dengan cita rasa earthy dan full body yang khas dari dataran tinggi Gayo.",
  },
  {
    id: "2",
    name: "Toraja Sapan Heritage",
    price: 30000,
    origin: "Tana Toraja, Sulawesi",
    description:
      "Kopi premium dengan aroma floral dan rasa fruity yang kompleks, diproses secara tradisional.",
  },
  {
    id: "3",
    name: "Kintamani Volcano",
    price: 28000,
    origin: "Kintamani, Bali",
    description:
      "Kopi vulkanik dengan karakter citrus yang bright dan aftertaste yang clean dan menyegarkan.",
  },
  {
    id: "4",
    name: "Java Preanger Classic",
    price: 15000,
    origin: "Preanger, Jawa Barat",
    description:
      "Kopi tradisional Jawa dengan body medium dan rasa cokelat yang seimbang, cocok untuk daily brew.",
  },
  {
    id: "5",
    name: "Flores Bajawa",
    price: 22000,
    origin: "Bajawa, Flores",
    description:
      "Kopi eksotik dengan aroma wine-like dan rasa dark chocolate yang intens.",
  },
  {
    id: "6",
    name: "Papua Wamena",
    price: 30000,
    origin: "Wamena, Papua",
    description:
      "Kopi rare dengan profil rasa yang unik, kombinasi herbal dan spicy dengan sweetness yang natural.",
  },
];

// Client Component untuk cart functionality
export default function ProductList() {
  const { addToCart } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    console.log("Added to cart:", product.name);
  };

  return (
    <section id="product-list" className="w-full py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="flexcc font-bold mb-4 font-playfair">
            <span className="text-2xl lg:text-3xl text-accent">VARIASI</span>
            <span className="text-3xl lg:text-4xl text-primary">
              KOPI NUSANTARA
            </span>
          </h2>
          <p className="text-base lg:text-lg px-5 lg:px-20 text-accent max-w-2xl mx-auto">
            Nikmati cita rasa otentik kopi Indonesia dari berbagai daerah dengan
            karakteristik yang unik dan khas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-secondary"
            >
              {/* Product Image Placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-accent to-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
                <div className="absolute z-[2] bottom-4 left-4 right-4">
                  <span className="inline-block bg-secondary text-primary text-sm font-bold px-3 py-1 rounded-lg">
                    {product.origin}
                  </span>
                </div>
                {/* Coffee bean pattern overlay */}
                <div className="absolute z-[1] inset-0 opacity-70">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, #f0ebe3 2px, transparent 2px),
                                     radial-gradient(circle at 75% 25%, #f0ebe3 1.5px, transparent 1.5px),
                                     radial-gradient(circle at 25% 75%, #f0ebe3 2.5px, transparent 2.5px),
                                     radial-gradient(circle at 75% 75%, #f0ebe3 1px, transparent 1px)`,
                      backgroundSize:
                        "40px 40px, 30px 30px, 50px 50px, 25px 25px",
                    }}
                  >
                    <Image
                      src="/images/coffee_banner_menu.jpg"
                      alt="Coffee banner menu"
                      priority
                      width={4928}
                      height={3264}
                      className="w-full h-full object-cover "
                    />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 font-playfair">
                  {product.name}
                </h3>

                <p className="text-sm text-accent mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-10 mb-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Quality Badge */}
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    data-add-cart={product.id}
                    className="flex-1 bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary_dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    Tambah ke Keranjang
                  </button>
                  <button className="px-4 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-200 active:scale-95">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Coffee Bean Icons */}
                <div className="flex items-center justify-center mt-4 gap-1 opacity-30">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary text-xs">
                      ☕
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12">
          <p className="text-accent mb-4">
            Tidak menemukan kopi yang Anda cari?
          </p>
          <button className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-primary transition-colors duration-200 font-semibold">
            Lihat Semua Produk
          </button>
        </div> */}
      </div>
    </section>
  );
}
