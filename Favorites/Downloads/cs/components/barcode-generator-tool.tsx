"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Download, Barcode } from "lucide-react"

export default function BarcodeGeneratorTool() {
  const [data, setData] = useState("")
  const [symbology, setSymbology] = useState("code128")
  const [color, setColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [transparent, setTransparent] = useState(false)
  const [textShow, setTextShow] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!data) {
      setError("Please enter data for the barcode")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("data", data)
      formData.append("symbology", symbology)
      formData.append("color", color)
      formData.append("bgColor", bgColor)
      formData.append("transparent", transparent.toString())
      formData.append("textShow", textShow.toString())

      const response = await fetch("/api/barcode-generator", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate barcode")
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
      a.download = `barcode_${symbology}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">📊</div>
        <h1 className="text-2xl font-bold">Barcode Generator</h1>
      </div>
      <div className="tool-ui-description">
        Create customized barcodes in various formats for product labeling and inventory.
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <Label htmlFor="barcode-data">Barcode Data</Label>
          <Input
            id="barcode-data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter text or numbers for barcode"
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="symbology">Barcode Type</Label>
          <Select value={symbology} onValueChange={setSymbology}>
            <SelectTrigger id="symbology">
              <SelectValue placeholder="Select barcode type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="code128">Code 128 (alphanumeric)</SelectItem>
              <SelectItem value="code39">Code 39 (alphanumeric)</SelectItem>
              <SelectItem value="ean13">EAN-13 (numeric)</SelectItem>
              <SelectItem value="ean8">EAN-8 (numeric)</SelectItem>
              <SelectItem value="upc">UPC-A (numeric)</SelectItem>
              <SelectItem value="isbn13">ISBN-13 (numeric)</SelectItem>
              <SelectItem value="isbn10">ISBN-10 (alphanumeric)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="barcode-color">Barcode Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="barcode-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="barcode-bg-color">Background Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="barcode-bg-color"
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
            <Switch id="text-show" checked={textShow} onCheckedChange={setTextShow} />
            <Label htmlFor="text-show">Show Text</Label>
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={!data || loading} className="mb-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Barcode className="mr-2 h-4 w-4" />
              Generate Barcode
            </>
          )}
        </Button>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {result && (
          <div>
            <h3 className="text-lg font-medium mb-2">Generated Barcode</h3>
            <div className="border rounded-md overflow-hidden p-4 flex justify-center mb-4 bg-white">
              <img src={result || "/placeholder.svg"} alt="Barcode" className="max-h-64" />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Barcode
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

