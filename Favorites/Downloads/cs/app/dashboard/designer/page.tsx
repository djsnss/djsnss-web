"use client"
import { useState } from "react"
import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Sidebar from "@/components/sidebar"
import ToolCard from "@/components/tool-card"
import BgRemoverTool from "@/components/bg-remover-tool"
import ImageConverterTool from "@/components/image-converter-tool"
import QrGeneratorTool from "@/components/qr-generator-tool"
import BarcodeGeneratorTool from "@/components/barcode-generator-tool"
import PaletteGeneratorTool from "@/components/palette-generator-tool"
import ImageGeneratorTool from "@/components/image-generator-tool"
import MarkdownEditorTool from "@/components/markdown-editor-tool"
import YamlValidatorTool from "@/components/yaml-validator-tool"

interface Tool {
  id: string
  name: string
  icon: string
  description: string
  component: React.ReactNode
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTool, setActiveTool] = useState<Tool | null>(null)

  const tools: Tool[] = [
    {
      id: "bg-remover",
      name: "Background Remover",
      icon: "🖼️",
      description: "Remove backgrounds from images with AI precision",
      component: <BgRemoverTool />,
    },
    {
      id: "image-converter",
      name: "Image Converter",
      icon: "🔄",
      description: "Convert images between different formats",
      component: <ImageConverterTool />,
    },
    {
      id: "qr-generator",
      name: "QR Code Generator",
      icon: "📱",
      description: "Create customized QR codes for URLs and text",
      component: <QrGeneratorTool />,
    },
    {
      id: "barcode-generator",
      name: "Barcode Generator",
      icon: "📊",
      description: "Generate barcodes in various formats",
      component: <BarcodeGeneratorTool />,
    },
    {
      id: "palette-generator",
      name: "Color Palette Generator",
      icon: "🎨",
      description: "Generate harmonious color palettes",
      component: <PaletteGeneratorTool />,
    },
    {
      id: "image-generator",
      name: "AI Image Generator",
      icon: "🖌️",
      description: "Generate images from text descriptions",
      component: <ImageGeneratorTool />,
    },
    {
      id: "markdown-editor",
      name: "Markdown Editor",
      icon: "📝",
      description: "Edit, validate and preview Markdown",
      component: <MarkdownEditorTool />,
    },
    {
      id: "yaml-validator",
      name: "YAML Validator",
      icon: "📋",
      description: "Validate and format YAML documents",
      component: <YamlValidatorTool />,
    },
  ]

// In each page.tsx file
const handleToolClick = (tool: Tool) => {
  setActiveTool(tool) 
  setSidebarOpen(false) // This is the key change to auto-collapse the sidebar
}


  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Python Tools Dashboard</h1>
          <p className="text-muted-foreground">
            A collection of powerful Python tools integrated into your Next.js application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
              onClick={() => handleToolClick(tool)}
            />
          ))}
        </div>
      </main>

      <Dialog open={!!activeTool} onOpenChange={(open) => !open && setActiveTool(null)}>
  <DialogContent className="max-w-5xl p-0 h-[90vh] overflow-hidden">
    {activeTool && (
      <>
        <DialogHeader className="border-b p-4 flex flex-row items-start gap-3">
          <div className="tool-icon text-4xl">{activeTool.icon}</div>
          <div className="flex flex-col items-start">
            <DialogTitle className="text-xl font-bold text-black dark:text-white">
              {activeTool.name}
            </DialogTitle>
            <DialogDescription className="text-sm mt-1 text-left text-gray-700 dark:text-gray-300">
              {activeTool.description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="p-5 overflow-y-auto" style={{ height: 'calc(90vh - 80px)' }}>
          {activeTool.component}
        </div>
      </>
    )}
  </DialogContent>
</Dialog>
    </div>
  )
}

