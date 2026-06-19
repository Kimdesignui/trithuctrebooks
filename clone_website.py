import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote

BASE_URL = 'https://sach.nxbphunu.com.vn/'
OUTPUT_DIR = r'd:\02_Development\Frontend\NXB_PhuNu_CLone'

session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
})

def clean_path(path):
    # Remove query string from path
    path = unquote(path)
    if path.startswith('/'):
        path = path[1:]
    return path

def download_file(url, local_path):
    try:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        if not os.path.exists(local_path):
            print(f"Downloading {url} to {local_path}")
            response = session.get(url, stream=True, timeout=15)
            if response.status_code == 200:
                with open(local_path, 'wb') as f:
                    for chunk in response.iter_content(8192):
                        f.write(chunk)
                return True
            else:
                print(f"Failed to download {url}: Status {response.status_code}")
        else:
            print(f"Already exists: {local_path}")
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def process_css(css_url, local_css_path):
    try:
        if os.path.exists(local_css_path):
            with open(local_css_path, 'r', encoding='utf-8', errors='ignore') as f:
                css_content = f.read()
        else:
            response = session.get(css_url, timeout=15)
            if response.status_code == 200:
                css_content = response.text
                # Write initial CSS
                os.makedirs(os.path.dirname(local_css_path), exist_ok=True)
                with open(local_css_path, 'w', encoding='utf-8') as f:
                    f.write(css_content)
            else:
                return
            
        # Find all url(...) in CSS
        urls = re.findall(r'url\((.*?)\)', css_content)
        for u in urls:
            clean_u = u.strip('\'" \t')
            if clean_u.startswith('data:') or clean_u.startswith('#'):
                continue
            
            asset_url = urljoin(css_url, clean_u)
            parsed_asset = urlparse(asset_url)
            
            # Only download from same domain or specific CDNs if needed, 
            # here we download if it's http/https
            if parsed_asset.scheme in ['http', 'https']:
                asset_path = clean_path(parsed_asset.path)
                if not asset_path:
                    continue
                asset_local_path = os.path.join(OUTPUT_DIR, asset_path.replace('/', os.sep))
                download_file(asset_url, asset_local_path)
                
                # Replace in CSS so it uses local path relative to CSS file
                # To keep it simple, we can make it an absolute path from the root
                # of the local structure, i.e., /asset_path, but offline we need relative.
                # Since we keep the exact directory structure, the relative paths in the original CSS
                # are actually correct! So we don't strictly need to modify the CSS content for paths,
                # BUT we need to make sure the paths in CSS match what we saved.
                # If they have query params in CSS like `font.woff?v=1.0`, we should remove them.
                if '?' in clean_u or '#' in clean_u:
                    base_u = clean_u.split('?')[0].split('#')[0]
                    css_content = css_content.replace(u, f"'{base_u}'")
                    
        with open(local_css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
    except Exception as e:
        print(f"Error processing CSS {css_url}: {e}")

def main():
    print(f"Fetching {BASE_URL}")
    response = session.get(BASE_URL)
    response.encoding = 'utf-8'
    html = response.text
    
    # Use html5lib or html.parser. html.parser is fine but we'll try to preserve structure
    soup = BeautifulSoup(html, 'html.parser')
    
    tags = {
        'link': 'href',
        'script': 'src',
        'img': 'src',
        'source': 'src'
    }
    
    for tag, attr in tags.items():
        for el in soup.find_all(tag):
            url = el.get(attr)
            
            # Handle lazy loading images first
            if tag == 'img':
                for lazy_attr in ['data-src', 'data-lazy-src']:
                    lazy_url = el.get(lazy_attr)
                    if lazy_url:
                        url = lazy_url
                        el['src'] = url
                        del el[lazy_attr]
                        break # Found lazy attr, break

            if url:
                if url.startswith('data:'):
                    continue
                
                full_url = urljoin(BASE_URL, url)
                parsed = urlparse(full_url)
                
                if parsed.scheme in ['http', 'https']:
                    path = clean_path(parsed.path)
                    
                    if not path:
                        continue
                        
                    local_path = os.path.join(OUTPUT_DIR, path.replace('/', os.sep))
                    
                    # Prevent downloading html pages if they are linked in <link> (like canonical)
                    if tag == 'link' and el.get('rel') != ['stylesheet'] and 'icon' not in (el.get('rel') or []):
                        # Some links are for canonical or alternate, we can ignore downloading them 
                        # if they don't have extensions, or just download anyway
                        pass
                        
                    download_file(full_url, local_path)
                    
                    if tag == 'link' and 'stylesheet' in (el.get('rel') or []):
                        process_css(full_url, local_path)
                        
                    # Update html to use relative path.
                    # Since index.html is at root, the path itself is the relative path!
                    el[attr] = path

    # Process inline styles for background images
    for el in soup.find_all(style=True):
        style = el['style']
        urls = re.findall(r'url\((.*?)\)', style)
        for u in urls:
            clean_u = u.strip('\'" \t')
            if clean_u.startswith('data:'):
                continue
            full_url = urljoin(BASE_URL, clean_u)
            parsed = urlparse(full_url)
            if parsed.scheme in ['http', 'https']:
                path = clean_path(parsed.path)
                if not path: continue
                local_path = os.path.join(OUTPUT_DIR, path.replace('/', os.sep))
                download_file(full_url, local_path)
                style = style.replace(u, f"'{path}'")
        el['style'] = style

    with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print("Cloning complete!")

if __name__ == '__main__':
    main()
