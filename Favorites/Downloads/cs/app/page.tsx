import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import HeroSection from "@/components/hero-section"
import SuiteMarquee from "@/components/suite-marquee"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="signed-in-container">
          <div>Hello there</div>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="main-container">
          <header className="main-header">
            <div className="header-container">
              <Link href="/" className="logo">
                <span className="logo-text">Innovatrix</span>
              </Link>
              <div className="auth-buttons">
                <Link href="/sign-in" className="login-button">
                  Log In
                </Link>
                <Link href="/sign-up" className="signup-button">
                  Sign Up
                </Link>
              </div>
            </div>
          </header>

          <HeroSection />
          <SuiteMarquee />
          <FeatureSection />
          <TestimonialSection />
          <Footer />
        </div>
      </SignedOut>
    </>
  )
}

