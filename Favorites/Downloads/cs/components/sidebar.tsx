"use client"
import { useState } from "react"
import Link from "next/link"
import "../styles/sidebar.css"

const suites = [
  { name: "Developer Suite", icon: "💻", path: "/dashboard/developer" },
  { name: "Student Suite", icon: "🎓", path: "/dashboard/student" },
  { name: "Office Suite", icon: "💼", path: "/dashboard/office" },
  { name: "Designer Suite", icon: "🎨", path: "/dashboard/designer" },
  { name: "Network Suite", icon: "🌐", path: "/dashboard/network" },
]

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [suitesOpen, setSuitesOpen] = useState(false)

  const toggleSuites = () => {
    setSuitesOpen(!suitesOpen)
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="sidebar-logo">
            Innovatrix
          </Link>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link href="/dashboard/profile" className="nav-item">
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </Link>

          <div className="nav-item dropdown" onClick={toggleSuites}>
          <div className="nav-item-content">
  <span className="nav-icon">📦</span>
  <span className="nav-text">Suites</span>
  <span className="dropdown-arrow" style={{ transform: suitesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    ▼
  </span>
</div>

            {suitesOpen && (
              <div className="dropdown-menu">
                {suites.map((suite, index) => (
                  <Link href={suite.path} key={index} className="dropdown-item">
                    <span className="dropdown-icon">{suite.icon}</span>
                    <span>{suite.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/dashboard/chatbot" className="nav-item">
            <span className="nav-icon">💬</span>
            <span className="nav-text">Chatbot</span>
          </Link>

          <Link href="/dashboard/payment" className="nav-item">
            <span className="nav-icon">💳</span>
            <span className="nav-text">Payment</span>
          </Link>
        </nav>
      </div>

      {!isOpen && (
        <button className="sidebar-open-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}
    </>
  )
}

