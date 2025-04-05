"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import ToolGrid from "@/components/tool-grid"
import "../../../styles/suite-page.css"

const officeTools = {
  free: [
    { name: "CSV ↔ Excel Converter", icon: "📊", description: "Convert CSV to Excel and vice versa" },
    { name: "JSON ↔ Table Viewer", icon: "🔁", description: "View JSON as a table and edit easily" },
    { name: "Text Summarizer", icon: "🧠", description: "Summarize large blocks of text in one click" },
    { name: "Secure Notes", icon: "🔒", description: "Write and encrypt your private notes" },
    { name: "File Converter", icon: "📁", description: "Convert images and docs to PDF and other formats" },
    { name: "Email Header Parser", icon: "📬", description: "Parse and understand email headers easily" },
  ],
}

export default function OfficeProductivitySuite() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="suite-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="suite-content">
        <div className="suite-header">
          <div className="suite-icon">💼</div>
          <h1>Office & Productivity Suite</h1>
        </div>
        <div className="suite-description">
          Tools to help professionals stay organized and efficient at work.
        </div>
        <div className="tier-section">
          <h2 className="tier-title">Free Tools</h2>
          <ToolGrid tools={officeTools.free} />
        </div>
      </main>
    </div>
  )
}
