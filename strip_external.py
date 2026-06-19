import glob
import os

html_files = glob.glob('*.html')
css_files = glob.glob('content/assets/css/*.css')

all_files = html_files + css_files

for f_name in all_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace absolute URLs with relative ones
    content = content.replace('https://sach.nxbphunu.com.vn/', '')
    content = content.replace('http://sach.nxbphunu.com.vn/', '')
    content = content.replace('//sach.nxbphunu.com.vn/', '')
    
    # If there are any sach.nxbphunu.com.vn left without slash
    content = content.replace('sach.nxbphunu.com.vn', 'localhost')
    
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Cleaned {f_name}")
