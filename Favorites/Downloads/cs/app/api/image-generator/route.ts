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
    const tempDir = path.join(os.tmpdir(), "image-generator-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Create a temporary Python script to run the image generator
    const scriptPath = path.join(tempDir, "run_generator.py")
    const outputDir = tempDir

    const scriptContent = `
import sys
sys.path.append('python')
import os
import base64
import mimetypes
from google import genai
from google.genai import types

def save_binary_file(file_name, data):
    f = open(file_name, "wb")
    f.write(data)
    f.close()

def generate(prompt, output_dir):
    client = genai.Client(
        api_key='AIzaSyDVFjlgmZdy9a7bmmg3-FVA2eE_V3qp2tM',
    )

    model = "gemini-2.0-flash-exp-image-generation"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"""you are an image generation model, i will give you a prompt as input, generate an image of it as closely and accurately as possible {prompt}"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Understood. Please provide your prompt, and I will do my best to generate an image that accurately reflects it. I look forward to seeing what you have in mind!"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        response_modalities=[
            "image",
            "text",
        ],
        response_mime_type="text/plain",
    )

    output_path = None
    
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if not chunk.candidates or not chunk.candidates[0].content or not chunk.candidates[0].content.parts:
            continue
        if chunk.candidates[0].content.parts[0].inline_data:
            file_name = f"generated_image"
            inline_data = chunk.candidates[0].content.parts[0].inline_data
            file_extension = mimetypes.guess_extension(inline_data.mime_type)
            output_path = os.path.join(output_dir, f"{file_name}{file_extension}")
            save_binary_file(output_path, inline_data.data)
            print(output_path)
            break
    
    return output_path

# Run the generator
output_path = generate("${prompt.replace(/"/g, '\\"')}", "${outputDir.replace(/\\/g, "\\\\")}")
if output_path:
    print(output_path)
else:
    print("Error: No image generated")
`

    fs.writeFileSync(scriptPath, scriptContent)

    // Execute Python script
    const { stdout } = await execAsync(`python "${scriptPath}"`)

    // Get the output path from stdout
    const outputPath = stdout.trim()

    if (!outputPath || !fs.existsSync(outputPath)) {
      throw new Error("No image was generated")
    }

    // Read the output file
    const outputBuffer = fs.readFileSync(outputPath)

    // Determine MIME type
    const ext = path.extname(outputPath).toLowerCase()
    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
    }

    const contentType = mimeTypes[ext] || "image/png"

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true })

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (error) {
    console.error("Image generation error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}

