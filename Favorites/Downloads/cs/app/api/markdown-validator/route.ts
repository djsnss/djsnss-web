import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import os from "os"

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  try {
    const { markdown, action } = await req.json()

    if (!markdown) {
      return NextResponse.json({ error: "No markdown provided" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "markdown-validator-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Create input file with markdown content
    const inputPath = path.join(tempDir, "input.md")
    fs.writeFileSync(inputPath, markdown)

    // Create a temporary Python script
    const scriptPath = path.join(tempDir, "run_markdown.py")
    const outputPath = path.join(tempDir, "output.json")

    const scriptContent = `
import sys
import json
import markdown2
import re

def validate_markdown(md):
    return bool(re.search(r'#{1,6} | \\*.+?\\*|\\[.+?\\]\$$.+?\$$|\`', md))

def fix_markdown(md):
    lines = md.splitlines()
    fixed = []
    for line in lines:
        if re.match(r'^#{1,6}[^\\s#]', line):
            line = re.sub(r'^(#{1,6})([^\\s#])', r'\\1 \\2', line)
        line = re.sub(r'^([\\*\\-\\+])([^\\s])', r'\\1 \\2', line)
        fixed.append(line)
    return '\\n'.join(fixed)

def markdown_to_html(md):
    return markdown2.markdown(md, extras=[
        "fenced-code-blocks", "tables", "strike", "task_list",
        "code-friendly", "break-on-newline"
    ])

# Read input file
with open("${inputPath.replace(/\\/g, "\\\\")}", "r", encoding="utf-8") as f:
    content = f.read()

result = {}

if "${action}" == "validate":
    result["valid"] = validate_markdown(content)
    if not result["valid"]:
        result["message"] = "No valid Markdown syntax detected."
    else:
        result["message"] = "Markdown looks valid!"
        
elif "${action}" == "format":
    result["formatted"] = fix_markdown(content)
    
elif "${action}" == "preview":
    result["html"] = markdown_to_html(content)

# Write result to output file
with open("${outputPath.replace(/\\/g, "\\\\")}", "w", encoding="utf-8") as f:
    json.dump(result, f)
`

    fs.writeFileSync(scriptPath, scriptContent)

    // Execute Python script
    await execAsync(`python "${scriptPath}"`)

    // Read the output file
    const result = JSON.parse(fs.readFileSync(outputPath, "utf8"))

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Markdown processing error:", error)
    return NextResponse.json({ error: "Failed to process markdown" }, { status: 500 })
  }
}

