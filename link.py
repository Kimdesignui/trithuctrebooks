for f_name in ['index.html', 'tai-lieu-tw-hlhpnvn-c1227.html']:
    with open(f_name, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = html.replace('href="/"', 'href="index.html"')
    
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {f_name}')
