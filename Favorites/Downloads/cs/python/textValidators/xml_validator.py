#!/usr/bin/env python3
"""
XML Validator & Formatter
-------------------------
Validates and prettifies XML content, even if indentation is improper.
"""
import xml.etree.ElementTree as ET
import xml.dom.minidom as minidom
from typing import Optional, Tuple
import os

def validate_xml(content: str) -> bool:
    try:
        ET.fromstring(content)
        return True
    except ET.ParseError:
        return False

def get_xml_error(content: str) -> Optional[Tuple[int, str]]:
    try:
        ET.fromstring(content)
        return None
    except ET.ParseError as e:
        error_msg = str(e)
        line = 0
        try:
            line = int(error_msg.split("line")[1].split(",")[0].strip())
            return (line, error_msg)
        except (IndexError, ValueError):
            return (0, error_msg)

def format_xml(content: str, indent: int = 2) -> str:
    try:
        xml_dom = minidom.parseString(content)
        indent_str = ' ' * indent
        pretty_xml = xml_dom.toprettyxml(indent=indent_str)
        lines = [line for line in pretty_xml.split('\n') if line.strip()]
        return '\n'.join(lines)
    except Exception as e:
        raise ValueError(f"Invalid XML: {str(e)}")

def run_interactive():
    print("📄 XML Validator & Formatter")
    file_path = input("Enter path to XML file: ").strip()

    if not os.path.exists(file_path):
        print("❌ File not found.")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    print("\nChecking validity...")
    if validate_xml(content):
        print("✅ Valid XML")
        try:
            formatted = format_xml(content, indent=4)
            save_path = input("Enter output path (or leave empty to overwrite original): ").strip() or file_path
            with open(save_path, "w", encoding="utf-8") as out:
                out.write(formatted)
            print(f"💾 Reformatted XML saved to {save_path}")
        except ValueError as ve:
            print(f"❌ Formatting failed: {ve}")
    else:
        err = get_xml_error(content)
        print(f"❌ Invalid XML at line {err[0]}: {err[1]}")

if __name__ == "__main__":
    run_interactive()
