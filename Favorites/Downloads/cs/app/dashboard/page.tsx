"use client"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import DashboardOverview from "@/components/dashboard-overview"
import "../../styles/dashboard.css"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <div className="text-muted-foreground">Welcome back, User!</div>
        </div>
        
        <DashboardOverview />
      </main>
    </div>
  )
} 

