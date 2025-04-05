#!/usr/bin/env python3
"""
YAML Validator & Formatter
--------------------------
Validates and prettifies YAML content even with improper indentation.
"""
import yaml
from typing import Optional, Tuple
import os

def validate_yaml(content: str) -> bool:
    try:
        yaml.safe_load(content)
        return True
    except yaml.YAMLError:
        return False

def get_yaml_error(content: str) -> Optional[Tuple[int, str]]:
    try:
        yaml.safe_load(content)
        return None
    except yaml.YAMLError as e:
        if hasattr(e, 'problem_mark'):
            line = e.problem_mark.line + 1
            return (line, f"{e.problem} at line {line}, column {e.problem_mark.column + 1}")
        return (0, str(e))

def format_yaml(content: str) -> str:
    try:
        parsed = yaml.safe_load(content)
        return yaml.dump(parsed, default_flow_style=False, sort_keys=False)
    except yaml.YAMLError as e:
        raise ValueError(f"Invalid YAML: {str(e)}")

def run_interactive():
    print("📄 YAML Validator & Formatter")
    file_path = input("Enter path to YAML file: ").strip()

    if not os.path.exists(file_path):
        print("❌ File not found.")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    print("\nChecking validity...")
    if validate_yaml(content):
        print("✅ Valid YAML")
        try:
            formatted = format_yaml(content)
            save_path = input("Enter output path (or leave empty to overwrite original): ").strip() or file_path
            with open(save_path, "w", encoding="utf-8") as out:
                out.write(formatted)
            print(f"💾 Reformatted YAML saved to {save_path}")
        except ValueError as ve:
            print(f"❌ Formatting failed: {ve}")
    else:
        err = get_yaml_error(content)
        print(f"❌ Invalid YAML: {err[1]}")

if __name__ == "__main__":
    run_interactive()
