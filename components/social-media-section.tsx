"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube } from "lucide-react"

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/rodzz.diz/",
    icon: Facebook,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
    description: "Connect with me on Facebook",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/npmrodev/",
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10 hover:bg-pink-500/20",
    description: "Follow me on Instagram",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@rodz308",
    icon: Youtube,
    color: "text-red-500",
    bgColor: "bg-red-500/10 hover:bg-red-500/20",
    description: "Subscribe to my YouTube channel",
  },
]

export function SocialMediaSection() {
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
    <section id="social" ref={sectionRef} className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-on-scroll">Follow Me</h2>
        <p className="text-lg text-foreground/80 mb-12 fade-on-scroll max-w-2xl mx-auto">
          Connect with me on social media to stay updated with my latest projects, tutorials, and tech insights.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {socialLinks.map((social, idx) => (
            <Card
              key={social.name}
              className="p-6 md:p-8 fade-on-scroll transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer border-2 hover:border-primary/50 bg-card"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className={`p-4 rounded-full ${social.bgColor} transition-all duration-300 group-hover:scale-110`}>
                  <social.icon className={`h-8 w-8 ${social.color} transition-transform group-hover:rotate-12`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {social.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 group/btn border-2 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Visit Profile
                  <social.icon className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

