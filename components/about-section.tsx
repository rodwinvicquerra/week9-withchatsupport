"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 fade-on-scroll">About Me</h2>
        <Card className="p-8 md:p-10 fade-on-scroll transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/50">
          <div className="space-y-6 text-lg leading-relaxed">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary mb-4">Personal Information</h3>
                <p className="text-foreground"><span className="font-semibold">Name:</span> Rodwin Vicquerra • <span className="font-semibold">Age:</span> 22 years old</p>
                <p className="text-foreground"><span className="font-semibold">Location:</span> San Rafael, Roxas, Isabela 3320</p>
                <p className="text-foreground"><span className="font-semibold">Contact:</span> +63 916 582 9185</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary mb-4">Current Focus</h3>
                <p className="text-foreground">
                  Currently learning and mastering <span className="font-semibold text-accent">Laravel</span>, <span className="font-semibold text-accent">React</span>, and <span className="font-semibold text-accent">Node.js</span> to build full-stack web applications.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-foreground">
                I'm a 3rd year IT student majoring in Web Development at St. Paul University Philippines. I'm passionate about creating
                modern, responsive, and user-friendly web applications that solve real-world problems.
              </p>
              <p className="text-foreground mt-4">
                Throughout my academic journey, I've been developing my skills in front-end and back-end technologies,
                focusing on building clean, efficient, and scalable web solutions. I enjoy learning new frameworks and
                staying up-to-date with the latest web development trends.
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-foreground font-semibold mb-1">Side Projects:</p>
                  <p className="text-foreground">• <span className="font-semibold text-accent">Hotel Crew</span> - Working on hotel management and crew coordination systems</p>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-1">Outside Coding:</p>
                  <p className="text-foreground">• Helping with our family business - <span className="font-semibold text-accent">Lita's Lechon</span>, where I assist with operations and management</p>
                </div>
              </div>
              <p className="text-foreground mt-4">
                I'm eager to apply my knowledge in real-world projects and continue growing as a developer. I'm always
                open to new opportunities, collaborations, and learning experiences that will help me become a better
                developer.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
