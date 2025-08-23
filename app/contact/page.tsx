import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar notRoot={true} />
      <div className="flexcc min-h-screen pt-24">ContactPage</div>
      <Footer />
    </>
  );
};

export default ContactPage;
