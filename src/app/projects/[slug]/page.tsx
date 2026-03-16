import { projectsData, getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

// Generate static params for static export
export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-12 pb-24">
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-border/50">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map(tech => (
            <span key={tech} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-medium border border-border/40">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          {project.fullDescription}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/50">
          {project.githubUrl && (
            <Link 
              href={project.githubUrl} 
              target="_blank" 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Github className="w-5 h-5" />
              View Source
            </Link>
          )}
          {project.liveUrl && (
            <Link 
              href={project.liveUrl} 
              target="_blank" 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-500/20 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Live Preview
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
