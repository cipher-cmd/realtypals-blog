"use client";

export default function CTABox() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black text-white p-10 rounded-3xl my-12 shadow-2xl">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <div className="inline-block bg-white/10 text-xs font-bold tracking-wider px-3 py-1 rounded-full mb-4 text-blue-300 uppercase">
            Smart Matching
          </div>
          <h3 className="text-3xl font-bold mb-3">
            Let AI find your perfect home
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Skip the endless scrolling. Chat with our AI advisor to discover properties tailored precisely to your lifestyle and budget.
          </p>
        </div>
        
        <button
          className="shrink-0 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          onClick={() => window.dispatchEvent(new Event("openChat"))}
        >
          Start AI Chat
        </button>
      </div>
    </div>
  );
}
