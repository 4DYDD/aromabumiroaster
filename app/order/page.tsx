import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderPage = () => {
  return (
    <>
      <Navbar notRoot={true} />
      <div className="flexcc min-h-screen pt-24">OrderPage</div>
      <Footer />
    </>
  );
};

export default OrderPage;
