from PIL import Image
import os
import sys

def convert_image(input_path, output_path=None, output_format=None, quality=95, resize=None):
    """
    Convert an image from one format to another with options for quality and resizing
    
    Args:
        input_path: Path to the input image
        output_path: Path for the output image (optional)
        output_format: Format to convert to (optional)
        quality: JPEG/WebP quality (1-100) (default: 95)
        resize: Tuple of (width, height) or percentage to resize (optional)
    
    Returns:
        Path to the converted image
    """
    try:
        # Check if input file exists
        if not os.path.exists(input_path):
            print(f"Error: Input file '{input_path}' not found!")
            return None
            
        # Open the image
        img = Image.open(input_path)
        
        # Get original format if no output format specified
        original_format = img.format
        if not output_format:
            output_format = original_format
            
        # Handle output path
        if not output_path:
            # If no output path provided, create one based on input filename
            file_name, _ = os.path.splitext(os.path.basename(input_path))
            output_path = f"{file_name}.{output_format.lower()}"
        
        # Check if output_path has an extension, if not add it
        if not os.path.splitext(output_path)[1]:
            output_path = f"{output_path}.{output_format.lower()}"
        
        # Resize image if requested
        if resize:
            original_width, original_height = img.size
            
            if isinstance(resize, tuple) and len(resize) == 2:
                # Resize to specific dimensions
                new_width, new_height = resize
                img = img.resize((new_width, new_height), Image.LANCZOS)
            elif isinstance(resize, (int, float)):
                # Resize by percentage
                scale = resize / 100.0
                new_width = int(original_width * scale)
                new_height = int(original_height * scale)
                img = img.resize((new_width, new_height), Image.LANCZOS)
        
        # Convert image and save
        save_kwargs = {}
        
        # Format-specific options
        if output_format.upper() in ['JPEG', 'JPG']:
            # JPEG quality
            save_kwargs['quality'] = quality
            save_kwargs['optimize'] = True
            
            # Convert RGBA to RGB since JPEG doesn't support transparency
            if img.mode == 'RGBA':
                img = img.convert('RGB')
                
        elif output_format.upper() == 'PNG':
            # PNG compression level
            save_kwargs['optimize'] = True
            save_kwargs['compress_level'] = 9  # Maximum compression
            
        elif output_format.upper() == 'WEBP':
            # WebP quality
            save_kwargs['quality'] = quality
            save_kwargs['method'] = 6  # Highest quality method
            
        elif output_format.upper() == 'TIFF':
            save_kwargs['compression'] = 'tiff_lzw'  # Lossless compression
            
        # Save with the appropriate format
        img.save(output_path, format=output_format.upper(), **save_kwargs)
        
        print(f"Successfully converted: {input_path} → {output_path}")
        return output_path
        
    except Exception as e:
        print(f"Error converting image: {e}")
        return None

def interactive_mode():
    """Run image converter in interactive mode"""
    print("\n===== Image Type Converter =====\n")
    
    # List supported formats
    print("Supported formats:")
    formats = ["JPEG/JPG", "PNG", "WEBP", "GIF", "BMP", "TIFF", "ICO"]
    for i, fmt in enumerate(formats, 1):
        print(f"{i}. {fmt}")
    
    # Get input file
    input_path = input("\nEnter input image path: ")
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found!")
        return
    
    # Get output format
    format_map = {
        '1': 'JPEG',
        '2': 'PNG',
        '3': 'WEBP',
        '4': 'GIF',
        '5': 'BMP',
        '6': 'TIFF',
        '7': 'ICO'
    }
    
    format_choice = input("Select output format (1-7): ")
    output_format = format_map.get(format_choice)
    
    if not output_format:
        # Try to interpret the input directly as a format name
        output_format = format_choice.upper()
        if output_format not in [f.upper() for f in ["JPEG", "JPG", "PNG", "WEBP", "GIF", "BMP", "TIFF", "ICO"]]:
            print(f"Invalid format: {format_choice}. Using PNG as default.")
            output_format = "PNG"
    
    # Get output path (optional)
    output_path = input("Output filename (leave blank for auto-generated): ")
    
    # Quality for JPEG and WebP
    quality = 95
    if output_format.upper() in ['JPEG', 'JPG', 'WEBP']:
        quality_input = input(f"Quality (1-100, default: {quality}): ")
        if quality_input.isdigit():
            quality = min(100, max(1, int(quality_input)))
    
    # Resize options
    resize = None
    resize_choice = input("Resize image? (y/n, default: n): ").lower().strip()
    if resize_choice == 'y' or resize_choice == 'yes':
        resize_type = input("Resize by: (1) Specific dimensions, (2) Percentage: ")
        
        if resize_type == '1':
            try:
                width = int(input("New width in pixels: "))
                height = int(input("New height in pixels: "))
                resize = (width, height)
            except ValueError:
                print("Invalid dimensions. Skipping resize.")
        elif resize_type == '2':
            try:
                percentage = float(input("Scale percentage (e.g., 50 for half size): "))
                resize = percentage
            except ValueError:
                print("Invalid percentage. Skipping resize.")
    
    # Convert the image
    convert_image(
        input_path=input_path,
        output_path=output_path if output_path else None,
        output_format=output_format,
        quality=quality,
        resize=resize
    )

def batch_convert():
    """Convert multiple images at once"""
    print("\n===== Batch Image Conversion =====\n")
    
    # Get input directory
    input_dir = input("Enter input directory containing images: ")
    if not os.path.isdir(input_dir):
        print(f"Error: Input directory '{input_dir}' not found!")
        return
    
    # Get output format
    format_map = {
        '1': 'JPEG',
        '2': 'PNG',
        '3': 'WEBP',
        '4': 'GIF',
        '5': 'BMP',
        '6': 'TIFF',
        '7': 'ICO'
    }
    
    print("\nSupported formats:")
    for key, fmt in format_map.items():
        print(f"{key}. {fmt}")
    
    format_choice = input("Select output format (1-7): ")
    output_format = format_map.get(format_choice, 'PNG')
    
    # Get output directory
    output_dir = input("Output directory (leave blank to use input directory): ")
    if not output_dir:
        output_dir = input_dir
    elif not os.path.exists(output_dir):
        try:
            os.makedirs(output_dir)
            print(f"Created output directory: {output_dir}")
        except Exception as e:
            print(f"Error creating output directory: {e}")
            return
    
    # Quality for JPEG and WebP
    quality = 95
    if output_format.upper() in ['JPEG', 'JPG', 'WEBP']:
        quality_input = input(f"Quality (1-100, default: {quality}): ")
        if quality_input.isdigit():
            quality = min(100, max(1, int(quality_input)))
    
    # Resize options
    resize = None
    resize_choice = input("Resize images? (y/n, default: n): ").lower().strip()
    if resize_choice == 'y' or resize_choice == 'yes':
        resize_type = input("Resize by: (1) Specific dimensions, (2) Percentage: ")
        
        if resize_type == '1':
            try:
                width = int(input("New width in pixels: "))
                height = int(input("New height in pixels: "))
                resize = (width, height)
            except ValueError:
                print("Invalid dimensions. Skipping resize.")
        elif resize_type == '2':
            try:
                percentage = float(input("Scale percentage (e.g., 50 for half size): "))
                resize = percentage
            except ValueError:
                print("Invalid percentage. Skipping resize.")
    
    # Process all images in the directory
    image_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.ico']
    converted_count = 0
    error_count = 0
    
    for filename in os.listdir(input_dir):
        file_path = os.path.join(input_dir, filename)
        if os.path.isfile(file_path) and os.path.splitext(filename)[1].lower() in image_extensions:
            # Create output filename
            base_name = os.path.splitext(filename)[0]
            output_path = os.path.join(output_dir, f"{base_name}.{output_format.lower()}")
            
            # Convert the image
            result = convert_image(
                input_path=file_path,
                output_path=output_path,
                output_format=output_format,
                quality=quality,
                resize=resize
            )
            
            if result:
                converted_count += 1
            else:
                error_count += 1
    
    print(f"\nConversion complete: {converted_count} images converted, {error_count} errors")

def main():
    print("\n===== Image Type Converter =====")
    print("1. Convert a single image")
    print("2. Batch convert multiple images")
    
    choice = input("\nSelect mode (1-2): ")
    
    if choice == '1':
        interactive_mode()
    elif choice == '2':
        batch_convert()
    else:
        print("Invalid choice. Exiting.")

if __name__ == "__main__":
    main()