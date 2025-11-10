"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages } from "lucide-react"

const languages = [
  { name: "English", proficiency: "Low", level: 30 },
  { name: "Filipino / Tagalog", proficiency: "High", level: 95 },
  { name: "Bisaya", proficiency: "High", level: 90 },
  { name: "Ilocano", proficiency: "High", level: 85 },
]

export function LanguagesSection() {
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
    <section id="languages" ref={sectionRef} className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 fade-on-scroll flex items-center gap-3">
          <Languages className="h-10 w-10 text-primary" />
          Languages
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {languages.map((lang, idx) => (
            <Card
              key={lang.name}
              className="p-6 fade-on-scroll transition-all duration-300 hover:shadow-lg hover:scale-105 group border-2 hover:border-primary/50"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {lang.name}
                </h3>
                <Badge
                  variant={lang.proficiency === "High" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {lang.proficiency}
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    lang.proficiency === "High"
                      ? "bg-primary"
                      : "bg-accent"
                  }`}
                  style={{ width: `${lang.level}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{lang.level}% proficiency</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

