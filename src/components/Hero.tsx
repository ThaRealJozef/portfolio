import { Button } from '@/components/ui/button';
import { Github, ArrowDown, Sparkles } from 'lucide-react';
import { memo, useState, useEffect } from 'react';
import ParticlesBackground from './ParticlesBackground';

interface HeroProps {
  title: string;
  bio: string;
  githubUrl: string;
  onScrollToProjects: () => void;
}

// Typing effect hook
function useTypewriter(texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

function Hero({ title, bio, githubUrl, onScrollToProjects }: HeroProps) {
  const roles = [
    'App Developer',
    'Cybersecurity Enthusiast',
    'Problem Solver',
    'Tech Explorer',
  ];

  const typedRole = useTypewriter(roles, 80, 40, 2500);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 pt-20">
      <ParticlesBackground />

      {/* Gradient orbs with soft blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 rounded-full animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl opacity-0 animate-in">
        <div className="space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Available for opportunities</span>
          </div>

          <p className="text-xl md:text-3xl text-gray-400 font-light">
            Hey there! I'm
          </p>

          {/* Name with gradient */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent leading-tight">
              Youssef Jrhider
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-xl">
              <span className="w-6 md:w-8 h-px bg-gradient-to-r from-transparent to-indigo-500" />
              <span className="text-indigo-400 font-light italic">aka</span>
              <span className="text-cyan-300 font-semibold tracking-wide">Jozef</span>
              <span className="w-6 md:w-8 h-px bg-gradient-to-l from-transparent to-cyan-500" />
            </div>
          </div>

          {/* Typewriter effect for role */}
          <div className="text-base sm:text-xl md:text-2xl text-gray-300 font-light h-8 flex items-center justify-center gap-1">
            <span className="text-cyan-400">&lt;</span>
            <span>{typedRole}</span>
            <span className="w-0.5 h-5 md:h-6 bg-cyan-400 ml-1 animate-blink" />
            <span className="text-cyan-400">/&gt;</span>
          </div>

          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            {bio}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full px-4 sm:px-0">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/50 transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={onScrollToProjects}
          >
            <span className="flex items-center justify-center">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-indigo-400 text-indigo-300 hover:bg-indigo-950/50 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Github className="mr-2 h-4 w-4" />
              GitHub Profile
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator - different for desktop and mobile */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onScrollToProjects}
      >
        {/* Desktop: Mouse scroll indicator */}
        <div className="hidden md:flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-indigo-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-scroll-dot" />
          </div>
        </div>

        {/* Mobile: Swipe up indicator with bouncing chevrons */}
        <div className="flex md:hidden flex-col items-center gap-1 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Swipe Up</span>
          <div className="flex flex-col items-center -space-y-1">
            <svg className="w-5 h-5 text-indigo-400 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <svg className="w-5 h-5 text-indigo-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);