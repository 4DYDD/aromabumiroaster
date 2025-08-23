import Features from "./components/Features";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
// import VideoStatusIndicator from "./components/VideoStatusIndicator";
// import VideoControls from "./components/VideoControls";

export default function Home() {
  return (
    <>
      <Navbar notRoot={false} />

      {/* Video Status Indicator untuk demo */}
      {/* <VideoStatusIndicator /> */}

      {/* Video Controls untuk demo */}
      {/* <VideoControls /> */}

      <div className="flexcc min-h-screen text-center">
        {/* Hero Section - langsung render tanpa loading */}
        <HeroSection />

        {/* Product List Section */}
        <ProductList />

        {/* Features Section */}
        <Features />
      </div>

      <Footer />
    </>
  );
}
