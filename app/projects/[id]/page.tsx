import { portfolio } from '@/data/portfolio';
import ProjectDetailClient from '@/components/ProjectDetailClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return portfolio.map((project) => ({
    id: project.id,
  }));
}

// In Next.js 15, params is a Promise
type Params = Promise<{ id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = portfolio.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-zinc-500 mb-8">The project you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link 
          href="/#portfolio" 
          className="px-8 py-4 bg-red-600 rounded-full font-bold tracking-widest uppercase hover:bg-red-700 transition-all font-sans"
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const otherProjects = portfolio.filter(p => p.id !== id).slice(0, 3);

  // Sanitize data: Lucide icons (functions) cannot be passed to Client Components
  const sanitizedProject = { ...project };
  delete (sanitizedProject as any).icon;
  
  const sanitizedOtherProjects = otherProjects.map(p => {
    const { icon, ...rest } = p;
    return rest;
  });

  return <ProjectDetailClient project={sanitizedProject as any} otherProjects={sanitizedOtherProjects as any} />;
}
