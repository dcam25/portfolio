"use client";

import { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetching from Dev.to API
    const fetchPosts = async () => {
      try {
        // Change username to your actual dev.to username if applicable
        const res = await fetch("https://dev.to/api/articles?username=dcam25&per_page=5");
        if (res.ok) {
          const data = await res.json();
          // Fallback static data if no posts found
          if (data.length === 0) {
            setPosts([
              {
                id: 1,
                title: "Building Reliable Web Products with Next.js",
                description: "Deep dive into performance, scalability, and long-term maintainability for CMS-driven applications.",
                url: "#",
                published_at: new Date().toISOString(),
                reading_time_minutes: 5,
              },
              {
                id: 2,
                title: "Dockerizing Production Workflows",
                description: "How to properly containerize and deploy applications using Docker and AWS.",
                url: "#",
                published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
                reading_time_minutes: 7,
              }
            ]);
          } else {
            setPosts(data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch posts", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold mb-4">Blog & Thoughts</h1>
      <p className="text-muted-foreground text-lg mb-12">
        Essays on software engineering, performance, backend architecture, and e-commerce.
      </p>

      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-muted/50 rounded-3xl border border-border/50 glass-panel" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link 
              href={post.url} 
              key={post.id}
              target="_blank"
              className="block p-6 sm:p-8 rounded-3xl border border-border/50 glass-panel group hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <ArrowRight className="w-6 h-6 shrink-0 md:opacity-0 md:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
              </div>
              
              <p className="text-muted-foreground mb-6 line-clamp-2">
                {post.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground/80 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span>•</span>
                <span>{post.reading_time_minutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
