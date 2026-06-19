import glob
import re

html_files = glob.glob('*.html')
css_files = glob.glob('content/assets/css/*.css')

all_files = html_files + css_files

for f_name in all_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = re.findall(r'([^"\'\s]*sach\.nxbphunu\.com\.vn[^"\'\s]*)', content)
    if matches:
        print(f"Found in {f_name}:")
        unique_matches = set(matches)
        for m in unique_matches:
            print(f"  - {m}")
