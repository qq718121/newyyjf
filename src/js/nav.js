var home = '#homes';
var server = '#server';
var newscenter = '#newscenter';
var load = '#download';
var nav_screen = $('.g-nav-link');
var win = window;
var list = $('.u-nav-list').find('a');
var qr = $('.u-rq-code');
var _ac = {
    'background': '#fff',
    'color': '#0080FF',
    'border-bottom': '',
    'border-radius': '32px',
    'padding-left': '20px',
    'padding-right': '20px',
    'margin-left': '0',
    'margin-right': '0'
};
var _sAc = {
    'background': '#fff',
    'color': '#0080FF',
    'border-bottom': '3px solid #0080FF',
    'border-radius': 0,
    'padding-left': '0',
    'padding-right': '0',
    'margin-left': '20px',
    'margin-right': '20px'
};
var _link = {
    'background': '',
    'color': '',
    'border': '',
    'border-radius': '32',
    'padding-left': '0',
    'padding-right': '0',
    'margin-left': '20px',
    'margin-right': '20px'
};
var _slink = {
    'background': '',
    'color': '#8B949E',
    'border': '',
    'border-radius': '32px',
    'padding-left': '0',
    'padding-right': '0',
    'margin-left': '20px',
    'margin-right': '20px'
};
var nav_screen_link = {
    'background': '',
    'box-shadow': 'none'
};
var nav_screen_active = {
    'background': '#fff',
    'box-shadow': '0px 2px 6px 0px rgba(7,12,130,0.11)'
};
var logo_img_link = {
    'background': 'url("../images/bailogo.png") no-repeat center',
    'background-size': '100%'
};
var logo_img_active = {
    'background': 'url("../images/heilogo.png") no-repeat center',
    'background-size': '100%'
};

px2rem();
getList();
$("[href='#homes']").click();


function px2rem() {
    var e = navigator.userAgent.toLowerCase(),
        t = "ipad" == e.match(/ipad/i),
        i = "iphone os" == e.match(/iphone os/i),
        c = "midp" == e.match(/midp/i),
        a = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
        m = "ucweb" == e.match(/ucweb/i),
        n = "android" == e.match(/android/i),
        r = "windows ce" == e.match(/windows ce/i),
        o = "windows mobile" == e.match(/windows mobile/i);
    (!t && !i && !c && !a && !m && !n && !r && !o) && f_screen();
}

function f_screen() {
    $(win.document).bind('scroll', screenHandler);
}

function screenHandler() {
    var _s = $(document).scrollTop();
    if (_s && _s !== 0) {
        scrollStyle(nav_screen_active, logo_img_active, _sAc, _slink);
    } else {
        scrollStyle(nav_screen_link, logo_img_link, _ac, _link);
    }
}

function scrollStyle(_sc, _lo, _sa, _sl) {
    nav_screen.css(_sc);
    $('.u-logo').css(_lo);
    hash_navStyle(_sa, _sl);
}

function hash_navStyle(obj, link) {


    setTimeout(() => {
        initStyle(link);
        list.each(function () {
            if ($(this).hasClass('active')) {
                $(this).css(obj);
            }
        });
    }, 0);

}

function getList() {

    list.each(function () {
        $(this)
            .unbind()
            .bind('click', navClickHander);
    });

}

function initStyle(link) {

    list.each(function () {
        $(this).css(link);
    });

}
function qr_toggle() {

    qr.fadeToggle("slow");

}

function qr_is_toggle(key) {

    if (key == load) return;
    if (!qr.is(":hidden")) {
        qr.fadeOut("slow");
    }

}

function navClickHander() {

    var key = $(this).attr('href');
    qr_is_toggle(key);

    switch (key) {
        case home:
            $("#navbarNav").collapse('hide');
            break;
        case server:
            $("#navbarNav").collapse('hide');
            break;
        case newscenter:
            $("#navbarNav").collapse('hide');
            break;
        case load:
            // initStyle(_link);
            qr_toggle();
            break;
        default:
            break;
    }

}
