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
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "palette-generator-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Create a temporary Python script to run the palette generator
    const scriptPath = path.join(tempDir, "run_palette.py")
    const outputPath = path.join(tempDir, "palette.json")

    const scriptContent = `
import sys
sys.path.append('python')
import re
import json
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key='AIzaSyDVFjlgmZdy9a7bmmg3-FVA2eE_V3qp2tM')

def generate_palette(prompt):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(f"Generate 5 aesthetic hex color codes for this theme: {prompt}. Just return them as a list of hex codes.")
    codes = re.findall(r"#(?:[0-9a-fA-F]{6})", response.text)
    return codes[:5] if codes else ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

# Get palette and save to file
palette = generate_palette("${prompt.replace(/"/g, '\\"')}")
with open("${outputPath.replace(/\\/g, "\\\\")}", "w") as f:
    json.dump(palette, f)
`

    fs.writeFileSync(scriptPath, scriptContent)

    // Execute Python script
    await execAsync(`python "${scriptPath}"`)

    // Read the output file
    const paletteData = JSON.parse(fs.readFileSync(outputPath, "utf8"))

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return NextResponse.json({ palette: paletteData })
  } catch (error) {
    console.error("Palette generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate palette",
        palette: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"], // Fallback palette
      },
      { status: 200 },
    )
  }
}

