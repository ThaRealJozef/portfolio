import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useRef, memo } from 'react';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  description?: string;
}

const EducationCard = memo(({ item, index }: { item: EducationItem; index: number }) => (
  <div
    className={`relative flex items-center ${
      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
    } opacity-0 animate-in`}
    style={{ animationDelay: `${400 + index * 200}ms` }}
  >
    {/* Timeline dot */}
    <div
      className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full transform md:-translate-x-1/2 z-10 border-4 border-slate-950 hover:scale-150 transition-transform"
    />

    {/* Content card */}
    <div className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${
      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
    }`}>
      <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 backdrop-blur-sm group relative overflow-hidden hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-start gap-3 text-gray-100">
            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex-shrink-0 group-hover:rotate-12 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{item.degree}</h3>
              <p className="text-indigo-300 font-semibold">{item.institution}</p>
            </div>
          </CardTitle>
          {item.description && (
            <CardDescription className="text-gray-400 mt-2">
              {item.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>{item.graduationDate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
));

EducationCard.displayName = 'EducationCard';

function Education() {
  const ref = useRef(null);

  const education: EducationItem[] = [
    {
      degree: "Bachelor in Computer Science and Technology (English)",
      institution: "Dalian Polytechnic University",
      location: "Dalian, China",
      graduationDate: "June 2025",
      description: "Comprehensive program covering software development, algorithms, and modern computing technologies."
    },
    {
      degree: "Baccalaureate in Experimental Science: Physical Science (French)",
      institution: "High School Hassan II",
      location: "Rabat, Morocco",
      graduationDate: "June 2021",
      description: "Foundation in scientific principles with focus on physics and experimental methodologies."
    }
  ];

  return (
    <section id="education" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Simplified animated background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <div className="text-center mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm">
              <span className="text-sm text-indigo-300">Academic Journey</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Educational Background
          </h2>
          <p className="text-gray-400 text-lg">
            Building a strong foundation in computer science and technology
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-violet-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {education.map((item, index) => (
              <EducationCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Education);