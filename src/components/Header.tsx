import { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Terminal, Code2, Cpu, Shield, Mail, FileDown, LucideIcon } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect which section is visible
  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'education', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Center of viewport
        threshold: 0
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Detect scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    isDownload?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: '~/home', icon: Terminal },
    { id: 'projects', label: './projects', icon: Code2 },
    { id: 'skills', label: './skills', icon: Cpu },
    { id: 'education', label: './log', icon: Shield },
    { id: 'contact', label: './contact', icon: Mail },
    { id: 'cv', label: './resume', icon: FileDown, isDownload: true },
  ];

  const handleNavClick = (sectionId: string, isDownload?: boolean) => {
    if (isDownload) {
      window.open('/CV.pdf', '_blank');
      return;
    }
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${isScrolled
          ? 'bg-cyber-black/90 border-b border-cyber-red/20 backdrop-blur-sm py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 border border-cyber-red/50 bg-cyber-black flex items-center justify-center group-hover:border-cyber-red transition-colors">
                <span className="text-cyber-red font-bold text-lg group-hover:animate-pulse">_J</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-cyber-text tracking-tighter">
                  JOZEF<span className="text-cyber-red">.DEV</span>
                </span>
                <span className="text-[10px] text-cyber-muted uppercase tracking-widest -mt-1 group-hover:text-cyber-red transition-colors">
                  System.Admin
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`relative px-4 py-2 text-sm transition-all duration-200 border border-transparent ${isActive
                      ? 'text-cyber-red border-cyber-red/20 bg-cyber-red/5'
                      : 'text-cyber-muted hover:text-cyber-text hover:border-cyber-muted/20'
                      }`}
                    onClick={() => handleNavClick(item.id, item.isDownload)}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cyber-text hover:text-cyber-red p-2 border border-transparent hover:border-cyber-red/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-cyber-black/95 flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-start gap-6 font-mono w-full px-12" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`text-xl flex items-center gap-4 w-full justify-start p-4 hover:bg-cyber-red/10 border-l-2 transition-all ${activeSection === item.id
                    ? 'text-cyber-red border-cyber-red'
                    : 'text-cyber-muted border-transparent hover:text-cyber-text hover:border-cyber-muted'
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleNavClick(item.id, item.isDownload)}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Header);