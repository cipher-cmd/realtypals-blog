import { blogs } from "@/data/blogs";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import CTABox from "@/components/CTABox";
import AskAIButton from "@/components/AskAIButton";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  
  if (!blog) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${blog.title} | RealtyPals Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  }
}

export default async function BlogDetail({ params }: Props) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-800">Article not found</h2>
        <p className="text-neutral-500 mt-2">The insights you are looking for might have been moved.</p>
      </div>
    </div>
  );

  const toc: string[] = [];
  blog.content.split("\n").forEach(line => {
    if (line.trim().startsWith("## ")) {
      toc.push(line.replace("## ", "").trim());
    }
  });

  const renderContent = () => {
    const parts = blog.content.split(/(\[PROPERTY:\d+\]|\[CTA\])/g);

    return parts.map((part, index) => {
      if (part.startsWith("[PROPERTY")) {
        const idMatch = part.match(/\d+/);
        if (idMatch) {
          const id = Number(idMatch[0]);
          const property = properties.find((p) => p.id === id);
          return <PropertyCard key={index} property={property} />;
        }
      }

      if (part === "[CTA]") {
        return <CTABox key={index} />;
      }

      if (part.trim().startsWith("## ")) {
        const title = part.replace("## ", "").trim();
        const id = title.toLowerCase().replace(/\s+/g, '-');
        return <h2 id={id} key={index} className="text-2xl md:text-3xl font-bold text-neutral-900 mt-14 mb-6 tracking-tight scroll-mt-24">{title}</h2>;
      }
      if (part.trim().startsWith("### ")) {
        return <h3 key={index} className="text-xl md:text-2xl font-bold text-neutral-800 mt-8 mb-4">{part.replace("### ", "").trim()}</h3>;
      }

      if (part.trim().startsWith("- ")) {
        const lines = part.trim().split("\n");
        return (
          <ul key={index} className="list-none space-y-3 my-6">
            {lines.map((line, i) => {
              if (!line.trim().startsWith("- ")) return null;
              const text = line.replace("- ", "");
              const boldParts = text.split(/(\*\*.*?\*\*)/g);
              
              return (
                <li key={i} className="flex gap-3 text-neutral-600 leading-relaxed text-lg">
                  <span className="text-blue-500 mt-1.5">•</span>
                  <span>
                    {boldParts.map((bp, j) => {
                      if (bp.startsWith("**") && bp.endsWith("**")) {
                        return <strong key={j} className="text-neutral-900 font-semibold">{bp.slice(2, -2)}</strong>;
                      }
                      return bp;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      if (part.trim() && !part.trim().startsWith("- ")) {
        const pLines = part.split("\n\n");
        return pLines.map((pLine, pi) => {
          if (!pLine.trim()) return null;
          const boldParts = pLine.trim().split(/(\*\*.*?\*\*)/g);
          return (
            <p key={`${index}-${pi}`} className="text-lg text-neutral-600 leading-loose mb-6">
              {boldParts.map((bp, j) => {
                if (bp.startsWith("**") && bp.endsWith("**")) {
                  return <strong key={j} className="text-neutral-900 font-semibold">{bp.slice(2, -2)}</strong>;
                }
                return bp;
              })}
            </p>
          );
        });
      }

      return null;
    });
  };

  return (
    <article className="min-h-screen bg-white pb-24">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            let tracked = false;
            window.addEventListener('scroll', () => {
              if (tracked) return;
              const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
              if (scrollPercent >= 75) {
                console.log("[Analytics] Scroll 75% depth reached");
                tracked = true;
              }
            });
          `,
        }}
      />

      <div className="relative w-full h-[55vh] min-h-[450px]">
        <Image
          src={blog.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-sm font-semibold text-white/90 mb-6 uppercase tracking-wider">
              <span className="bg-blue-600 px-3 py-1 rounded-full">{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-white text-lg">
                {blog.author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-bold">{blog.author}</div>
                <div className="text-white/70 text-sm">RealtyPals Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-16 flex flex-col lg:flex-row gap-16">
        
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Table of Contents</h4>
            <nav className="flex flex-col gap-3 border-l-2 border-neutral-100 pl-4">
              {toc.map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium text-neutral-500 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
               <div className="text-xs font-bold text-blue-600 mb-2">Need Expert Help?</div>
               <p className="text-sm text-neutral-600 mb-4">Skip the research and let our AI match you with the perfect home.</p>
               <AskAIButton 
                className="w-full text-center bg-neutral-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
               >
                 Chat with AI
               </AskAIButton>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="prose prose-lg prose-neutral max-w-none">
            {renderContent()}
          </div>
          
          <div className="mt-20 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 text-neutral-600 bg-neutral-50 px-4 py-2 rounded-full border border-neutral-200">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated in 2026 • Verified Data-backed Insights
            </div>
            <div className="flex gap-4 text-neutral-500">
              <button className="hover:text-neutral-900 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
              <button className="hover:text-neutral-900 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                Copy Link
              </button>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
