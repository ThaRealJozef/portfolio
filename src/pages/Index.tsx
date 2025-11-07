import { useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';

export default function Portfolio() {
  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // GitHub username
  const GITHUB_USERNAME = 'tharealjozef';

  const scrollToSection = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      home: homeRef,
      projects: projectsRef,
      skills: skillsRef,
      education: educationRef,
      contact: contactRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      const offsetTop = targetRef.current.offsetTop;
      const headerHeight = 80; // Approximate header height
      window.scrollTo({
        top: sectionId === 'home' ? 0 : offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const scrollToProjects = () => {
    scrollToSection('projects');
  };

  const bio = "I'm a passionate coder who loves building apps and experimenting with new tech. While I lean towards app development, I'm a quick learner and can adapt to anything. Right now, I'm really into cybersecurity and can't wait to dive deeper into it soon. When I'm not coding, you'll catch me binge-watching series or movies!";

  return (
    <div className="min-h-screen bg-slate-950 cursor-none">
      <CustomCursor />
      <Header onNavigate={scrollToSection} />
      
      <div ref={homeRef}>
        <Hero
          name="Jozef"
          title="App Developer & Aspiring Cybersecurity Enthusiast"
          bio={bio}
          githubUrl={`https://github.com/${GITHUB_USERNAME}`}
          onScrollToProjects={scrollToProjects}
        />
      </div>

      <div ref={projectsRef}>
        <Projects username={GITHUB_USERNAME} />
      </div>

      <div ref={skillsRef}>
        <Skills />
      </div>

      <div ref={educationRef}>
        <Education />
      </div>

      <div ref={contactRef}>
        <Contact
          githubUrl={`https://github.com/${GITHUB_USERNAME}`}
          email="yjrhider@gmail.com"
          twitter="https://x.com/tharealjozef"
        />
      </div>
    </div>
  );
}