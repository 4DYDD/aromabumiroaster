import React from "react";
import AnimatedNavbar from "../AnimatedNavbar";
import Footer from "../Footer";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatedNavbar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
