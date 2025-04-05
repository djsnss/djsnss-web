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
    const formData = await req.formData()
    const data = formData.get("data") as string
    const symbology = (formData.get("symbology") as string) || "code128"
    const color = (formData.get("color") as string) || "black"
    const bgColor = (formData.get("bgColor") as string) || "white"
    const transparent = formData.get("transparent") === "true"
    const textShow = formData.get("textShow") !== "false"

    if (!data) {
      return NextResponse.json({ error: "No data provided for barcode" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "barcode-generator-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Output path
    const outputPath = path.join(tempDir, "barcode.png")

    // Create Python script parameters
    const params = [
      `"${data}"`,
      `"${symbology}"`,
      `"${outputPath}"`,
      textShow ? "True" : "False",
      `"${color}"`,
      `"${bgColor}"`,
      transparent ? "True" : "False",
    ]

    // Execute Python script
    const pythonCommand = `python -c "
import sys
sys.path.append('python')
from barcodeGenerator import generate_barcode
generate_barcode(${params.join(", ")})
"`

    await execAsync(pythonCommand)

    // Read the output file
    const outputBuffer = fs.readFileSync(outputPath)

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="barcode.png"',
      },
    })
  } catch (error) {
    console.error("Barcode generation error:", error)
    return NextResponse.json({ error: "Failed to generate barcode" }, { status: 500 })
  }
}

