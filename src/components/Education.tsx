import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { memo } from 'react';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  description?: string;
  icon?: typeof GraduationCap;
}

const EducationCard = memo(({ item, index }: { item: EducationItem; index: number }) => {
  const IconComponent = item.icon || GraduationCap;
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex items-center opacity-0 animate-in ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      style={{ animationDelay: `${400 + index * 200}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 z-20">
        <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full transform md:-translate-x-1/2 border-4 border-slate-950 hover:scale-150 transition-transform" />
      </div>

      {/* Content card */}
      <div className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${isEven ? 'md:mr-8' : 'md:ml-8'
        }`}>
        <Card className="glass-card hover:border-indigo-500/50 transition-all duration-300 group relative overflow-hidden hover-lift">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Decorative corner */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl" />

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-start gap-4 text-gray-100">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex-shrink-0 shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-transform duration-300">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.degree}
                </h3>
                <p className="text-indigo-300 font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {item.institution}
                </p>
              </div>
            </CardTitle>
            {item.description && (
              <CardDescription className="text-gray-400 mt-3 leading-relaxed">
                {item.description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{item.graduationDate}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

EducationCard.displayName = 'EducationCard';

function Education() {
  const education: EducationItem[] = [
    {
      degree: "Bachelor in Computer Science and Technology (English)",
      institution: "Dalian Polytechnic University",
      location: "Dalian, China",
      graduationDate: "June 2025",
      description: "Comprehensive program covering software development, algorithms, and modern computing technologies.",
      icon: GraduationCap,
    },
    {
      degree: "Baccalaureate in Experimental Science: Physical Science (French)",
      institution: "High School Hassan II",
      location: "Rabat, Morocco",
      graduationDate: "June 2021",
      description: "Foundation in scientific principles with focus on physics and experimental methodologies.",
      icon: BookOpen,
    }
  ];

  return (
    <section id="education" className="py-16 md:py-24 px-4 md:px-6 pb-32 md:pb-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 relative overflow-visible">
      {/* Background orbs with soft blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full animate-blob" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full animate-blob animation-delay-2000" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-3 md:px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full inline-flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">Academic Journey</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Educational Background
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
            Building a strong foundation in computer science and technology
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-violet-500 transform md:-translate-x-1/2" />

          <div className="space-y-16">
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