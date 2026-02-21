"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Startup Inc.",
    duration: "2023 - Present",
    description: "Lead frontend architecture and design system development. Mentored 3+ junior developers.",
    highlights: ["React", "Next.js", "TypeScript", "Design Systems"],
  },
  {
    role: "Full Stack Developer",
    company: "Digital Agency",
    duration: "2021 - 2023",
    description: "Built and maintained 15+ client projects. Increased performance by 40%.",
    highlights: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    role: "UI/UX Developer",
    company: "Design Studio",
    duration: "2019 - 2021",
    description: "Collaborated with designers to create pixel-perfect interfaces and smooth interactions.",
    highlights: ["React", "Figma", "GSAP", "Tailwind CSS"],
  },
  {
    role: "Junior Web Developer",
    company: "Web Solutions Co.",
    duration: "2018 - 2019",
    description: "Built responsive websites and started learning full-stack development.",
    highlights: ["HTML/CSS", "JavaScript", "jQuery", "PHP"],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      })

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen w-full px-4 md:px-12 py-24 md:py-32 flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Experience
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            PROFESSIONAL JOURNEY
          </h2>
        </div>

        {/* Experience timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group relative"
            >
              {/* Timeline connector */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />

              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-accent rounded-full -translate-x-1.5 md:-translate-x-2 border-4 border-background" />

              {/* Content */}
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-12 group-even:ml-auto group-even:md:pl-12 group-even:md:pr-0">
                <div className="border border-border/40 hover:border-accent/40 transition-colors duration-300 bg-card/30 backdrop-blur-sm p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2 md:mt-0">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="font-mono text-sm text-accent mb-4">{exp.company}</p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Highlights/Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full border border-border/60 bg-background/50 font-mono text-[10px] uppercase tracking-widest text-foreground/80"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
