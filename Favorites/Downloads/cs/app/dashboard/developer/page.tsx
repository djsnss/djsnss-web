"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import ToolGrid from "@/components/tool-grid"
import "../../../styles/suite-page.css"

const developerTools = {
  free: [
    { name: "JSON/XML/YAML Formatter", icon: "📝", description: "Format and validate JSON, XML, and YAML data" },
    { name: "REST API Client", icon: "🔌", description: "Test and debug REST APIs with a simple interface" },
    { name: "Code Beautifier", icon: "✨", description: "Format HTML, CSS, and JavaScript code" },
    { name: "Base64 Encoder/Decoder", icon: "🔄", description: "Encode and decode Base64 strings" },
  ],
  pro: [
    { name: "JWT Decoder", icon: "🔑", description: "Decode and verify JSON Web Tokens" },
    { name: "Regex Tester", icon: "🔍", description: "Test and debug regular expressions" },
    { name: "API Rate Limits Increase", icon: "⚡", description: "Higher rate limits for API calls" },
  ],
}

export default function DeveloperSuite() {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <div className="suite-page">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <main className="suite-content">  
        <div className="suite-header">
          <div className="suite-icon">💻</div>
          <h1>Developer Suite</h1>
        </div>

        <div className="suite-description">
          Tools for developers to streamline coding workflows and improve productivity.
        </div>

        <div className="tier-section">
          <h2 className="tier-title">Free Tools</h2>
          <ToolGrid tools={developerTools.free} />
        </div>

        <div className="tier-section pro-section">
          <h2 className="tier-title">Pro Tools</h2>
          <div className="pro-overlay">
            <div className="pro-message">
              <h3>Upgrade to Pro</h3>
              <p>Unlock premium developer tools with a Pro subscription</p>
              <button className="upgrade-button">Upgrade Now</button>
            </div>
          </div>
          <ToolGrid tools={developerTools.pro} />
        </div>
      </main>
    </div>
  )
}

