"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Download, ImageIcon } from "lucide-react"

export default function ImageGeneratorTool() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt for the image")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/image-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate image")
      }

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
      a.download = "generated-image.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">🖌️</div>
        <h1 className="text-2xl font-bold">AI Image Generator</h1>
      </div>
      <div className="tool-ui-description">Generate images from text descriptions using AI.</div>

      <Card className="p-6">
        <div className="mb-4">
          <Label htmlFor="image-prompt">Prompt</Label>
          <Textarea
            id="image-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate in detail..."
            className="mt-1 min-h-[100px]"
          />
        </div>

        <Button onClick={handleGenerate} disabled={!prompt || loading} className="mb-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Image...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {result && (
          <div>
            <h3 className="text-lg font-medium mb-2">Generated Image</h3>
            <div className="border rounded-md overflow-hidden mb-4">
              <img src={result || "/placeholder.svg"} alt="Generated" className="w-full" />
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

