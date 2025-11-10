"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "St. Paul University Philippines",
    period: "2022 - Present",
    description:
      "Major in Web Development. Currently in 3rd year, focusing on full-stack web development, database management, and software engineering principles.",
    achievements: ["Web Development Major", "Active Learner", "Project Portfolio"],
  },
]

const certifications = [
  { name: "CyberSummit 2022", issuer: "St. Paul University Philippines", year: "2022", type: "Participation" },
  { name: "CyberSummit 2023", issuer: "St. Paul University Philippines", year: "2023", type: "Participation" },
  { name: "CyberSummit 2024", issuer: "St. Paul University Philippines", year: "2024", type: "Participation" },
  { name: "HackTheNorth Seminar 2025", issuer: "St. Paul University Philippines", year: "2025", type: "Participation" },
  { name: "Rich Media Film Showing", issuer: "St. Paul University Philippines", year: "2024", type: "1st Runner Up" },
]
// </CHANGE>

export function EducationSection() {
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
    <section id="education" ref={sectionRef} className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 fade-on-scroll">Education & Certifications</h2>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 fade-on-scroll">Education</h3>
          <Card className="p-6 fade-on-scroll transition-all duration-300 hover:shadow-lg hover:scale-[1.02] max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">{education[0].degree}</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  {education[0].institution} • {education[0].period}
                </p>
                <p className="text-sm mb-3">{education[0].description}</p>
                <div className="flex flex-wrap gap-2">
                  {education[0].achievements.map((achievement) => (
                    <Badge key={achievement} variant="secondary" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          {/* </CHANGE> */}
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 fade-on-scroll">Certifications & Learning</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, idx) => (
              <Card
                key={idx}
                className="p-4 fade-on-scroll transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </p>
                    {cert.type && (
                      <p className="text-xs text-accent font-medium mt-1">{cert.type}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
