"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, RefreshCw, Download } from "lucide-react"

export default function PaletteGeneratorTool() {
  const [prompt, setPrompt] = useState("")
  const [palette, setPalette] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt for the palette")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/palette-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setPalette(data.palette)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleRandomPalette = () => {
    const randomPalette = Array.from(
      { length: 5 },
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`,
    )
    setPalette(randomPalette)
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(color)
    setTimeout(() => setCopied(null), 2000)
  }

  const downloadPalette = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(palette))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "color-palette.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">🎨</div>
        <h1 className="text-2xl font-bold">Color Palette Generator</h1>
      </div>
      <div className="tool-ui-description">Generate harmonious color palettes from text prompts or randomly.</div>

      <Card className="p-6">
        <div className="mb-4">
          <Label htmlFor="palette-prompt">Prompt</Label>
          <Input
            id="palette-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a theme (e.g., sunset on beach, forest in autumn)"
            className="mt-1"
          />
        </div>

        <div className="flex gap-2 mb-6">
          <Button onClick={handleGenerate} disabled={!prompt || loading} className="flex-1">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>Generate from Prompt</>
            )}
          </Button>

          <Button variant="outline" onClick={handleRandomPalette} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Random
          </Button>
        </div>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {palette.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Generated Palette</h3>
            <div className="palette-preview rounded-md overflow-hidden mb-4">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="palette-color"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color)}
                  title={`Click to copy ${color}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {palette.map((color, index) => (
                <div key={index} className="text-center">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => copyToClipboard(color)}>
                    {color === copied ? "Copied!" : color}
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={downloadPalette} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Palette
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

