import { GraduationCap, BookOpen, Clock, MapPin } from 'lucide-react';
import { memo } from 'react';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  description?: string;
  icon?: typeof GraduationCap;
}

function Education() {
  const education: EducationItem[] = [
    {
      degree: "Bachelor in Computer Science and Technology (English)",
      institution: "Dalian Polytechnic University",
      location: "Dalian, China",
      graduationDate: "June 2025",
      description: "Focus: Software Development, Algorithms, Modern Computing.",
      icon: GraduationCap,
    },
    {
      degree: "Baccalaureate in Experimental Science: Physical Science (French)",
      institution: "High School Hassan II",
      location: "Rabat, Morocco",
      graduationDate: "June 2021",
      description: "Foundation in Physics and Experimental Methodologies.",
      icon: BookOpen,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-cyber-text tracking-tighter mb-4">
          SYSTEM_LOG
        </h2>
        <p className="font-mono text-cyber-muted text-sm">
          // ACADEMIC HISTORY AND CERTIFICATION TRACKING.
        </p>
      </div>

      <div className="relative border-l-2 border-cyber-gray/20 ml-3 md:ml-6 space-y-12 py-4">
        {education.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-12 group">
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 bg-cyber-black border-2 border-cyber-muted group-hover:border-cyber-red group-hover:bg-cyber-red transition-all duration-300" />

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
              <span className="font-mono text-cyber-red text-sm font-bold tracking-widest">
                [{item.graduationDate}]
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-cyber-text group-hover:text-cyber-red transition-colors">
                {item.degree}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono text-cyber-muted mb-4">
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                <span>{item.institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>
            </div>

            <p className="text-cyber-muted/80 max-w-2xl bg-cyber-gray/5 p-4 border-l-2 border-cyber-gray/30 font-mono text-sm group-hover:border-cyber-red/50 transition-colors">
              &gt; {item.description}
            </p>
          </div>
        ))}

        {/* End of Log */}
        <div className="relative pl-8 md:pl-12">
          <div className="absolute -left-[5px] top-2 w-2 h-2 bg-cyber-gray/50 rounded-full" />
          <span className="font-mono text-cyber-muted text-xs tracking-widest">
             // END OF RECORDS
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Education);