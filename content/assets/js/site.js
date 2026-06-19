var arrOIds = new Array();
function getParameters(name, valueDefault) {
    var url = window.location.href;
    if (url.indexOf("?") > 0) {
        url = url.replace("#", "&");
    } else {
        url = url.replace("#", "?");
    }
    var uri = new URL(url);
    var value = uri.searchParams.get(name);
    if (value === null) {
        value = valueDefault;
    }
    return value;
}
function CopyContent() {
    var copyText = $("#UrlPage").attr('href');
    copyText.val(copyText).select();
    document.execCommand("copy");
}
function lengthcm(elm) {
    var messenger = $("#Messenger").val();
    var count = messenger.length;
    $('#length').html(count + '/1500')
}
function changeHashValue(key, value, source) {
    key = key + "=";
    if (source === undefined || source === '')
        source = $.address.value();
    source = source.replace("/", "#");
    var index = source.indexOf(key);
    if (index > -1) {
        var tempLink = source.split("&");
        for (var idx = 0; idx < tempLink.length; idx++) {
            if (tempLink[idx].includes(key)) {
                var keynew = key + tempLink[idx].split("=")[1]
                if (value !== '')
                    source = source.replace(keynew, key + value);
                else
                    source = source.replace(keynew, '');
                break;
            }
        }
    } else {
        if (source === "#" && value !== '') {
            source += key + value;
        } else if (value !== '') {
            source += "&" + key + value;
        }
    }
    source = source.replace('#&', '#');
    source = source.replace('&&', '&');
    return source;
}
function showError(message) {
    const errorDiv = document.getElementById('msg-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('d-none');
        errorDiv.style.display = 'block';

        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}
Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
Array.prototype.remove = function (el) {
    var idx = this.indexOf(el);
    if (idx !== -1) {
        this.splice(idx, 1);
    }
    return this;
};

document.addEventListener('DOMContentLoaded', function () {
    if (!/trang-chi-tiet-sach\.html$/i.test(window.location.pathname)) return;

    document.body.classList.add('ttb-detail-demo');

    [
        ['.ttb-header-package > a > span', 'Đăng ký Gói'],
        ['.section_header .cart > a > span', 'Giỏ Hàng'],
        ['.section_header .account > a > span', 'Đăng Nhập']
    ].forEach(function (item) {
        document.querySelectorAll(item[0]).forEach(function (node) {
            node.textContent = item[1];
        });
    });

    [
        ['.ttb-header-package > a', 'Đăng ký Gói'],
        ['.section_header .cart > a', 'Giỏ Hàng'],
        ['.section_header .account > a', 'Đăng Nhập']
    ].forEach(function (item) {
        document.querySelectorAll(item[0]).forEach(function (node) {
            node.setAttribute('aria-label', item[1]);
        });
    });

    document.querySelectorAll('.category_btn').forEach(function (node) {
        node.childNodes.forEach(function (child) {
            if (child.nodeType === Node.TEXT_NODE) child.textContent = '';
        });
        if (!node.querySelector('.ttb-category-title')) {
            var label = document.createElement('span');
            label.className = 'ttb-category-title';
            label.textContent = 'DANH MỤC SÁCH';
            node.appendChild(label);
        }
    });

    var menuItems = [
        ['sach-moi', 'Sách mới'],
        ['sach-combo-uu-dai', 'Sách COMBO ưu đãi'],
        ['mot-dong-lich-su', 'Một dòng lịch sử - Vạn câu chuyện đời'],
        ['hieu-nganh-gioi-nghe', 'Hiểu ngành giỏi nghề'],
        ['ha-noi-pho-va-nguoi', 'Hà Nội - Phố và Người'],
        ['sach-dich-sach-xuat-ban', 'Sách dịch sách xuất bản']
    ];

    menuItems.forEach(function (entry) {
        document.querySelectorAll('[data-submenu-id="' + entry[0] + '"] .category_link').forEach(function (link) {
            link.href = 'tat-ca-sach.html';
            link.title = entry[1];
            var span = link.querySelector('span');
            if (span) {
                span.textContent = entry[1];
            } else {
                link.childNodes.forEach(function (child) {
                    if (child.nodeType === Node.TEXT_NODE) child.textContent = '';
                });
                link.appendChild(document.createTextNode(entry[1]));
            }
        });
    });

    document.querySelectorAll('.category_show_all').forEach(function (link) {
        link.href = 'tat-ca-danh-muc.html';
        link.lastChild.textContent = 'Xem toàn bộ danh mục';
    });

    var detail = document.querySelector('.section-chi-tiet-sach');
    if (!detail) return;

    var sameTopicBooks = [
        ['Một Ông Sao Sáng - Tuổi Thơ Làng Quê Trong Trẻo Và Đầy Ắp Yêu Thương - Trần Thanh Cảnh', 'https://cdn.hstatic.net/products/200000273991/b_a_1_-_m_t__ng_sao_s_ng_9e447037cb084ffc8c65859ad27e29aa.png', '89.100₫'],
        ['[Pre–Order] AI First Thinking – Tư duy của người đi trước thời đại – NCS. ThS Nguyễn Vũ Huy Hoàng', 'https://cdn.hstatic.net/products/200000273991/bia_1_825f49774d3d4fdd9b1503a188af05b6.png', '181.300₫'],
        ['[Đặt trước] Tư Trị Thông Giám Tập 12 - Bản Phổ Thông - Bìa Cứng Bọc Vải', 'https://cdn.hstatic.net/products/200000273991/t__tr__th_ng_gi_m_t_p_12_3313718f491643499a63eb9adf6e6df4.jpg', '386.100₫'],
        ['[Đặt trước] Tư trị thông giám Tập 2 (Tái bản)', 'https://cdn.hstatic.net/products/200000273991/t__tr__th_ng_gi_m_39ca3cd518bc47df9f93d3cc4ec2027a.jpg', '311.200₫'],
        ['Từ đường làng ra đại lộ Tập 2 - Ánh đèn đại lộ - Tác giả Tèo', 'https://cdn.hstatic.net/products/200000273991/b_a_1_tdlrdl_3ad2c2d4ce4942acbb2b957f7db4712d.jpg', '179.100₫'],
        ['Sách - Tình Yêu Thăng Trầm Muôn Thuở - Nhóm chuyên gia Đinh Đoàn, Thuý Hải, Nhà báo - MC Thành Văn', 'https://cdn.hstatic.net/products/200000273991/4.hnhnh-ba1_fc59a342438e4837a314e3d14f745777.jpeg', '129.000₫'],
        ['[Đặt trước] Tư trị thông giám Tập 8 (Tái bản)', 'https://cdn.hstatic.net/products/200000273991/t__tr__th_ng_gi_m_b9020e44f9934462a44de1b156ac5fc9.png', '311.200₫'],
        ['Giá Trị Của Những Điều Không Nhìn Thấy - TS. Nguyễn Trung Kiên', 'https://cdn.hstatic.net/products/200000273991/b_a_1_dd65ec5aeb5844f3aaa52c1bfe2afe30.png', '282.600₫'],
        ['Bão Táp Tây Sơn - Trần Hoàng Vũ', 'https://cdn.hstatic.net/products/200000273991/b_a-ngo_i-tr__c_770af67279e14b29bfed74e470cece3c.png', '215.100₫'],
        ['Sách - Tứ Bất Tử - Tư Liệu và Khảo Cứu - Nguyễn Xuân Diện', 'https://cdn.hstatic.net/products/200000273991/t__b_t_t__0d479abf2111465e95229bbc3de7b4a4.png', '359.100₫']
    ];

    var comboBooks = [
        ['Combo Inako - Chiêu Thành, Chiêu Thành - Tokyo, hoa, nắng và anh ...', 'Picture/Combo-books/1.jpg', '1.031.200đ'],
        ['Combo Thần Thoại Ai Cập + Bắc Âu + Hy Lạp + Từ Điển Thần Thoại Hy Lạp -...', 'Picture/Combo-books/2.jpg', '239.200đ'],
        ['Combo Vì tình yêu Hà Nội (For the love of Hanoi) + postcard', 'Picture/Combo-books/3.jpg', '189.000đ'],
        ['Combo dã sử: Con voi thành Phật Thệ + Ngự tiền quan án + Trần triều nhân tho...', 'Picture/Combo-books/4.jpg', '179.100đ']
    ];

    function getDetailBookType(item) {
        var types = [
            { key: 'ebook', label: 'Ebook', icon: 'bi-phone-vibrate' },
            { key: 'audio', label: 'Audio', icon: 'bi-volume-up-fill' },
            { key: 'print', label: 'Sách in', icon: 'bi-book' }
        ];
        var seed = item && item[0] ? item[0] : 'book';
        var hash = 0;
        Array.from(seed).forEach(function (character) {
            hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
        });
        return types[Math.abs(hash) % types.length];
    }

    function detailBookTypeTag(item) {
        var type = getDetailBookType(item);
        return '<span class="book-type book-type-' + type.key + ' ttb-book-type-tag" aria-label="Loại sách: ' + type.label + '"><i class="bi ' + type.icon + '" aria-hidden="true"></i><span>' + type.label + '</span></span>';
    }

    function productCard(item, isCombo) {
        return [
            '<a href="' + (isCombo ? 'tuyen-tap-hay-nhat.html' : 'trang-chi-tiet-sach.html') + '" title="' + item[0] + '">',
            '<div class="collection-slider_item">',
            '<div class="item-img ttb-book-visual"><img src="' + item[1] + '" alt="' + item[0] + '" loading="lazy">' + detailBookTypeTag(item) + '</div>',
            '<div class="item-content">',
            '<h6 class="item-content_title h6-14 medium mb-0"><span>' + item[0] + '</span></h6>',
            '<div class="item-content_rate"><img src="content/assets/images/golden-star-warriors.svg" alt="5 sao" loading="lazy"></div>',
            '<div class="item-content_price"><span>' + item[2] + '</span></div>',
            '</div></div></a>'
        ].join('');
    }

    function sideItem(item, index) {
        return [
            '<a class="ttb-detail-side-item" href="trang-chi-tiet-sach.html" title="' + item[0] + '">',
            '<img src="' + item[1] + '" alt="' + item[0] + '" loading="lazy">',
            '<span class="ttb-detail-side-info"><strong>' + item[0] + '</strong><em>' + (2234 - index * 271) + ' lượt xem</em></span>',
            '<span class="ttb-detail-side-rank">0' + (index + 1) + '</span>',
            '</a>'
        ].join('');
    }

    detail.innerHTML = [
        '<div class="category_wrapper-breadcrum"><div class="container"><div class="ttb-detail-breadcrumb"><a href="index.html"><i class="far fa-home"></i></a><span>/</span><span>Trang chi tiết sách</span></div></div></div>',
        '<div class="container">',
        '<div class="ttb-detail-top">',
        '<div class="ttb-detail-gallery">',
        '<div class="ttb-detail-thumbs"><button type="button" aria-label="Ảnh trước"><i class="fal fa-chevron-up"></i></button>',
        '<img class="active" src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_compact.png" alt="Bìa sách Cố nhân tình">',
        '<img src="https://cdn.hstatic.net/products/200000273991/b_a_4__1__e8f7edfd339e4315aa11e440189304dc_compact.png" alt="Bìa sau Cố nhân tình">',
        '<img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__2__6f2ebc90b41740519d5a2a71d4067f65_compact.jpg" alt="Trang sách Cố nhân tình 1">',
        '<img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__3__3ba32defc7cf4ec68364ee10231058e5_compact.jpg" alt="Trang sách Cố nhân tình 2">',
        '<button type="button" aria-label="Ảnh sau"><i class="fal fa-chevron-down"></i></button></div>',
        '<div class="ttb-detail-cover-card"><span class="ttb-detail-gift"><i class="fas fa-gift"></i>Có tặng kèm SP</span><button class="ttb-detail-cover-open" type="button" aria-label="Mở thư viện ảnh bìa"><img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_master.png" alt="Sách - Cố nhân tình - Phiên bản đặc biệt - Tác giả Việt Chi"></button><div class="ttb-detail-read-actions"><a class="ttb-detail-read" href="https://ebookbanquyen.vn/ebook/doc-sach/31305/1"><i class="far fa-book-open"></i>Đọc thử</a><button class="ttb-detail-listen" type="button"><i class="far fa-headphones-alt"></i>Nghe thử</button></div></div>',
        '</div>',
        '<div class="ttb-detail-info">',
        '<h1>Sách - Cố nhân tình - Phiên bản đặc biệt - Tác giả Việt Chi</h1>',
        '<p class="ttb-detail-subtitle">“Cố nhân tình”. Cuốn sách gồm năm truyện ngắn - năm mối duyên nợ dở dang trong những trang sử đã ngả màu năm tháng của tác giả Việt Chi.</p>',
        '<div class="ttb-detail-stats"><span><strong>52358</strong> Lượt xem</span><span><strong>3639</strong> Đã bán</span><span>Chia sẻ <i class="far fa-share-alt"></i></span></div>',
        '<div class="ttb-detail-buybox"><h2>Chọn sản phẩm</h2>',
        '<label class="ttb-detail-option active"><span><i class="far fa-book"></i>Sách giấy</span><span class="ttb-detail-qty"><button type="button">−</button><em>1</em><button type="button">+</button></span><strong>146.000đ</strong><input type="checkbox" checked aria-label="Chọn sách giấy"></label>',
        '<label class="ttb-detail-option"><span><i class="far fa-mobile-alt"></i>Ebook</span><select aria-label="Thời hạn ebook"><option>Vĩnh viễn</option></select><strong>146.000đ</strong><input type="checkbox" aria-label="Chọn ebook"></label>',
        '<label class="ttb-detail-option"><span><i class="far fa-volume-up"></i>Audio book</span><select aria-label="Thời hạn audio"><option>Vĩnh viễn</option></select><strong>146.000đ</strong><input type="checkbox" aria-label="Chọn audio book"></label>',
        '<div class="ttb-detail-total"><span>Thành tiền</span><strong>146.000đ</strong></div><div class="ttb-detail-actions"><a class="ttb-detail-buy-now" href="checkout-cart.html">Mua ngay</a><a class="ttb-detail-add-cart" href="checkout-cart.html"><i class="far fa-shopping-basket"></i>Thêm vào giỏ</a></div>',
        '<div class="ttb-detail-promo"><i class="far fa-badge-percent"></i>Hình thức: Bìa cứng áo ôm kèm chữ ký & triện tác giả, postcard, bookmark.</div>',
        '</div></div></div>',
        '<div class="row ttb-detail-main-row">',
        '<div class="col-lg-9">',
        '<div class="ttb-detail-seller-row"><div class="ttb-detail-author"><a class="ttb-detail-author-avatar" href="chi-tiet-tac-gia.html" aria-label="Xem chi tiết tác giả Việt Chi"><img src="Picture/authors/viet-chi-avatar.png" alt="Tác giả Việt Chi"></a><a class="ttb-detail-author-info" href="chi-tiet-tac-gia.html"><em>Tác giả</em><strong>Việt Chi</strong></a><a class="ttb-detail-author-more" href="#ttb-detail-author-modal">Xem thêm</a></div><div class="ttb-detail-seller"><em class="ttb-detail-seller-title">Được bán bởi:</em><div class="ttb-detail-seller-brand"><img src="Picture/logo-short.svg" alt="Nhà sách Tri Thức Trẻ Books"><span class="ttb-detail-seller-info"><strong><i class="fas fa-check-circle"></i> Nhà sách Tri Thức Trẻ Books</strong><small><i class="bi bi-shield-fill-check" aria-hidden="true"></i>Nhà phát hành tin cậy</small></span></div></div></div>',
        '<div class="ttb-detail-card ttb-detail-pub"><h2>THÔNG TIN XUẤT BẢN</h2><div class="ttb-detail-pub-grid"><span><i class="far fa-book-open"></i>Tên sách</span><b>Cố nhân tình - Bản đặc biệt</b><span><i class="far fa-user"></i>Tác giả</span><b>Việt Chi</b><span><i class="far fa-layer-group"></i>Thể loại</span><b>Tập truyện ngắn lấy cảm hứng lịch sử</b><span><i class="far fa-building"></i>Đơn vị liên kết</span><b>Tri Thức Trẻ Books & Nxb. Phụ nữ</b><span><i class="far fa-ruler-combined"></i>Khổ sách</span><b>14.5×20.5</b><span><i class="far fa-list-ol"></i>Số trang</span><b>204 trang</b><span><i class="far fa-book"></i>Hình thức</span><b>Bìa cứng áo ôm, chữ ký & triện tác giả, postcard, bookmark</b><span><i class="far fa-calendar"></i>Thời gian mở bán</span><b>21/03/2026</b><span><i class="far fa-barcode"></i>ISBN</span><b>978-632-05-0110-6</b><span><i class="far fa-barcode-read"></i>Mã vạch</span><b>8936107814474</b></div></div>',
        '<div class="ttb-detail-card ttb-detail-description"><div class="ttb-detail-tabs" role="tablist" aria-label="Thông tin sách"><button class="active" type="button" role="tab" aria-selected="true" data-detail-tab="intro">GIỚI THIỆU</button><button type="button" role="tab" aria-selected="false" data-detail-tab="toc">MỤC LỤC</button></div><div class="ttb-detail-tab-panel active" data-detail-panel="intro"><h3>NỘI DUNG SÁCH</h3><p>Tri Thức Trẻ Books trân trọng giới thiệu đến bạn đọc cuốn sách <strong>“Cố nhân tình”.</strong> Cuốn sách gồm năm truyện ngắn - năm mối duyên nợ dở dang trong những trang sử đã ngả màu năm tháng.</p><p>Là chiếc khăn trầu kết nghĩa phu thê, cũng là bước đệm cho cuộc chuyển giao quyền lực. Là bóng trăng vỡ tan, chứng minh tiết hạnh của nàng công chúa. Là chuyến du hành thời gian đã cứu rỗi một linh hồn bạo quân. Là nỗi suy tư nơi cung cấm xa xăm, giữa chuyện trăm năm và lòng mộ Phật.</p><p>Cố nhân tình là một tập truyện ngắn chạm đến tim người đọc bằng những lát cắt riêng, nơi lịch sử làm nền, con người là trung tâm và nghĩa - tình là sợi chỉ đỏ xuyên suốt.</p><h3>GIỚI THIỆU TÁC GIẢ</h3><p><strong>Tác giả Việt Chi</strong> (tên thật Nguyễn Hà Việt Chi, sinh năm 1999) là một cây bút trẻ hiện đang sinh sống và làm việc tại Hà Nội. Cô được biết đến là một tác giả tâm huyết với văn học và văn hóa Việt, đặc biệt là thể loại văn học lấy cảm hứng lịch sử.</p><a class="ttb-detail-collapse" href="trang-chi-tiet-sach.html">Thu gọn</a></div><div class="ttb-detail-tab-panel" data-detail-panel="toc"><h3>MỤC LỤC SÁCH</h3><div class="ttb-detail-toc-table" role="table" aria-label="Mục lục sách Cố nhân tình"><div role="row"><span role="columnheader">Phần</span><span role="columnheader">Tên mục</span><span role="columnheader">Trang</span></div><div role="row"><span>01</span><strong>Lời mở đầu</strong><em>05</em></div><div role="row"><span>02</span><strong>Khăn trầu kết nghĩa</strong><em>17</em></div><div role="row"><span>03</span><strong>Bóng trăng trong cung cấm</strong><em>63</em></div><div role="row"><span>04</span><strong>Một chuyến du hành qua sử cũ</strong><em>109</em></div><div role="row"><span>05</span><strong>Cố nhân tình</strong><em>161</em></div><div role="row"><span>06</span><strong>Phụ lục và ghi chú tác giả</strong><em>197</em></div></div></div></div>',
        '<div class="ttb-detail-card ttb-detail-comments"><h2>BÌNH LUẬN</h2><div class="ttb-detail-comment-line"><div class="ttb-detail-comment-author"><img src="Picture/logo-short.svg" alt=""><strong>Tiến</strong></div><p>Sách này còn sách giấy không Ad ơi?</p><a href="customer-login.html">Trả lời</a><span>23 giờ trước</span></div><div class="ttb-detail-reply"><div class="ttb-detail-comment-author"><img src="Picture/logo-short.svg" alt=""><strong>Thanh Luân <em>Quản trị viên</em></strong></div><p>Chào bạn! Hiện tại sách này đã hết phiên bản sách giấy, sẽ báo lại ngay khi có hàng bạn nhé. Xin cảm ơn bạn.</p><span>23 giờ trước</span></div><textarea placeholder="Mời bạn để lại bình luận..."></textarea><button type="button">Gửi bình luận</button></div>',
        '</div>',
        '<aside class="col-lg-3 ttb-detail-sidebar"><div class="ttb-detail-side-card"><h3><i class="far fa-bookmark"></i>Sách mua nhiều</h3>' + sameTopicBooks.map(sideItem).join('') + '<a class="ttb-detail-side-more" href="tat-ca-sach.html">Xem toàn bộ ›</a></div><div class="ttb-detail-side-card"><h3><i class="far fa-bookmark"></i>Sách xem nhiều</h3>' + sameTopicBooks.slice().reverse().map(sideItem).join('') + '<a class="ttb-detail-side-more" href="tat-ca-sach.html">Xem toàn bộ ›</a></div></aside>',
        '</div></div>',
        '<div class="ttb-author-modal" id="ttb-detail-author-modal" aria-hidden="true">',
        '<div class="ttb-author-modal-backdrop" data-author-modal-close></div>',
        '<section class="ttb-author-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="ttb-author-modal-title">',
        '<button class="ttb-author-modal-close" type="button" aria-label="Đóng danh sách tác giả" data-author-modal-close><i class="far fa-times"></i></button>',
        '<h2 id="ttb-author-modal-title">DANH SÁCH TÁC GIẢ</h2>',
        '<p class="ttb-author-modal-subtitle">Các tác giả / dịch giả liên quan tới sản phẩm demo</p>',
        '<div class="ttb-author-modal-grid">',
        '<a class="ttb-author-modal-card featured" href="tat-ca-sach.html"><span class="ttb-author-avatar"><img src="Picture/authors/viet-chi-avatar.png" alt="Việt Chi"><i class="fas fa-check"></i></span><strong>Việt Chi</strong><em>Tác giả Cố nhân tình</em></a>',
        '<a class="ttb-author-modal-card" href="tat-ca-sach.html"><span class="ttb-author-avatar"><img src="content/assets/images/author-default.jpg" alt="Nguyễn Đức Tùng"></span><strong>Nguyễn Đức Tùng</strong><em>Tác giả</em></a>',
        '<a class="ttb-author-modal-card" href="tat-ca-sach.html"><span class="ttb-author-avatar"><img src="content/assets/images/author-default.jpg" alt="Trần Nhật Minh"></span><strong>Trần Nhật Minh</strong><em>Tác giả / dịch giả</em></a>',
        '<a class="ttb-author-modal-card" href="tat-ca-sach.html"><span class="ttb-author-avatar"><img src="content/assets/images/author-default.jpg" alt="Đinh Đoàn"></span><strong>Đinh Đoàn</strong><em>Tác giả</em></a>',
        '</div></section></div>',
        '<div class="ttb-gallery-lightbox" aria-hidden="true">',
        '<div class="ttb-gallery-lightbox-backdrop" data-gallery-close></div>',
        '<section class="ttb-gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Thư viện ảnh bìa sách">',
        '<button class="ttb-gallery-close" type="button" aria-label="Đóng thư viện ảnh" data-gallery-close><i class="far fa-times"></i></button>',
        '<button class="ttb-gallery-nav ttb-gallery-prev" type="button" aria-label="Ảnh trước"><i class="far fa-chevron-left"></i></button>',
        '<figure><img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_master.png" alt="Ảnh bìa sách"><figcaption><span class="ttb-gallery-counter">1 / 4</span><strong>Cố nhân tình - Phiên bản đặc biệt</strong></figcaption></figure>',
        '<button class="ttb-gallery-nav ttb-gallery-next" type="button" aria-label="Ảnh sau"><i class="far fa-chevron-right"></i></button>',
        '<div class="ttb-gallery-strip"></div>',
        '</section></div>',
        '<div class="ttb-audio-preview-modal" aria-hidden="true">',
        '<div class="ttb-audio-preview-backdrop" data-audio-preview-close></div>',
        '<section class="ttb-audio-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="ttb-audio-preview-title">',
        '<button class="ttb-audio-preview-close" type="button" aria-label="Đóng nghe thử" data-audio-preview-close><i class="far fa-times"></i></button>',
        '<span class="ttb-audio-preview-eyebrow"><i class="far fa-headphones-alt"></i>Nghe thử audiobook</span>',
        '<h2 id="ttb-audio-preview-title">Cố nhân tình - trích đoạn audio</h2>',
        '<p>Đây là demo tính năng nghe thử, nút "Nghe ngay" giả lập để ở màn này để trải nghiệm trang nghe Audiobooks đầy đủ khi đã mua sách.</p>',
        '<audio class="ttb-audio-preview-player" controls preload="none" src="https://www.gutenberg.org/files/22984/mp3/22984-01.mp3"></audio>',
        '<a class="ttb-audio-preview-now" href="nghe-audiobooks.html"><i class="far fa-play-circle"></i>Nghe ngay (thời hạn còn 153 ngày)</a>',
        '</section></div>'
    ].join('');

    var cursor = detail.nextElementSibling;
    while (cursor && !cursor.matches('.ttb-footer-top, .ttb-footer-main, .footer')) {
        var next = cursor.nextElementSibling;
        cursor.remove();
        cursor = next;
    }

    detail.insertAdjacentHTML('afterend', [
        '<section class="section section-dt ttb-detail-product-section"><div class="container"><div class="collection-book"><div class="collection-heading d-flex justify-content-between"><h3 class="h3-20 medium mb-0">CÙNG CHỦ ĐỀ</h3><a class="content_title-view d-flex align-items-center" href="tat-ca-sach.html">Xem toàn bộ ›</a></div><div class="collection-slider"><div class="owl-carousel owl-theme book-carousel-5">' + sameTopicBooks.map(function (item) { return productCard(item, false); }).join('') + '</div></div></div></div></section>',
        '<section class="section section-dt ttb-detail-product-section ttb-detail-combo-section"><div class="container"><div class="collection-book"><div class="collection-heading d-flex justify-content-between"><h3 class="h3-20 medium mb-0">COMBO SÁCH HAY</h3><a class="content_title-view d-flex align-items-center" href="tuyen-tap-hay-nhat.html">Xem toàn bộ ›</a></div><div class="collection-slider"><div class="owl-carousel owl-theme book-carousel-4">' + comboBooks.map(function (item) { return productCard(item, true); }).join('') + '</div></div></div></div></section>'
    ].join(''));

    document.querySelectorAll('.ttb-detail-tabs [data-detail-tab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = tab.getAttribute('data-detail-tab');
            document.querySelectorAll('.ttb-detail-tabs [data-detail-tab]').forEach(function (button) {
                var active = button === tab;
                button.classList.toggle('active', active);
                button.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            document.querySelectorAll('.ttb-detail-tab-panel').forEach(function (panel) {
                panel.classList.toggle('active', panel.getAttribute('data-detail-panel') === target);
            });
        });
    });

    var authorModal = document.querySelector('.ttb-author-modal');
    var authorMore = document.querySelector('.ttb-detail-author-more');

    function openAuthorModal(event) {
        if (event) event.preventDefault();
        authorModal?.classList.add('is-open');
        authorModal?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('ttb-modal-open');
        authorModal?.querySelector('.ttb-author-modal-close')?.focus();
    }

    function closeAuthorModal() {
        authorModal?.classList.remove('is-open');
        authorModal?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('ttb-modal-open');
        authorMore?.focus();
    }

    authorMore?.addEventListener('click', openAuthorModal);
    authorModal?.querySelectorAll('[data-author-modal-close]').forEach(function (node) {
        node.addEventListener('click', closeAuthorModal);
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && authorModal?.classList.contains('is-open')) {
            closeAuthorModal();
        }
    });

    var galleryImages = [
        ['https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_master.png', 'Bìa trước Cố nhân tình'],
        ['https://cdn.hstatic.net/products/200000273991/b_a_4__1__e8f7edfd339e4315aa11e440189304dc_master.png', 'Bìa sau Cố nhân tình'],
        ['https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__2__6f2ebc90b41740519d5a2a71d4067f65_master.jpg', 'Ảnh phụ Cố nhân tình 1'],
        ['https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__3__3ba32defc7cf4ec68364ee10231058e5_master.jpg', 'Ảnh phụ Cố nhân tình 2']
    ];
    var currentGalleryIndex = 0;
    var coverButton = document.querySelector('.ttb-detail-cover-open');
    var coverImage = coverButton?.querySelector('img');
    var thumbImages = [...document.querySelectorAll('.ttb-detail-thumbs img')];
    var galleryLightbox = document.querySelector('.ttb-gallery-lightbox');
    var galleryImage = galleryLightbox?.querySelector('figure img');
    var galleryCounter = galleryLightbox?.querySelector('.ttb-gallery-counter');
    var galleryCaption = galleryLightbox?.querySelector('figcaption strong');
    var galleryStrip = galleryLightbox?.querySelector('.ttb-gallery-strip');

    function renderMainImage(index) {
        currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
        var image = galleryImages[currentGalleryIndex];
        if (coverImage) {
            coverImage.src = image[0];
            coverImage.alt = image[1];
        }
        thumbImages.forEach(function (thumb, thumbIndex) {
            thumb.classList.toggle('active', thumbIndex === currentGalleryIndex);
        });
    }

    function renderLightbox() {
        var image = galleryImages[currentGalleryIndex];
        if (galleryImage) {
            galleryImage.src = image[0];
            galleryImage.alt = image[1];
        }
        if (galleryCounter) galleryCounter.textContent = (currentGalleryIndex + 1) + ' / ' + galleryImages.length;
        if (galleryCaption) galleryCaption.textContent = image[1];
        galleryStrip?.querySelectorAll('button').forEach(function (button, index) {
            button.classList.toggle('active', index === currentGalleryIndex);
        });
    }

    function openGallery(index) {
        if (typeof index === 'number') renderMainImage(index);
        renderLightbox();
        galleryLightbox?.classList.add('is-open');
        galleryLightbox?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('ttb-modal-open');
        galleryLightbox?.querySelector('.ttb-gallery-close')?.focus();
    }

    function closeGallery() {
        galleryLightbox?.classList.remove('is-open');
        galleryLightbox?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('ttb-modal-open');
        coverButton?.focus();
    }

    function moveGallery(delta) {
        renderMainImage(currentGalleryIndex + delta);
        renderLightbox();
    }

    thumbImages.forEach(function (thumb, index) {
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');
        thumb.addEventListener('click', function () { renderMainImage(index); });
        thumb.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                renderMainImage(index);
            }
        });
    });

    galleryImages.forEach(function (image, index) {
        var button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Xem ' + image[1]);
        var img = document.createElement('img');
        img.src = image[0];
        img.alt = image[1];
        button.appendChild(img);
        button.addEventListener('click', function () {
            renderMainImage(index);
            renderLightbox();
        });
        galleryStrip?.appendChild(button);
    });

    coverButton?.addEventListener('click', function () { openGallery(currentGalleryIndex); });
    galleryLightbox?.querySelectorAll('[data-gallery-close]').forEach(function (node) {
        node.addEventListener('click', closeGallery);
    });
    galleryLightbox?.querySelector('.ttb-gallery-prev')?.addEventListener('click', function () { moveGallery(-1); });
    galleryLightbox?.querySelector('.ttb-gallery-next')?.addEventListener('click', function () { moveGallery(1); });
    document.addEventListener('keydown', function (event) {
        if (!galleryLightbox?.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeGallery();
        if (event.key === 'ArrowLeft') moveGallery(-1);
        if (event.key === 'ArrowRight') moveGallery(1);
    });
    renderMainImage(0);

    var audioPreviewModal = document.querySelector('.ttb-audio-preview-modal');
    var audioPreviewOpen = document.querySelector('.ttb-detail-listen');
    var audioPreviewPlayer = document.querySelector('.ttb-audio-preview-player');

    function openAudioPreview() {
        audioPreviewModal?.classList.add('is-open');
        audioPreviewModal?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('ttb-modal-open');
        audioPreviewPlayer?.play().catch(function () {});
        audioPreviewModal?.querySelector('.ttb-audio-preview-close')?.focus();
    }

    function closeAudioPreview() {
        audioPreviewModal?.classList.remove('is-open');
        audioPreviewModal?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('ttb-modal-open');
        if (audioPreviewPlayer) {
            audioPreviewPlayer.pause();
            audioPreviewPlayer.currentTime = 0;
        }
        audioPreviewOpen?.focus();
    }

    audioPreviewOpen?.addEventListener('click', openAudioPreview);
    audioPreviewModal?.querySelectorAll('[data-audio-preview-close]').forEach(function (node) {
        node.addEventListener('click', closeAudioPreview);
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && audioPreviewModal?.classList.contains('is-open')) {
            closeAudioPreview();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    if (!/nghe-audiobooks\.html$/i.test(window.location.pathname)) return;

    document.body.classList.add('ttb-audio-page');

    [
        ['.ttb-header-package > a > span', 'Đăng ký Gói'],
        ['.section_header .cart > a > span', 'Giỏ Hàng'],
        ['.section_header .account > a > span', 'Đăng Nhập']
    ].forEach(function (item) {
        document.querySelectorAll(item[0]).forEach(function (node) {
            node.textContent = item[1];
        });
    });

    document.querySelectorAll('.menu_category .dropdown-menu .category_link, .menu_list-mobile .category_link').forEach(function (link) {
        link.setAttribute('href', 'tat-ca-sach.html');
    });

    var section = document.querySelector('.section-chi-tiet-sach');
    if (!section) return;

    var chapters = [
        ['Lời mở đầu', '0:59', 'https://www.gutenberg.org/files/22984/mp3/22984-01.mp3'],
        ['Chương 1', '12:46', 'https://www.gutenberg.org/files/22984/mp3/22984-01.mp3'],
        ['Chương 2', '09:34', 'https://www.gutenberg.org/files/22984/mp3/22984-01.mp3']
    ];
    var audioGalleryImages = [
        ['https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_master.png', 'Bìa trước Cố nhân tình'],
        ['https://cdn.hstatic.net/products/200000273991/b_a_4__1__e8f7edfd339e4315aa11e440189304dc_master.png', 'Bìa sau Cố nhân tình'],
        ['https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__2__6f2ebc90b41740519d5a2a71d4067f65_master.jpg', 'Ảnh phụ Cố nhân tình 1'],
        ['https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__3__3ba32defc7cf4ec68364ee10231058e5_master.jpg', 'Ảnh phụ Cố nhân tình 2']
    ];

    section.className = 'detail section-chi-tiet-sach ttb-audio-detail';
    section.innerHTML = [
        '<div class="category_wrapper-breadcrum"><div class="container"><div class="ttb-detail-breadcrumb"><a href="index.html"><i class="far fa-home"></i></a><span>/</span><span>Trang nghe sách</span></div></div></div>',
        '<div class="container">',
        '<div class="ttb-audio-hero">',
        '<div class="ttb-audio-cover-wrap">',
        '<div class="ttb-detail-gallery ttb-audio-gallery">',
        '<div class="ttb-detail-thumbs"><button type="button" aria-label="Ảnh trước"><i class="fal fa-chevron-up"></i></button>',
        '<img class="active" src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_compact.png" alt="Bìa sách Cố nhân tình">',
        '<img src="https://cdn.hstatic.net/products/200000273991/b_a_4__1__e8f7edfd339e4315aa11e440189304dc_compact.png" alt="Bìa sau Cố nhân tình">',
        '<img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__2__6f2ebc90b41740519d5a2a71d4067f65_compact.jpg" alt="Trang sách Cố nhân tình 1">',
        '<img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh__3__3ba32defc7cf4ec68364ee10231058e5_compact.jpg" alt="Trang sách Cố nhân tình 2">',
        '<button type="button" aria-label="Ảnh sau"><i class="fal fa-chevron-down"></i></button></div>',
        '<button class="ttb-audio-cover-card" type="button" aria-label="Mở thư viện ảnh bìa"><span class="ttb-detail-gift"><i class="fas fa-gift"></i>Có tặng kèm SP</span><img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_master.png" alt="Sách - Cố nhân tình"></button>',
        '</div>',
        '<div class="ttb-audio-owned"><span>Đã mua Audiobook</span><strong>Còn <em>153</em> Ngày Nghe</strong></div>',
        '</div>',
        '<div class="ttb-audio-info">',
        '<h1>Sách - Cố nhân tình - Phiên bản đặc biệt - Tác giả Việt Chi</h1>',
        '<p class="ttb-audio-subtitle">“Cố nhân tình”. Cuốn sách gồm năm truyện ngắn - năm mối duyên nợ dở dang trong những trang sử đã ngả màu năm tháng của tác giả Việt Chi.</p>',
        '<div class="ttb-detail-stats"><span><strong>52358</strong> Lượt xem</span><span><strong>3639</strong> Đã bán</span><span>Chia sẻ <i class="far fa-share-alt"></i></span></div>',
        '<div class="ttb-audio-player-card">',
        '<div class="ttb-audio-current">',
        '<button class="ttb-audio-main-toggle" type="button" aria-label="Phát hoặc tạm dừng"><i class="fas fa-play"></i></button>',
        '<img src="https://cdn.hstatic.net/products/200000273991/c__nh_n_t_nh_a16cc02f9187488d9735fd38010a0e9e_compact.png" alt="">',
        '<span><strong>Sách - Cố nhân tình - Phiên bản đặc biệt - Tác giả Việt Chi</strong><em>“Cố nhân tình” - năm truyện ngắn về những mối duyên nợ dở dang trong sử cũ.</em></span>',
        '</div>',
        '<audio class="ttb-audio-main" preload="metadata" src="' + chapters[0][2] + '"></audio>',
        '<div class="ttb-audio-progress"><span class="ttb-audio-current-time">0:59</span><input class="ttb-audio-range" type="range" min="0" max="100" value="9" aria-label="Tiến trình audio"><span>2:59</span><i class="far fa-random"></i><div class="ttb-audio-speed-controls" aria-label="Tốc độ phát"><button class="ttb-audio-speed-down" type="button" aria-label="Giảm tốc độ phát">−</button><strong>1.0x</strong><button class="ttb-audio-speed-up" type="button" aria-label="Tăng tốc độ phát">+</button></div></div>',
        '<div class="ttb-audio-playlist">' + chapters.map(function (chapter, index) {
            return '<div class="' + (index === 0 ? 'active ' : '') + 'ttb-audio-track" data-audio-src="' + chapter[2] + '" data-audio-title="' + chapter[0] + '"><button class="ttb-audio-track-play" type="button" aria-label="Phát ' + chapter[0] + '"><i class="fas fa-play"></i></button><div class="ttb-audio-track-body"><span>' + chapter[0] + '</span><div class="ttb-audio-track-progress"><span></span></div></div><em>' + chapter[1] + '</em></div>';
        }).join('') + '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="ttb-gallery-lightbox ttb-audio-gallery-lightbox" aria-hidden="true">',
        '<div class="ttb-gallery-lightbox-backdrop" data-audio-gallery-close></div>',
        '<section class="ttb-gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Thư viện ảnh bìa audiobook">',
        '<button class="ttb-gallery-close" type="button" aria-label="Đóng thư viện ảnh" data-audio-gallery-close><i class="far fa-times"></i></button>',
        '<button class="ttb-gallery-nav ttb-gallery-prev" type="button" aria-label="Ảnh trước"><i class="far fa-chevron-left"></i></button>',
        '<figure><img src="' + audioGalleryImages[0][0] + '" alt="' + audioGalleryImages[0][1] + '"><figcaption><span class="ttb-gallery-counter">1 / 4</span><strong>' + audioGalleryImages[0][1] + '</strong></figcaption></figure>',
        '<button class="ttb-gallery-nav ttb-gallery-next" type="button" aria-label="Ảnh sau"><i class="far fa-chevron-right"></i></button>',
        '<div class="ttb-gallery-strip"></div>',
        '</section></div>'
    ].join('');

    var audioCursor = section.nextElementSibling;
    while (audioCursor && !audioCursor.matches('.ttb-footer-top, .ttb-footer-main, .footer')) {
        var audioNext = audioCursor.nextElementSibling;
        audioCursor.remove();
        audioCursor = audioNext;
    }

    var audio = document.querySelector('.ttb-audio-main');
    var mainToggle = document.querySelector('.ttb-audio-main-toggle');
    var titleNode = document.querySelector('.ttb-audio-current strong');
    var range = document.querySelector('.ttb-audio-range');
    var currentTime = document.querySelector('.ttb-audio-current-time');
    var speedValue = document.querySelector('.ttb-audio-speed-controls strong');
    var currentAudioTrack = document.querySelector('.ttb-audio-track.active');
    var audioCoverButton = document.querySelector('.ttb-audio-cover-card');
    var audioCoverImage = audioCoverButton?.querySelector('img');
    var audioThumbImages = [...document.querySelectorAll('.ttb-audio-gallery .ttb-detail-thumbs img')];
    var audioGalleryLightbox = document.querySelector('.ttb-audio-gallery-lightbox');
    var audioGalleryImage = audioGalleryLightbox?.querySelector('figure img');
    var audioGalleryCounter = audioGalleryLightbox?.querySelector('.ttb-gallery-counter');
    var audioGalleryCaption = audioGalleryLightbox?.querySelector('figcaption strong');
    var audioGalleryStrip = audioGalleryLightbox?.querySelector('.ttb-gallery-strip');
    var currentAudioGalleryIndex = 0;

    function setPlaying(isPlaying) {
        mainToggle?.querySelector('i')?.classList.toggle('fa-pause', isPlaying);
        mainToggle?.querySelector('i')?.classList.toggle('fa-play', !isPlaying);
        document.querySelectorAll('.ttb-audio-track.active .ttb-audio-track-play i').forEach(function (icon) {
            icon.classList.toggle('fa-pause', isPlaying);
            icon.classList.toggle('fa-play', !isPlaying);
        });
    }

    mainToggle?.addEventListener('click', function () {
        if (!audio) return;
        if (audio.paused) audio.play().catch(function () {});
        else audio.pause();
    });

    document.querySelectorAll('.ttb-audio-track-play').forEach(function (playButton) {
        playButton.addEventListener('click', function () {
            var track = playButton.closest('.ttb-audio-track');
            var alreadyActive = track?.classList.contains('active');
            if (alreadyActive && audio && !audio.paused) {
                audio.pause();
                return;
            }
            document.querySelectorAll('.ttb-audio-track').forEach(function (item) {
                item.classList.remove('active');
                item.querySelector('.ttb-audio-track-play i')?.classList.remove('fa-pause');
                item.querySelector('.ttb-audio-track-play i')?.classList.add('fa-play');
            });
            if (!track) return;
            track.classList.add('active');
            currentAudioTrack = track;
            if (titleNode) titleNode.textContent = track.getAttribute('data-audio-title') || '';
            if (audio) {
                audio.src = track.getAttribute('data-audio-src') || audio.src;
                audio.play().catch(function () {});
            }
        });
    });

    range?.addEventListener('input', function () {
        if (!audio || !audio.duration) return;
        audio.currentTime = (Number(range.value) / 100) * audio.duration;
    });

    function changeAudioSpeed(delta) {
        if (!audio) return;
        var nextRate = Math.min(2, Math.max(0.5, Math.round((audio.playbackRate + delta) * 4) / 4));
        audio.playbackRate = nextRate;
        if (speedValue) {
            speedValue.textContent = (Number.isInteger(nextRate) ? nextRate.toFixed(1) : String(nextRate)) + 'x';
        }
    }

    document.querySelector('.ttb-audio-speed-down')?.addEventListener('click', function () { changeAudioSpeed(-0.25); });
    document.querySelector('.ttb-audio-speed-up')?.addEventListener('click', function () { changeAudioSpeed(0.25); });

    audio?.addEventListener('play', function () { setPlaying(true); });
    audio?.addEventListener('pause', function () { setPlaying(false); });
    audio?.addEventListener('timeupdate', function () {
        if (!audio.duration || !range) return;
        var progress = Math.round((audio.currentTime / audio.duration) * 100);
        range.value = String(progress);
        range.style.setProperty('--ttb-audio-progress', progress + '%');
        currentAudioTrack?.querySelector('.ttb-audio-track-progress span')?.style.setProperty('width', progress + '%');
        if (currentTime) {
            var minute = Math.floor(audio.currentTime / 60);
            var second = Math.floor(audio.currentTime % 60);
            currentTime.textContent = minute + ':' + String(second).padStart(2, '0');
        }
    });

    function renderAudioMainImage(index) {
        currentAudioGalleryIndex = (index + audioGalleryImages.length) % audioGalleryImages.length;
        var image = audioGalleryImages[currentAudioGalleryIndex];
        if (audioCoverImage) {
            audioCoverImage.src = image[0];
            audioCoverImage.alt = image[1];
        }
        audioThumbImages.forEach(function (thumb, thumbIndex) {
            thumb.classList.toggle('active', thumbIndex === currentAudioGalleryIndex);
        });
    }

    function renderAudioLightbox() {
        var image = audioGalleryImages[currentAudioGalleryIndex];
        if (audioGalleryImage) {
            audioGalleryImage.src = image[0];
            audioGalleryImage.alt = image[1];
        }
        if (audioGalleryCounter) audioGalleryCounter.textContent = (currentAudioGalleryIndex + 1) + ' / ' + audioGalleryImages.length;
        if (audioGalleryCaption) audioGalleryCaption.textContent = image[1];
        audioGalleryStrip?.querySelectorAll('button').forEach(function (button, index) {
            button.classList.toggle('active', index === currentAudioGalleryIndex);
        });
    }

    function openAudioGallery(index) {
        if (typeof index === 'number') renderAudioMainImage(index);
        renderAudioLightbox();
        audioGalleryLightbox?.classList.add('is-open');
        audioGalleryLightbox?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('ttb-modal-open');
        audioGalleryLightbox?.querySelector('.ttb-gallery-close')?.focus();
    }

    function closeAudioGallery() {
        audioGalleryLightbox?.classList.remove('is-open');
        audioGalleryLightbox?.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('ttb-modal-open');
        audioCoverButton?.focus();
    }

    function moveAudioGallery(delta) {
        renderAudioMainImage(currentAudioGalleryIndex + delta);
        renderAudioLightbox();
    }

    audioThumbImages.forEach(function (thumb, index) {
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');
        thumb.addEventListener('click', function () { renderAudioMainImage(index); });
        thumb.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                renderAudioMainImage(index);
            }
        });
    });

    audioGalleryImages.forEach(function (image, index) {
        var button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Xem ' + image[1]);
        var img = document.createElement('img');
        img.src = image[0];
        img.alt = image[1];
        button.appendChild(img);
        button.addEventListener('click', function () {
            renderAudioMainImage(index);
            renderAudioLightbox();
        });
        audioGalleryStrip?.appendChild(button);
    });

    audioCoverButton?.addEventListener('click', function () { openAudioGallery(currentAudioGalleryIndex); });
    audioGalleryLightbox?.querySelectorAll('[data-audio-gallery-close]').forEach(function (node) {
        node.addEventListener('click', closeAudioGallery);
    });
    audioGalleryLightbox?.querySelector('.ttb-gallery-prev')?.addEventListener('click', function () { moveAudioGallery(-1); });
    audioGalleryLightbox?.querySelector('.ttb-gallery-next')?.addEventListener('click', function () { moveAudioGallery(1); });
    document.addEventListener('keydown', function (event) {
        if (!audioGalleryLightbox?.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeAudioGallery();
        if (event.key === 'ArrowLeft') moveAudioGallery(-1);
        if (event.key === 'ArrowRight') moveAudioGallery(1);
    });
    renderAudioMainImage(0);
});

document.addEventListener('DOMContentLoaded', function () {
    var sortButton = document.querySelector('.ttb-sort-button');
    if (!sortButton) return;

    var sortControl = document.createElement('div');
    sortControl.className = 'ttb-sort-control select-filter';

    var sortLabel = document.createElement('label');
    sortLabel.className = 'sr-only';
    sortLabel.htmlFor = 'ttb-book-sort';
    sortLabel.textContent = 'Sắp xếp sách';

    var sortSelect = document.createElement('select');
    sortSelect.className = 'ttb-sort-select';
    sortSelect.id = 'ttb-book-sort';
    sortSelect.name = 'sort';
    sortSelect.setAttribute('aria-label', 'Sắp xếp sách');

    [
        ['newest', 'Mới nhất'],
        ['price-asc', 'Giá tăng dần'],
        ['price-desc', 'Giá thấp dần'],
        ['publication-year', 'Năm xuất bản']
    ].forEach(function (item) {
        var option = document.createElement('option');
        option.value = item[0];
        option.textContent = item[1];
        sortSelect.appendChild(option);
    });

    var currentSort = new URL(window.location.href).searchParams.get('sort');
    if (currentSort && sortSelect.querySelector('option[value="' + currentSort + '"]')) {
        sortSelect.value = currentSort;
    }

    sortControl.appendChild(sortLabel);
    sortControl.appendChild(sortSelect);
    sortButton.replaceWith(sortControl);
});

document.addEventListener('DOMContentLoaded', function () {
    var demoBookTypes = [
        { key: 'ebook', label: 'Ebook', icon: 'bi-phone-vibrate' },
        { key: 'audio', label: 'Audio', icon: 'bi-volume-up-fill' },
        { key: 'print', label: 'Sách in', icon: 'bi-book' }
    ];

    function getStableDemoType(seed) {
        var hash = 0;
        Array.from(seed || 'book').forEach(function (character) {
            hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
        });
        return demoBookTypes[Math.abs(hash) % demoBookTypes.length];
    }

    function getBookType(source) {
        var marker = [
            source.className || '',
            source.textContent || '',
            source.closest('[class]') ? source.closest('[class]').className : ''
        ].join(' ').toLowerCase();

        if (marker.indexOf('audio') !== -1 || marker.indexOf('sách nói') !== -1) {
            return { key: 'audio', label: 'Audio', icon: 'bi-volume-up-fill' };
        }

        if (marker.indexOf('ebook') !== -1 || marker.indexOf('e-book') !== -1) {
            return { key: 'ebook', label: 'Ebook', icon: 'bi-phone-vibrate' };
        }

        var productLink = source.closest('a');
        var seed = productLink
            ? productLink.getAttribute('title') || productLink.textContent
            : source.textContent;
        return getStableDemoType(seed);
    }

    function renderBookType(tag, type) {
        tag.className = 'book-type book-type-' + type.key + ' ttb-book-type-tag';
        tag.setAttribute('aria-label', 'Loại sách: ' + type.label);
        tag.replaceChildren();

        var icon = document.createElement('i');
        icon.className = 'bi ' + type.icon;
        icon.setAttribute('aria-hidden', 'true');

        var label = document.createElement('span');
        label.textContent = type.label;

        tag.appendChild(icon);
        tag.appendChild(label);
    }

    document.querySelectorAll('.book-type').forEach(function (tag) {
        var visual = tag.parentElement;
        if (visual) visual.classList.add('ttb-book-visual');
        renderBookType(tag, getBookType(tag));
    });

    document.querySelectorAll('a[href*="trang-chi-tiet-sach.html"]').forEach(function (link) {
        if (link.closest('.collection-slider, .cb_content')) return;

        var visual = link.querySelector('.ttb-all-books-product-img, .item, .item-img');
        if (!visual) return;

        visual.classList.add('ttb-book-visual');
        if (visual.querySelector('.book-type')) return;

        var tag = document.createElement('span');
        renderBookType(tag, getBookType(link));
        visual.appendChild(tag);
    });

    var authorByKeyword = [
        ['Một Ông Sao Sáng', 'Trần Thanh Cảnh'],
        ['AI First Thinking', 'Nguyễn Vũ Huy Hoàng'],
        ['Tư Trị Thông Giám', 'Tư Mã Quang'],
        ['Tư trị thông giám', 'Tư Mã Quang'],
        ['Từ đường làng ra đại lộ', 'Tèo'],
        ['Tình Yêu Thăng Trầm', 'Đinh Đoàn, Thuý Hải, MC Thành Văn'],
        ['Giá Trị Của Những Điều Không Nhìn Thấy', 'Nguyễn Trung Kiên'],
        ['Bão Táp Tây Sơn', 'Trần Hoàng Vũ'],
        ['Tứ Bất Tử', 'Nguyễn Xuân Diện'],
        ['Ước mơ trong biên giới', 'Hồng Vỹ'],
        ['Cố nhân tình', 'Việt Chi'],
        ['Cố Nhân Tình', 'Việt Chi'],
        ['Con Đường Tình Yêu', 'Tháng Tư']
    ];

    document.querySelectorAll('.ttb-all-books-product').forEach(function (card) {
        var link = card.querySelector(':scope > a');
        var title = link ? link.querySelector(':scope > h3') : null;
        var price = link ? link.querySelector(':scope > .ttb-all-books-price') : null;
        if (!link || !title || !price || link.querySelector('.ttb-all-books-product-info')) return;

        var fullTitle = link.getAttribute('title') || title.textContent.trim();
        var author = 'Tri Thức Trẻ Books';
        authorByKeyword.some(function (entry) {
            if (fullTitle.indexOf(entry[0]) !== -1) {
                author = entry[1];
                return true;
            }
            return false;
        });

        var info = document.createElement('div');
        info.className = 'ttb-all-books-product-info content_item-infor';

        var rating = document.createElement('div');
        rating.className = 'item_infor-vote';
        var stars = document.createElement('img');
        stars.src = 'content/assets/images/golden-star-warriors.svg';
        stars.alt = '5 sao';
        rating.appendChild(stars);

        var category = document.createElement('div');
        category.className = 'item_infor-category';
        var authorText = document.createElement('p');
        authorText.className = 'body-13';
        authorText.title = author;
        authorText.textContent = author;
        category.appendChild(authorText);

        link.insertBefore(info, title);
        info.appendChild(title);
        info.appendChild(rating);
        info.appendChild(category);
        info.appendChild(price);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var collectionTarget = 'tuyen-tap-hay-nhat.html';
    var bookTarget = 'trang-chi-tiet-sach.html';
    var collectionPattern = /(?:^|\s|[-–—:;,()[\]])(?:combo|tuyển\s+tập|bộ\s+sách)(?=$|\s|[-–—:;,()[\]])/i;

    function getProductCard(link) {
        return link.matches('.ttb-monthly-card')
            ? link
            : link.querySelector('.collection-slider_item, .ttb-all-books-product-img, .content_item-infor, .item-content_price, .item_infor-price, .item-txt-online')
                ? link
                : link.closest('.content_item, .collection-slider_item, .ttb-all-books-product, .ttb-monthly-card, .listproduct li');
    }

    function getProductName(link, card) {
        return (
            link.getAttribute('title') ||
            card.querySelector('[title]')?.getAttribute('title') ||
            card.querySelector('.item-content_title, .item_infor-title, h3, h4, h6')?.textContent ||
            card.querySelector('img[alt]')?.getAttribute('alt') ||
            ''
        ).trim();
    }

    document.querySelectorAll('a').forEach(function (link) {
        var card = getProductCard(link);
        if (!card || link.closest('.menu_category, .menu_list-mobile, .ttb-all-books-filter')) return;

        var name = getProductName(link, card);
        if (!name || /^Xem (?:tất cả|toàn bộ)/i.test(name)) return;

        link.setAttribute('href', collectionPattern.test(name) ? collectionTarget : bookTarget);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newsTarget = 'chi-tiet-tin.html';

    document.querySelectorAll('a').forEach(function (link) {
        var label = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        var href = link.getAttribute('href') || '';
        var isNavbarNews = label === 'tin tức' && link.closest('.main-menu, .ttb-footer-col');
        var isNewsItem = Boolean(link.closest(
            '.main_list-news, .news, .news_list, .content_book-list, .ttb-news-card, .list-blogs-related'
        ));
        var pointsToNews = /(?:tin-tuc(?:\.html|-n\d+\.html)?|\/blogs\/news\/|(?:^|\/)[^/]*-n\d+\.html)/i.test(href);

        if (isNavbarNews || (isNewsItem && pointsToNews)) {
            link.setAttribute('href', newsTarget);
        }
    });

    if (!/chi-tiet-tin\.html$/i.test(window.location.pathname)) return;

    document.body.classList.add('ttb-news-detail-page');
    document.title = 'Ra mắt bộ sách “Phan Thuận An với Huế” | Tri Thức Trẻ Books';

    var main = document.querySelector('.main_list-news');
    if (!main) return;

    main.className = 'ttb-news-detail';
    main.innerHTML = [
        '<div class="category_wrapper-breadcrum"><div class="container"><div class="ttb-detail-breadcrumb"><a href="index.html"><i class="far fa-home"></i></a><span>/</span><span>Chi tiết tin</span></div></div></div>',
        '<div class="container">',
        '<div class="ttb-news-detail-layout">',
        '<article class="ttb-news-article">',
        '<header class="ttb-news-article-header">',
        '<p class="ttb-news-kicker">Tin tức</p>',
        '<h1>Ra mắt bộ sách “Phan Thuận An với Huế”: khoảng 100 bài viết về Lịch sử, Văn hóa và Cổ tích xứ Huế</h1>',
        '<div class="ttb-news-meta"><span><i class="far fa-calendar-alt"></i> 18/06/2026</span><span><i class="far fa-eye"></i> 1.258 lượt xem</span><span><i class="far fa-share-alt"></i> Chia sẻ</span></div>',
        '</header>',
        '<figure class="ttb-news-hero"><img src="https://cdn.hstatic.net/files/200000273991/article/phan_thuan_an_voi_hue_e4f4bc3ff14c42b586d064d46b5aea9b.jpg" alt="Ra mắt bộ sách Phan Thuận An với Huế"></figure>',
        '<div class="ttb-news-body">',
        '<p class="ttb-news-lead"><strong>Sự kiện ra mắt bộ sách “Phan Thuận An với Huế” không chỉ là việc công bố một công trình học thuật mà còn là câu chuyện cảm động về tình yêu sắt son của một nhà nghiên cứu dành cho mảnh đất “Thần Kinh”.</strong></p>',
        '<h2>Tâm nguyện cuối cùng của nhà nghiên cứu tuổi ngoài 80</h2>',
        '<p>Trong những trang đầu của bộ sách, TS. Phan Thuận Thảo – con gái của nhà nghiên cứu Phan Thuận An – đã thay mặt cha mình chia sẻ những lời tâm huyết. Ở tuổi ngoài 80, khi sức khỏe không còn cho phép tiếp tục dấn thân trên những nẻo đường điền dã, ông gửi gắm mong muốn xuất bản một bộ sách tổng kết lại một phần sự nghiệp nghiên cứu về Huế kéo dài hơn nửa thế kỷ.</p>',
        '<figure><img src="https://cdn.hstatic.net/200000273991/file/phan_thuan_an_voi_hue__1__b5793a8fbecc48cf8c6e906f10708cb3_grande.jpg" alt="Bộ sách Phan Thuận An với Huế"><figcaption>Bộ sách được chắt lọc từ kho tư liệu hơn 500 bài viết của nhà nghiên cứu Phan Thuận An.</figcaption></figure>',
        '<p>Từ kho tư liệu đồ sộ gồm hơn 500 bài viết đã đăng tải trên các báo, tạp chí trung ương và địa phương từ những năm 1980 đến nay, gia đình và các cộng sự đã chọn ra khoảng 100 bài viết tiêu biểu nhất.</p>',
        '<h2>Ba lát cắt sâu sắc về lịch sử, văn hóa và di sản</h2>',
        '<figure><img src="https://cdn.hstatic.net/200000273991/file/phan_thuan_an_voi_hue__4__40c9cd828bbf4f5dab487d8e1a1c7727_grande.jpg" alt="Ba tập sách về Huế"></figure>',
        '<p>Bộ sách gồm ba tập: <strong>Lịch sử xứ Huế</strong>, <strong>Văn hóa xứ Huế</strong> và <strong>Cổ tích xứ Huế</strong>. Ba chủ đề tạo nên một bức tranh toàn cảnh về những biến cố lịch sử, không gian văn hóa, nghi lễ, di tích và cổ vật của vùng đất cố đô.</p>',
        '<h2>Một thái độ sống: “Người học Huế” suốt đời</h2>',
        '<p>Dù được giới học thuật và nhân dân nể trọng gọi là “nhà Huế học”, Phan Thuận An chỉ khiêm tốn nhận mình là người “học Huế”. Những bài viết của ông vừa có tính học thuật chặt chẽ, vừa thấm đẫm chất thơ và nỗi hoài niệm của một người con gắn bó máu thịt với quê hương.</p>',
        '<figure><img src="https://cdn.hstatic.net/200000273991/file/phan_thuan_an_voi_hue__5__5c833350d4734cb999e4fd4780b56a69_grande.jpg" alt="Nhà nghiên cứu Phan Thuận An"></figure>',
        '<h2>Điểm tựa tinh thần cho thế hệ hậu học</h2>',
        '<p>TS. Nguyễn Phước Hải Trung, Phó Giám đốc Trung tâm Bảo tồn Di tích Cố đô Huế, đánh giá bộ sách là một cột mốc quý giá cho nền học thuật về Huế và xem nhà nghiên cứu Phan Thuận An là một bậc thầy mẫu mực, truyền cảm hứng cho các thế hệ nghiên cứu trẻ.</p>',
        '<blockquote>“Tri Thức Trẻ Books luôn theo đuổi việc xuất bản những cuốn sách có giá trị bền vững, góp phần lưu giữ, bảo tồn và lan tỏa các giá trị văn hóa cho các thế hệ mai sau.”</blockquote>',
        '<p class="ttb-news-source"><strong>Theo Sở Du lịch thành phố Huế</strong></p>',
        '</div>',
        '<footer class="ttb-news-tags"><span>Tags:</span><a href="chi-tiet-tin.html">Phan Thuận An với Huế</a><a href="chi-tiet-tin.html">Văn hóa Huế</a></footer>',
        '</article>',
        '<aside class="ttb-news-sidebar">',
        '<section><h2>Tin nổi bật</h2>',
        '<a class="ttb-news-side-item" href="chi-tiet-tin.html"><img src="Picture/news-demo/news-01.jpg" alt=""><span>Ra mắt bộ sách “Phan Thuận An với Huế”</span></a>',
        '<a class="ttb-news-side-item" href="chi-tiet-tin.html"><img src="Picture/news-demo/news-02.jpg" alt=""><span>Lan tỏa giá trị văn hóa và tri thức Việt</span></a>',
        '<a class="ttb-news-side-item" href="chi-tiet-tin.html"><img src="Picture/news-demo/news-03.jpg" alt=""><span>Những cuốn sách đáng đọc trong tháng</span></a>',
        '</section>',
        '<section><h2>Chủ đề</h2><div class="ttb-news-topic-list"><a href="chi-tiet-tin.html">Tin tức chung</a><a href="chi-tiet-tin.html">Văn hóa đọc</a><a href="chi-tiet-tin.html">Giới thiệu sách</a></div></section>',
        '</aside>',
        '</div>',
        '</div>'
    ].join('');

    var cursor = main.nextElementSibling;
    while (cursor && !cursor.matches('.ttb-footer-top, .ttb-footer-main, .footer')) {
        var next = cursor.nextElementSibling;
        cursor.remove();
        cursor = next;
    }
});
