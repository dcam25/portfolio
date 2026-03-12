import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "PropEdge AI",
      description: "Real estate AI solution focusing on modern UI and scalable backend. Provides predictive analytics and intelligent property matching.",
      tags: ["Next.js", "Node.js", "AI SDK", "TailwindCSS"],
      github: "https://github.com/dcam25/propedge-ai",
      live: null
    },
    {
      title: "Multi-Tenant Platform",
      description: "A comprehensive SaaS infrastructure built with robustness and security in mind. Features role-based access control and tenant isolation.",
      tags: ["React", "Express UI", "PostgreSQL", "Docker"],
      github: "https://github.com/dcam25/multi-tenant",
      live: null
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-muted-foreground text-lg mb-12">
        A selection of products and tools I've built.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="flex flex-col p-6 rounded-3xl border border-border/50 glass-panel transition-all hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium border border-border/40">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-auto">
              {project.github && (
                <Link 
                  href={project.github} 
                  target="_blank" 
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </Link>
              )}
              {project.live && (
                <Link 
                  href={project.live} 
                  target="_blank" 
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
