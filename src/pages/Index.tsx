import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

export default function Portfolio() {
  const GITHUB_USERNAME = 'tharealjozef';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const headerHeight = 80;
      window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  const scrollToProjects = () => scrollToSection('projects');

  const bio = "I'm a passionate coder who loves building apps and experimenting with new tech. While I lean towards app development, I'm a quick learner and can adapt to anything. Right now, I'm really into cybersecurity and can't wait to dive deeper into it soon.";

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text selection:bg-cyber-red/30">
      <Header onNavigate={scrollToSection} />

      <main className="flex flex-col gap-0">

        {/* Home / Hero Section */}
        <section id="home" className="min-h-screen relative flex items-center justify-center pt-20">
          <Hero
            title="System.Operator"
            bio={bio}
            githubUrl={`https://github.com/${GITHUB_USERNAME}`}
            onScrollToProjects={scrollToProjects}
          />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative border-t border-cyber-gray/20 bg-cyber-dark/50">
          <Projects username={GITHUB_USERNAME} />
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 relative border-t border-cyber-gray/20">
          <Skills />
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 relative border-t border-cyber-gray/20 bg-cyber-dark/50">
          <Education />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative border-t border-cyber-gray/20 mb-20">
          <Contact
            githubUrl={`https://github.com/${GITHUB_USERNAME}`}
            email="yjrhider@gmail.com"
            twitter="https://x.com/tharealjozef"
          />
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-cyber-muted font-mono text-xs border-t border-cyber-gray/20">
          <p>© {new Date().getFullYear()} THAREALJOZEF. EXECUTE ORDER 66.</p>
        </footer>

      </main>
    </div>
  );
}