import { Button } from '@/components/ui/button';
import { Github, ArrowDown, Sparkles } from 'lucide-react';
import { memo } from 'react';
import ParticlesBackground from './ParticlesBackground';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  githubUrl: string;
  onScrollToProjects: () => void;
}

function Hero({ name, title, bio, githubUrl, onScrollToProjects }: HeroProps) {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 pt-20">
      <ParticlesBackground />
      
      {/* Simplified animated gradient orbs - reduced complexity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
        <div className="space-y-4 opacity-0 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Available for opportunities</span>
          </div>

          <p className="text-2xl md:text-3xl text-gray-400 font-light">
            Hey there! I'm
          </p>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            {name}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light">
            {title}
          </p>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {bio}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-in" style={{ animationDelay: '300ms' }}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/70 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={onScrollToProjects}
          >
            <span className="flex items-center">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-indigo-400 text-indigo-300 hover:bg-indigo-950/50 shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95 transition-all"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub Profile
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-indigo-400" />
      </div>
    </section>
  );
}

export default memo(Hero);