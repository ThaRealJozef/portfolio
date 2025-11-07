import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Mail, Twitter } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ContactProps {
  githubUrl: string;
  email: string;
  twitter: string;
}

export default function Contact({ githubUrl, email, twitter }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Drop me a message',
      value: email,
      href: `mailto:${email}`,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Check out my repositories',
      value: githubUrl.replace('https://github.com/', '@'),
      href: githubUrl,
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: Twitter,
      title: 'Twitter / X',
      description: 'Follow me on X',
      value: '@tharealjozef',
      href: twitter,
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm">
              <span className="text-sm text-indigo-300">Get In Touch</span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              style={{ perspective: 1000 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 group backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-br ${method.color}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="text-gray-100">{method.title}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {method.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-700 text-indigo-300 hover:bg-indigo-900/50"
                    asChild
                  >
                    <a href={method.href} target={method.title !== 'Email' ? '_blank' : undefined} rel={method.title !== 'Email' ? 'noopener noreferrer' : undefined}>
                      {method.value}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-sm bg-[#00000000] mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] font-normal text-center opacity-100 text-[#6B7280]">
            This portfolio was created by me obv :)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
