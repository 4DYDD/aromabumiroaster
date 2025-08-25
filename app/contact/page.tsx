import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaCoffee,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      <Navbar notRoot={true} />

      {/* Hero Section */}
      <section className="bg-primary text-secondary pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flexc gap-3 mb-6">
            <FaCoffee className="text-4xl text-accent" />
            <h1 className="font-playfair text-4xl lg:text-6xl font-bold">
              Contact Us
            </h1>
          </div>
          <p className="text-lg lg:text-xl text-secondary/80 max-w-2xl mx-auto">
            Hubungi kami untuk pertanyaan, pemesanan, atau sekadar berbagi
            cerita tentang kopi favoritmu
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-primary mb-8">
                  Get In Touch
                </h2>
                <p className="text-text/80 text-lg mb-8">
                  Kami selalu senang mendengar dari para pecinta kopi! Jangan
                  ragu untuk menghubungi kami melalui berbagai cara berikut.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Location */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 hover:shadow-xl transall">
                  <div className="flexc gap-4">
                    <div className="flexcc w-12 h-12 bg-accent/20 rounded-full">
                      <FaMapMarkerAlt className="text-accent text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-1">
                        Lokasi Kami
                      </h3>
                      <p className="text-text/70">
                        Jl. Coffee Street No. 123
                        <br />
                        Menteng, Jakarta Pusat 10310
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 hover:shadow-xl transall">
                  <div className="flexc gap-4">
                    <div className="flexcc w-12 h-12 bg-accent/20 rounded-full">
                      <FaPhone className="text-accent text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-1">Telepon</h3>
                      <p className="text-text/70">+62 21 1234 5678</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 hover:shadow-xl transall">
                  <div className="flexc gap-4">
                    <div className="flexcc w-12 h-12 bg-accent/20 rounded-full">
                      <FaEnvelope className="text-accent text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-1">Email</h3>
                      <p className="text-text/70">
                        hello@aromabumiroasters.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 hover:shadow-xl transall">
                  <div className="flexc gap-4">
                    <div className="flexcc w-12 h-12 bg-accent/20 rounded-full">
                      <FaClock className="text-accent text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-1">
                        Jam Operasional
                      </h3>
                      <div className="text-text/70 space-y-1">
                        <p>Senin - Jumat: 07:00 - 22:00</p>
                        <p>Sabtu - Minggu: 08:00 - 23:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8">
                <h3 className="font-playfair text-xl font-bold text-primary mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flexcc w-12 h-12 bg-accent text-white rounded-full hover:bg-accent/80 transall clicked"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="flexcc w-12 h-12 bg-accent text-white rounded-full hover:bg-accent/80 transall clicked"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="flexcc w-12 h-12 bg-accent text-white rounded-full hover:bg-accent/80 transall clicked"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
                Send us a Message
              </h2>

              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border border-accent/30 rounded-lg focus:border-accent focus:outline-none transall"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 border border-accent/30 rounded-lg focus:border-accent focus:outline-none transall"
                    placeholder="contoh@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    className="w-full p-4 border border-accent/30 rounded-lg focus:border-accent focus:outline-none transall"
                    placeholder="+62 812 3456 7890"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Subjek
                  </label>
                  <select className="w-full p-4 border border-accent/30 rounded-lg focus:border-accent focus:outline-none transall">
                    <option value="">Pilih subjek</option>
                    <option value="pemesanan">Pemesanan Kopi</option>
                    <option value="kerjasama">Kerjasama Bisnis</option>
                    <option value="feedback">Feedback & Saran</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows={5}
                    className="w-full p-4 border border-accent/30 rounded-lg focus:border-accent focus:outline-none transall resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-4 px-6 rounded-lg font-semibold hover:bg-accent/90 transall clicked flexc gap-2"
                >
                  <FaEnvelope />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 bg-primary_dark">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-secondary mb-8">
            Temukan Kami
          </h2>
          <div className="bg-accent/20 rounded-2xl p-8 flexcc min-h-[300px]">
            <div className="text-secondary/80 flexcc gap-4">
              <FaMapMarkerAlt className="text-accent text-4xl" />
              <div>
                <p className="text-lg mb-2">Google Maps Integration</p>
                <p className="text-sm">
                  Jl. Coffee Street No. 123, Menteng, Jakarta Pusat
                </p>
              </div>
            </div>
          </div>
          <p className="text-secondary/70 mt-6 max-w-2xl mx-auto">
            Terletak di jantung kota Jakarta, coffee shop kami mudah dijangkau
            dengan berbagai transportasi umum. Parkir tersedia dan akses ramah
            disabilitas.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
