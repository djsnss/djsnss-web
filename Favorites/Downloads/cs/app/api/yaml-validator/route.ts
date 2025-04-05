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
    const { yaml, action } = await req.json()

    if (!yaml) {
      return NextResponse.json({ error: "No YAML provided" }, { status: 400 })
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), "yaml-validator-" + uuidv4())
    fs.mkdirSync(tempDir, { recursive: true })

    // Create input file with YAML content
    const inputPath = path.join(tempDir, "input.yaml")
    fs.writeFileSync(inputPath, yaml)

    // Create a temporary Python script
    const scriptPath = path.join(tempDir, "run_yaml.py")
    const outputPath = path.join(tempDir, "output.json")

    const scriptContent = `
import sys
import json
import yaml

def validate_yaml(content):
    try:
        yaml.safe_load(content)
        return True, None
    except yaml.YAMLError as e:
        if hasattr(e, 'problem_mark'):
            line = e.problem_mark.line + 1
            return False, f"{e.problem} at line {line}, column {e.problem_mark.column + 1}"
        return False, str(e)

def format_yaml(content):
    try:
        parsed = yaml.safe_load(content)
        return yaml.dump(parsed, default_flow_style=False, sort_keys=False)
    except yaml.YAMLError as e:
        raise ValueError(f"Invalid YAML: {str(e)}")

# Read input file
with open("${inputPath.replace(/\\/g, "\\\\")}", "r", encoding="utf-8") as f:
    content = f.read()

result = {}

if "${action}" == "validate":
    is_valid, error = validate_yaml(content)
    result["valid"] = is_valid
    if not is_valid:
        result["error"] = error
        
elif "${action}" == "format":
    try:
        result["formatted"] = format_yaml(content)
    except ValueError as e:
        result["error"] = str(e)

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
    console.error("YAML processing error:", error)
    return NextResponse.json({ error: "Failed to process YAML" }, { status: 500 })
  }
}

