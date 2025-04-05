import customtkinter as ctk
from tkinter import colorchooser, filedialog, Toplevel
import pyperclip
import json
from PIL import Image, ImageDraw
import re
import os

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("dark-blue")


def is_light_color(rgb):
    r, g, b = rgb
    brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 186


def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip("#")
    return tuple(int(hex_code[i:i + 2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb):
    return "#%02x%02x%02x" % rgb


def clamp(x): return max(0, min(x, 255))


def generate_shades_and_tints(rgb):
    shades = [tuple(clamp(int(c * factor)) for c in rgb) for factor in [0.8, 0.6, 0.4]]
    tints = [tuple(clamp(int(c + (255 - c) * factor)) for c in rgb) for factor in [0.3, 0.5, 0.7]]
    return shades, tints


class FancyColorPicker(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("🎨 Advanced Color Picker")
        self.geometry("750x700")
        self.resizable(True, True)

        self.last_hex = None
        self.color_history = []

        self.card = ctk.CTkFrame(self, corner_radius=15, width=710, height=660)        
        self.card.place(relx=0.5, rely=0.5, anchor="center")

        self.title_label = ctk.CTkLabel(self.card, text="Pick or Enter a Color",
                                        font=ctk.CTkFont(size=22, weight="bold"))
        self.title_label.pack(pady=(15, 10))

        self.choose_btn = ctk.CTkButton(self.card, text="🎯 Choose From Picker", command=self.pick_color,
                                        height=36, width=220)
        self.choose_btn.pack(pady=5)

        self.hex_entry = ctk.CTkEntry(self.card, placeholder_text="#HexCode or rgb(r,g,b)", width=220, height=32)
        self.hex_entry.pack(pady=5)

        self.manual_btn = ctk.CTkButton(self.card, text="✅ Apply Manual Color", command=self.manual_color)
        self.manual_btn.pack(pady=5)

        self.preview_box = ctk.CTkLabel(self.card, text="No color", width=460, height=100, fg_color="#2b2b2b",
                                        text_color="white", corner_radius=12, font=("Arial", 14), anchor="center")
        self.preview_box.pack(pady=10)

        self.shade_frame = ctk.CTkFrame(self.card, fg_color="transparent")
        self.shade_frame.pack(pady=(10, 0))

        self.copy_btn = ctk.CTkButton(self.card, text="📋 Copy Hex", command=self.copy_to_clipboard, state="disabled")
        self.copy_btn.pack(pady=5)

        self.export_btn = ctk.CTkButton(self.card, text="📤 Export Palette", command=self.open_export_popup)
        self.export_btn.pack(pady=10)

        self.history_label = ctk.CTkLabel(self.card, text="🎨 History", font=ctk.CTkFont(size=16, weight="bold"))
        self.history_label.pack(pady=(15, 5))

        self.history_frame = ctk.CTkFrame(self.card, fg_color="transparent")
        self.history_frame.pack()

    def pick_color(self):
        color = colorchooser.askcolor(title="Select a Color")
        if color[0] and color[1]:
            rgb = tuple(map(int, color[0]))
            hex_code = color[1]
            self.update_display(hex_code, rgb)

    def manual_color(self):
        user_input = self.hex_entry.get().strip()
        if re.match(r"^#?[0-9A-Fa-f]{6}$", user_input):
            hex_code = user_input if user_input.startswith("#") else "#" + user_input
            rgb = hex_to_rgb(hex_code)
            self.update_display(hex_code, rgb)
        elif re.match(r"^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$", user_input):
            rgb = tuple(map(int, re.findall(r"\d+", user_input)))
            if all(0 <= val <= 255 for val in rgb):
                hex_code = rgb_to_hex(rgb)
                self.update_display(hex_code, rgb)

    def update_display(self, hex_code, rgb):
        self.last_hex = hex_code
        text_color = "black" if is_light_color(rgb) else "white"

        self.preview_box.configure(
            text=f"Hex: {hex_code.upper()}\nRGB: {rgb}",
            fg_color=hex_code,
            text_color=text_color
        )
        self.copy_btn.configure(state="normal", text="📋 Copy Hex")
        self.update_history(hex_code)
        self.render_shades_and_tints(rgb)

    def render_shades_and_tints(self, rgb):
        for widget in self.shade_frame.winfo_children():
            widget.destroy()

        shades, tints = generate_shades_and_tints(rgb)
        ctk.CTkLabel(self.shade_frame, text="Shades:").grid(row=0, column=0, padx=5)
        for i, shade in enumerate(shades):
            hex_shade = rgb_to_hex(shade)
            btn = ctk.CTkButton(self.shade_frame, width=25, height=25, fg_color=hex_shade,
                                text="", command=lambda h=hex_shade, r=shade: self.update_display(h, r))
            btn.grid(row=0, column=i+1, padx=3)

        ctk.CTkLabel(self.shade_frame, text="Tints:").grid(row=1, column=0, padx=5)
        for i, tint in enumerate(tints):
            hex_tint = rgb_to_hex(tint)
            btn = ctk.CTkButton(self.shade_frame, width=25, height=25, fg_color=hex_tint,
                                text="", command=lambda h=hex_tint, r=tint: self.update_display(h, r))
            btn.grid(row=1, column=i+1, padx=3)

    def update_history(self, hex_code):
        if hex_code not in self.color_history:
            self.color_history.insert(0, hex_code)
            if len(self.color_history) > 6:
                self.color_history.pop(6)

        for widget in self.history_frame.winfo_children():
            widget.destroy()

        for i, color in enumerate(self.color_history):
            btn = ctk.CTkButton(self.history_frame, width=30, height=30, fg_color=color,
                                text="", command=lambda h=color, r=hex_to_rgb(color): self.update_display(h, r))
            btn.grid(row=0, column=i, padx=4)

    def copy_to_clipboard(self):
        if self.last_hex:
            pyperclip.copy(self.last_hex)
            self.copy_btn.configure(text="✅ Copied!")

    def open_export_popup(self):
        if not self.color_history:
            return

        popup = Toplevel(self)
        popup.title("Export Palette")
        popup.geometry("300x200")
        popup.resizable(False, False)

        def export_json():
            file = filedialog.asksaveasfilename(defaultextension=".json", filetypes=[("JSON files", "*.json")])
            if file:
                with open(file, "w") as f:
                    json.dump(self.color_history, f)

        def export_css():
            file = filedialog.asksaveasfilename(defaultextension=".css", filetypes=[("CSS files", "*.css")])
            if file:
                with open(file, "w") as f:
                    for i, color in enumerate(self.color_history):
                        f.write(f"--color-{i + 1}: {color};\n")

        def export_png():
            file = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png")])
            if file:
                swatch_size = 60
                img = Image.new("RGB", (swatch_size * len(self.color_history), swatch_size), "white")
                draw = ImageDraw.Draw(img)
                for i, hex_code in enumerate(self.color_history):
                    rgb = hex_to_rgb(hex_code)
                    draw.rectangle([i * swatch_size, 0, (i + 1) * swatch_size, swatch_size], fill=rgb)
                img.save(file)

        ctk.CTkButton(popup, text="💾 Export as JSON", command=export_json).pack(pady=5)
        ctk.CTkButton(popup, text="🎨 Export as CSS", command=export_css).pack(pady=5)
        ctk.CTkButton(popup, text="🖼️ Export as PNG", command=export_png).pack(pady=5)


if __name__ == "__main__":
    app = FancyColorPicker()
    app.mainloop()
