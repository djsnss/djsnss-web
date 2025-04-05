"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download, ImageIcon } from "lucide-react"

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function BgRemoverTool() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setResult(null)
      setError(null)
    }
  }

  const handleRemoveBackground = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file) // Changed from "image" to "file" to match FastAPI parameter name

      // Modified to use the FastAPI endpoint
      const response = await fetch(`${API_BASE_URL}/remove-background`, {
        method: "POST",
        body: formData,
        // Add CORS headers if needed
        // credentials: 'include',
      })

      if (!response.ok) {
        let errorMessage = "Failed to remove background"
        try {
          const errorData = await response.json()
          errorMessage = errorData.detail || errorData.error || errorMessage
        } catch (e) {
          // If the error response isn't JSON
          errorMessage = `Server error: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      // The FastAPI endpoint directly returns the image file
      const blob = await response.blob()
      setResult(URL.createObjectURL(blob))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const a = document.createElement("a")
      a.href = result
      a.download = `${file?.name.split(".")[0] || "image"}_no_bg.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  // Rest of the component remains unchanged
  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">🖼️</div>
        <h1 className="text-2xl font-bold">Background Remover</h1>
      </div>
      <div className="tool-ui-description">Remove the background from any image with AI-powered precision.</div>

      <Card className="p-6">
        <div className="mb-4">
          <Label htmlFor="image-upload">Upload Image</Label>
          <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
        </div>

        {preview && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Original Image</h3>
            <div className="border rounded-md overflow-hidden">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto" />
            </div>
          </div>
        )}

        <Button onClick={handleRemoveBackground} disabled={!file || loading} className="mb-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Remove Background
            </>
          )}
        </Button>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {result && (
          <div>
            <h3 className="text-lg font-medium mb-2">Result</h3>
            <div className="border rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img src={result || "/placeholder.svg"} alt="Result" className="max-h-64 mx-auto" />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}