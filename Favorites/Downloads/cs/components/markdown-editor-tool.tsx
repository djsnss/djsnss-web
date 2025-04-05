"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Check, FileText } from "lucide-react"

export default function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState("")
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  const handleValidate = async () => {
    if (!markdown) {
      setError("Please enter some markdown to validate")
      return
    }

    setLoading(true)
    setError(null)
    setValidationMessage(null)

    try {
      const response = await fetch("/api/markdown-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown, action: "validate" }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setValidationMessage(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleFormat = async () => {
    if (!markdown) {
      setError("Please enter some markdown to format")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/markdown-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown, action: "format" }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMarkdown(data.formatted)
      setValidationMessage("Markdown formatting applied.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = async () => {
    if (!markdown) {
      setError("Please enter some markdown to preview")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/markdown-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown, action: "preview" }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setPreview(data.html)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tool-ui">
      <div className="tool-ui-header">
        <div className="tool-ui-icon">📝</div>
        <h1 className="text-2xl font-bold">Markdown Editor</h1>
      </div>
      <div className="tool-ui-description">Edit, validate, format, and preview Markdown content.</div>

      <Card className="p-6">
        <Tabs defaultValue="edit">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview" onClick={handlePreview}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# Enter your Markdown here..."
              className="min-h-[300px] font-mono"
            />

            <div className="flex gap-2 mt-4">
              <Button onClick={handleValidate} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                Validate
              </Button>

              <Button onClick={handleFormat} disabled={loading} variant="outline">
                Format
              </Button>

              <Button onClick={handlePreview} disabled={loading} variant="outline">
                Preview
              </Button>
            </div>

            {error && <div className="text-destructive mt-4">Error: {error}</div>}

            {validationMessage && (
              <div
                className={`mt-4 p-2 rounded ${validationMessage.includes("valid") ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}
              >
                {validationMessage}
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview">
            {preview ? (
              <div
                className="min-h-[300px] p-4 border rounded-md overflow-auto prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            ) : (
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                <FileText className="mr-2 h-5 w-5" />
                Click Preview to see your Markdown rendered
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

