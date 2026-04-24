"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const openChat = () => {
    window.dispatchEvent(new Event('openChat'));
  };

  return (
    <nav className="fixed top-0 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#3F3F46]/10 z-40">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif font-black text-2xl tracking-tighter text-[#18181B]">
          Realty<span className="text-[#EC4899]">Pals</span>.
        </Link>
        <div className="flex gap-8 text-sm font-bold tracking-widest uppercase text-[#3F3F46]">
          <Link href="/blog" className="hover:text-[#18181B] transition-colors">
            Journal
          </Link>
          <button 
            onClick={openChat} 
            className="hover:text-[#EC4899] transition-colors"
          >
            Ask AI
          </button>
        </div>
      </div>
    </nav>
  );
}
