var home = '#homes';
var server = '#server';
var newscenter = '#newscenter';
var load = '#download';
var cs_link = 'nav-link-style';
var cs_active = 'nav-active-style';

getList();
$("[href='#homes']").click();

// function navHide() {
//     $("#collapsibleNavbar").collapse('hide');
// }

function getList() {
    var list = $('.u-nav-list').find('a');
    list.each(function () {
        $(this)
            .unbind()
            .bind('click', navClickHander);
    });
}

function initStyle() {
    var list = $('.u-nav-list').find('a');
    list.each(function () {
        $(this)
            .removeClass(cs_active)
            .addClass(cs_link);
    });
}
function qr_toggle() {
    var qr = $('.u-rq-code');
    qr.fadeToggle("slow");
}
function qr_is_toggle(key) {
    var qr = $('.u-rq-code');
    if (key == load) return;
    if (!qr.is(":hidden")) {
        qr.fadeOut("slow");
    }
}

function navClickHander() {
    var key = $(this).attr('href');
    initStyle.call(this, '');
    qr_is_toggle(key);
    $(this)
        .removeClass(cs_link)
        .addClass(cs_active);
    switch (key) {
        case home:
            $("#collapsibleNavbar").collapse('hide');
            break;
        case server:
            $("#collapsibleNavbar").collapse('hide');
            break;
        case newscenter:
            $("#collapsibleNavbar").collapse('hide');
            break;
        case load:
            qr_toggle();
            break;
        default:
            break;
    }
}
