import os
from PIL import Image, ImageDraw, ImageFont
import barcode
from barcode.writer import ImageWriter

def generate_barcode(data, symbology="code128", filename=None, text_show=True,
                     color="black", bg_color="white", transparent=False, 
                     border_style=None, border_width=4, border_color=None,
                     width=300, height=100, quiet_zone=True):
    """
    Generate a customized barcode
    
    Args:
        data: The text or number to encode
        symbology: Barcode symbology (default: code128)
        filename: Output filename (optional)
        text_show: Show text below barcode (default: True)
        color: Barcode color (default: black)
        bg_color: Background color (default: white)
        transparent: Make background transparent (default: False)
        border_style: Border style - none, solid, dashed (default: None)
        border_width: Border width in pixels (default: 4)
        border_color: Border color (default: same as barcode color)
        width: Barcode width (default: 300)
        height: Barcode height (default: 100)
        quiet_zone: Include quiet zone (default: True)
    """
    # Set default filename if none provided
    if not filename:
        filename = f"barcode_{symbology}.png"
    
    # Handle filename extension
    if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        filename += '.png'
    
    # Use same color for border if not specified
    if border_color is None:
        border_color = color
    
    # Available barcode types
    barcode_types = {
        "code128": barcode.get_barcode_class('code128'),
        "code39": barcode.get_barcode_class('code39'),
        "ean13": barcode.get_barcode_class('ean13'),
        "ean8": barcode.get_barcode_class('ean8'),
        "upc": barcode.get_barcode_class('upca'),
        "isbn13": barcode.get_barcode_class('isbn13'),
        "isbn10": barcode.get_barcode_class('isbn10'),
    }
    
    # Check if requested symbology is available
    if symbology not in barcode_types:
        print(f"Symbology '{symbology}' not available. Using code128 instead.")
        symbology = "code128"
    
    # Set writer options
    writer_options = {
        'module_width': 0.6,  # Width of a single barcode module
        'module_height': 15.0,  # Height of a single barcode module
        'quiet_zone': 6.5 if quiet_zone else 0,  # Size of quiet zone
        'font_size': 10,  # Size of text
        'text_distance': 5.0,  # Distance between barcode and text
        'background': bg_color,  # Background color
        'foreground': color,  # Barcode color
        'write_text': text_show,  # Show text or not
    }
    
    try:
        # Generate the barcode
        barcode_class = barcode_types[symbology]
        
        # For UPC and EAN barcodes, data must be numeric and correct length
        if symbology in ['ean13', 'isbn13'] and (not data.isdigit() or len(data) < 12):
            print("EAN-13/ISBN-13 requires at least 12 digits. Padding with zeros.")
            data = data.strip()[:12].ljust(12, '0')
        elif symbology == 'ean8' and (not data.isdigit() or len(data) < 7):
            print("EAN-8 requires at least 7 digits. Padding with zeros.")
            data = data.strip()[:7].ljust(7, '0')
        elif symbology == 'upc' and (not data.isdigit() or len(data) < 11):
            print("UPC-A requires at least 11 digits. Padding with zeros.")
            data = data.strip()[:11].ljust(11, '0')
        
        # Create the barcode
        barcode_image = barcode_class(data, writer=ImageWriter())
        
        # Save the barcode with given options
        temp_filename = barcode_image.save('temp_barcode', options=writer_options)
        
        # Open the generated image
        img = Image.open(temp_filename)
        
        # Resize to specified dimensions, maintaining aspect ratio
        if width and height:
            img = img.resize((width, height), Image.LANCZOS)
        
        # Handle transparency
        if transparent:
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Create transparent version
            datas = img.getdata()
            new_data = []
            for item in datas:
                # If pixel is bg_color (white by default), make it transparent
                if item[0] > 240 and item[1] > 240 and item[2] > 240:
                    new_data.append((255, 255, 255, 0))
                else:
                    new_data.append(item)
            
            img.putdata(new_data)
        
        # Add border if requested
        if border_style and border_style != "none":
            # Get image dimensions
            img_width, img_height = img.size
            
            # Create larger image for border
            bordered_img = Image.new('RGBA', 
                                   (img_width + 2*border_width, img_height + 2*border_width), 
                                   (255, 255, 255, 0) if transparent else bg_color)
            
            # Paste barcode in center
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            bordered_img.paste(img, (border_width, border_width))
            
            # Draw border
            draw = ImageDraw.Draw(bordered_img)
            
            if border_style == "solid":
                # Solid border
                draw.rectangle([(0, 0), (img_width + 2*border_width - 1, img_height + 2*border_width - 1)], 
                              outline=border_color, width=border_width)
            elif border_style == "dashed":
                # Dashed border
                # Draw top and bottom dashed lines
                for x in range(0, img_width + 2*border_width, border_width*2):
                    # Top line
                    draw.line([(x, 0), (x + border_width, 0)], fill=border_color, width=border_width)
                    # Bottom line
                    draw.line([(x, img_height + 2*border_width - border_width), 
                              (x + border_width, img_height + 2*border_width - border_width)], 
                              fill=border_color, width=border_width)
                
                # Draw left and right dashed lines
                for y in range(0, img_height + 2*border_width, border_width*2):
                    # Left line
                    draw.line([(0, y), (0, y + border_width)], fill=border_color, width=border_width)
                    # Right line
                    draw.line([(img_width + 2*border_width - border_width, y), 
                              (img_width + 2*border_width - border_width, y + border_width)], 
                              fill=border_color, width=border_width)
            
            img = bordered_img
        
        # Save the final image
        img.save(filename)
        
        # Remove temporary file
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
        
        print(f"Barcode created successfully: {filename}")
        return filename
        
    except Exception as e:
        print(f"Error generating barcode: {e}")
        return None

def interactive_mode():
    """Run barcode generator in interactive mode"""
    print("\n===== Barcode Generator =====\n")
    
    # Display available symbologies
    print("Available barcode symbologies:")
    print("1. Code 128 (default) - alphanumeric")
    print("2. Code 39 - alphanumeric")
    print("3. EAN-13 - numeric (12-13 digits)")
    print("4. EAN-8 - numeric (7-8 digits)")
    print("5. UPC-A - numeric (11-12 digits)")
    print("6. ISBN-13 - numeric (12-13 digits)")
    print("7. ISBN-10 - alphanumeric (9-10 characters)")
    
    # Get symbology
    symbology_map = {
        '1': 'code128',
        '2': 'code39',
        '3': 'ean13',
        '4': 'ean8',
        '5': 'upc',
        '6': 'isbn13',
        '7': 'isbn10'
    }
    
    symbology_choice = input("\nSelect barcode symbology (1-7, default: 1): ")
    symbology = symbology_map.get(symbology_choice, 'code128')
    
    # Get data to encode
    data = input("Enter text or number to encode: ")
    
    # Get output filename
    filename = input("Output filename (default: barcode.png): ")
    if not filename.strip():
        filename = "barcode.png"
    
    # Show text?
    text_show = input("Show text under barcode? (y/n, default: y): ").lower().strip()
    text_show = not (text_show == 'n' or text_show == 'no')
    
    # Set colors
    color = input("Barcode color (default: black): ")
    if not color.strip():
        color = "black"
    
    # Transparent background?
    transparent = input("Transparent background? (y/n, default: n): ").lower().strip()
    transparent = transparent == 'y' or transparent == 'yes'
    
    bg_color = "white"  # Default
    if not transparent:
        bg_color = input("Background color (default: white): ")
        if not bg_color.strip():
            bg_color = "white"
    
    # Border style
    border_options = ['none', 'solid', 'dashed']
    border_style = None
    border_choice = input("Border style (0=none, 1=solid, 2=dashed, default: none): ")
    if border_choice.isdigit() and 0 <= int(border_choice) < len(border_options):
        border_style = border_options[int(border_choice)]
    
    border_width = 4
    border_color = None
    if border_style and border_style != 'none':
        border_width_input = input("Border width (default: 4): ")
        if border_width_input.isdigit():
            border_width = int(border_width_input)
        
        border_color = input("Border color (default: same as barcode): ")
        if not border_color.strip():
            border_color = None
    
    # Size options
    width = 300
    width_input = input("Barcode width in pixels (default: 300): ")
    if width_input.isdigit():
        width = int(width_input)
    
    height = 100
    height_input = input("Barcode height in pixels (default: 100): ")
    if height_input.isdigit():
        height = int(height_input)
    
    # Quiet zone
    quiet_zone = input("Include quiet zone? (y/n, default: y): ").lower().strip()
    quiet_zone = not (quiet_zone == 'n' or quiet_zone == 'no')
    
    # Generate barcode
    generate_barcode(
        data=data,
        symbology=symbology,
        filename=filename,
        text_show=text_show,
        color=color,
        bg_color=bg_color,
        transparent=transparent,
        border_style=border_style,
        border_width=border_width,
        border_color=border_color,
        width=width,
        height=height,
        quiet_zone=quiet_zone
    )

if __name__ == "__main__":
    interactive_mode()