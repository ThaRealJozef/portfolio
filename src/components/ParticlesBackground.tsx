// Clean gradient mesh background - optimized for performance
// No blur effects to prevent lag on scroll/hover
export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient mesh - static, no animations */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 10% 20%, rgba(99, 102, 241, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 90% 70%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 40% 90%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating orbs - NO blur for performance */}
      <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] bg-indigo-500/15 rounded-full animate-float-slow" />
      <div className="absolute top-[60%] right-[10%] w-[250px] h-[250px] bg-cyan-500/12 rounded-full animate-float-slow animation-delay-2000" />
      <div className="absolute bottom-[20%] left-[40%] w-[200px] h-[200px] bg-violet-500/10 rounded-full animate-float-slow animation-delay-4000" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Accent glow spots - small so no performance hit */}
      <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
      <div className="absolute top-[50%] left-[25%] w-1.5 h-1.5 bg-indigo-400/50 rounded-full animate-pulse animation-delay-2000" />
      <div className="absolute bottom-[30%] right-[35%] w-1 h-1 bg-violet-400/40 rounded-full animate-pulse animation-delay-4000" />
    </div>
  );
}