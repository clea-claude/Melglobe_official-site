/* アクセス解析の追加計測（Googleアナリティクス G-FXDD9VB7XZ）
   - contact_click   : お問い合わせフォームを開いた
   - demo_click      : デモサイトを開いた
   - language_switch : 言語を切り替えた
   - button_click    : そのほかのボタン・リンク
   - section_view    : 各セクション（料金・デモなど）まで読んだ */
(function () {
  'use strict';
  if (typeof gtag !== 'function') return;
  function label(el) { return (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60); }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a,button') : null;
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var name = 'button_click';
    if (/docs\.google\.com\/forms/.test(href)) name = 'contact_click';
    else if (/houseguide-demo\.web\.app|komachi-house|hinata-stay|tsubame-an/.test(href)) name = 'demo_click';
    else if (el.hasAttribute('data-lang')) name = 'language_switch';
    gtag('event', name, { button_text: label(el), link_url: href, page_path: location.pathname });
  }, true);

  if (!('IntersectionObserver' in window)) return;
  var seen = {};
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target, n = t.id || label(t);
      so.unobserve(t);
      if (!n || seen[n]) return;
      seen[n] = 1;
      gtag('event', 'section_view', { section_name: n, page_path: location.pathname });
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('section[id], .section-en').forEach(function (s) { so.observe(s); });
})();
