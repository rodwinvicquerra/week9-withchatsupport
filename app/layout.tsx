import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Rodwin Vicquerra - Web Developer Portfolio",
  description: "Portfolio of Rodwin Vicquerra - 3rd Year IT Student majoring in Web Development",
  generator: "v0.app",
}

// Force dynamic rendering for Clerk
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get Clerk keys from environment
  // ClerkProvider will handle missing keys gracefully
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  
  return (
    <ClerkProvider publishableKey={publishableKey || undefined}>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <Suspense fallback={null}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
            </ThemeProvider>
          </Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
