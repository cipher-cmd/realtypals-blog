import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog, index = 0 }: { blog: any; index?: number }) {
  const isHero = index === 0;
  // Stagger the animation delay based on index
  const delay = `${index * 150}ms`;

  return (
    <Link 
      href={`/blog/${blog.slug}`} 
      className={`group block opacity-0 animate-fade-in-up ${isHero ? "md:col-span-2" : ""}`}
      style={{ animationDelay: delay }}
    >
      <div className={`flex flex-col ${isHero ? "md:flex-row gap-8 md:gap-12" : "gap-8"} h-full bg-transparent transition-all duration-300 ease-in-out`}>
        
        {/* Editorial Image */}
        <div className={`relative w-full ${isHero ? "aspect-[16/9] md:aspect-[21/9] md:w-2/3" : "aspect-[4/5]"} overflow-hidden rounded-sm bg-neutral-100 shrink-0`}>
          <Image
            src={blog.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
            alt={blog.title}
            fill
            sizes={isHero ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={isHero}
            className="object-cover will-change-transform transition-transform duration-[800ms] ease-in-out group-hover:scale-110 group-hover:origin-center"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center flex-grow py-4">
          <div>
            <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-[#3F3F46] mb-4">
              <span className="font-semibold">{blog.date}</span>
              <span className="opacity-50">•</span>
              <span>{blog.readTime}</span>
            </div>
            
            <h2 className={`${isHero ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"} font-serif font-bold text-[#18181B] mb-4 leading-tight transition-colors duration-300 ease-in-out group-hover:text-[#EC4899]`}>
              {blog.title}
            </h2>
            
            <p className={`text-[#3F3F46] leading-relaxed line-clamp-3 font-light mb-8 ${isHero ? "text-xl" : "text-lg"}`}>
              {blog.excerpt}
            </p>
          </div>

          {/* Minimalist CTA */}
          <div className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#EC4899] transition-all duration-300 ease-in-out">
            Read Full Insight
            <svg 
              className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

      </div>
    </Link>
  );
}
