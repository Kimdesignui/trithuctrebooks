(function(){
'use strict';
function render(){
var app=document.getElementById('ttb-transfer-app'),layout=window.TTBCheckoutLayout;
if(!app||!layout)return;
var page=[
'<main class="ttb-checkout-main ttb-transfer-reference"><div class="container">',
'<nav class="ttb-checkout-breadcrumb"><a href="index.html"><i class="fas fa-home"></i></a><span>/</span><a href="cart-full.html">Gi\u1ecf h\u00e0ng</a></nav>',
'<div class="ttb-transfer-reference-layout"><section class="ttb-transfer-reference-card">',
'<h1>TH\u00d4NG TIN THANH TO\u00c1N</h1><div class="ttb-transfer-qr-block">',
'<div class="ttb-transfer-qr"><img src="Picture/transfer-qr.svg" alt="M\u00e3 QR chuy\u1ec3n kho\u1ea3n ng\u00e2n h\u00e0ng"></div>',
'<div class="ttb-transfer-guide"><h2><i class="fas fa-caret-left"></i> Qu\u00e9t m\u00e3 qua \u1ee9ng d\u1ee5ng Ng\u00e2n h\u00e0ng</h2>',
'<a class="ttb-transfer-help" href="payment.html"><i class="far fa-info-circle"></i> Xem h\u01b0\u1edbng d\u1eabn thanh to\u00e1n</a>',
'<div class="ttb-transfer-actions"><a href="Picture/transfer-qr.svg" download="trithuctrebooks-qr.svg">T\u1ea3i m\u00e3 QR</a><button id="ttb-share-transfer" type="button">Chia s\u1ebb</button></div>',
'<p>\u0110\u01a1n h\u00e0ng s\u1ebd \u0111\u01b0\u1ee3c t\u1ef1 \u0111\u1ed9ng x\u1eed l\u00fd, n\u1ebfu sau <strong>5 ph\u00fat</strong> \u0111\u01a1n h\u00e0ng v\u1eabn ch\u01b0a \u0111\u01b0\u1ee3c x\u1eed l\u00fd, b\u1ea1n vui l\u00f2ng li\u00ean h\u1ec7 hotline ho\u1eb7c livechat \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3.</p></div></div>',
'<div class="ttb-transfer-divider"><span>Ho\u1eb7c nh\u1eadp th\u00f4ng tin chuy\u1ec3n kho\u1ea3n</span></div>',
'<div class="ttb-transfer-code-box"><strong>N\u1ed9i dung Chuy\u1ec3n kho\u1ea3n:</strong><div><b>4 6 4 7 5 4</b><button type="button" data-copy="464754"><i class="far fa-copy"></i></button></div><small>L\u01b0u \u00fd: \u0110i\u1ec1n ch\u00ednh x\u00e1c m\u00e3 tr\u00ean \u0111\u00e2y v\u00e0o n\u1ed9i dung chuy\u1ec3n kho\u1ea3n</small></div>',
'<dl class="ttb-transfer-bank-list">',
'<div><dt>Ng\u00e2n h\u00e0ng</dt><dd><strong>Ng\u00e2n h\u00e0ng TMCP B\u1eafc \u00c1</strong><span class="ttb-bac-a-mark"><img src="Picture/bacabank-logo.svg" alt="BAC A BANK"></span></dd></div>',
'<div><dt>Chi nh\u00e1nh</dt><dd><strong>C\u1ea7u Gi\u1ea5y</strong><button type="button" data-copy="C\u1ea7u Gi\u1ea5y"><i class="far fa-copy"></i></button></dd></div>',
'<div><dt>S\u1ed1 t\u00e0i kho\u1ea3n</dt><dd><strong>1 8 0 0 0 1 0 6 0 0 1 3 7 8 5</strong><button type="button" data-copy="180001060013785"><i class="far fa-copy"></i></button></dd></div>',
'<div><dt>Ch\u1ee7 t\u00e0i kho\u1ea3n</dt><dd><strong>C\u00d4NG TY TNHH S\u00c1CH V\u00c0 TRUY\u1ec0N TH\u00d4NG VI\u1ec6T NAM</strong><button type="button" data-copy="C\u00d4NG TY TNHH S\u00c1CH V\u00c0 TRUY\u1ec0N TH\u00d4NG VI\u1ec6T NAM"><i class="far fa-copy"></i></button></dd></div>',
'</dl></section>',
'<aside class="ttb-payment-receipt ttb-transfer-receipt"><div class="ttb-receipt-cap"></div>',
'<div class="ttb-receipt-line"><span>T\u1ea1m t\u00ednh:</span><strong>311.500\u0111</strong></div>',
'<div class="ttb-receipt-line"><span>Gi\u1ea3m gi\u00e1 tr\u1ef1c ti\u1ebfp</span><strong>- 4.000\u0111</strong></div>',
'<div class="ttb-receipt-line"><span>Gi\u1ea3m gi\u00e1 voucher</span><strong>- 7.500\u0111</strong></div>',
'<div class="ttb-receipt-line"><span>Ph\u00ed ship</span><strong>11.500\u0111</strong></div>',
'<div class="ttb-receipt-line"><span>Gi\u1ea3m gi\u00e1 v\u1eadn chuy\u1ec3n</span><strong>- 11.500\u0111</strong></div>',
'<div class="ttb-receipt-total"><span>Th\u00e0nh ti\u1ec1n:</span><strong>311.500\u0111</strong></div>',
'<button class="ttb-transfer-complete" type="button">T\u00f4i \u0111\u00e3 chuy\u1ec3n kho\u1ea3n<small>(Ki\u1ec3m tra tr\u1ea1ng th\u00e1i \u0111\u01a1n h\u00e0ng 300 gi\u00e2y)</small></button>',
'<a class="ttb-transfer-back-home" href="index.html">Quay l\u1ea1i trang ch\u1ee7</a>',
'<p>B\u1eb1ng vi\u1ec7c ti\u1ebfn h\u00e0nh \u0111\u1eb7t mua h\u00e0ng, b\u1ea1n \u0111\u1ed3ng \u00fd v\u1edbi \u0110i\u1ec1u kho\u1ea3n c\u1ee7a <strong>C\u00f4ng ty TNHH S\u00e1ch v\u00e0 Truy\u1ec1n th\u00f4ng Vi\u1ec7t Nam</strong></p></aside>',
'</div></div></main>'
].join('');
app.outerHTML=layout.header()+page+layout.footer();
document.querySelectorAll('[data-copy]').forEach(function(button){button.addEventListener('click',function(){if(navigator.clipboard)navigator.clipboard.writeText(button.getAttribute('data-copy'));button.classList.add('is-copied');setTimeout(function(){button.classList.remove('is-copied');},1200);});});
var share=document.getElementById('ttb-share-transfer');
share.addEventListener('click',function(){var data={title:'Th\u00f4ng tin chuy\u1ec3n kho\u1ea3n',text:'M\u00e3 chuy\u1ec3n kho\u1ea3n: 464754',url:window.location.href};if(navigator.share)navigator.share(data);else if(navigator.clipboard)navigator.clipboard.writeText(window.location.href);});
}
document.addEventListener('DOMContentLoaded',render);
})();