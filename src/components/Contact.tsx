import { Button } from '@/components/ui/button';
import { Github, Mail, Twitter, Send, Terminal, ShieldAlert } from 'lucide-react';
import { memo } from 'react';

interface ContactProps {
  githubUrl: string;
  email: string;
  twitter: string;
}

function Contact({ githubUrl, email, twitter }: ContactProps) {
  const contactMethods = [
    {
      icon: Mail,
      title: 'ENCRYPTED_MAIL',
      value: email,
      href: `mailto:${email}`,
      color: 'text-cyber-red',
    },
    {
      icon: Github,
      title: 'GIT_REPO',
      value: githubUrl.replace('https://github.com/', '@'),
      href: githubUrl,
      color: 'text-cyber-text',
    },
    {
      icon: Twitter,
      title: 'COMMS_relay',
      value: '@tharealjozef',
      href: twitter,
      color: 'text-cyber-text',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs font-mono tracking-widest mb-4">
          <ShieldAlert className="w-3 h-3 animate-pulse" />
          <span>SECURE_CONNECTION_ESTABLISHED</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-cyber-text tracking-tighter mb-4">
          ESTABLISH_UPLINK
        </h2>
        <p className="font-mono text-cyber-muted text-sm max-w-xl mx-auto">
          // INITIATE HANDSHAKE PROTOCOL. TRANSMISSION LINES OPEN.
          <br />// WAITING FOR INPUT...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.title} className="group relative">
              <div className="absolute inset-0 bg-cyber-red/5 translate-x-1 translate-y-1 -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-300" />

              <a
                href={method.href}
                target={method.title !== 'ENCRYPTED_MAIL' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="block h-full border border-cyber-gray/30 bg-cyber-black p-6 hover:border-cyber-red/50 transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 bg-cyber-dark border border-cyber-gray/20 rounded-none group-hover:border-cyber-red/30 transition-colors">
                    <Icon className={`w-6 h-6 ${method.color}`} />
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs text-cyber-muted uppercase tracking-wider">
                      {method.title}
                    </div>
                    <div className="font-mono text-sm text-cyber-text group-hover:text-cyber-red transition-colors">
                      {method.value}
                    </div>
                  </div>

                  <div className="w-full mt-2 pt-4 border-t border-cyber-gray/10 flex justify-center">
                    <span className="text-[10px] font-mono text-cyber-muted/50 group-hover:text-cyber-red/70 flex items-center gap-1 uppercase tracking-widest transition-colors">
                      Connect <Terminal className="w-2 h-2" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Button
          size="lg"
          className="bg-cyber-red text-black hover:bg-red-500 hover:text-white font-bold tracking-wider rounded-none border border-transparent hover:border-cyber-red/50 transition-all"
          asChild
        >
          <a href={`mailto:${email}`}>
            <Send className="mr-2 w-4 h-4" />
            INITIATE_TRANSMISSION
          </a>
        </Button>
      </div>
    </div>
  );
}

export default memo(Contact);
