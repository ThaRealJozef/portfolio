import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Mail, Twitter, Heart, Sparkles, Send } from 'lucide-react';
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
      title: 'Email',
      description: 'Drop me a message',
      value: email,
      href: `mailto:${email}`,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Check out my repositories',
      value: githubUrl.replace('https://github.com/', '@'),
      href: githubUrl,
      color: 'from-indigo-500 to-violet-600',
    },
    {
      icon: Twitter,
      title: 'Twitter / X',
      description: 'Follow me on X',
      value: '@tharealjozef',
      href: twitter,
      color: 'from-violet-500 to-purple-600',
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-visible">
      {/* Background orbs with soft blur */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full animate-blob" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full animate-blob animation-delay-2000" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 opacity-0 animate-in">
          <div className="inline-block mb-4">
            <div className="px-3 md:px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full inline-flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">Get In Touch</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-2">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={method.title}
                className="opacity-0 animate-in hover-lift"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <Card className="glass-card hover:border-indigo-500/50 transition-all duration-300 group relative overflow-hidden h-full">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${method.color} shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-gray-100 group-hover:text-cyan-300 transition-colors">
                        {method.title}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {method.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <Button
                      variant="outline"
                      className="w-full border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all"
                      asChild
                    >
                      <a
                        href={method.href}
                        target={method.title !== 'Email' ? '_blank' : undefined}
                        rel={method.title !== 'Email' ? 'noopener noreferrer' : undefined}
                      >
                        {method.value}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center opacity-0 animate-in" style={{ animationDelay: '600ms' }}>
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by Jozef</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} ThaRealJozef. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
