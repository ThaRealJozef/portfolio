import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Hash, Folder, Database } from 'lucide-react';
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
  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="h-full bg-cyber-black border border-cyber-gray/30 rounded-none overflow-hidden transition-all duration-300 hover:border-cyber-red/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]">

        {/* Header Bar */}
        <div className="h-8 bg-cyber-dark border-b border-cyber-gray/30 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-red/50 group-hover:bg-cyber-red" />
            <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider">SECURE_ASSET_{index + 1}</span>
          </div>
          <Folder className="w-3 h-3 text-cyber-muted group-hover:text-cyber-red" />
        </div>

        <CardHeader className="pt-6 relative z-10">
          <CardTitle className="flex items-start justify-between text-cyber-text gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-bold font-mono group-hover:text-cyber-red transition-colors">
                ./{project.name}
              </span>
            </div>
          </CardTitle>
          <p className="text-cyber-muted text-sm border-l-2 border-cyber-gray/30 pl-3 mt-4 leading-relaxed font-mono">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2">
            {[...project.languages, ...project.technologies.slice(0, 3)].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-cyber-gray/20 text-cyber-text/80 border border-cyber-gray/30 rounded-none font-mono text-xs hover:bg-cyber-red/10 hover:text-cyber-red hover:border-cyber-red/30 transition-colors"
              >
                <Hash className="w-2 h-2 mr-1 opacity-50" />
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3 pt-2 border-t border-cyber-gray/20 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-none border border-transparent hover:border-cyber-red/30 hover:bg-cyber-red/5 text-cyber-muted hover:text-cyber-red font-mono text-xs uppercase tracking-wider justify-between group/btn"
              asChild
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <span>VIEW_SOURCE</span>
                <Github className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

function Projects({ username }: ProjectsProps) {
  const projects: Project[] = projectsData;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyber-gray/20 pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-cyber-text tracking-tighter mb-2">
            PROJECT_INDEX
            <span className="text-cyber-red text-6xl">.</span>
          </h2>
          <p className="font-mono text-cyber-muted text-sm">
            // AUTHORIZED ACCESS ONLY. LISTING RECENT DEPLOYMENTS.
          </p>
        </div>

        <div className="flex items-center gap-2 text-cyber-red font-mono text-xs px-3 py-1 bg-cyber-red/5 border border-cyber-red/20">
          <Database className="w-3 h-3 animate-pulse" />
          <span>{projects.length} RECORDS FOUND</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button
          size="lg"
          variant="outline"
          className="border-cyber-gray/50 text-cyber-muted hover:bg-cyber-red hover:text-white hover:border-cyber-red font-mono rounded-none uppercase tracking-widest transition-all duration-300"
          asChild
        >
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            ACCESS_FULL_ARCHIVE
          </a>
        </Button>
      </div>
    </div>
  );
}

export default memo(Projects);