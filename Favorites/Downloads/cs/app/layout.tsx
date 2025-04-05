import type React from "react"
import "../styles/global.css"

export const metadata = {
  title: "Innovatrix - All Your Tools in One Place",
  description:
    "A unified platform for developers, designers, students, and professionals with all the tools you need in one place.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}



import './globals.css'
import { ClerkProvider } from "@clerk/nextjs"
