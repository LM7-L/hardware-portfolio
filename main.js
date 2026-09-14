/* 硬件作品集 · 页面交互
   1) 导航吸顶描边
   2) 图集点击放大 / 方向键切换 / 手机滑动
*/
(function () {
  'use strict';

  /* ---------- 1. 导航吸顶 ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 大图查看 ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbCounter = document.getElementById('lbCounter');

  if (lb) {
    var btnPrev = lb.querySelector('[data-lb-prev]');
    var btnNext = lb.querySelector('[data-lb-next]');
    var items = [];

    Array.prototype.forEach.call(document.querySelectorAll('.shot'), function (fig) {
      var img = fig.querySelector('img');
      if (!img) return;
      var cap = fig.querySelector('.shot__text');
      items.push({
        full: img.getAttribute('src').replace('/thumb/', '/full/'),
        alt: img.getAttribute('alt') || '',
        caption: cap && cap.childNodes[0] ? cap.childNodes[0].textContent.trim() : '',
        button: fig.querySelector('.shot__btn')
      });
    });

    var current = 0;
    var lastFocus = null;

    function show(index) {
      current = (index + items.length) % items.length;
      var item = items[current];
      lbImg.setAttribute('src', item.full);
      lbImg.setAttribute('alt', item.alt);
      lbCap.textContent = item.caption;
      lbCounter.textContent =
        String(current + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');

      // 预加载前后各一张，翻页更顺
      [1, -1].forEach(function (step) {
        var pre = new Image();
        pre.src = items[(current + step + items.length) % items.length].full;
      });
    }

    function openLightbox(index, trigger) {
      lastFocus = trigger || null;
      show(index);
      lb.hidden = false;
      document.body.classList.add('lb-open');
      var closeBtn = lb.querySelector('.lb__btn--close');
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lb.hidden = true;
      document.body.classList.remove('lb-open');
      lbImg.removeAttribute('src');
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (item, i) {
      if (!item.button) return;
      item.button.addEventListener('click', function () { openLightbox(i, item.button); });
    });

    lb.addEventListener('click', function (e) {
      if (e.target.hasAttribute && e.target.hasAttribute('data-lb-close')) closeLightbox();
    });
    if (btnPrev) btnPrev.addEventListener('click', function () { show(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { show(current + 1); });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });

    var startX = null;
    lb.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
  }

})();
