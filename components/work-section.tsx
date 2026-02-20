"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const portfolioProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    tech: ["Next.js", "React", "PostgreSQL", "Stripe"],
    year: "2024",
  },
  {
    id: 2,
    title: "Design System",
    category: "Component Library",
    description: "Comprehensive design system with 50+ accessible components and interactive documentation.",
    tech: ["React", "Tailwind CSS", "TypeScript", "Storybook"],
    year: "2024",
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    category: "Web Application",
    description: "Interactive analytics dashboard with real-time data visualization and custom charts.",
    tech: ["Next.js", "Recharts", "D3.js", "WebSocket"],
    year: "2023",
  },
  {
    id: 4,
    title: "Mobile App UI",
    category: "Mobile Design",
    description: "Pixel-perfect iOS and Android app interface with fluid animations and intuitive navigation.",
    tech: ["Figma", "React Native", "TypeScript"],
    year: "2023",
  },
  {
    id: 5,
    title: "Brand Identity",
    category: "Branding",
    description: "Complete brand identity system including logo, typography, color palette, and guidelines.",
    tech: ["Figma", "Adobe XD", "Design Systems"],
    year: "2024",
  },
  {
    id: 6,
    title: "Content Management System",
    category: "Web Development",
    description: "Headless CMS with custom content types, media management, and API-first architecture.",
    tech: ["Next.js", "MongoDB", "Node.js", "GraphQL"],
    year: "2023",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Project cards stagger animation
      const cards = gridRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Portfolio</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">FEATURED WORK</h2>
      </div>

      {/* Project grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6"
      >
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
}: {
  project: {
    id: number
    title: string
    category: string
    description: string
    tech: string[]
    year: string
  }
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col",
        "transition-all duration-500 ease-out hover:-translate-y-1",
      )}
    >
      {/* Card container */}
      <div className="relative bg-card/40 border border-border/40 hover:border-accent/40 transition-colors duration-300 p-6 md:p-8 flex flex-col h-full">
        {/* Top decorative line */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Category and year */}
        <div className="flex items-baseline justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {project.category}
          </span>
          <time className="font-mono text-[10px] text-muted-foreground/60">{project.year}</time>
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>

        {/* Divider line */}
        <div className="w-8 h-px bg-accent/60 mb-4 group-hover:w-12 transition-all duration-500" />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-accent/10 text-accent rounded border border-accent/30 group-hover:bg-accent/20 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Shadow/depth layer */}
        <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
      </div>
    </article>
  )
}
