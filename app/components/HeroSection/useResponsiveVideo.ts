"use client";

import { useState, useEffect } from "react";

interface DeviceConfig {
  isMobile: boolean;
  videoSource: string;
}

/**
 * Hook untuk deteksi device dan konfigurasi video
 * Menggunakan video Full HD yang sama untuk semua device
 */
export const useResponsiveVideo = (): DeviceConfig => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set bahwa kita sudah di client-side
    setIsClient(true);

    // Deteksi ukuran layar
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // Tailwind md breakpoint
      setIsMobile(mobile);
    };

    // Set initial value
    checkScreenSize();

    // Listen untuk resize events
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Video Full HD untuk semua device
  const videoSource = "/video/fullhd_falling_coffee_beans.mp4";

  return {
    isMobile: isClient ? isMobile : false, // Default ke false sampai client ready
    videoSource,
  };
};
