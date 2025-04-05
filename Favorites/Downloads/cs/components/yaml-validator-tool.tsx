"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Check, FileCode } from "lucide-react"

export default function YamlValidatorTool() {
  const [yaml, setYaml] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationResult, setValidationResult] = useState<{ valid: boolean; error?: string } | null>(null)
  const [formatted, setFormatted] = useState<string | null>(null)

  const handleValidate = async () => {
    if (!yaml) {
      setError("Please enter some YAML to validate")
      return
    }

    setLoading(true)
    setError(null)
    setValidationResult(null)

    try {
      const response = await fetch("/api/yaml-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ yaml, action: "validate" }),
      })

      const data = await response.json()

      if (data.error && !data.hasOwnProperty("valid")) {
        throw new Error(data.error)
      }

      setValidationResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleFormat = async () => {
    if (!yaml) {
      setError("Please enter some YAML to format")
      return
    }

    setLoading(true)
    setError(null)
    setFormatted(null)

    try {
      const response = await fetch("/api/yaml-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ yaml, action: "format" }),
      })

      const data = await response.json()

      if (data.error && !data.formatted) {
        throw new Error(data.error)
      }

      if (data.formatted) {
        setFormatted(data.formatted)
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const applyFormatted = () => {
    if (formatted) {
      setYaml(formatted)
      setFormatted(null)
    }
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">📋</div>
        <h1 className="text-2xl font-bold">YAML Validator</h1>
      </div>
      <div className="tool-ui-description">Validate and format YAML documents.</div>

      <Card className="p-6">
        <Textarea
          value={yaml}
          onChange={(e) => setYaml(e.target.value)}
          placeholder="Enter your YAML here..."
          className="min-h-[300px] font-mono mb-4"
        />

        <div className="flex gap-2 mb-4">
          <Button onClick={handleValidate} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Validate
          </Button>

          <Button onClick={handleFormat} disabled={loading} variant="outline">
            <FileCode className="mr-2 h-4 w-4" />
            Format
          </Button>
        </div>

        {error && <div className="text-destructive mb-4">Error: {error}</div>}

        {validationResult && (
          <div
            className={`mb-4 p-3 rounded ${validationResult.valid ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
          >
            {validationResult.valid ? (
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5" />
                YAML is valid!
              </div>
            ) : (
              <div>
                <div className="font-semibold mb-1">YAML is invalid:</div>
                <div className="font-mono text-sm">{validationResult.error}</div>
              </div>
            )}
          </div>
        )}

        {formatted && (
          <div className="mb-4">
            <div className="font-semibold mb-2">Formatted YAML:</div>
            <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-[300px] whitespace-pre">
              {formatted}
            </div>
            <Button onClick={applyFormatted} className="mt-2" size="sm">
              Apply Formatted YAML
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

