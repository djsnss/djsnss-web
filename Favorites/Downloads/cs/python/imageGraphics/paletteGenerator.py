import customtkinter as ctk
import random
import pyperclip
from tkinter import filedialog, Toplevel, messagebox
from PIL import Image, ImageDraw
import json
import colorsys
import re
import google.generativeai as genai

# Set your Gemini API key
genai.configure(api_key="AIzaSyDVFjlgmZdy9a7bmmg3-FVA2eE_V3qp2tM")

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("dark-blue")

# --- Helper Functions ---
def random_color():
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip("#")
    return tuple(int(hex_code[i:i + 2], 16) for i in (0, 2, 4))

def is_light(rgb):
    r, g, b = rgb
    return (r*299 + g*587 + b*114) / 1000 > 186

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(*rgb)

def rotate_hue(rgb, angle):
    r, g, b = [x/255.0 for x in rgb]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    h = (h + angle) % 1.0
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return (int(r*255), int(g*255), int(b*255))

# --- Main App Class ---
class ColorPaletteGenerator(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("🎨 Color Palette Generator")
        self.geometry("950x750")
        self.resizable(False, False)

        self.palette = []

        self.main_frame = ctk.CTkFrame(self, width=900, height=700, corner_radius=15)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center")

        self.title_label = ctk.CTkLabel(self.main_frame, text="Advanced Color Palette Generator", font=("Arial", 20, "bold"))
        self.title_label.pack(pady=10)

        self.prompt_entry = ctk.CTkEntry(self.main_frame, placeholder_text="Enter prompt for GenAI-generated palette (e.g., sunset on beach)", width=600)
        self.prompt_entry.pack(pady=10)

        self.main_btns = ctk.CTkFrame(self.main_frame, fg_color="transparent")
        self.main_btns.pack(pady=5)

        ctk.CTkButton(self.main_btns, text="✨ Prompt to Palette", command=self.llm_palette_from_prompt, width=120).grid(row=0, column=0, padx=10)
        ctk.CTkButton(self.main_btns, text="🔁 Random Palette", command=self.generate_palette, width=120).grid(row=0, column=1, padx=10)
        ctk.CTkButton(self.main_btns, text="🌈 Show Harmonies", command=self.show_harmonies, width=120).grid(row=0, column=2, padx=10)
        ctk.CTkButton(self.main_btns, text="💾 Save Palette", command=self.save_palette, width=120).grid(row=0, column=3, padx=10)
        ctk.CTkButton(self.main_btns, text="🖼️ Save as PNG", command=self.save_palette_image, width=120).grid(row=0, column=4, padx=10)
        ctk.CTkButton(self.main_btns, text="📤 Export", command=self.export_palette, width=120).grid(row=0, column=5, padx=10)

        self.palette_frame = ctk.CTkFrame(self.main_frame, fg_color="transparent")
        self.palette_frame.pack(pady=15)

        self.gradient_label = ctk.CTkLabel(self.main_frame, text="Gradient Preview", font=("Arial", 14))
        self.gradient_label.pack(pady=5)

        self.gradient_preview = ctk.CTkLabel(self.main_frame, text="")
        self.gradient_preview.pack(pady=5)

        self.harmony_info_label = ctk.CTkLabel(self.main_frame, text="", font=("Arial", 12))
        self.harmony_info_label.pack(pady=5)

        self.generate_palette()

    def generate_palette(self):
        self.palette = [random_color() for _ in range(5)]
        self.render_palette()

    def render_palette(self):
        for widget in self.palette_frame.winfo_children():
            widget.destroy()

        for i, hex_code in enumerate(self.palette):
            rgb = hex_to_rgb(hex_code)
            text_color = "black" if is_light(rgb) else "white"
            frame = ctk.CTkFrame(self.palette_frame, width=110, height=180, corner_radius=10)
            frame.grid(row=0, column=i, padx=10)

            color_box = ctk.CTkLabel(frame, text=hex_code.upper(), fg_color=hex_code,
                                     width=100, height=120, corner_radius=8,
                                     text_color=text_color, font=("Arial", 14, "bold"))
            color_box.pack(pady=5, padx=5)

            copy_btn = ctk.CTkButton(frame, text="📋 Copy", width=90, height=30,
                                     command=lambda h=hex_code: self.copy_hex(h))
            copy_btn.pack(pady=5)

        self.update_gradient_preview()

    def update_gradient_preview(self):
        if not self.palette:
            return
        img = Image.new("RGB", (300, 50))
        draw = ImageDraw.Draw(img)
        width = img.width // len(self.palette)
        for i, hex_code in enumerate(self.palette):
            rgb = hex_to_rgb(hex_code)
            draw.rectangle([i*width, 0, (i+1)*width, 50], fill=rgb)
        img.save("gradient_preview.png")
        self.gradient_image = ctk.CTkImage(Image.open("gradient_preview.png"), size=(300, 50))
        self.gradient_preview.configure(image=self.gradient_image)

    def copy_hex(self, hex_code):
        pyperclip.copy(hex_code)
        self.title_label.configure(text=f"✅ Copied {hex_code.upper()} to clipboard!")

    def save_palette(self):
        file = filedialog.asksaveasfilename(defaultextension=".json")
        if file:
            with open(file, "w") as f:
                json.dump(self.palette, f)

    def save_palette_image(self):
        if not self.palette:
            messagebox.showwarning("No palette", "Generate or load a palette first.")
            return

        file_path = filedialog.asksaveasfilename(defaultextension=".png",
                                                 filetypes=[("PNG Files", "*.png")])
        if file_path:
            width = 100 * len(self.palette)
            img = Image.new("RGB", (width, 100), (255, 255, 255))
            draw = ImageDraw.Draw(img)
            for i, hex_code in enumerate(self.palette):
                color = hex_to_rgb(hex_code)
                draw.rectangle([i * 100, 0, (i + 1) * 100, 100], fill=color)
            img.save(file_path)
            messagebox.showinfo("Saved", f"Palette image saved to:\n{file_path}")

    def export_palette(self):
        if not self.palette:
            messagebox.showwarning("No palette", "Generate or load a palette first.")
            return

        export_win = ctk.CTkToplevel(self)
        export_win.title("Export Palette")
        export_win.geometry("600x420")

        json_output = json.dumps(self.palette, indent=2)
        css_output = ":root {\n" + "\n".join([
            f"  --color-{i+1}: {code};" for i, code in enumerate(self.palette)
        ]) + "\n}"

        tailwind_output = "module.exports = {\n  theme: {\n    extend: {\n      colors: {\n" + \
                          "\n".join([f'        color{i+1}: "{code}",'
                                      for i, code in enumerate(self.palette)]) + \
                          "\n      }\n    }\n  }\n}"

        tabs = ctk.CTkTabview(export_win, width=580, height=360)
        tabs.pack(padx=10, pady=10)

        tabs.add("JSON")
        json_box = ctk.CTkTextbox(tabs.tab("JSON"), wrap="none")
        json_box.insert("1.0", json_output)
        json_box.pack(expand=True, fill="both")

        tabs.add("CSS")
        css_box = ctk.CTkTextbox(tabs.tab("CSS"), wrap="none")
        css_box.insert("1.0", css_output)
        css_box.pack(expand=True, fill="both")

        tabs.add("Tailwind")
        tw_box = ctk.CTkTextbox(tabs.tab("Tailwind"), wrap="none")
        tw_box.insert("1.0", tailwind_output)
        tw_box.pack(expand=True, fill="both")

    def load_palette(self):
        file = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
        if file:
            with open(file, "r") as f:
                self.palette = json.load(f)
                self.render_palette()

    def show_harmonies(self):
        if not self.palette:
            return
        base = hex_to_rgb(self.palette[0])
        comp = rotate_hue(base, 0.5)
        triad1 = rotate_hue(base, 1/3)
        triad2 = rotate_hue(base, 2/3)
        analog1 = rotate_hue(base, 1/12)
        analog2 = rotate_hue(base, -1/12)
        harmony_palette = [rgb_to_hex(c) for c in [comp, triad1, triad2, analog1, analog2]]
        self.palette = [rgb_to_hex(base)] + harmony_palette
        self.render_palette()
        self.harmony_info_label.configure(text="Base + Complementary, Triadic & Analogous colors")

    def llm_palette_from_prompt(self):
        prompt = self.prompt_entry.get().strip()
        if not prompt:
            messagebox.showwarning("Missing prompt", "Please enter a prompt.")
            return

        try:
            model = genai.GenerativeModel("gemini-2.0-flash")
            response = model.generate_content(f"Generate 5 aesthetic hex color codes for this theme: {prompt}. Just return them as a list of hex codes.")
            codes = re.findall(r"#(?:[0-9a-fA-F]{6})", response.text)
            if codes:
                self.palette = codes[:5]
                self.render_palette()
            else:
                messagebox.showerror("Error", "Could not extract colors from Gemini response.")
        except Exception as e:
            messagebox.showerror("Gemini Error", str(e))

if __name__ == "__main__":
    app = ColorPaletteGenerator()
    app.mainloop()
