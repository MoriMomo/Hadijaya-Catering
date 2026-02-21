import os
import re

src_dir = r"d:\pasti_berhasil\codee\Kuliah\Aiesec\hadijaya-catering - Copy\src"

def clean_dark_mode(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(r'\s*dark:[a-zA-Z0-9/\[\]\-:]+', '', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned {filepath}")

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.jsx'):
            clean_dark_mode(os.path.join(root, file))
