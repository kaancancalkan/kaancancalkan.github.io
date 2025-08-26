import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Kaan Can Calkan | ERP Consultant",
  description:
    "Kaan Can Calkan, experienced ERP Consultant with expertise in SAP ABAP, Fiori, and enterprise solutions.",
  keywords: [
    "Kaan Can Calkan",
    "ERP Consultant",
    "SAP ABAP",
    "SAP Fiori",
    "Enterprise Solutions",
    "ERP Development"
  ],
  authors: [{ name: "Kaan Can Calkan" }],
  openGraph: {
    title: "Kaan Can Calkan - ERP Consultant",
    description:
      "Discover the professional background of Kaan Can Calkan, ERP Consultant specialized in SAP ABAP, Fiori, and enterprise solutions.",
    url: "https://kaancancalkan.github.io",
    siteName: "Kaan Can Calkan",
    locale: "en_US",
    type: "website",
  },
  generator: "v0.app",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
