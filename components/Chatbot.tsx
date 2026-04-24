"use client";
import { useEffect, useState, useRef } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi, I'm the RealtyPals AI assistant. Where are you looking, and for what budget?", isAi: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  useEffect(() => {
    const handleOpen = () => {
      console.log("[Analytics] begin_chatbot event fired via CTA click");
      setOpen(true);
    };
    window.addEventListener("openChat", handleOpen);
    return () => window.removeEventListener("openChat", handleOpen);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim().toLowerCase();
    setMessages(prev => [...prev, { text: input, isAi: false }]);
    setInput("");
    
    setTimeout(() => {
      if (userMessage.includes("save")) {
        console.log("[Analytics] Property shortlisted");
        setMessages(prev => [...prev, { text: "Property saved to your shortlist! Would you like to connect with an agent or see more similar listings?", isAi: true }]);
      } else if (messages.length === 1) {
        setMessages(prev => [
          ...prev, 
          { text: "Great, I found 3 options matching those criteria.", isAi: true },
          { text: "1. Luxury 3BHK in Sector 137 (₹2.20 Cr)\n2. 2BHK Premium in Sector 150 (₹1.48 Cr)\n3. Modern 1BHK Studio in Sector 62 (₹65 L)", isAi: true },
          { text: "You can type 'save' on any listing number to shortlist, or type 'more' for other options.", isAi: true }
        ]);
      } else {
        setMessages(prev => [...prev, { text: "I can help you arrange a site visit or connect you with a verified agent. Would you like me to schedule a call?", isAi: true }]);
      }
    }, 1000);
  };

  return (
    <>
      {/* Sticky Chat Icon when closed */}
      {!open && (
        <button 
          onClick={() => {
            console.log("[Analytics] begin_chatbot event fired via floating icon");
            setOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Chat with AI"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute right-full mr-4 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
            Chat with AI
          </span>
        </button>
      )}

      {/* Chat Interface */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-96 bg-white border border-neutral-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-h-[80vh]">
          {/* Header */}
          <div className="bg-neutral-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center font-bold text-sm shadow-inner">
                AI
              </div>
              <div>
                <h3 className="font-semibold text-sm">RealtyPals AI</h3>
                <p className="text-[10px] text-green-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-white transition-colors p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4 bg-neutral-50 scroll-smooth">
            <div className="text-center text-xs font-medium text-neutral-400 my-2">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3.5 text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${msg.isAi ? 'bg-white border border-neutral-200 text-neutral-700 rounded-2xl rounded-tl-sm' : 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-neutral-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a location, budget, or 'save'..." 
              className="flex-1 bg-neutral-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
            />
            <button type="submit" className="bg-neutral-900 text-white p-2.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm disabled:opacity-50" disabled={!input.trim()}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
