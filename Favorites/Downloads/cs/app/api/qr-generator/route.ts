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
    const color = (formData.get("color") as string) || "black"
    const bgColor = (formData.get("bgColor") as string) || "white"
    const transparent = formData.get("transparent") === "true"
    const logo = formData.get("logo") as File
    const rounded = formData.get("rounded") === "true"

    if (!data) {
      return NextResponse.json({ error: "No data provided for QR code" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "qr-generator-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Output path
    const outputPath = path.join(tempDir, "qrcode.png")

    // Handle logo if provided
    let logoPath = ""
    if (logo) {
      logoPath = path.join(tempDir, "logo.png")
      const logoBuffer = Buffer.from(await logo.arrayBuffer())
      fs.writeFileSync(logoPath, logoBuffer)
    }

    // Create Python script parameters
    const params = [
      `"${data}"`,
      `"${outputPath}"`,
      logoPath ? `"${logoPath}"` : "None",
      `"${color}"`,
      transparent ? "None" : `"${bgColor}"`,
      transparent ? "True" : "False",
      rounded ? "True" : "False",
    ]

    // Execute Python script
    const pythonCommand = `python -c "
import sys
sys.path.append('python')
from qrGenerator import generate_qr
generate_qr(${params.join(", ")})
"`

    await execAsync(pythonCommand)

    // Read the output file
    const outputBuffer = fs.readFileSync(outputPath)

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="qrcode.png"',
      },
    })
  } catch (error) {
    console.error("QR generation error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}

