import base64
import os
import mimetypes
from google import genai
from google.genai import types


def save_binary_file(file_name, data):
    f = open(file_name, "wb")
    f.write(data)
    f.close()


def generate(prompt):
    client = genai.Client(
        api_key='AIzaSyDVFjlgmZdy9a7bmmg3-FVA2eE_V3qp2tM',
    )

    model = "gemini-2.0-flash-exp-image-generation"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"""you are an image generation model, i will give you a prompt as input, generate an image of it as closely and accurately as possible {prompt}"""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Understood. Please provide your prompt, and I will do my best to generate an image that accurately reflects it. I look forward to seeing what you have in mind!"""),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),  # Replace INSERT_INPUT_HERE with the actual prompt
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        response_modalities=[
            "image",
            "text",
        ],
        response_mime_type="text/plain",
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if not chunk.candidates or not chunk.candidates[0].content or not chunk.candidates[0].content.parts:
            continue
        if chunk.candidates[0].content.parts[0].inline_data:
            file_name = f"generated_image_{os.urandom(4).hex()}"  # Create a unique filename
            inline_data = chunk.candidates[0].content.parts[0].inline_data
            file_extension = mimetypes.guess_extension(inline_data.mime_type)
            save_binary_file(
                f"{file_name}{file_extension}", inline_data.data
            )
            print(
                f"File of mime type {inline_data.mime_type} saved to: {file_name}{file_extension}"
            )
        else:
            print(chunk.text)

if __name__ == "__main__":
    prompt = input("Enter your prompt: ")
    generate(prompt)