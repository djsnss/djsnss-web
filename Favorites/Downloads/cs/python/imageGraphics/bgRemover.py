import os
import argparse
from PIL import Image
from carvekit.api.high import HiInterface

def remove_background(image_path, output_path=None, output_format="png"):
    """
    Remove background from an image using CarveKit.
    
    Args:
        image_path (str): Path to the input image
        output_path (str, optional): Custom output path. If None, will use input filename with _no_bg suffix
        output_format (str, optional): Output format (png recommended for transparency)
    
    Returns:
        str: Path to the saved output image
    """
    # Create output path if not specified
    if output_path is None:
        input_filename = os.path.basename(image_path)
        filename_no_ext = os.path.splitext(input_filename)[0]
        output_path = f"{filename_no_ext}_no_bg.{output_format}"
    
    try:
        # Initialize with compatible parameters
        interface = HiInterface(
            object_type="auto",            # Auto-detect if it's a human or object
            seg_mask_size=1024,            # Higher resolution mask
            trimap_prob_threshold=231,     
            trimap_dilation=30,
            trimap_erosion_iters=5,
            # model_type removed - not supported in your CarveKit version
            device="cuda" if is_cuda_available() else "cpu"  # Auto-detect GPU
        )
        
        # Process the image
        image = Image.open(image_path).convert("RGB")
        result = interface([image])[0]
        result.save(output_path)
        print(f"✅ Background removed successfully: {output_path}")
        return output_path
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None

def is_cuda_available():
    """Check if CUDA is available without importing torch directly"""
    try:
        # Only import torch if it's already installed
        import torch
        return torch.cuda.is_available()
    except ImportError:
        return False

def process_batch(directory, output_dir=None):
    """Process all images in a directory"""
    if not os.path.isdir(directory):
        print(f"❌ Directory not found: {directory}")
        return
        
    if output_dir is None:
        output_dir = os.path.join(directory, "no_bg")
    
    os.makedirs(output_dir, exist_ok=True)
    
    count = 0
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            input_path = os.path.join(directory, filename)
            output_path = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}_no_bg.png")
            
            if remove_background(input_path, output_path):
                count += 1
    
    print(f"✅ Processed {count} images. Results saved to {output_dir}")

if __name__ == "__main__":
    print("🖼️  Background Removal Tool")
    print("---------------------------")
    print("1. Process a single image")
    print("2. Process a folder of images")
    choice = input("Enter your choice (1/2): ")
    
    if choice == "1":
        image_path = input("📁 Enter image path: ").strip('"')
        if os.path.exists(image_path):
            remove_background(image_path)
        else:
            print("❌ File not found.")
    elif choice == "2":
        folder_path = input("📁 Enter folder path: ").strip('"')
        if os.path.exists(folder_path) and os.path.isdir(folder_path):
            process_batch(folder_path)
        else:
            print("❌ Directory not found.")
    else:
        print("❌ Invalid choice.")