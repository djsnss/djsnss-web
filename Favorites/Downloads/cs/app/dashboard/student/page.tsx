"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import ToolGrid from "@/components/tool-grid"
import "../../../styles/suite-page.css"

const studentTools = {
  free: [
    { name: "Unit & Currency Converter", icon: "🔄", description: "Convert units and currencies with ease" },
    { name: "Markdown Editor", icon: "📝", description: "Write and preview Markdown content" },
    { name: "PDF Editor", icon: "📄", description: "Merge, compress, and edit PDF files" },
    { name: "Random Name Generator", icon: "🎲", description: "Generate random names for projects or tests" },
    { name: "Timer & Pomodoro", icon: "⏱️", description: "Track time with a Pomodoro or countdown timer" },
    { name: "Notepad", icon: "📓", description: "Take quick notes and save them locally" },
  ],
}

export default function StudentAcademicSuite() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="suite-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <main className="suite-content">
        <div className="suite-header">
          <div className="suite-icon">🎓</div>
          <h1>Student & Academic Suite</h1>
        </div>
        <div className="suite-description">
          Handy tools for school and college students to study, convert, and stay productive.
        </div>
        <div className="tier-section">
          <h2 className="tier-title">Free Tools</h2>
          <ToolGrid tools={studentTools.free} />
        </div>
      </main>
    </div>
  )
}
