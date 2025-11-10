"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { LanguagesSection } from "@/components/languages-section"
import { HobbiesSection } from "@/components/hobbies-section"
import { ContactSection } from "@/components/contact-section"
import { SocialMediaSection } from "@/components/social-media-section"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { UserButton, useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PortfolioPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/sign-in")
    } catch (error) {
      console.error("Sign out error:", error)
      // Force redirect even if sign out fails
      router.push("/sign-in")
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <nav className="fixed top-0 right-0 m-4 z-50 flex items-center gap-3">
        <ThemeToggle />
        <UserButton 
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "bg-background border border-border shadow-lg",
              userButtonPopoverActionButton: "hover:bg-muted"
            }
          }}
        />
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors font-medium shadow-md"
        >
          Sign Out
        </button>
      </nav>
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <LanguagesSection />
        <HobbiesSection />
        <ContactSection />
        <SocialMediaSection />
        <Footer />
      </div>
    </main>
  )
}