import Link from "next/link"
import "../styles/hero-section.css"

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Innovatrix</h1>
        <p className="hero-subtitle">One platform, endless possibilities. All your essential tools in one place.</p>
        <Link href="/dashboard" className="get-started-button">
          Get Started for Free
        </Link>
      </div>
      <div className="hero-background">
        <div className="aurora-bg"></div>
      </div>
    </div>
  )
}

