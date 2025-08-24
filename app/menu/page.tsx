import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MenuPage = () => {
  return (
    <>
      <Navbar notRoot={true} />
      <div className="flexcc min-h-screen pt-24">MenuPage</div>
      <Footer />
    </>
  );
};

export default MenuPage;
