import { Metadata } from "next";
import {
  FaCoffee,
  FaHandshake,
  FaLeaf,
  FaHeart,
  FaUsers,
  FaSeedling,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "About Us - Aroma Bumi Roasters",
  description:
    "Pelajari lebih lanjut tentang sejarah dan misi kami di Aroma Bumi Roasters.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar notRoot={true} />
      <div className="min-h-screen bg-secondary">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-playfair">
              About Aroma Bumi Roasters
            </h1>
            <div className="flexc gap-2 text-accent mb-6">
              <FaCoffee className="text-2xl" />
              <span className="text-lg font-lato">
                Crafted with Passion, Roasted with Love
              </span>
              <FaCoffee className="text-2xl" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-accent to-primary rounded-lg shadow-lg relative overflow-hidden">
                <div className="atranscenter flexcc text-white">
                  <FaCoffee className="text-6xl mb-4 opacity-80" />
                  <p className="text-center text-sm opacity-75 px-4">
                    Interior coffee shop akan ditambahkan di sini
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-primary mb-4 font-playfair flexc gap-3">
                  <FaHeart className="text-accent" />
                  Our Story
                </h2>
                <p className="text-text font-lato leading-relaxed mb-4">
                  Aroma Bumi Roasters didirikan pada tahun 2020 dengan mimpi
                  sederhana: menyajikan kopi terbaik dari biji kopi pilihan
                  Indonesia kepada dunia. Kami percaya bahwa setiap cangkir kopi
                  memiliki cerita, dari petani yang menanamnya hingga proses
                  roasting yang kami lakukan dengan penuh cinta.
                </p>
                <p className="text-text font-lato leading-relaxed">
                  Misi kami adalah untuk mengangkat harkat kopi Indonesia dan
                  mendukung para petani lokal. Kami bekerja sama langsung dengan
                  petani di berbagai daerah untuk memastikan kualitas terbaik
                  dan praktik perdagangan yang adil.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-primary text-center mb-8 font-playfair">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transall">
                <div className="flexc mb-4">
                  <div className="w-16 h-16 bg-accent rounded-full flexc">
                    <FaHandshake className="text-2xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 font-playfair">
                  Fair Trade
                </h3>
                <p className="text-text font-lato leading-relaxed">
                  Kami berkomitmen untuk praktik perdagangan yang adil dengan
                  para petani kopi Indonesia.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transall">
                <div className="flexc mb-4">
                  <div className="w-16 h-16 bg-accent rounded-full flexc">
                    <FaLeaf className="text-2xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 font-playfair">
                  Sustainability
                </h3>
                <p className="text-text font-lato leading-relaxed">
                  Mendukung praktik pertanian berkelanjutan untuk menjaga
                  kelestarian alam Indonesia.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transall">
                <div className="flexc mb-4">
                  <div className="w-16 h-16 bg-accent rounded-full flexc">
                    <FaSeedling className="text-2xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 font-playfair">
                  Quality
                </h3>
                <p className="text-text font-lato leading-relaxed">
                  Kualitas premium mulai dari pemilihan biji hingga proses
                  roasting yang sempurna.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-primary mb-4 font-playfair flexc gap-3 justify-center">
                <FaUsers className="text-accent" />
                Our Mission
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flexc flex-shrink-0 mt-1">
                    <FaCoffee className="text-white text-sm" />
                  </div>
                  <p className="text-text font-lato leading-relaxed">
                    Menghadirkan pengalaman kopi Indonesia terbaik dengan cita
                    rasa autentik yang membanggakan.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flexc flex-shrink-0 mt-1">
                    <FaHandshake className="text-white text-sm" />
                  </div>
                  <p className="text-text font-lato leading-relaxed">
                    Membangun kemitraan yang berkelanjutan dengan petani kopi
                    lokal di seluruh nusantara.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flexc flex-shrink-0 mt-1">
                    <FaHeart className="text-white text-sm" />
                  </div>
                  <p className="text-text font-lato leading-relaxed">
                    Menyebarkan kecintaan terhadap kopi Indonesia ke seluruh
                    dunia melalui setiap cangkir yang kami sajikan.
                  </p>
                </div>
              </div>
              <div className="flexc">
                <div className="w-full max-w-sm h-64 bg-gradient-to-br from-primary to-accent rounded-lg shadow-md flexc">
                  <div className="text-center text-white">
                    <FaCoffee className="text-6xl mb-4 opacity-80" />
                    <p className="text-sm opacity-75">
                      Foto tim atau workspace
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
