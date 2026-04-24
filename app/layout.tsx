import type { Metadata } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const josefin = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin" });

export const metadata: Metadata = {
  title: "RealtyPals | Premium Real Estate Blog",
  description: "Discover the best areas to live, top real estate trends, and data-backed insights for 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin.variable} ${cinzel.variable} font-sans bg-[#FAFAFA] text-[#18181B] antialiased`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
