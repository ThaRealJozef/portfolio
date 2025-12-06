import { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, FolderGit2, Wrench, GraduationCap, Mail } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect which section is visible using IntersectionObserver
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
        rootMargin: '-30% 0px -60% 0px',
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
      const snapContainer = document.querySelector('.snap-container');
      const scrollTop = snapContainer ? snapContainer.scrollTop : window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    const snapContainer = document.querySelector('.snap-container');
    window.addEventListener('scroll', handleScroll, { passive: true });
    snapContainer?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      snapContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? 'glass' : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  ThaRealJozef
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest -mt-1">
                  Developer
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`relative px-4 py-2 text-sm transition-colors duration-150 ${activeSection === item.id
                      ? 'text-cyan-400'
                      : 'text-gray-400 hover:text-gray-200'
                      }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-cyan-400 p-2 rounded-lg hover:bg-indigo-500/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - full screen overlay with animation */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-slate-950 flex flex-col items-center justify-center animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Menu items with staggered animation */}
          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="lg"
                  className={`text-xl sm:text-2xl flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl transition-all duration-300 animate-slideUp ${activeSection === item.id
                    ? 'text-cyan-400 bg-indigo-500/20 scale-105'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-indigo-500/10 hover:scale-105'
                    }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  {item.label}
                </Button>
              );
            })}
          </div>
          <p className="absolute bottom-8 text-gray-500 text-sm animate-fadeIn" style={{ animationDelay: '400ms' }}>
            Tap anywhere to close
          </p>
        </div>
      )}
    </>
  );
}

export default memo(Header);