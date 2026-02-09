import { Button } from '@/components/ui/button';
import { Github, ArrowDown, Terminal, Shield, Wifi, Battery, Zap, FileDown } from 'lucide-react';
import { memo, useState, useEffect } from 'react';

interface HeroProps {
  bio: string;
  githubUrl: string;
  onScrollToProjects: () => void;
}

// --- Hooks for System Status ---

function useBattery() {
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);

  useEffect(() => {
    // Battery API requires Secure Context (HTTPS) or localhost.
    // Fallback for insecure contexts (HTTP LAN) to simulate active status
    if (!navigator.getBattery) {
      setBattery({ level: 0.85, charging: true });
      return;
    }

    let batteryManager: BatteryManager | null = null;

    const updateBattery = () => {
      if (batteryManager) {
        setBattery({
          level: batteryManager.level,
          charging: batteryManager.charging,
        });
      }
    };

    navigator.getBattery().then((bm) => {
      batteryManager = bm;
      updateBattery();
      bm.addEventListener('levelchange', updateBattery);
      bm.addEventListener('chargingchange', updateBattery);
    }).catch(() => {
      // Fallback
      setBattery({ level: 0.85, charging: true });
    });

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', updateBattery);
        batteryManager.removeEventListener('chargingchange', updateBattery);
      }
    };
  }, []);

  return battery;
}

function useNetwork() {
  const [network, setNetwork] = useState<{ type: string; speed?: number; effectiveType?: string } | null>(null);

  useEffect(() => {
    // Cast to any because navigator.connection is experimental/not in all TS definitions
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const updateNetwork = () => {
      if (navigator.onLine === false) {
        setNetwork(null);
        return;
      }

      if (conn) {
        const type = conn.type || conn.effectiveType || 'UNKNOWN';
        setNetwork({
          type: type.toUpperCase(),
          speed: conn.downlink,
          effectiveType: conn.effectiveType,
        });
      } else {
        // Fallback for browsers without Network Information API
        setNetwork({
          type: 'WIFI_LINK', // Default to looking like a cool connection
          speed: 100,
          effectiveType: '4g',
        });
      }
    };

    updateNetwork();

    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    if (conn) {
      conn.addEventListener('change', updateNetwork);
    }

    return () => {
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
      if (conn) {
        conn.removeEventListener('change', updateNetwork);
      }
    };
  }, []);

  return network;
}

// Simulated scrambling hook
function useScramble(text: string, active: boolean = true) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#$%&*';

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 2; // Speed of decoding
    }, 50);

    return () => clearInterval(interval);
  }, [text, active]);

  return display;
}

function Hero({ bio, githubUrl, onScrollToProjects }: HeroProps) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const battery = useBattery();
  const network = useNetwork();

  // Simulated SSID logic
  const [ssid, setSsid] = useState('SCANNING...');

  useEffect(() => {
    if (network?.type === 'WIFI' || network?.type === 'WIFI_LINK' || network?.effectiveType === '4g') {
      // Simulate finding a "Target" network
      const fakeSSIDs = ['SECURE_LINK_V5', 'PROXY_NODE_01', 'TARGET_NET', 'HIDDEN_UPLINK'];
      const finalSSID = fakeSSIDs[Math.floor(Math.random() * fakeSSIDs.length)];
      setSsid(finalSSID);
    }
  }, [network]);

  const scrambledSSID = useScramble(ssid, true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

      {/* Left Column: Operator Interface */}
      <div className="lg:col-span-8 flex flex-col gap-8 relative z-10">

        {/* Status Bar */}
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-6 text-[10px] sm:text-xs font-mono text-cyber-muted tracking-wider border-b border-cyber-gray/30 pb-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-red animate-pulse rounded-none" />
            <span><span className="sm:hidden">SYS</span><span className="hidden sm:inline">sys_OK</span></span>
          </div>

          {/* Network Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" title={network?.speed ? `${network.speed} Mbps` : 'Network Status'}>
            <Wifi className={`w-3 h-3 ${network ? 'text-cyber-text' : 'text-cyber-muted'}`} />
            <span>
              {network ? (
                ['WIFI', 'WIFI_LINK', '4G'].includes(network.type) ? scrambledSSID : `NET_${network.type}`
              ) : 'OFFLINE'}
            </span>
          </div>

          {/* Battery Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {battery?.charging ? (
              <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />
            ) : (
              <Battery className={`w-3 h-3 ${battery && battery.level < 0.2 ? 'text-red-500 animate-pulse' : 'text-cyber-muted'}`} />
            )}
            <span>
              {battery ? `${Math.round(battery.level * 100)}%` : 'PWR_N/A'}
            </span>
          </div>

          <div className="ml-auto text-cyber-red whitespace-nowrap shrink-0 pl-2">
            {time}
          </div>
        </div>

        {/* Main Title Area */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs font-mono tracking-widest">
            <Terminal className="w-3 h-3" />
            <span>INITIATING ROOT ACCESS...</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-cyber-text leading-[0.9]">
            RED TEAM<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-red via-red-500 to-cyber-muted animate-glitch block mt-2">
              OPERATOR
            </span>
          </h1>

          <div className="flex items-center gap-4 text-xl sm:text-2xl font-mono text-cyber-muted">
            <span>&gt; App_Dev</span>
            <span className="text-cyber-gray">|</span>
            <span>&gt; Cyber_Sec</span>
          </div>
        </div>

        {/* Bio Terminal */}
        <div className="p-6 border-l-2 border-cyber-red/50 bg-cyber-gray/10 font-mono text-sm md:text-base text-cyber-muted leading-relaxed max-w-2xl relative group">
          <div className="absolute -left-[3px] top-0 h-8 w-[4px] bg-cyber-red" />
          <p className="group-hover:text-cyber-text transition-colors duration-300">
            <span className="text-cyber-red mr-2">$</span>
            {bio}
            <span className="animate-blink inline-block w-2 h-4 bg-cyber-red ml-1 align-middle" />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            className="bg-cyber-red text-black hover:bg-red-500 hover:text-white font-bold tracking-wider rounded-none border border-transparent hover:border-cyber-red/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            onClick={onScrollToProjects}
          >
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              DEPLOY MISSION
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-cyber-gray/50 text-cyber-text hover:bg-cyber-red/10 hover:border-cyber-red/50 hover:text-cyber-red font-mono rounded-none transition-all duration-300"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              ACCESS REPO
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10 font-mono rounded-none transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
            asChild
          >
            <a href="/CV.pdf" download="CV_Jozef.pdf">
              <FileDown className="mr-2 h-4 w-4" />
              RESUME.exe
            </a>
          </Button>
        </div>

        {/* Scroll Hint - Mobile In-Flow */}
        <div
          className="flex md:hidden items-center gap-3 text-cyber-muted/50 font-mono text-xs tracking-widest cursor-pointer hover:text-cyber-red transition-colors pt-8"
          onClick={onScrollToProjects}
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          SCROLL_TO_ACKNOWLEDGE
        </div>
      </div>

      {/* Right Column: Decorative Data Viz */}
      <div className="hidden lg:col-span-4 lg:flex flex-col gap-4 border border-cyber-gray/20 p-4 bg-cyber-black/50 ml-auto w-full relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-red" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-red" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-red" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-red" />

        <div className="h-64 relative overflow-hidden bg-cyber-dark border border-cyber-gray/10">
          <div className="absolute inset-x-0 h-[1px] bg-cyber-red/50 animate-scanline w-full" />
          <div className="p-4 font-mono text-xs text-cyber-muted space-y-2 opacity-70">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <span>0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
                <span className="text-cyber-red/50">{Math.random() > 0.5 ? 'ENCRYPTED' : 'OPEN'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-cyber-gray/20 bg-cyber-gray/5">
            <div className="text-[10px] text-cyber-muted uppercase mb-1">Packet Loss</div>
            <div className="text-2xl font-mono text-cyber-red">0.0%</div>
          </div>
          <div className="p-4 border border-cyber-gray/20 bg-cyber-gray/5">
            <div className="text-[10px] text-cyber-muted uppercase mb-1">Latency</div>
            <div className="text-2xl font-mono text-cyber-text">12ms</div>
          </div>
        </div>
      </div>

      {/* Scroll Hint - Desktop Absolute */}
      <div
        className="hidden md:flex absolute bottom-10 left-6 items-center gap-3 text-cyber-muted/50 font-mono text-xs tracking-widest cursor-pointer hover:text-cyber-red transition-colors"
        onClick={onScrollToProjects}
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
        SCROLL_TO_ACKNOWLEDGE
      </div>
    </div>
  );
}

export default memo(Hero);