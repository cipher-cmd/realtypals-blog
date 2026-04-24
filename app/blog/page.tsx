import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-24 text-center md:text-left flex flex-col gap-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#18181B] text-[#FAFAFA] font-medium text-xs self-center md:self-start border border-[#3F3F46]/20 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC4899] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EC4899]"></span>
            </span>
            Insights & Data-backed Trends
          </div>
          <h1 
            className="font-serif font-black text-[#18181B] tracking-tighter leading-[0.9] break-words"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          >
            RealtyPals<br />
            <span className="text-[#EC4899]">Journal.</span>
          </h1>
          <p className="text-[#3F3F46] text-xl max-w-2xl leading-relaxed font-light">
            Discover the future of real estate. Stay ahead with expert analysis, localized trends, and curated premium listings for 2026.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {blogs.map((blog, index) => (
            <BlogCard 
              key={blog.slug} 
              blog={blog} 
              index={index}
            />
          ))}
        </div>

        {/* Static Pagination for Premium Aesthetic */}
        <div className="flex items-center justify-center gap-2 pt-16 border-t border-[#3F3F46]/10 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#3F3F46]/20 text-[#3F3F46] cursor-default opacity-50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#18181B] text-[#FAFAFA] font-bold text-sm cursor-default">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#3F3F46]/5 text-[#3F3F46] font-bold text-sm transition-colors cursor-default">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#3F3F46]/5 text-[#3F3F46] font-bold text-sm transition-colors cursor-default">
            3
          </button>
          
          <span className="px-2 text-[#3F3F46]">...</span>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#3F3F46]/5 text-[#3F3F46] font-bold text-sm transition-colors cursor-default">
            12
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#3F3F46]/20 text-[#18181B] hover:border-[#18181B] transition-colors cursor-default">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
