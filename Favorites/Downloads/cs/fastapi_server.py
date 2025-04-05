import os
import uuid
import shutil
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import the existing remove_background function from your bgrem.py
from python.imageGraphics.bgRemover import remove_background  # adjust the import based on your project structure
from python.imageGraphics.imageConvertor import convert_image  # adjust the import based on your project structure

# Define directories (you can reuse existing ones from bgrem.py if needed)
BASE_DIR = Path(os.getcwd())
UPLOAD_DIR = BASE_DIR / "public" / "uploads"
OUTPUT_DIR = BASE_DIR / "public" / "results"

# Ensure the directories exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="Innovatrix Services API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3002", "http://localhost:3001"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/remove-background")
async def remove_background_endpoint(file: UploadFile = File(...)):
    # validate file type
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="Invalid file type. Supported formats: png, jpg, jpeg, webp")
    
    # Create a unique filename for the uploaded file
    unique_id = str(uuid.uuid4())
    file_ext = file.filename.split('.')[-1]
    input_filename = f"{unique_id}.{file_ext}"
    input_path = UPLOAD_DIR / input_filename

    # Save the uploaded file to disk
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Define the output filename and path
    output_filename = f"{unique_id}_no_bg.png"
    output_path = OUTPUT_DIR / output_filename

    # Call the remove_background function
    result = remove_background(str(input_path), str(output_path))
    if result is None:
        raise HTTPException(status_code=500, detail="Background removal failed from the service.")

    # Optionally remove the uploaded file after processing
    try:
        os.remove(input_path)
    except Exception:
        pass

    # Return the resulting file as a response
    return FileResponse(path=str(output_path), filename=output_filename)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)