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

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "bg-remover-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Save uploaded file
    const buffer = Buffer.from(await file.arrayBuffer())
    const inputPath = path.join(tempDir, file.name)
    fs.writeFileSync(inputPath, buffer)

    // Output path
    const outputFilename = `${path.parse(file.name).name}_no_bg.png`
    const outputPath = path.join(tempDir, outputFilename)

    // Execute Python script
    await execAsync(`python python/imageGraphics/bgRemover.py "${inputPath}" "${outputPath}"`)

    // Read the output file
    const outputBuffer = fs.readFileSync(outputPath)

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${outputFilename}"`,
      },
    })
  } catch (error) {
    console.error("Background removal error:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

