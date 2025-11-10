"use client"

import Link from "next/link"
import { SignUp } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"

export default function SignUpPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isSignedIn) router.replace("/portfolio")
  }, [isSignedIn, router])

  // Determine if dark mode is active
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark")

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-background/40 relative overflow-hidden">
      <AnimatedBackground />
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to Rodwin's Portfolio
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Start your journey here. Create your account to unlock the full experience.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <div className="mb-4 text-center text-sm text-muted-foreground">
            <span>Already have an account? </span>
            <Link href="/sign-in" className="text-primary hover:underline font-medium">Sign in</Link>
          </div>

          <div className={`rounded-2xl border backdrop-blur-sm shadow-xl p-4 md:p-6 ${
            isDark
              ? "border-gray-300 bg-white/95"
              : "border-slate-400 bg-slate-800/95"
          }`}>
            <div className="text-center mb-4">
              <p className={`text-sm uppercase tracking-wider font-semibold ${
                isDark ? "text-black" : "text-white"
              }`}>
                Sign up with Clerk
              </p>
            </div>
            <SignUp
              afterSignInUrl="/portfolio"
              afterSignUpUrl="/portfolio"
              path="/sign-up"
              signInUrl="/sign-in"
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
                  borderRadius: "0.5rem",
                },
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "border-0 bg-transparent shadow-none max-w-xl w-full",
                  header: "hidden",
                  form: "space-y-4",
                  formFieldInput: isDark
                    ? "!text-lg !h-14 !bg-white !text-black !placeholder:text-gray-500 !border-2 !border-gray-300 focus-visible:!ring-2 focus-visible:!ring-black/20 focus-visible:!border-black !transition-all !duration-200 !font-medium !rounded-lg"
                    : "!text-lg !h-14 !bg-slate-700 !text-white !placeholder:text-slate-300 !border-2 !border-slate-500 focus-visible:!ring-2 focus-visible:!ring-blue-500/50 focus-visible:!border-blue-400 !transition-all !duration-200 !font-medium !rounded-lg",
                  formFieldLabel: isDark
                    ? "!text-sm !font-medium !text-black"
                    : "!text-sm !font-medium !text-white",
                  formButtonPrimary: isDark
                    ? "!h-12 !text-base !font-semibold !bg-black hover:!bg-gray-800 !text-white"
                    : "!h-12 !text-base !font-semibold !bg-blue-600 hover:!bg-blue-500 !text-white",
                  footer: "hidden",
                  socialButtonsBlockButton: isDark
                    ? "!h-12 md:!h-14 !text-sm !border-2 !border-gray-300 hover:!border-black !bg-white hover:!bg-gray-50 !text-black"
                    : "!h-12 md:!h-14 !text-sm !border-2 !border-slate-400 hover:!border-slate-300 !bg-slate-600 hover:!bg-slate-500 !text-white",
                  socialButtons: "!gap-3 !mt-4",
                  alternativeMethods: "!mt-4",
                  dividerLine: isDark ? "!bg-gray-300" : "!bg-slate-400",
                  dividerText: isDark ? "!text-gray-600 !text-sm !bg-white" : "!text-slate-200 !text-sm !bg-slate-800",
                  footerActionText: "hidden",
                  footerActionLink: "hidden",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}