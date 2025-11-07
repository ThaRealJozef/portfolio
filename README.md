# 🚀 Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, particle effects, and a clean, professional design.

![Portfolio Preview](https://img.shields.io/badge/React-19.1.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blue?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?style=flat-square&logo=vite)

## ✨ Features

- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean interface with smooth animations and transitions
- **Interactive Elements** - Custom cursor, particle background, and hover effects
- **Dark Theme** - Professional dark color scheme with gradient accents
- **Project Showcase** - Display your GitHub projects with descriptions and tech stacks
- **Skills Section** - Highlight your technical skills with visual cards
- **Education Timeline** - Showcase your academic background
- **Contact Information** - Easy ways for visitors to reach you

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.1.1
- **Language:** TypeScript 5.5.3
- **Styling:** Tailwind CSS 3.4.11
- **UI Components:** shadcn/ui (Radix UI)
- **Build Tool:** Vite 5.4.1
- **Animations:** Framer Motion
- **Particles:** tsParticles
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🚀 Build for Production

```bash
pnpm run build
```

The optimized production build will be generated in the `dist` folder.

## 📝 Customization

### Update Personal Information

1. **Hero Section** - Edit `src/components/Hero.tsx` to update your name, title, and bio
2. **Projects** - Modify `src/data/projects.json` to add/edit your projects
3. **Skills** - Update `src/components/Skills.tsx` with your technical skills
4. **Education** - Edit `src/components/Education.tsx` with your academic background
5. **Contact** - Modify `src/components/Contact.tsx` with your contact information

### Customize Styling

- **Colors** - Edit `tailwind.config.ts` to change the color scheme
- **Fonts** - Update `src/index.css` to change typography
- **Animations** - Modify individual component files for animation tweaks

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── data/           # JSON data files
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy your site

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `pnpm run build`
4. Publish directory: `dist`

### Deploy to GitHub Pages

1. Install gh-pages: `pnpm add -D gh-pages`
2. Add to package.json scripts:
```json
"deploy": "pnpm run build && gh-pages -d dist"
```
3. Run: `pnpm run deploy`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/tharealjozef/portfolio/issues).

## 📧 Contact

- **GitHub:** [@tharealjozef](https://github.com/tharealjozef)
- **Email:** yjrhider@gmail.com
- **LinkedIn:** [tharealjozef](https://linkedin.com/in/tharealjozef)

---

⭐ If you like this project, please give it a star on GitHub!