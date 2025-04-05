"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import ToolGrid from "@/components/tool-grid"
import "../../../styles/suite-page.css"

const securityTools = {
  pro: [
    { name: "IP & DNS Lookup", icon: "🌍", description: "Find IP info and DNS records" },
    { name: "Ping/Traceroute", icon: "📡", description: "Check server status and trace paths" },
    { name: "Password Generator", icon: "🔐", description: "Generate secure, strong passwords" },
    { name: "Hash Generator", icon: "🧬", description: "Create MD5, SHA-256 and other hashes" },
    { name: "WHOIS Lookup", icon: "📃", description: "Look up domain ownership and status" },
  ],
}

export default function NetworkSecuritySuite() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="suite-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="suite-content">
        <div className="suite-header">
          <div className="suite-icon">🌐</div>
          <h1>Network & Security Suite</h1>
        </div>
        <div className="suite-description">
          Pro-level tools for IT admins and cybersecurity experts.
        </div>
        <div className="tier-section pro-section">
          <h2 className="tier-title">Pro Tools</h2>
          <div className="pro-overlay">
            <div className="pro-message">
              <h3>Upgrade to Pro</h3>
              <p>Access advanced network & security tools with a Pro plan</p>
              <button className="upgrade-button">Upgrade Now</button>
            </div>
          </div>
          <ToolGrid tools={securityTools.pro} />
        </div>
      </main>
    </div>
  )
}
