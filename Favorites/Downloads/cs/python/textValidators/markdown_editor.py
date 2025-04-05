#!/usr/bin/env python3
"""
Markdown Editor with Formatter, Validator, Preview, Open & Save
"""
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import markdown2
import re
import webbrowser
import os

# ----------- Markdown Utilities -----------

def validate_markdown(md: str) -> bool:
    return bool(re.search(r'#{1,6} | \*.+?\*|\[.+?\]\(.+?\)|`', md))

def fix_markdown(md: str) -> str:
    lines = md.splitlines()
    fixed = []
    for line in lines:
        if re.match(r'^#{1,6}[^\s#]', line):
            line = re.sub(r'^(#{1,6})([^\s#])', r'\1 \2', line)
        line = re.sub(r'^([\*\-\+])([^\s])', r'\1 \2', line)
        fixed.append(line)
    return '\n'.join(fixed)

def markdown_to_html(md: str) -> str:
    return markdown2.markdown(md, extras=[
        "fenced-code-blocks", "tables", "strike", "task_list",
        "code-friendly", "break-on-newline"
    ])

def write_html_to_temp(html: str) -> str:
    path = "preview.html"
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"<html><head><meta charset='UTF-8'><style>body{{font-family:Segoe UI, sans-serif; padding:20px}}</style></head><body>{html}</body></html>")
    return path

# ----------- GUI Class -----------

class MarkdownEditor(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Markdown Editor")
        self.geometry("900x600")
        self.file_path = None

        self.text = tk.Text(self, font=("Consolas", 12), wrap=tk.WORD)
        self.text.pack(fill=tk.BOTH, expand=True, side=tk.LEFT)

        btn_frame = ttk.Frame(self)
        btn_frame.pack(fill=tk.Y, side=tk.RIGHT, padx=5, pady=5)

        ttk.Button(btn_frame, text="Open File", command=self.open_file).pack(fill=tk.X, pady=4)
        ttk.Button(btn_frame, text="Save File", command=self.save_file).pack(fill=tk.X, pady=4)
        ttk.Button(btn_frame, text="Validate", command=self.validate).pack(fill=tk.X, pady=4)
        ttk.Button(btn_frame, text="Format", command=self.format_markdown).pack(fill=tk.X, pady=4)
        ttk.Button(btn_frame, text="Preview", command=self.preview).pack(fill=tk.X, pady=4)
        ttk.Button(btn_frame, text="Clear", command=self.clear).pack(fill=tk.X, pady=4)

    def open_file(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("Markdown Files", "*.md"), ("Text Files", "*.txt"), ("All Files", "*.*")]
        )
        if file_path:
            self.file_path = file_path
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                self.text.delete("1.0", tk.END)
                self.text.insert("1.0", content)

    def save_file(self):
        if not self.file_path:
            self.file_path = filedialog.asksaveasfilename(
                defaultextension=".md",
                filetypes=[("Markdown Files", "*.md"), ("Text Files", "*.txt"), ("All Files", "*.*")]
            )
        if self.file_path:
            content = self.text.get("1.0", tk.END)
            with open(self.file_path, "w", encoding="utf-8") as f:
                f.write(content)
            messagebox.showinfo("Saved", f"File saved to:\n{self.file_path}")

    def validate(self):
        content = self.text.get("1.0", tk.END)
        if validate_markdown(content):
            messagebox.showinfo("Valid", "Markdown looks valid!")
        else:
            messagebox.showwarning("Invalid", "No valid Markdown syntax detected.")

    def format_markdown(self):
        content = self.text.get("1.0", tk.END)
        fixed = fix_markdown(content)
        self.text.delete("1.0", tk.END)
        self.text.insert("1.0", fixed)
        messagebox.showinfo("Formatted", "Markdown formatting applied.")

    def preview(self):
        content = self.text.get("1.0", tk.END)
        html = markdown_to_html(content)
        path = write_html_to_temp(html)
        webbrowser.open_new_tab(f"file://{os.path.abspath(path)}")

    def clear(self):
        self.text.delete("1.0", tk.END)
        self.file_path = None

# ----------- Main -----------

if __name__ == "__main__":
    app = MarkdownEditor()
    app.mainloop()
