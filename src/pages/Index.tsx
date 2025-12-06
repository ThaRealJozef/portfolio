import { useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import NextSectionHint from '@/components/NextSectionHint';

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // GitHub username
  const GITHUB_USERNAME = 'tharealjozef';

  const scrollToSection = useCallback((sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      home: homeRef,
      projects: projectsRef,
      skills: skillsRef,
      education: educationRef,
      contact: contactRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      // On mobile with snap container, scroll within container
      if (window.innerWidth < 768 && containerRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        const offsetTop = targetRef.current.offsetTop;
        const headerHeight = 80;
        window.scrollTo({
          top: sectionId === 'home' ? 0 : offsetTop - headerHeight,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const scrollToProjects = () => scrollToSection('projects');
  const scrollToSkills = () => scrollToSection('skills');
  const scrollToEducation = () => scrollToSection('education');
  const scrollToContact = () => scrollToSection('contact');

  const bio = "I'm a passionate coder who loves building apps and experimenting with new tech. While I lean towards app development, I'm a quick learner and can adapt to anything. Right now, I'm really into cybersecurity and can't wait to dive deeper into it soon. When I'm not coding, you'll catch me binge-watching series or movies!";

  // Fun messages for each section transition
  const sectionHints = {
    home: { message: "Check out what I've built", emoji: "🚀" },
    projects: { message: "See my superpowers", emoji: "⚡" },
    skills: { message: "My learning journey", emoji: "🎓" },
    education: { message: "Let's connect!", emoji: "💬" },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 snap-container">
      <Header onNavigate={scrollToSection} />

      {/* Home / Hero Section */}
      <div ref={homeRef} className="snap-section relative">
        <Hero
          title="App Developer & Aspiring Cybersecurity Enthusiast"
          bio={bio}
          githubUrl={`https://github.com/${GITHUB_USERNAME}`}
          onScrollToProjects={scrollToProjects}
        />
        {/* The Hero already has its own scroll indicator */}
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className="snap-section relative">
        <Projects username={GITHUB_USERNAME} />
        <NextSectionHint
          message={sectionHints.projects.message}
          emoji={sectionHints.projects.emoji}
          onClick={scrollToSkills}
        />
      </div>

      {/* Skills Section */}
      <div ref={skillsRef} className="snap-section relative">
        <Skills />
        <NextSectionHint
          message={sectionHints.skills.message}
          emoji={sectionHints.skills.emoji}
          onClick={scrollToEducation}
        />
      </div>

      {/* Education Section */}
      <div ref={educationRef} className="snap-section relative">
        <Education />
        <NextSectionHint
          message={sectionHints.education.message}
          emoji={sectionHints.education.emoji}
          onClick={scrollToContact}
        />
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="snap-section relative">
        <Contact
          githubUrl={`https://github.com/${GITHUB_USERNAME}`}
          email="yjrhider@gmail.com"
          twitter="https://x.com/tharealjozef"
        />
        {/* Last section - no next hint needed */}
      </div>
    </div>
  );
}