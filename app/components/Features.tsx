import React from "react";
import { GiCoffeeBeans } from "react-icons/gi";
import { IoLeafOutline } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";

const Features = () => {
  return (
    <>
      <section className="w-full py-20 bg-primary_dark">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">
            Mengapa Memilih Aroma Bumi Roasters?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flexcc transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/80 group-hover:shadow-lg">
                <IoLeafOutline className="text-white text-3xl transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2 transition-colors group-hover:text-accent">
                100% Natural
              </h3>
              <p className="text-secondary/70 transition-colors group-hover:text-secondary/90">
                Biji kopi pilihan langsung dari petani lokal tanpa bahan kimia
                berbahaya
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flexcc transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/80 group-hover:shadow-lg">
                <GiCoffeeBeans className="text-white text-3xl transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2 transition-colors group-hover:text-accent">
                Fresh Roasted
              </h3>
              <p className="text-secondary/70 transition-colors group-hover:text-secondary/90">
                Disangrai dengan teknik artisan untuk menghasilkan cita rasa
                terbaik
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flexcc transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/80 group-hover:shadow-lg">
                <MdLocalShipping className="text-white text-3xl transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2 transition-colors group-hover:text-accent">
                Fast Delivery
              </h3>
              <p className="text-secondary/70 transition-colors group-hover:text-secondary/90">
                Pengiriman cepat ke seluruh Indonesia dengan kemasan yang aman
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
