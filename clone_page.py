import sys
import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote

if len(sys.argv) < 3:
    print("Usage: python clone_page.py <URL> <OUTPUT_FILENAME>")
    sys.exit(1)

URL = sys.argv[1]
FILENAME = sys.argv[2]
OUTPUT_DIR = r'd:\02_Development\Frontend\NXB_PhuNu_CLone'

session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
})

def clean_path(path):
    path = unquote(path)
    if path.startswith('/'):
        path = path[1:]
    return path

def download_file(url, local_path):
    try:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        if not os.path.exists(local_path):
            print(f"Downloading {url}")
            response = session.get(url, stream=True, timeout=15)
            if response.status_code == 200:
                with open(local_path, 'wb') as f:
                    for chunk in response.iter_content(8192):
                        f.write(chunk)
                return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def main():
    print(f"Fetching {URL}")
    response = session.get(URL)
    response.encoding = 'utf-8'
    html = response.text
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Remove OneSignal scripts
    for s in soup.find_all('script'):
        if s.get('src', '').endswith('OneSignalSDK.page.js'):
            s.decompose()
        elif s.string and 'OneSignalDeferred' in s.string:
            s.decompose()
            
    tags = {
        'link': 'href',
        'script': 'src',
        'img': 'src',
        'source': 'src'
    }
    
    for tag, attr in tags.items():
        for el in soup.find_all(tag):
            url = el.get(attr)
            
            # Remove lazy load classes and move data-src to src
            classes = el.get('class', [])
            if classes:
                for cls in ['owl-lazy', 'lazy', 'lazyload']:
                    if cls in classes:
                        classes.remove(cls)
                el['class'] = classes
                
            for lazy_attr in ['data-src', 'data-lazy-src']:
                lazy_url = el.get(lazy_attr)
                if lazy_url:
                    url = lazy_url
                    el['src'] = url
                    del el[lazy_attr]
                    break

            if url:
                if url.startswith('data:'):
                    continue
                
                full_url = urljoin(URL, url)
                parsed = urlparse(full_url)
                
                if parsed.scheme in ['http', 'https'] and parsed.netloc == 'sach.nxbphunu.com.vn':
                    path = clean_path(parsed.path)
                    if not path:
                        continue
                        
                    local_path = os.path.join(OUTPUT_DIR, path.replace('/', os.sep))
                    
                    if tag == 'link' and el.get('rel') != ['stylesheet'] and 'icon' not in (el.get('rel') or []):
                        pass
                    else:
                        download_file(full_url, local_path)
                    
                    el[attr] = path

    for el in soup.find_all(style=True):
        style = el['style']
        urls = re.findall(r'url\((.*?)\)', style)
        for u in urls:
            clean_u = u.strip('\'" \t')
            if clean_u.startswith('data:'):
                continue
            full_url = urljoin(URL, clean_u)
            parsed = urlparse(full_url)
            if parsed.scheme in ['http', 'https'] and parsed.netloc == 'sach.nxbphunu.com.vn':
                path = clean_path(parsed.path)
                if not path: continue
                local_path = os.path.join(OUTPUT_DIR, path.replace('/', os.sep))
                download_file(full_url, local_path)
                style = style.replace(u, f"'{path}'")
        el['style'] = style

    output_file = os.path.join(OUTPUT_DIR, FILENAME)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Saved to {output_file}")

if __name__ == '__main__':
    main()
