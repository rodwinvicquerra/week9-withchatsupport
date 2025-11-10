"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Phone, MapPin, Check, Copy } from "lucide-react"
import { toast } from "sonner"

const contactLinks = [
  {
    name: "Email",
    value: "rodwindizvicquerra@gmail.com",
    href: "mailto:rodwindizvicquerra@gmail.com",
    icon: Mail,
  },
  {
    name: "Phone",
    value: "+63 916 582 9185",
    href: "tel:+639165829185",
    icon: Phone,
  },
  {
    name: "Location",
    value: "San Rafael, Roxas, Isabela 3320",
    href: "#",
    icon: MapPin,
  },
  {
    name: "GitHub",
    value: "github.com/rudWin",
    href: "https://github.com/rudWin",
    icon: Github,
  },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

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

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(label)
      toast.success(`${label} copied to clipboard!`)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-on-scroll">Get In Touch</h2>
        <p className="text-lg text-foreground/80 mb-12 fade-on-scroll max-w-2xl mx-auto">
          I'm always open to discussing new projects, collaborations, or opportunities. Feel free to
          reach out through any of the channels below.
        </p>
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {contactLinks.map((link, idx) => {
            const isCopyable = link.name === "Email" || link.name === "Phone"
            const isCopied = copiedItem === link.name
            
            return (
              <Card
                key={link.name}
                className="p-6 md:p-8 fade-on-scroll transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer border-2 hover:border-primary/50 bg-card relative"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div 
                  className="flex items-center gap-4"
                  onClick={() => {
                    if (isCopyable) {
                      const textToCopy = link.name === "Email" 
                        ? "rodwindizvicquerra@gmail.com" 
                        : "+639165829185"
                      copyToClipboard(textToCopy, link.name)
                    } else if (link.href !== "#") {
                      window.open(link.href, link.href.startsWith('http') ? '_blank' : '_self')
                    }
                  }}
                >
                  <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors relative">
                    <link.icon className="h-6 w-6 text-primary" />
                    {isCopyable && (
                      <div className="absolute -top-1 -right-1 bg-accent rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isCopied ? (
                          <Check className="h-3 w-3 text-accent-foreground" />
                        ) : (
                          <Copy className="h-3 w-3 text-accent-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">{link.name}</h3>
                      {isCopyable && (
                        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to copy
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{link.value}</p>
                  </div>
                </div>
                {isCopied && (
                  <div className="absolute inset-0 bg-accent/10 border-2 border-accent rounded-lg animate-pulse" />
                )}
              </Card>
            )
          })}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-on-scroll">
          <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" asChild>
            <a href="mailto:rodwindizvicquerra@gmail.com">
              <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Send Me an Email
            </a>
          </Button>
          <Button size="lg" variant="outline" className="group border-2 hover:bg-accent hover:text-accent-foreground" asChild>
            <a href="tel:+639165829185">
              <Phone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Call Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
