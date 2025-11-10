"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Barangay Issue Reporting System",
    description:
      "A community platform for reporting issues and managing events. Features resident and official dashboards, issue tracking, event management, and user authentication system.",
    technologies: ["HTML", "CSS", "PHP", "WAMP", "MySQL"],
    github: "#",
    demo: "http://codebyceto.site/brgyportal_2/",
    image: "/placeholder.jpg",
    featured: true,
  },
  {
    title: "SecureAuth Framework",
    description:
      "Open-source authentication framework with built-in security features including MFA, rate limiting, and session management. Used by over 1000+ developers worldwide.",
    technologies: ["Node.js", "TypeScript", "Redis", "JWT"],
    github: "#",
    demo: "#",
    image: "/authentication-security-interface.jpg",
  },
  {
    title: "Network Threat Monitor",
    description:
      "Real-time network monitoring system that detects and alerts on suspicious activities. Integrates with SIEM platforms and provides actionable threat intelligence.",
    technologies: ["Go", "Elasticsearch", "Grafana", "Docker"],
    github: "#",
    demo: "#",
    image: "/network-monitoring-dashboard.png",
  },
  {
    title: "Phishing Detection ML",
    description:
      "Machine learning model that identifies phishing emails and websites with 98% accuracy. Trained on millions of samples and continuously updated with new threat data.",
    technologies: ["Python", "TensorFlow", "scikit-learn", "FastAPI"],
    github: "#",
    demo: "#",
    image: "/machine-learning-security-analysis.jpg",
  },
  {
    title: "Cloud Security Auditor",
    description:
      "Automated cloud security assessment tool for AWS, Azure, and GCP. Checks for misconfigurations, compliance violations, and security best practices.",
    technologies: ["Python", "Boto3", "Terraform", "GitHub Actions"],
    github: "#",
    demo: "#",
    image: "/cloud-security-audit-dashboard.jpg",
  },
  {
    title: "Incident Response Platform",
    description:
      "Comprehensive incident response management system with automated playbooks, evidence collection, and team collaboration features.",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    github: "#",
    demo: "#",
    image: "/incident-response-platform-interface.jpg",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "zoom-in-95")
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
    <section id="projects" ref={sectionRef} className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 fade-on-scroll">Featured Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              className="overflow-hidden fade-on-scroll transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 group/btn bg-transparent" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 group/btn" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
