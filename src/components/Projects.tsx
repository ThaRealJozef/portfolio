import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { useRef, memo } from 'react';
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

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => (
  <div
    className="opacity-0 animate-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 group backdrop-blur-sm h-full relative overflow-hidden cursor-pointer hover:-translate-y-2">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CardHeader className="relative z-10 pb-3 md:pb-6">
          <CardTitle className="flex items-start justify-between text-gray-100 group-hover:text-indigo-400 transition-colors gap-3">
            <span className="break-words leading-tight text-xl md:text-2xl">{project.name}</span>
            <Github className="h-5 w-5 flex-shrink-0 mt-1 group-hover:rotate-12 transition-transform" />
          </CardTitle>
          <CardDescription className="text-gray-400 line-clamp-4 md:line-clamp-2 min-h-[60px] md:min-h-[40px] mt-2 leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 relative z-10 pt-2 md:pt-4">
          <div className="flex flex-wrap gap-2">
            {project.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="bg-indigo-900/50 text-indigo-300 border-indigo-700">
                {lang}
              </Badge>
            ))}
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-cyan-900/50 text-cyan-300 border-cyan-700">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 pointer-events-none group-hover:scale-105 transition-transform"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Project
            </Button>
          </div>
        </CardContent>
      </a>
    </Card>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

function Projects({ username }: ProjectsProps) {
  const projects: Project[] = projectsData;
  const ref = useRef(null);

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-800 relative overflow-hidden">
      {/* Simplified grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="text-center mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm">
              <span className="text-sm text-indigo-300">My Work</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Check out some of my recent work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-12 opacity-0 animate-in" style={{ animationDelay: '400ms' }}>
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-700 text-indigo-300 hover:bg-indigo-900/50 hover:scale-105 transition-all"
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