import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import DefaultLayout from "./components/DefaultLayout";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} ${lato.className}`}
      >
        <DefaultLayout>
          <main className="min-h-screen">{children}</main>
        </DefaultLayout>
      </body>
    </html>
  );
}
