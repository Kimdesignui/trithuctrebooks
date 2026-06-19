import glob
import os
import re

html_files = glob.glob('*.html')

for f_name in html_files:
    with open(f_name, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = html.replace('href="/tat-ca-danh-muc"', 'href="tat-ca-danh-muc.html"')
    html = html.replace('href="/tai-lieu-tw-hlhpnvn-c1227"', 'href="tai-lieu-tw-hlhpnvn-c1227.html"')
    html = html.replace('href="/chu-tich-ho-chi-minh-voi-cong-tac-giao-duc-gia-dinh-va-chinh-sach-thieu-nien-nhi-dong-b14371.html"', 'href="chu-tich-ho-chi-minh-voi-cong-tac-giao-duc-gia-dinh-va-chinh-sach-thieu-nien-nhi-dong-b14371.html"')
    html = html.replace('href="/tuyen-tap-hay-nhat"', 'href="tuyen-tap-hay-nhat.html"')
    html = html.replace('href="/bo-pham-cach-3-cuon-c47.html"', 'href="bo-pham-cach-3-cuon-c47.html"')
    html = html.replace('href="/gioi-thieu-tai-khoan-thanh-vien-vip"', 'href="gioi-thieu-tai-khoan-thanh-vien-vip.html"')
    
    html = html.replace('href="//sach.nxbphunu.com.vn/tin-tuc"', 'href="tin-tuc.html"')
    html = html.replace('href="/tin-tuc"', 'href="tin-tuc.html"')
    html = re.sub(r'href="tin-tuc(?!.html|-n204)",', 'href="tin-tuc.html"', html)
    
    html = html.replace('href="//sach.nxbphunu.com.vn/gio%CC%81i-thie%CC%A3u-ve%CC%80-nha-xuat-ban-phu-nu-viet-nam-n194.html"', 'href="gioi-thieu-ve-nha-xuat-ban-phu-nu-viet-nam-n194.html"')
    html = html.replace('href="/gio%CC%81i-thie%CC%A3u-ve%CC%80-nha-xuat-ban-phu-nu-viet-nam-n194.html"', 'href="gioi-thieu-ve-nha-xuat-ban-phu-nu-viet-nam-n194.html"')
    html = html.replace('href="//sach.nxbphunu.com.vn/gioi-thieu-ve-nha-xuat-ban-phu-nu-n182.html"', 'href="gioi-thieu-ve-nha-xuat-ban-phu-nu-viet-nam-n194.html"')
    
    html = html.replace('href="//sach.nxbphunu.com.vn/gioi-thieu-sach-n198"', 'href="gioi-thieu-sach-n198.html"')
    html = html.replace('href="/gioi-thieu-sach-n198"', 'href="gioi-thieu-sach-n198.html"')
    
    html = html.replace('href="//sach.nxbphunu.com.vn/dieu-khoan-su-dung-n181.html"', 'href="dieu-khoan-su-dung-n181.html"')
    html = html.replace('href="/dieu-khoan-su-dung-n181.html"', 'href="dieu-khoan-su-dung-n181.html"')
    
    html = html.replace('href="/checkout/cart"', 'href="checkout-cart.html"')
    html = html.replace('href="//sach.nxbphunu.com.vn/checkout/cart"', 'href="checkout-cart.html"')
    
    html = html.replace('href="//sach.nxbphunu.com.vn/tin-tuc-n204"', 'href="tin-tuc-n204.html"')
    html = html.replace('href="/tin-tuc-n204"', 'href="tin-tuc-n204.html"')
    
    html = html.replace('href="/customer/login"', 'href="customer-login.html"')
    html = html.replace('href="//sach.nxbphunu.com.vn/customer/login"', 'href="customer-login.html"')
    
    html = html.replace('href="/customer/Signup?redirect=/&amp;code="', 'href="customer-signup.html"')
    html = html.replace('href="/customer/Signup?redirect=/&code="', 'href="customer-signup.html"')
    html = html.replace('href="//sach.nxbphunu.com.vn/customer/Signup?redirect=/&amp;code="', 'href="customer-signup.html"')
    html = html.replace('href="//sach.nxbphunu.com.vn/customer/Signup?redirect=/&code="', 'href="customer-signup.html"')
    
    html = html.replace('href="/customer/forgot-password"', 'href="customer-forgot-password.html"')
    html = html.replace('href="//sach.nxbphunu.com.vn/customer/forgot-password"', 'href="customer-forgot-password.html"')
    
    html = html.replace('href="//sach.nxbphunu.com.vn/chinh-sach-bao-mat-thong-tin-n180.html"', 'href="chinh-sach-bao-mat-thong-tin-n180.html"')
    html = html.replace('href="/chinh-sach-bao-mat-thong-tin-n180.html"', 'href="chinh-sach-bao-mat-thong-tin-n180.html"')
    
    html = html.replace('href="//sach.nxbphunu.com.vn/ban-to-chuc-sach-hay-2024-trao-giai-cho-14-tac-gia-va-tac-pham-xuat-sac-n184.html"', 'href="ban-to-chuc-sach-hay-2024-trao-giai-cho-14-tac-gia-va-tac-pham-xuat-sac-n184.html"')
    html = html.replace('href="/ban-to-chuc-sach-hay-2024-trao-giai-cho-14-tac-gia-va-tac-pham-xuat-sac-n184.html"', 'href="ban-to-chuc-sach-hay-2024-trao-giai-cho-14-tac-gia-va-tac-pham-xuat-sac-n184.html"')
    html = html.replace('href="ban-to-chuc-sach-hay-2024-trao-giai-cho-14-tac-gia-va-tac-pham-xuat-sac-n184.html"', 'href="ban-to-chuc-sach-hay-2024-trao-giai-cho-14-tac-gia-va-tac-pham-xuat-sac-n184.html"')
    
    # Safe replacement for root index
    html = re.sub(r'href="/(?!")"', 'href="index.html"', html)
    html = html.replace('href="/"', 'href="index.html"')
    
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated links in {f_name}')
