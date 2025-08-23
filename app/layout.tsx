import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Aroma Bumi Roasters - Welcome to Our Coffee World",
  description:
    "Discover the finest Indonesian specialty coffee, roasted with passion.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload video untuk menghindari warning di console */}
        {/* Preload foto untuk menghindari warning di console */}
        <link
          rel="preload"
          as="fetch"
          href="/video/falling_coffee_beans.mp4"
          type="video/mp4"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="fetch"
          href="/images/coffee_banner_menu.jpg"
          type="image/jpeg"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} ${lato.className}`}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
