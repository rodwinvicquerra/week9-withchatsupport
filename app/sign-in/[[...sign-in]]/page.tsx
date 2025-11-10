"use client"

import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace("/portfolio")
  }, [isLoaded, isSignedIn, router])

  // Determine if dark mode is active
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark")

  if (!isLoaded) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black dark:from-background dark:to-background relative overflow-hidden">
      <AnimatedBackground />
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Welcome to Rodwin's Portfolio
          </h1>
          <p className="text-foreground/80 text-lg md:text-xl">
            Discover projects, skills, and a journey of continuous growth. Sign in to get the full experience.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <div className="mb-4 text-center text-sm text-foreground/70">
            <span>First time? </span>
            <Link href="/sign-up" className="text-primary hover:text-primary/80 underline font-semibold">Create an account</Link>
          </div>

          <div className={`rounded-2xl border-2 backdrop-blur-sm shadow-2xl p-8 md:p-10 ${
            isDark 
              ? "border-gray-300 bg-white/95" 
              : "border-slate-400 bg-slate-800/95"
          }`}>
            <div className="text-center mb-8">
              <p className={`text-base uppercase tracking-wider font-bold ${
                isDark ? "text-black" : "text-white"
              }`}>
                Sign in with Clerk
              </p>
            </div>
            <SignIn
              afterSignInUrl="/portfolio"
              afterSignUpUrl="/portfolio"
              appearance={{
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "iconButton",
                  logoPlacement: "none",
                  showOptionalFields: true,
                },
                variables: {
                  colorPrimary: isDark ? "#ffffff" : "#000000",
                  colorText: isDark ? "#000000" : "#ffffff",
                  colorBackground: isDark ? "#ffffff" : "#1e293b",
                  colorInputBackground: isDark ? "#f8f9fa" : "#334155",
                  colorInputText: isDark ? "#000000" : "#ffffff",
                  colorTextSecondary: isDark ? "#4b5563" : "#cbd5e1",
                  colorNeutral: isDark ? "#e5e7eb" : "#475569",
                  colorDanger: "#ef4444",
                  borderRadius: "0.75rem",
                },
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "border-0 bg-transparent shadow-none max-w-xl w-full",
                  header: "hidden",
                  form: "space-y-6",
                  formFieldInput: isDark 
                    ? "!text-lg !h-16 !bg-white !text-black !placeholder:text-gray-500 !border-2 !border-gray-300 focus-visible:!ring-4 focus-visible:!ring-black/20 focus-visible:!border-black !transition-all !duration-200 !font-medium !rounded-xl !px-4 !shadow-lg"
                    : "!text-lg !h-16 !bg-slate-700 !text-white !placeholder:text-slate-300 !border-2 !border-slate-500 focus-visible:!ring-4 focus-visible:!ring-blue-500/50 focus-visible:!border-blue-400 !transition-all !duration-200 !font-medium !rounded-xl !px-4 !shadow-lg",
                  formFieldLabel: isDark
                    ? "!text-base !font-bold !text-black !mb-2"
                    : "!text-base !font-bold !text-white !mb-2",
                  formButtonPrimary: isDark
                    ? "!h-14 !text-lg !font-bold !bg-black hover:!bg-gray-800 !text-white !rounded-xl !shadow-xl hover:!shadow-2xl !transition-all !duration-200"
                    : "!h-14 !text-lg !font-bold !bg-blue-600 hover:!bg-blue-500 !text-white !rounded-xl !shadow-xl hover:!shadow-2xl !transition-all !duration-200",
                  footer: "hidden",
                  socialButtonsBlockButton: isDark
                    ? "!h-14 !text-base !border-2 !border-gray-300 hover:!border-black !bg-white hover:!bg-gray-50 !text-black !rounded-xl !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-200"
                    : "!h-14 !text-base !border-2 !border-slate-400 hover:!border-slate-300 !bg-slate-600 hover:!bg-slate-500 !text-white !rounded-xl !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-200",
                  socialButtons: "!gap-4 !mt-8",
                  alternativeMethods: "!mt-8",
                  dividerLine: isDark ? "!bg-gray-300 !h-0.5" : "!bg-slate-400 !h-0.5",
                  dividerText: isDark ? "!text-gray-600 !text-base !font-semibold !bg-white !px-4" : "!text-slate-200 !text-base !font-semibold !bg-slate-800 !px-4",
                  identityPreview: "hidden",
                  formHeaderTitle: "hidden",
                  formHeaderSubtitle: "hidden",
                  footerActionText: isDark ? "!text-gray-600 !text-base" : "!text-slate-200 !text-base",
                  footerActionLink: isDark ? "!text-black hover:!text-gray-700 !font-semibold !underline" : "!text-blue-400 hover:!text-blue-300 !font-semibold !underline",
                  formHeaderText: isDark ? "!text-black !text-xl !font-bold" : "!text-white !text-xl !font-bold",
                  formHeaderSubtext: isDark ? "!text-gray-600 !text-base" : "!text-slate-300 !text-base",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}