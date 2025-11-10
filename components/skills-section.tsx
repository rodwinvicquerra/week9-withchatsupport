"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    category: "Frontend Frameworks",
    skills: ["React", "HTML", "CSS", "JavaScript"],
    icon: "⚛️",
  },
  {
    category: "Backend Frameworks",
    skills: ["Laravel", "Node.js", "PHP"],
    icon: "🚀",
  },
  {
    category: "Databases & Tools",
    skills: ["SQL", "Prisma", "Vercel"],
    icon: "💾",
  },
]

export function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 fade-on-scroll">Skills & Expertise</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <Card
              key={category.category}
              className="p-6 md:p-8 fade-on-scroll transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 bg-card"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-primary">{category.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkill === skill ? "default" : "secondary"}
                    className="cursor-pointer transition-all duration-200 hover:scale-110 text-sm font-medium px-3 py-1"
                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
