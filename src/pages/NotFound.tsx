import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Ghost, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-center relative overflow-hidden">
      {/* Background orbs with soft blur */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full animate-blob" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full animate-blob animation-delay-2000" />

      <div className="space-y-8 max-w-md relative z-10 opacity-0 animate-in">
        {/* Ghost icon with animation */}
        <div className="flex justify-center animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 border border-indigo-500/30 flex items-center justify-center relative">
              <Ghost className="w-12 h-12 text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* 404 with gradient */}
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">
            Page Not Found
          </h2>

          <p className="text-gray-400 text-lg">
            Oops! The page you're looking for seems to have vanished into the digital void.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
            asChild
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </a>
          </Button>

          <Button
            variant="outline"
            className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Fun message */}
        <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Lost? Let's get you back on track!
        </p>
      </div>
    </div>
  );
}
