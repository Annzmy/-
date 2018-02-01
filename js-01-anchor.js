/*
 *默认的锚点跳转效果是比较生硬的，点击之后直接到锚点所指向的部分，视觉体验来说太僵硬了，
 *如果有页面平滑滚动到“目的地”的效果就会好很多
 */
//PC端的锚点跳转滑动效果
//<a href="#part1"></a>
$('a[href*=#],area[href*=#]').click(function(){
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){
    var $target = $(this.hash);
    $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
    if ($target.length) {
      var targetOffset = $target.offset().top;
      $('html,body').animate({
        scrollTop: targetOffset
      }, 500);
      return false;
    }
  }
})

//移动端的锚点跳转滑动效果
//<a href="javascript:annzmy.slideTo('[name=part1]')">点击跳转</a>
$.fn.scrollTo = function(options) {
  var defaults = {
    toT: 0, //滚动目标位置
    durTime: 500, //过渡动画时间
    delay: 30, //定时器时间
    callback: null //回调函数
  };
  var opts = $.extend(defaults, options),
  timer = null,
  _this = this,
  curTop = _this.scrollTop(), //滚动条当前的位置
  subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
  index = 0,
  dur = Math.round(opts.durTime / opts.delay),
  smoothScroll = function(t) {
    index++;
    var per = Math.round(subTop / dur);
    if (index >= dur) {
      _this.scrollTop(t);
      window.clearInterval(timer);
      if (opts.callback && typeof opts.callback == 'function') {
        opts.callback();
      }
      return;
    }else {
       _this.scrollTop(curTop + index * per);
    }
  };
  timer = window.setInterval(function() {
    smoothScroll(opts.toT);
   }, opts.delay);
  return _this;
};

var annzmy ={
  init: function () {},
  slideTo:function(e){
    var offset = $(e).offset().top;
    $("html,body").scrollTo({
    "toT": offset
    });
   }
 };
 $(function () { annzmy.init(); });
