import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo, memo } from 'react';
import { Code2, Layers, Wrench, Zap, Database, Globe } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface Project {
  name: string;
  description: string;
  languages: string[];
  technologies: string[];
  link: string;
}

const SkillCard = memo(({ category, index }: { category: any; index: number }) => {
  const IconComponent = category.icon;

  return (
    <div
      className="opacity-0 animate-in hover-lift"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <Card className="glass-card hover:border-indigo-500/50 transition-all duration-300 h-full relative overflow-hidden group">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        {/* Corner decoration */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl" />

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-gray-100 text-lg font-semibold">{category.title}</span>
              <p className="text-gray-500 text-xs mt-0.5">{category.skills.length} technologies</p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill: string) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:bg-indigo-500/30 hover:text-indigo-200 hover:border-indigo-500/50 transition-colors duration-200 px-3 py-1.5 text-sm cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

function Skills() {
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
      skills: programmingLanguages.length > 0 ? programmingLanguages : ['JavaScript', 'TypeScript', 'Python', 'Java'],
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Web & Frameworks',
      icon: Globe,
      skills: webTechnologies.length > 0 ? webTechnologies.slice(0, 8) : ['React', 'Node.js', 'Tailwind CSS', 'Vite'],
      color: 'from-indigo-500 to-violet-600',
    },
    {
      title: 'Tools & Technologies',
      icon: Wrench,
      skills: tools.length > 0 ? tools.slice(0, 8) : ['Git', 'Firebase', 'Docker', 'APIs'],
      color: 'from-violet-500 to-purple-600',
    },
  ];

  // Skill highlights
  const highlights = [
    { icon: Zap, label: 'Fast Learner', color: 'text-yellow-400' },
    { icon: Database, label: 'Database Design', color: 'text-cyan-400' },
    { icon: Layers, label: 'Full Stack', color: 'text-indigo-400' },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-6 pb-32 md:pb-24 bg-gradient-to-br from-slate-800 via-indigo-900/20 to-slate-900 relative overflow-hidden">
      {/* Background orbs with soft blur */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full animate-blob" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-3 md:px-4 py-2 border border-indigo-500/30 bg-indigo-500/10 rounded-full inline-flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span className="text-xs md:text-sm text-indigo-300">Tech Stack from Projects</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
            Technologies I've used and mastered across my projects
          </p>
        </div>

        {/* Skill highlights */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-12 opacity-0 animate-in" style={{ animationDelay: '200ms' }}>
          {highlights.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm hover:scale-105 transition-transform"
              >
                <IconComponent className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center opacity-0 animate-in" style={{ animationDelay: '500ms' }}>
          <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Always learning and exploring new technologies
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);