export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export const projectsData: Project[] = [
  {
    slug: "propedge-ai",
    title: "PropEdge AI",
    shortDescription: "AI-powered real estate analytics and property management platform.",
    fullDescription: "PropEdge AI leverages machine learning to predict property values, identify investment opportunities, and automate routine management tasks for real estate professionals. Built with Next.js, FastAPI, and Pinecone for RAG-based property querying.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Pinecone", "TailwindCSS"],
    githubUrl: "https://github.com/dcam25/propedge-ai",
    liveUrl: "https://propedge-example.vercel.app", 
  },
  {
    slug: "multi-tenant-platform",
    title: "Multi-Tenant E-Commerce Platform",
    shortDescription: "Scalable SaaS platform allowing merchants to launch their own online stores.",
    fullDescription: "A comprehensive SaaS solution built for scale. Merchants can register, customize their storefronts, and manage inventory and orders from a centralized dashboard. The architecture ensures data isolation and high performance across all tenant instances.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Prisma"],
    githubUrl: "https://github.com/dcam25/multi-tenant-ecommerce",
  },
  {
    slug: "cms-solution",
    title: "Headless CMS Integration",
    shortDescription: "Custom frontend experience powered by a headless CMS for maximum flexibility.",
    fullDescription: "Designed and implemented a lightning-fast frontend for a digital publication using Next.js, statically generating pages and fetching content from a Headless CMS to provide an optimal SEO and user experience.",
    technologies: ["React", "Next.js", "Sanity CMS", "Framer Motion"],
    githubUrl: "https://github.com/dcam25/headless-cms-demo",
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(p => p.slug === slug);
}
