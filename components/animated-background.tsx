"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      // Use full document height to cover entire page
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      )
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    // Update canvas height on scroll to cover full page
    const handleScroll = () => {
      const newHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      )
      if (canvas.height !== newHeight) {
        canvas.height = newHeight
      }
    }
    
    window.addEventListener("scroll", handleScroll)

    // Initialize points
    const pointCount = 50
    pointsRef.current = Array.from({ length: pointCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with slight fade for trail effect
      const isDark = document.documentElement.classList.contains("dark")
      ctx.fillStyle = isDark ? "rgba(17, 17, 17, 0.05)" : "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update canvas size if content height changed
      const currentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      )
      if (canvas.height !== currentHeight) {
        canvas.height = currentHeight
      }

      const lineColor = isDark ? "rgba(100, 200, 255, 0.4)" : "rgba(70, 100, 200, 0.3)"
      const dotColor = isDark ? "rgba(100, 200, 255, 0.7)" : "rgba(70, 100, 200, 0.5)"

      // Update and draw points
      pointsRef.current.forEach((point, i) => {
        // Update position
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Keep within bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x))
        point.y = Math.max(0, Math.min(canvas.height, point.y))

        // Mouse interaction
        const dx = mouseRef.current.x - point.x
        const dy = mouseRef.current.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          point.vx += dx * 0.0001
          point.vy += dy * 0.0001
        }

        // Draw connections
        pointsRef.current.slice(i + 1).forEach((otherPoint) => {
          const dx = point.x - otherPoint.x
          const dy = point.y - otherPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.6
            ctx.strokeStyle = isDark 
              ? `rgba(100, 200, 255, ${opacity})` 
              : `rgba(70, 100, 200, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.stroke()
          }
        })

        // Draw point
        ctx.fillStyle = dotColor
        ctx.beginPath()
        ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Add subtle glow to dots
        ctx.shadowBlur = 4
        ctx.shadowColor = isDark ? "rgba(100, 200, 255, 0.5)" : "rgba(70, 100, 200, 0.4)"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100%",
      }}
      aria-hidden="true"
    />
  )
}

