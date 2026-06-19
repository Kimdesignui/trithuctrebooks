import re

with open('customer-login.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.findall(r'href="([^"]*Signup[^"]*)"', html)
print('Found links in customer-login:', set(matches))

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.findall(r'href="([^"]*Signup[^"]*)"', html)
print('Found links in index:', set(matches))
