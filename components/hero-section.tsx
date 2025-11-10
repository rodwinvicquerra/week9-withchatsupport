"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains("dark")
      ctx.fillStyle = isDark ? "rgba(100, 200, 255, 0.5)" : "rgba(70, 100, 200, 0.3)"
      ctx.strokeStyle = isDark ? "rgba(100, 200, 255, 0.2)" : "rgba(70, 100, 200, 0.15)"

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particles.forEach((otherParticle, j) => {
          if (i === j) return
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-in fade-in duration-1000">
        <div className="mb-6 flex justify-center">
          <div className="relative h-28 w-28 md:h-36 md:w-36">
            <Image
              src="/profile.jpg"
              alt="Rodwin Vicquerra profile photo"
              fill
              sizes="144px"
              priority
              className="rounded-full object-cover ring-2 ring-primary/40 shadow-xl"
            />
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-accent dark:to-white">
          Rodwin Vicquerra
        </h1>
        <p className="text-2xl md:text-3xl text-foreground mb-4 font-semibold">IT Student | Web Developer</p>
        <p className="text-lg md:text-xl text-foreground/80 mb-2 max-w-2xl mx-auto text-pretty font-medium">
          22 Years Old • San Rafael, Roxas, Isabela 3320
        </p>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          3rd Year IT Student majoring in Web Development. Passionate about creating modern, responsive web experiences with React, Laravel, and Node.js
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={scrollToAbout} 
            size="lg" 
            className="group transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg font-semibold"
          >
            Explore My Work
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
