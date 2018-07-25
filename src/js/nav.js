var home = '#home';
var server = '#server';
var newscenter = '#newscenter';
var load = '#download';
var cs_link = 'nav-link-style';
var cs_active = 'nav-active-style';

getList();
$("[href='#home']").click();

function getList() {
      var list = $('.u-nav-list').find('a');
      list.each(function () {
            $(this)
                  .unbind()
                  .bind('click', navClickHander);
      })
}

function initStyle() {
      var list = $('.u-nav-list').find('a');
      list.each(function () {
            $(this)
                  .removeClass(cs_active)
                  .addClass(cs_link);
      })
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
                  console.log('home');
                  break;
            case server:
                  console.log('server');
                  break;
            case newscenter:
                  console.log('newscenter');
                  break;
            case load:
                  qr_toggle();
                  break;
            default:
                  break;
      }
}
