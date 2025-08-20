import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Aroma Bumi Roasters",
  description:
    "Pelajari lebih lanjut tentang sejarah dan misi kami di Aroma Bumi Roasters.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-900 mb-8">
        About Aroma Bumi Roasters
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          {/* Placeholder for an image of the coffee shop's interior */}
          <div className="w-full h-80 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg shadow-md"></div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Ingat untuk menambahkan gambar interior coffee shop disini.
          </p>
        </div>
        <div className="text-lg text-gray-700">
          <h2 className="text-2xl font-semibold text-yellow-900 mb-4">
            Our Story
          </h2>
          <p className="mb-4">
            Aroma Bumi Roasters didirikan pada tahun 2020 dengan mimpi
            sederhana: menyajikan kopi terbaik dari biji kopi pilihan Indonesia
            kepada dunia. Kami percaya bahwa setiap cangkir kopi memiliki
            cerita, dari petani yang menanamnya hingga proses roasting yang kami
            lakukan dengan penuh cinta.
          </p>
          <p>
            Misi kami adalah untuk mengangkat harkat kopi Indonesia dan
            mendukung para petani lokal. Kami bekerja sama langsung dengan
            petani di berbagai daerah untuk memastikan kualitas terbaik dan
            praktik perdagangan yang adil.
          </p>
        </div>
      </div>
    </div>
  );
}
