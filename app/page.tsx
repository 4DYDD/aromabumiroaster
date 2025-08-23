import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar notRoot={false} />

      <div className="flexcc min-h-screen text-center">
        {/* Hero Section - langsung render tanpa loading */}
        <HeroSection />

        {/* Konten lain - langsung render juga */}
        <section className="w-full py-20 bg-primary_dark">
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

      <Footer />
    </>
  );
}
