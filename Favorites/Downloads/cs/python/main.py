from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from typing import Optional, List, Dict, Any
import uvicorn
import os
import uuid
import tempfile
import shutil
from pathlib import Path

# Import your tool modules
# You may need to adjust these imports based on your actual file structure
try:
    from QRCodeGenerator import generate_qr
except ImportError:
    print("Warning: QRCodeGenerator module not found")
    generate_qr = None

app = FastAPI(title="Python Tools API")

# Create output directory for temporary files
output_dir = Path("output")
output_dir.mkdir(exist_ok=True)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to clean up temporary files
def remove_file(path: str):
    if os.path.exists(path):
        os.unlink(path)

# Root endpoint
@app.get("/")
async def read_root():
    return {"status": "online", "tools": ["qrcode", "image-converter", "bg-remover", "barcode", "palette", "ai-image", "markdown", "yaml"]}

# QR Code Generator endpoint
@app.post("/generate-qr/")
async def create_qr_code(
    background_tasks: BackgroundTasks,
    data: str = Form(...),
    logo: Optional[UploadFile] = File(None),
    color: str = Form("black"),
    bg_color: Optional[str] = Form(None),
    transparent: bool = Form(False),
    border_style: Optional[str] = Form(None),
    border_width: int = Form(4),
    border_color: Optional[str] = Form(None),
    box_size: int = Form(10),
    rounded: bool = Form(False),
    quiet_zone: int = Form(4)
):
    if generate_qr is None:
        raise HTTPException(status_code=501, detail="QR Code generator is not available")
        
    # Generate unique filename
    unique_id = uuid.uuid4()
    output_filename = f"output/qrcode_{unique_id}.png"
    
    # Save logo if provided
    logo_path = None
    if logo:
        logo_path = f"output/logo_{unique_id}.png"
        with open(logo_path, "wb") as f:
            f.write(await logo.read())
        background_tasks.add_task(remove_file, logo_path)
    
    # Generate QR code
    try:
        qr_path = generate_qr(
            data=data,
            filename=output_filename,
            logo=logo_path,
            color=color,
            bg_color=bg_color,
            transparent=transparent,
            border_style=border_style,
            border_width=border_width,
            border_color=border_color,
            box_size=box_size,
            rounded=rounded,
            quiet_zone=quiet_zone
        )
        
        # Schedule cleanup of the generated file
        background_tasks.add_task(remove_file, output_filename)
        
        # Return the QR code image
        return FileResponse(qr_path, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}

# Image Converter endpoint
@app.post("/convert-image/")
async def convert_image(
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...),
    format: str = Form(...),
    quality: Optional[int] = Form(None),
    resize: Optional[str] = Form(None)
):
    try:
        # Create temp directory
        temp_dir = tempfile.mkdtemp()
        
        # Save the uploaded image
        input_path = os.path.join(temp_dir, image.filename)
        with open(input_path, "wb") as f:
            content = await image.read()
            f.write(content)
        
        # Generate output path
        file_name = os.path.splitext(os.path.basename(image.filename))[0]
        output_path = os.path.join(temp_dir, f"{file_name}.{format.lower()}")
        
        # Import here to avoid initial import errors if module is missing
        import sys
        sys.path.append(".")
        from imageGraphics.imageConvertor import convert_image as img_convert
        
        # Convert the image
        img_convert(input_path, output_path, format, quality, resize)
        
        # Schedule cleanup
        background_tasks.add_task(lambda: shutil.rmtree(temp_dir, ignore_errors=True))
        
        # Return the converted image
        return FileResponse(
            output_path,
            media_type=f"image/{format.lower()}",
            filename=f"{file_name}.{format.lower()}"
        )
    except ImportError:
        raise HTTPException(status_code=501, detail="Image converter module not available")
    except Exception as e:
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail=f"Failed to convert image: {str(e)}")

# Background Remover endpoint
@app.post("/remove-background/")
async def remove_background(
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...),
    model: str = Form("u2net"),
    alpha_matting: bool = Form(False),
    alpha_matting_foreground_threshold: int = Form(240),
    alpha_matting_background_threshold: int = Form(10),
    alpha_matting_erode_size: int = Form(10)
):
    try:

        # Save the uploaded image
        unique_id = uuid.uuid4()
        input_path = f"output/bg_input_{unique_id}.png"
        output_path = f"output/bg_output_{unique_id}.png"
        
        with open(input_path, "wb") as f:
            content = await image.read()
            f.write(content)
        
        # Import the background remover module
        try:
            from rembg import remove
            from PIL import Image
            
            # Process the image
            img = Image.open(input_path)
            output = remove(
                img, 
                model_name=model,
                alpha_matting=alpha_matting,
                alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
                alpha_matting_background_threshold=alpha_matting_background_threshold,
                alpha_matting_erode_size=alpha_matting_erode_size
            )
            output.save(output_path)
            
            # Schedule cleanup
            background_tasks.add_task(remove_file, input_path)
            background_tasks.add_task(remove_file, output_path)
            
            # Return the processed image
            return FileResponse(output_path, media_type="image/png")
        except ImportError:
            raise HTTPException(status_code=501, detail="Background removal module not available")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove background: {str(e)}")

# Barcode Generator endpoint
@app.post("/generate-barcode/")
async def generate_barcode(
    background_tasks: BackgroundTasks,
    data: str = Form(...),
    barcode_type: str = Form(...),
    width: float = Form(1.0),
    height: float = Form(50.0),
    quiet_zone: int = Form(1),
    font_size: int = Form(10),
    text_distance: int = Form(5)
):
    try:
        # Import barcode module
        try:
            import barcode
            from barcode.writer import ImageWriter
            from io import BytesIO
            from PIL import Image
            
            # Generate unique filename
            unique_id = uuid.uuid4()
            output_path = f"output/barcode_{unique_id}.png"
            
            # Get barcode class
            barcode_class = getattr(barcode, barcode_type, None)
            if barcode_class is None:
                raise HTTPException(status_code=400, detail=f"Invalid barcode type: {barcode_type}")
            
            # Create barcode
            barcode_instance = barcode_class(
                data, 
                writer=ImageWriter()
            )
            
            # Set options
            options = {
                'module_width': width,
                'module_height': height,
                'quiet_zone': quiet_zone,
                'font_size': font_size,
                'text_distance': text_distance
            }
            
            # Save to file
            barcode_instance.save(output_path.replace('.png', ''), options)
            
            # The actual file has the extension added by the library
            actual_path = f"{output_path.replace('.png', '')}.png"
            
            # Schedule cleanup
            background_tasks.add_task(remove_file, actual_path)
            
            # Return the barcode image
            return FileResponse(actual_path, media_type="image/png")
        except ImportError:
            raise HTTPException(status_code=501, detail="Barcode generator module not available")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate barcode: {str(e)}")

# Color Palette Generator endpoint
@app.post("/generate-palette/")
async def generate_palette(
    color: str = Form(...),
    scheme: str = Form(...),
    count: int = Form(5)
):
    try:
        # Import color module
        try:
            from colorharmonies import Color, HarmonyScheme
            
            # Parse the color
            c = Color(hex=color.lstrip('#'))
            
            # Get the scheme
            scheme_map = {
                "complementary": HarmonyScheme.COMPLEMENTARY,
                "analogous": HarmonyScheme.ANALOGOUS,
                "triadic": HarmonyScheme.TRIADIC,
                "tetradic": HarmonyScheme.TETRADIC,
                "monochromatic": HarmonyScheme.MONOCHROMATIC,
                "split_complementary": HarmonyScheme.SPLIT_COMPLEMENTARY,
            }
            
            harmony_scheme = scheme_map.get(scheme.lower())
            if not harmony_scheme:
                raise HTTPException(status_code=400, detail=f"Invalid color scheme: {scheme}")
            
            # Generate palette
            palette = c.harmony(harmony_scheme, count)
            
            # Format the results
            result = [color.lstrip('#')]  # Include the original color
            for p in palette:
                result.append(p.hex.lower())
            
            return {"colors": result}
        except ImportError:
            # Fallback to a simple implementation
            return {"colors": [color.lstrip('#')], "error": "Color harmony module not available"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate color palette: {str(e)}")

# Markdown processing endpoint
@app.post("/process-markdown/")
async def process_markdown(
    markdown_text: str = Form(...),
    action: str = Form(...)  # Either "preview" or "validate"
):
    try:
        if action == "preview":
            # Import markdown module
            import markdown
            html = markdown.markdown(markdown_text)
            return {"html": html}
        elif action == "validate":
            # Simple validation - could be enhanced
            issues = []
            lines = markdown_text.split('\n')
            for i, line in enumerate(lines):
                if line.startswith('# ') and len(line) > 100:
                    issues.append({"line": i+1, "message": "Heading is too long"})
                # Add more validation rules as needed
            
            return {"valid": len(issues) == 0, "issues": issues}
        else:
            raise HTTPException(status_code=400, detail=f"Invalid action: {action}")
    except ImportError:
        raise HTTPException(status_code=501, detail="Markdown processing module not available")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process markdown: {str(e)}")

# YAML validation endpoint
@app.post("/validate-yaml/")
async def validate_yaml(
    yaml_text: str = Form(...),
    action: str = Form(...)  # Either "validate" or "format"
):
    try:
        # Import YAML module
        import yaml
        
        if action == "validate":
            try:
                yaml.safe_load(yaml_text)
                return {"valid": True}
            except yaml.YAMLError as e:
                error_msg = str(e)
                line_no = None
                if hasattr(e, 'problem_mark'):
                    line_no = e.problem_mark.line + 1
                
                return {
                    "valid": False, 
                    "error": error_msg,
                    "line": line_no
                }
        elif action == "format":
            # Parse and re-dump for formatting
            data = yaml.safe_load(yaml_text)
            formatted = yaml.dump(data, default_flow_style=False, sort_keys=False)
            return {"formatted": formatted}
        else:
            raise HTTPException(status_code=400, detail=f"Invalid action: {action}")
    except ImportError:
        raise HTTPException(status_code=501, detail="YAML processing module not available")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process YAML: {str(e)}")

# AI Image Generator endpoint - this requires OpenAI API key
@app.post("/generate-image/")
async def generate_image(
    prompt: str = Form(...),
    size: str = Form("1024x1024"),
    style: str = Form("vivid"),
    quality: str = Form("standard"),
    api_key: str = Form(...)
):
    try:
        # Import OpenAI module
        try:
            from openai import OpenAI
            
            # Create unique filename
            unique_id = uuid.uuid4()
            output_path = f"output/ai_image_{unique_id}.png"
            
            # Initialize client
            client = OpenAI(api_key=api_key)
            
            # Generate image
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size=size,
                quality=quality,
                style=style,
                n=1,
            )
            
            image_url = response.data[0].url
            
            # Return the URL directly from OpenAI
            # This avoids having to download and re-serve the image
            return {"image_url": image_url}
        except ImportError:
            raise HTTPException(status_code=501, detail="OpenAI module not available")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)