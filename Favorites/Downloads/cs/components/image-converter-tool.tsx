"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2, Download, ImageIcon } from "lucide-react"

export default function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState("PNG")
  const [quality, setQuality] = useState(95)
  const [resize, setResize] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setResult(null)
      setError(null)
    }
  }

  const handleConvert = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("format", format)
      formData.append("quality", quality.toString())
      if (resize) formData.append("resize", resize.toString())

      const response = await fetch("/api/image-converter", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to convert image")
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
      a.download = `${file?.name.split(".")[0] || "image"}.${format.toLowerCase()}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">🖼️</div>
        <h1 className="text-2xl font-bold">Image Converter</h1>
      </div>
      <div className="tool-ui-description">Convert images between different formats with quality and size options.</div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="format">Output Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PNG">PNG</SelectItem>
                <SelectItem value="JPEG">JPEG</SelectItem>
                <SelectItem value="WEBP">WEBP</SelectItem>
                <SelectItem value="GIF">GIF</SelectItem>
                <SelectItem value="BMP">BMP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quality">Quality ({quality}%)</Label>
            <Slider
              id="quality"
              min={1}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="resize">Resize Percentage (optional)</Label>
          <Slider
            id="resize"
            min={10}
            max={200}
            step={5}
            value={resize ? [resize] : [100]}
            onValueChange={(value) => setResize(value[0] === 100 ? null : value[0])}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {resize ? `${resize}% of original size` : "Original size (100%)"}
          </div>
        </div>

        <Button onClick={handleConvert} disabled={!file || loading} className="mb-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Convert Image
            </>
          )}
        </Button>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {result && (
          <div>
            <h3 className="text-lg font-medium mb-2">Converted Image</h3>
            <div className="border rounded-md overflow-hidden mb-4">
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

