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
    const file = formData.get("image") as File
    const outputFormat = formData.get("format") as string
    const quality = formData.get("quality") as string
    const resize = formData.get("resize") as string

    if (!file || !outputFormat) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "img-converter-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Save uploaded file
    const buffer = Buffer.from(await file.arrayBuffer())
    const inputPath = path.join(tempDir, file.name)
    fs.writeFileSync(inputPath, buffer)

    // Output path
    const outputFilename = `${path.parse(file.name).name}.${outputFormat.toLowerCase()}`
    const outputPath = path.join(tempDir, outputFilename)

    // Build command with options
    let command = `python python/imageConvertor.py "${inputPath}" "${outputPath}" "${outputFormat}"`
    if (quality) command += ` ${quality}`
    if (resize) command += ` "${resize}"`

    // Execute Python script
    await execAsync(command)

    // Read the output file
    const outputBuffer = fs.readFileSync(outputPath)

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    // Determine MIME type
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
      bmp: "image/bmp",
      tiff: "image/tiff",
      ico: "image/x-icon",
    }

    const contentType = mimeTypes[outputFormat.toLowerCase()] || "application/octet-stream"

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${outputFilename}"`,
      },
    })
  } catch (error) {
    console.error("Image conversion error:", error)
    return NextResponse.json({ error: "Failed to convert image" }, { status: 500 })
  }
}

