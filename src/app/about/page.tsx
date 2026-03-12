import { Briefcase, Code, Server, Smartphone, Monitor } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed">
          I help businesses build <strong>modern, reliable web applications</strong> using <strong>Next.js and Node.js</strong>, with a strong focus on performance, scalability, and long-term maintainability. Most of the projects I work on are not just websites, but <strong>products</strong> — e-commerce platforms, internal systems, CMS-driven applications, and business tools that need to work consistently and grow over time.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">What I Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl border border-border/50 glass-panel">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Frontend Engineering</h3>
          <p className="text-muted-foreground text-sm">
            I design clean user experiences with React and Next.js, focusing on responsive design, animations, and accessibility.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/50 glass-panel">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Backend Systems</h3>
          <p className="text-muted-foreground text-sm">
            I build secure and well-structured backends with Node.js and Django, connecting everything with stable APIs and databases.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/50 glass-panel">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">E-commerce & CMS</h3>
          <p className="text-muted-foreground text-sm">
            From product catalogs to admin dashboards, I focus on building systems that are easy to operate and extend.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/50 glass-panel">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Production Readiness</h3>
          <p className="text-muted-foreground text-sm">
            I use Docker, GitHub, and cloud platforms like AWS to ensure applications are deployed cleanly and updated safely.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
      <div className="flex flex-wrap gap-3">
        {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Django", "C++", "Docker", "AWS", "GitHub"].map((skill) => (
          <span key={skill} className="px-4 py-2 rounded-full border border-border/50 glass-panel text-sm font-medium">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
