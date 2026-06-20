(function () {
  'use strict';

  function render() {
    var app = document.getElementById('ttb-payment-app');
    var layout = window.TTBCheckoutLayout;
    if (!app || !layout) return;

    var page = [
      '<main class="ttb-checkout-main ttb-payment-reference">',
      '<div class="container">',
      '<nav class="ttb-checkout-breadcrumb"><a href="index.html"><i class="fas fa-home"></i></a><span>/</span><span>Th\u00f4ng tin thanh to\u00e1n</span></nav>',
      '<div class="ttb-payment-layout">',
      '<section class="ttb-payment-body">',
      '<div class="ttb-payment-title-row"><h1>Ph\u01b0\u01a1ng th\u1ee9c thanh to\u00e1n</h1><p>B\u1ea0N \u0110\u00c3 L\u00c0 TH\u00c0NH VI\u00caN? <a href="customer-login.html">\u0110\u0103ng nh\u1eadp <i class="fas fa-chevron-right"></i></a></p></div>',
      '<div class="ttb-pay-methods" role="radiogroup" aria-label="Ph\u01b0\u01a1ng th\u1ee9c thanh to\u00e1n">',
      '<label class="ttb-pay-method is-active"><input type="radio" name="payment-method" value="cod" checked><span class="ttb-pay-check"><i class="fas fa-check"></i></span><span class="ttb-pay-icon ttb-pay-icon-cod">COD</span><strong>Thanh To\u00e1n Khi Nh\u1eadn H\u00e0ng</strong><small>B\u1eb1ng ti\u1ec1n m\u1eb7t</small></label>',
      '<label class="ttb-pay-method"><input type="radio" name="payment-method" value="vnpay"><span class="ttb-pay-icon ttb-pay-logo-vnpay"><img src="Picture/vnpay-icon.svg" alt="VNPAY"></span><strong>Thanh to\u00e1n qua VN pay</strong><small>V\u00ed \u0111i\u1ec7n t\u1eed VN Pay</small></label>',
      '<label class="ttb-pay-method"><input type="radio" name="payment-method" value="bookcoin"><span class="ttb-pay-icon"><i class="fas fa-wallet"></i></span><strong>Thanh to\u00e1n b\u1eb1ng Book coin</strong><small>B\u1ea1n c\u1ea7n \u0111\u0103ng nh\u1eadp \u0111\u1ec3 ki\u1ec3m tra s\u1ed1 d\u01b0</small><a href="customer-login.html">\u0110\u0103ng nh\u1eadp</a></label>',
      '<label class="ttb-pay-method"><input type="radio" name="payment-method" value="bank"><span class="ttb-pay-icon"><i class="fas fa-credit-card"></i></span><strong>Thanh to\u00e1n chuy\u1ec3n kho\u1ea3n</strong><small>B\u1eb1ng t\u00e0i kho\u1ea3n ng\u00e2n h\u00e0ng</small><a href="transfer.html">H\u01b0\u1edbng d\u1eabn thanh to\u00e1n</a></label>',
      '</div>',
      '<section class="ttb-recipient-panel">',
      '<h2>Th\u00f4ng tin ng\u01b0\u1eddi nh\u1eadn</h2>',
      '<div class="ttb-recipient-grid">',
      '<label class="ttb-input-with-icon ttb-field-wide"><i class="far fa-user"></i><input type="text" value="Ho\u00e0ng \u0110\u1ee9c Tu\u1ea5n" aria-label="H\u1ecd v\u00e0 t\u00ean" autocomplete="name"></label>',
      '<label class="ttb-input-with-icon"><i class="far fa-phone"></i><input type="tel" value="+84 936 255 358" aria-label="S\u1ed1 \u0111i\u1ec7n tho\u1ea1i" autocomplete="tel"></label>',
      '<label class="ttb-input-with-icon"><i class="far fa-envelope"></i><input type="email" value="tuandh6789@gmail.com" aria-label="Email" autocomplete="email"></label>',
      '<label class="ttb-input-with-icon"><i class="far fa-map"></i><select aria-label="T\u1ec9nh ho\u1eb7c th\u00e0nh ph\u1ed1"><option>Ch\u1ecdn T\u1ec9nh/TP</option><option>H\u00e0 N\u1ed9i</option><option>TP. H\u1ed3 Ch\u00ed Minh</option></select></label>',
      '<label class="ttb-input-with-icon"><i class="far fa-map"></i><select aria-label="Qu\u1eadn ho\u1eb7c huy\u1ec7n"><option>Ch\u1ecdn Qu\u1eadn/Huy\u1ec7n</option><option>Ba \u0110\u00ecnh</option><option>C\u1ea7u Gi\u1ea5y</option></select></label>',
      '<label class="ttb-input-with-icon"><i class="far fa-map"></i><select aria-label="X\u00e3 ho\u1eb7c ph\u01b0\u1eddng"><option>Ch\u1ecdn X\u00e3/Ph\u01b0\u1eddng</option><option>Ng\u1ecdc H\u00e0</option><option>V\u0129nh Ph\u00fac</option></select></label>',
      '<label class="ttb-input-with-icon"><i class="far fa-map-marker-alt"></i><input type="text" placeholder="Nh\u1eadp s\u1ed1 nh\u00e0" aria-label="S\u1ed1 nh\u00e0" autocomplete="street-address"></label>',
      '<label class="ttb-field-wide"><input type="text" placeholder="Nh\u1eadp ghi ch\u00fa (kh\u00f4ng b\u1eaft bu\u1ed9c)" aria-label="Ghi ch\u00fa"></label>',
      '</div>',
      '</section>',
      '<label class="ttb-invoice-toggle"><input id="ttb-invoice-toggle" type="checkbox" checked><span><i class="fas fa-check"></i></span><strong>Xu\u1ea5t h\u00f3a \u0111\u01a1n c\u00f4ng ty</strong></label>',
      '<section class="ttb-invoice-panel" id="ttb-invoice-panel">',
      '<label><strong>T\u00ean c\u00f4ng ty</strong><input type="text" placeholder="Nh\u1eadp t\u00ean c\u00f4ng ty"></label>',
      '<label><strong>M\u00e3 s\u1ed1 thu\u1ebf</strong><input type="text" placeholder="Nh\u1eadp m\u00e3 s\u1ed1 thu\u1ebf"></label>',
      '<label><strong>Email ng\u01b0\u1eddi nh\u1eadn</strong><input type="email" placeholder="Nh\u1eadp email ng\u01b0\u1eddi nh\u1eadn h\u00f3a \u0111\u01a1n \u0111i\u1ec7n t\u1eed"></label>',
      '<label><strong>\u0110\u1ecba ch\u1ec9</strong><textarea rows="2" placeholder="Nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 \u0111\u1ecba ch\u1ec9 c\u00f4ng ty (bao g\u1ed3m Ph\u01b0\u1eddng/X\u00e3, Qu\u1eadn/Huy\u1ec7n, T\u1ec9nh/Th\u00e0nh ph\u1ed1 n\u1ebfu c\u00f3)"></textarea></label>',
      '</section>',
      '</section>',
      '<aside class="ttb-payment-receipt">',
      '<div class="ttb-receipt-cap"></div>',
      '<div class="ttb-receipt-line"><span>T\u1ea1m t\u00ednh:</span><strong>311.500\u0111</strong></div>',
      '<div class="ttb-receipt-voucher"><i class="far fa-ticket-alt"></i><input type="text" placeholder="Nh\u1eadp m\u00e3 gi\u1ea3m gi\u00e1"><button type="button">\u00c1p d\u1ee5ng</button></div>',
      '<div class="ttb-receipt-line"><span>Gi\u1ea3m gi\u00e1 tr\u1ef1c ti\u1ebfp:</span><strong>-</strong></div>',
      '<div class="ttb-receipt-line"><span>Gi\u1ea3m gi\u00e1 voucher:</span><strong>-</strong></div>',
      '<div class="ttb-receipt-line"><span>Ph\u00ed ship:</span><strong>-</strong></div>',
      '<div class="ttb-receipt-total"><span>Th\u00e0nh ti\u1ec1n:</span><strong>311.500\u0111</strong></div>',
      '<a id="btn-confirm-payment" class="ttb-payment-buy" href="transfer.html">Mua h\u00e0ng</a>',
      '<p>B\u1eb1ng vi\u1ec7c ti\u1ebfn h\u00e0nh \u0111\u1eb7t mua h\u00e0ng, b\u1ea1n \u0111\u1ed3ng \u00fd v\u1edbi \u0110i\u1ec1u kho\u1ea3n c\u1ee7a <strong>C\u00f4ng ty TNHH S\u00e1ch v\u00e0 Truy\u1ec1n th\u00f4ng Vi\u1ec7t Nam</strong></p>',
      '</aside>',
      '</div>',
      '</div>',
      '</main>'
    ].join('');

    app.outerHTML = layout.header() + page + layout.footer();

    var methods = document.querySelectorAll('.ttb-pay-method');
    methods.forEach(function (method) {
      var input = method.querySelector('input');
      input.addEventListener('change', function () {
        methods.forEach(function (item) { item.classList.remove('is-active'); });
        method.classList.add('is-active');
      });
    });

    var invoiceToggle = document.getElementById('ttb-invoice-toggle');
    var invoicePanel = document.getElementById('ttb-invoice-panel');
    invoiceToggle.addEventListener('change', function () {
      invoicePanel.hidden = !invoiceToggle.checked;
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
