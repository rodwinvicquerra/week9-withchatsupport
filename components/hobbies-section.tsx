"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Weight, Music, Utensils, Target, Activity } from "lucide-react"

const hobbies = [
  { name: "GYM WORKOUT", icon: Weight, color: "text-red-500" },
  { name: "RUNNING", icon: Activity, color: "text-blue-500" },
  { name: "Basketball", icon: Target, color: "text-orange-500" },
  { name: "Guitar", icon: Music, color: "text-purple-500" },
  { name: "Cooking", icon: Utensils, color: "text-green-500" },
]

export function HobbiesSection() {
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
    <section id="hobbies" ref={sectionRef} className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-on-scroll flex items-center gap-3">
          <Heart className="h-10 w-10 text-primary" />
          Hobbies & Interests
        </h2>
        <p className="text-lg text-foreground/80 mb-12 fade-on-scroll max-w-2xl">
          When I'm not coding, I enjoy staying active and exploring my creative side through various hobbies and interests.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby, idx) => (
            <Card
              key={hobby.name}
              className="p-6 fade-on-scroll transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer border-2 hover:border-primary/50 bg-card"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors ${hobby.color}`}>
                  <hobby.icon className="h-8 w-8 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {hobby.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

