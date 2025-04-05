#!/usr/bin/env python3
"""
JSON Validator & Formatter
--------------------------
Validates and formats JSON content, even if indentation is improper.
"""
import json
from typing import Tuple, Optional
import os

def validate_json(content: str) -> bool:
    try:
        json.loads(content)
        return True
    except json.JSONDecodeError:
        return False

def get_json_error(content: str) -> Optional[Tuple[int, str]]:
    try:
        json.loads(content)
        return None
    except json.JSONDecodeError as e:
        return (e.lineno, e.msg)

def format_json(content: str, indent: int = 2) -> str:
    try:
        parsed = json.loads(content)
        return json.dumps(parsed, indent=indent, sort_keys=False)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON at line {e.lineno}: {e.msg}")

def run_interactive():
    print("📄 JSON Validator & Formatter")
    file_path = input("Enter path to JSON file: ").strip()

    if not os.path.exists(file_path):
        print("❌ File not found.")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    print("\nChecking validity...")
    if validate_json(content):
        print("✅ Valid JSON")
        try:
            formatted = format_json(content, indent=4)
            save_path = input("Enter output path (or leave empty to overwrite original): ").strip() or file_path
            with open(save_path, "w", encoding="utf-8") as out:
                out.write(formatted)
            print(f"💾 Reformatted JSON saved to {save_path}")
        except ValueError as ve:
            print(f"❌ Formatting failed: {ve}")
    else:
        err = get_json_error(content)
        print(f"❌ Invalid JSON at line {err[0]}: {err[1]}")

if __name__ == "__main__":
    run_interactive()
