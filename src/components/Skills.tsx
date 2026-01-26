import { useMemo, memo } from 'react';
import { Code2, Layers, Wrench, Zap, Database, Globe, Cpu, Terminal } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface Project {
  name: string;
  description: string;
  languages: string[];
  technologies: string[];
  link: string;
}

const SkillBar = memo(({ name }: { name: string }) => {
  // Random "load" percentage for visual effect
  const load = Math.floor(Math.random() * (98 - 70) + 70);

  return (
    <div className="group flex items-center gap-4 py-2 border-b border-cyber-gray/20 hover:bg-cyber-gray/5 transition-colors">
      <div className="w-24 font-mono text-xs text-cyber-muted group-hover:text-cyber-red transition-colors">
        {name}
      </div>
      <div className="flex-1 h-2 bg-cyber-dark relative overflow-hidden">
        <div
          className="h-full bg-cyber-muted/20 group-hover:bg-cyber-red/50 transition-colors duration-300"
          style={{ width: `${load}%` }}
        />
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-cyber-red/20 w-[2px] animate-[scanline_2s_linear_infinite]" />
      </div>
      <div className="w-12 font-mono text-xs text-right text-cyber-muted group-hover:text-cyber-text">
        {load}%
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';

function Skills() {
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
      title: 'LANGUAGES & PROTOCOLS',
      icon: Code2,
      skills: programmingLanguages.length > 0 ? programmingLanguages : ['JavaScript', 'TypeScript', 'Python', 'Java'],
    },
    {
      title: 'FRAMEWORKS & LIBS',
      icon: Globe,
      skills: webTechnologies.length > 0 ? webTechnologies.slice(0, 8) : ['React', 'Node.js', 'Tailwind CSS', 'Vite'],
    },
    {
      title: 'SYSTEM TOOLS',
      icon: Wrench,
      skills: tools.length > 0 ? tools.slice(0, 8) : ['Git', 'Firebase', 'Docker', 'APIs'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Header Column */}
        <div className="md:w-1/3 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs font-mono tracking-widest mb-4">
              <Cpu className="w-3 h-3" />
              <span>SYSTEM_DIAGNOSTICS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-cyber-text tracking-tighter mb-4">
              SKILL_SET
            </h2>
            <p className="font-mono text-cyber-muted text-sm leading-relaxed border-l-2 border-cyber-gray/30 pl-4">
              // ANALYZING TECHNOLOGICAL CAPABILITIES.<br />
              // PROFICIENCY LEVELS DETECTED.<br />
              // OPTIMIZED FOR FULL-STACK OPERATIONS.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-cyber-gray/5 border border-cyber-gray/20">
              <Zap className="w-5 h-5 text-yellow-500 mb-2" />
              <div className="text-xs font-mono text-cyber-muted">LEARNING_RATE</div>
              <div className="text-xl font-bold text-cyber-text">RAPID</div>
            </div>
            <div className="p-4 bg-cyber-gray/5 border border-cyber-gray/20">
              <Database className="w-5 h-5 text-cyber-red mb-2" />
              <div className="text-xs font-mono text-cyber-muted">DB_ARCH</div>
              <div className="text-xl font-bold text-cyber-text">OPTIMIZED</div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-cyber-red pb-2">
                <category.icon className="w-4 h-4 text-cyber-red" />
                <h3 className="font-mono font-bold text-cyber-text text-sm tracking-wider">{category.title}</h3>
              </div>
              <div className="space-y-1">
                {category.skills.map((skill) => (
                  <SkillBar key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Skills);