import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef, useMemo, memo } from 'react';
import { Code2, Layers, Wrench } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface Project {
  name: string;
  description: string;
  languages: string[];
  technologies: string[];
  link: string;
  stars?: number;
  forks?: number;
}

const SkillCard = memo(({ category, index }: { category: any; index: number }) => (
  <div
    className="opacity-0 animate-in"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <Card className={`bg-slate-800/50 border-slate-700 hover:${category.borderColor} transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 backdrop-blur-sm h-full relative overflow-hidden group hover:-translate-y-1`}>
      <div className="absolute inset-0 from-indigo-500 to-violet-500 group-hover:opacity-10 transition-opacity duration-300 opacity-0" />

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} group-hover:rotate-12 transition-transform`}>
            <category.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-100">{category.title}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill: string) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-slate-700/50 text-gray-300 hover:bg-indigo-900/50 hover:text-indigo-300 transition-all duration-300 cursor-default hover:scale-110"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
));

SkillCard.displayName = 'SkillCard';

function Skills() {
  const ref = useRef(null);

  // Extract skills from projects data
  const skills = useMemo(() => {
    const projects: Project[] = projectsData;
    const languagesSet = new Set<string>();
    const technologiesSet = new Set<string>();

    projects.forEach((project) => {
      project.languages.forEach((lang) => languagesSet.add(lang));
      project.technologies.forEach((tech) => technologiesSet.add(tech));
    });

    return {
      languages: Array.from(languagesSet).sort(),
      technologies: Array.from(technologiesSet).sort(),
    };
  }, []);

  // Categorize skills
  const programmingLanguages = skills.languages.filter(lang => 
    ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin', 'Ruby', 'PHP', 'Dart', 'PowerShell', 'JSON'].includes(lang)
  );

  const webTechnologies = skills.technologies.filter(tech => 
    ['React', 'Node.js', 'Vue', 'Angular', 'Next.js', 'Express', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'Webpack', 'Vite', 'Chrome Extension', 'Browser Extension'].some(t => 
      tech.toLowerCase().includes(t.toLowerCase())
    )
  );

  const tools = skills.technologies.filter(tech => 
    ['API', 'TensorFlow', 'Deep Learning', 'CNN', 'GUI', 'Cloudflare', 'Proxy', 'Windows', 'RDP', 'Automation', 'cubari-source'].some(t => 
      tech.toLowerCase().includes(t.toLowerCase())
    )
  );

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code2,
      skills: programmingLanguages.length > 0 ? programmingLanguages : ['JavaScript', 'TypeScript', 'Python'],
      color: 'from-cyan-500 to-blue-500',
      borderColor: 'border-cyan-500/50',
    },
    {
      title: 'Web & Frameworks',
      icon: Layers,
      skills: webTechnologies.length > 0 ? webTechnologies.slice(0, 8) : ['React', 'Node.js', 'HTML', 'CSS'],
      color: 'from-indigo-500 to-violet-500',
      borderColor: 'border-indigo-500/50',
    },
    {
      title: 'Tools & Technologies',
      icon: Wrench,
      skills: tools.length > 0 ? tools.slice(0, 8) : ['Git', 'API', 'Testing'],
      color: 'from-violet-500 to-purple-500',
      borderColor: 'border-violet-500/50',
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-br from-slate-800 via-indigo-900/20 to-slate-900 relative overflow-hidden">
      {/* Simplified animated background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="text-center mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 border border-indigo-500/30 backdrop-blur-sm bg-indigo-500/10 rounded-full">
              <span className="text-sm text-indigo-300">Tech Stack from Projects</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 text-lg">
            Technologies I've used across my projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center opacity-0 animate-in" style={{ animationDelay: '450ms' }}>
          <p className="text-gray-400 mb-6 text-lg">
            Always learning and exploring new technologies
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);