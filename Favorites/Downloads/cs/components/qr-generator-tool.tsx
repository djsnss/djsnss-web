"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Download, QrCode } from "lucide-react"

export default function QrGeneratorTool() {
  const [data, setData] = useState("")
  const [color, setColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [transparent, setTransparent] = useState(false)
  const [rounded, setRounded] = useState(false)
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setLogo(selectedFile)
      setLogoPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleGenerate = async () => {
    if (!data) {
      setError("Please enter text or URL for the QR code")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("data", data)
      formData.append("color", color)
      formData.append("bgColor", bgColor)
      formData.append("transparent", transparent.toString())
      formData.append("rounded", rounded.toString())
      if (logo) formData.append("logo", logo)

      const response = await fetch("/api/qr-generator", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate QR code")
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
      a.download = "qrcode.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">📱</div>
        <h1 className="text-2xl font-bold">QR Code Generator</h1>
      </div>
      <div className="tool-ui-description">Create customized QR codes for websites, text, or contact information.</div>

      <Card className="p-6">
        <div className="mb-4">
          <Label htmlFor="qr-data">Text or URL</Label>
          <Input
            id="qr-data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter text or URL for QR code"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="qr-color">QR Code Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="qr-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="qr-bg-color">Background Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="qr-bg-color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                disabled={transparent}
                className="w-12 h-10 p-1"
              />
              <Input
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                disabled={transparent}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Switch id="transparent" checked={transparent} onCheckedChange={setTransparent} />
            <Label htmlFor="transparent">Transparent Background</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="rounded" checked={rounded} onCheckedChange={setRounded} />
            <Label htmlFor="rounded">Rounded Corners</Label>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="logo-upload">Add Logo (optional)</Label>
          <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoChange} className="mt-1" />
          {logoPreview && (
            <div className="mt-2 border rounded-md p-2 inline-block">
              <img src={logoPreview || "/placeholder.svg"} alt="Logo Preview" className="h-16" />
            </div>
          )}
        </div>

        <Button onClick={handleGenerate} disabled={!data || loading} className="mb-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </>
          )}
        </Button>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {result && (
          <div>
            <h3 className="text-lg font-medium mb-2">Generated QR Code</h3>
            <div className="border rounded-md overflow-hidden p-4 flex justify-center mb-4 bg-white">
              <img src={result || "/placeholder.svg"} alt="QR Code" className="max-h-64" />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

