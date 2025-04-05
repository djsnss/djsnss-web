import qrcode
from PIL import Image, ImageDraw
import os

def generate_qr(data, filename=None, logo=None, color="black", bg_color=None, 
                transparent=False, border_style=None, border_width=4, border_color=None,
                box_size=10, rounded=False, quiet_zone=4):
    """
    Generate a customized QR code
    
    Args:
        data: The text or URL to encode
        filename: Output filename (optional)
        logo: Path to logo image (optional)
        color: QR code color (default: black)
        bg_color: Background color (default: white or transparent)
        transparent: Make background transparent (default: False)
        border_style: Border style - none, solid, dashed (default: None)
        border_width: Border width in pixels (default: 4)
        border_color: Border color (default: same as QR color)
        box_size: Size of each QR code box in pixels (default: 10)
        rounded: Use rounded corners for QR code modules (default: False)
        quiet_zone: Size of quiet zone around QR code (default: 4)
    """
    # Set default filename if none provided
    if not filename:
        filename = "qrcode.png"

    # Handle transparent background
    if transparent:
        bg_color = (255, 255, 255, 0)  # Transparent
    elif bg_color is None:
        bg_color = "white"  # Default white
        
    # Use same color for border if not specified
    if border_color is None:
        border_color = color
        
    # Create QR code with good error correction
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # Highest error correction
        box_size=box_size,
        border=quiet_zone,
    )
    
    # Add data and generate QR code
    qr.add_data(data)
    qr.make(fit=True)
    
    # Create image with specified colors
    if rounded:
        # For rounded corners, we need to create the QR code manually
        qr_matrix = qr.get_matrix()
        module_count = len(qr_matrix)
        qr_size = module_count * box_size + quiet_zone * 2 * box_size
        
        # Create a new image with transparency support
        qr_img = Image.new('RGBA', (qr_size, qr_size), bg_color)
        draw = ImageDraw.Draw(qr_img)
        
        # Draw rounded rectangles for each QR code module
        radius = box_size // 3  # Set radius for rounded corners
        for r in range(module_count):
            for c in range(module_count):
                if qr_matrix[r][c]:
                    # Calculate position
                    x = (c + quiet_zone) * box_size
                    y = (r + quiet_zone) * box_size
                    
                    # Draw rounded rectangle
                    draw.rounded_rectangle(
                        [(x, y), (x + box_size, y + box_size)],
                        radius=radius,
                        fill=color
                    )
    else:
        # Standard QR code generation
        qr_img = qr.make_image(fill_color=color, back_color=bg_color)
        
        # Convert to RGBA if needed for transparency
        if transparent and qr_img.mode != 'RGBA':
            qr_img = qr_img.convert('RGBA')
    
    # Add logo if provided
    if logo and os.path.exists(logo):
        try:
            # Open logo image
            logo_img = Image.open(logo)
            
            # Get QR code dimensions
            qr_width, qr_height = qr_img.size
            
            # Resize logo to 1/4 of QR code size
            logo_size = qr_width // 4
            logo_img = logo_img.resize((logo_size, logo_size))
            
            # Calculate position to center the logo
            pos_x = (qr_width - logo_size) // 2
            pos_y = (qr_height - logo_size) // 2
            
            # Create a new image with correct mode
            qr_with_logo = Image.new('RGBA', (qr_width, qr_height), (0, 0, 0, 0))
            
            # Convert QR code to RGBA if needed
            if qr_img.mode != 'RGBA':
                qr_img = qr_img.convert('RGBA')
            
            # Paste QR code onto the new image
            qr_with_logo.paste(qr_img, (0, 0))
            
            # Make sure logo has alpha channel
            if logo_img.mode != 'RGBA':
                logo_img = logo_img.convert('RGBA')
            
            # Paste logo onto center of QR code
            qr_with_logo.paste(logo_img, (pos_x, pos_y), logo_img)
            
            # Use the combined image
            qr_img = qr_with_logo
            
        except Exception as e:
            print(f"Warning: Couldn't add logo - {e}")
    
    # Add border if requested
    if border_style and border_style != "none":
        # Get image dimensions
        img_width, img_height = qr_img.size
        
        # Create larger image for border
        bordered_img = Image.new('RGBA', 
                               (img_width + 2*border_width, img_height + 2*border_width), 
                               (0, 0, 0, 0))
        
        # Paste QR code in center
        bordered_img.paste(qr_img, (border_width, border_width))
        
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
        
        qr_img = bordered_img
    
    # Save QR code
    qr_img.save(filename)
    print(f"QR code created successfully: {filename}")
    
    # Return the path to the saved file
    return filename

def interactive_mode():
    """Run QR code generator in interactive mode"""
    print("\n===== QR Code Generator =====\n")
    
    # Get data to encode
    data = input("Enter text or URL to encode: ")
    
    # Get output filename
    filename = input("Output filename (default: qrcode.png): ")
    if not filename.strip():
        filename = "qrcode.png"
    
    # Add logo?
    use_logo = input("Add a logo? (y/n, default: n): ").lower().strip()
    logo = None
    if use_logo == 'y' or use_logo == 'yes':
        logo = input("Enter logo file path: ")
        if not os.path.exists(logo):
            print(f"Warning: Logo file '{logo}' not found!")
            logo = None
    
    # Set colors
    color = input("QR code color (default: black): ")
    if not color.strip():
        color = "black"
    
    # Transparent background?
    transparent = input("Transparent background? (y/n, default: n): ").lower().strip()
    transparent = transparent == 'y' or transparent == 'yes'
    
    bg_color = None
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
        
        border_color = input("Border color (default: same as QR code): ")
        if not border_color.strip():
            border_color = None
    
    # Rounded corners?
    rounded = input("Use rounded corners? (y/n, default: n): ").lower().strip()
    rounded = rounded == 'y' or rounded == 'yes'
    
    # Size options
    box_size = 10
    box_size_input = input("Box size (default: 10): ")
    if box_size_input.isdigit():
        box_size = int(box_size_input)
    
    quiet_zone = 4
    quiet_zone_input = input("Quiet zone size (default: 4): ")
    if quiet_zone_input.isdigit():
        quiet_zone = int(quiet_zone_input)
    
    # Generate QR code
    generate_qr(
        data=data,
        filename=filename,
        logo=logo,
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

if __name__ == "__main__":
    interactive_mode()