import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2, Layers, Star } from 'lucide-react';
import { memo } from 'react';
import projectsData from '@/data/projects.json';

interface Project {
  name: string;
  description: string;
  link: string;
  languages: string[];
  technologies: string[];
}

interface ProjectsProps {
  username: string;
}

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  // Get a unique gradient for each card
  const gradients = [
    'from-cyan-500/20 to-blue-500/20',
    'from-indigo-500/20 to-violet-500/20',
    'from-violet-500/20 to-purple-500/20',
    'from-pink-500/20 to-rose-500/20',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div
      className="opacity-0 animate-in hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="glass-card hover:border-indigo-500/50 transition-all duration-300 group h-full relative overflow-hidden cursor-pointer">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          <CardHeader className="relative z-10 pb-3 md:pb-6">
            <CardTitle className="flex items-start justify-between text-gray-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border border-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="break-words leading-tight text-xl md:text-2xl group-hover:text-cyan-300 transition-colors">
                  {project.name}
                </span>
              </div>
              <Github className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-indigo-400 transition-colors" />
            </CardTitle>
            <CardDescription className="text-gray-400 line-clamp-4 md:line-clamp-2 min-h-[60px] md:min-h-[40px] mt-3 leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative z-10 pt-2 md:pt-4">
            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2">
              {project.languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {lang}
                </Badge>
              ))}
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                >
                  <Layers className="w-3 h-3 mr-1" />
                  {tech}
                </Badge>
              ))}
            </div>

            {/* View button */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 pointer-events-none transition-all"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Project
              </Button>
            </div>
          </CardContent>
        </a>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

function Projects({ username }: ProjectsProps) {
  const projects: Project[] = projectsData;

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-6 pb-32 md:pb-24 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-800 relative overflow-hidden">
      {/* Static grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-50" />

      {/* Background orbs with soft blur */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-500/20 rounded-full animate-blob" />
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-cyan-500/20 rounded-full animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-3 md:px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full inline-flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">My Work</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
            Check out some of my recent work — each project represents a unique challenge and learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-16 opacity-0 animate-in" style={{ animationDelay: '400ms' }}>
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all"
            asChild
          >
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);