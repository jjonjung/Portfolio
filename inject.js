const fs = require('fs');
const filePath = 'C:/Users/EJ/Desktop/Fork/Portfolio/Main/main.html';
let html = fs.readFileSync(filePath, 'utf8');

// ── 기존 주입 제거 ─────────────────────────────────────────────────────────
html = html.replace(/<link rel="preconnect"[^>]*>\s*/g, '');
html = html.replace(/<link href="https:\/\/fonts\.googleapis[^>]*>\s*/g, '');
html = html.replace(/<style id="custom-design">[\s\S]*?<\/style>\s*/g, '');
html = html.replace(/<nav id="pf-nav">[\s\S]*?<\/nav>\s*/g, '');
html = html.replace(/<nav id="sideNav">[\s\S]*?<\/nav>\s*/g, '');
html = html.replace(/<script id="pf-script">[\s\S]*?<\/script>\s*/g, '');

// ── 주입할 리소스 ─────────────────────────────────────────────────────────
const head = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@500;700&family=Muli:ital,wght@0,400;0,800;1,400&display=swap" rel="stylesheet">
<script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
<style id="pf-resume-style">

/* ── 리셋 & 기본 ──────────────────────────────────────── */
:root {
  --primary:   #bd5d38;
  --dark:      #343a40;
  --body-font: 'Muli', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --head-font: 'Saira Extra Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --sidebar-w: 17rem;
}

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: #fff !important;
  color: #212529 !important;
  font-family: var(--body-font) !important;
  font-size: 1rem !important;
  line-height: 1.6 !important;
}

@media only screen {
  body { max-width: 100% !important; }
}

body { white-space: normal !important; }

/* ── 사이드바 ──────────────────────────────────────────── */
#sideNav {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--primary);
  padding: 2rem 1rem 1.5rem;
  position: fixed;
  top: 0; left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  overflow-y: auto;
  z-index: 9999;
}

#sideNav .sidebar-brand {
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 1.5rem;
}
#sideNav .sidebar-brand .img-profile {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.4rem solid rgba(255,255,255,0.22);
  display: block;
  margin: 0 auto 1rem;
}
#sideNav .sidebar-name {
  font-family: var(--head-font);
  font-size: 1.9rem;
  font-weight: 700;
  color: #fff;
  display: block;
  line-height: 1.1;
}
#sideNav .sidebar-title {
  font-family: var(--head-font);
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255,255,255,0.7);
  text-transform: uppercase;
  letter-spacing: .05em;
  display: block;
  margin-top: .3rem;
}

#sideNav hr {
  border-color: rgba(255,255,255,0.25);
  width: 100%;
  margin: 1rem 0;
}

#sideNav .sidebar-nav {
  width: 100%;
  flex: 1;
}
#sideNav .sidebar-nav ul {
  list-style: none;
  margin: 0; padding: 0;
  text-align: left;
}
#sideNav .sidebar-nav ul li a {
  display: block;
  padding: .55rem 1rem;
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-weight: 800;
  font-size: .82rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  border-left: 3px solid transparent;
  transition: color .15s, border-color .15s;
}
#sideNav .sidebar-nav ul li a:hover,
#sideNav .sidebar-nav ul li a.active {
  color: #fff;
  border-left-color: rgba(255,255,255,0.6);
}

#sideNav .sidebar-social {
  display: flex;
  justify-content: center;
  gap: .7rem;
  margin-top: auto;
  padding-top: 1.5rem;
}
#sideNav .sidebar-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background .2s;
}
#sideNav .sidebar-social a:hover {
  background: rgba(255,255,255,0.32);
}

/* ── 모바일 햄버거 ─────────────────────────────────────── */
#sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem; left: 1rem;
  z-index: 10000;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: .5rem .7rem;
  font-size: 1.2rem;
  cursor: pointer;
}

/* ── 메인 컨텐츠 ──────────────────────────────────────── */
article.page.sans {
  margin-left: var(--sidebar-w) !important;
  max-width: none !important;
  padding: 0 !important;
}

/* ── 페이지 타이틀 (히어로) ───────────────────────────── */
article.page header {
  padding: 5rem 3rem 4rem;
  border-bottom: 1px solid #dee2e6;
}
.page-title {
  font-family: var(--head-font) !important;
  font-size: clamp(2.2rem, 4vw, 3.8rem) !important;
  font-weight: 700 !important;
  color: #212529 !important;
  margin: 0 0 .4rem !important;
  line-height: 1.1 !important;
  letter-spacing: normal !important;
}
.page-description { color: #6c757d; }

/* ── 섹션 공통 ────────────────────────────────────────── */
.pf-section {
  padding: 5rem 3rem;
  border-bottom: 1px solid #dee2e6;
  max-width: 75rem;
}
.pf-section:last-child { border-bottom: none; }

/* ── 헤딩 ─────────────────────────────────────────────── */
h1, h2, h3 {
  font-family: var(--head-font) !important;
  color: #212529 !important;
  margin-top: 0 !important;
}
h2 {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  letter-spacing: normal !important;
  text-transform: none !important;
  color: #212529 !important;
  margin-bottom: 2rem !important;
}
h3 {
  font-size: 1.4rem !important;
  font-weight: 700 !important;
  color: #343a40 !important;
}

/* ── 텍스트 ────────────────────────────────────────────── */
p { color: #495057 !important; line-height: 1.7 !important; }
strong { color: #212529 !important; }
em { color: #495057 !important; font-style: italic !important; }

/* subheading 스타일 (경력 회사명 등) */
.pf-subheading {
  font-family: var(--head-font);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--primary) !important;
}

/* ── HR ────────────────────────────────────────────────── */
hr { border-color: #dee2e6 !important; margin: 0 !important; }

/* ── CALLOUT → 카드 ────────────────────────────────────── */
.callout {
  background: #f8f9fa !important;
  border: none !important;
  border-left: 4px solid var(--primary) !important;
  border-radius: 0 8px 8px 0 !important;
  padding: 1.2rem 1.5rem !important;
  margin-bottom: 1.5rem !important;
}
.callout:hover { background: #f1f3f5 !important; }

/* ── 컬럼 ──────────────────────────────────────────────── */
.column-list {
  gap: 2rem !important;
  flex-wrap: wrap;
  align-items: flex-start !important;
}
.column {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  transform: none !important;
  overflow: visible !important;
}
.column:hover {
  border-color: transparent !important;
  transform: none !important;
}

/* ── 링크 ──────────────────────────────────────────────── */
a, a.visited {
  color: var(--primary) !important;
  text-decoration: none !important;
}
a:hover { text-decoration: underline !important; }

/* ── 북마크 ────────────────────────────────────────────── */
.bookmark {
  background: #f8f9fa !important;
  border: 1px solid #dee2e6 !important;
  border-radius: 8px !important;
  max-height: none !important;
  transition: border-color .2s, transform .2s !important;
}
.bookmark:hover { border-color: var(--primary) !important; transform: none; }
.bookmark-title { color: #212529 !important; height: auto !important; }
.bookmark-description { color: #6c757d !important; }
.bookmark-href { color: var(--primary) !important; }

/* ── 테이블 ────────────────────────────────────────────── */
table, th, td { border-color: #dee2e6 !important; }
th {
  background: #f8f9fa !important;
  color: #495057 !important;
  font-size: .78rem !important;
  letter-spacing: .06em !important;
  text-transform: uppercase !important;
  font-family: var(--head-font) !important;
}
td { color: #495057 !important; }
tr:hover td { background: #fff5f0 !important; color: #212529 !important; }
.simple-table-header-color { background: #f8f9fa !important; color: #212529 !important; }

/* ── 스킬 태그 ─────────────────────────────────────────── */
.selected-value {
  background: #fdf0eb !important;
  color: var(--primary) !important;
  border-radius: 4px !important;
  font-size: .8rem !important;
  font-weight: 600 !important;
  border: none !important;
}

/* ── 코드 ──────────────────────────────────────────────── */
.code, code {
  background: #f8f9fa !important;
  color: var(--primary) !important;
  border: 1px solid #dee2e6 !important;
}

/* ── 이미지 ────────────────────────────────────────────── */
.image img { border-radius: 8px !important; }
.callout figure.image img {
  border-radius: 50% !important;
  border: 4px solid rgba(189,93,56,.25) !important;
  max-width: 160px !important;
}

/* ── LINK-TO-PAGE ──────────────────────────────────────── */
.link-to-page {
  background: #f8f9fa !important;
  border: 1px solid #dee2e6 !important;
  border-radius: 8px !important;
  padding: .9rem 1.2rem !important;
  display: flex !important;
  align-items: center !important;
  margin: .5rem 0 !important;
  transition: border-color .2s, background .2s !important;
}
.link-to-page:hover {
  border-color: var(--primary) !important;
  background: #fdf0eb !important;
  transform: none !important;
}
.link-to-page a { font-weight: 700 !important; }

/* ── 토글 ──────────────────────────────────────────────── */
details > summary { color: #343a40 !important; cursor: pointer; }
details > summary:hover { color: var(--primary) !important; }

/* ── 블록 컬러 오버라이드 ──────────────────────────────── */
.block-color-default { color: #212529 !important; fill: #212529 !important; }
.block-color-gray    { color: #6c757d !important; }
.block-color-gray_background   { background: #f8f9fa !important; }
.block-color-blue_background   { background: #e8f4fd !important; }
.block-color-orange_background { background: #fff3ee !important; }

/* ── 하이라이트 오버라이드 ─────────────────────────────── */
.highlight-default { color: #212529 !important; }
.highlight-gray    { color: #6c757d !important; }
.highlight-orange  { color: var(--primary) !important; }
.highlight-blue    { color: #0d6efd !important; }

/* ── TOC ────────────────────────────────────────────────── */
.table_of_contents-link { color: #6c757d !important; border-bottom-color: #dee2e6 !important; }
.table_of_contents-link:hover { color: var(--primary) !important; }

/* ── 페이드인 애니메이션 ───────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.pf-section { animation: fadeUp .45s ease both; }
.pf-section:nth-child(1) { animation-delay: .05s; }
.pf-section:nth-child(2) { animation-delay: .1s; }
.pf-section:nth-child(3) { animation-delay: .15s; }
.pf-section:nth-child(4) { animation-delay: .2s; }
.pf-section:nth-child(5) { animation-delay: .25s; }

/* ── 스크롤바 ───────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f8f9fa; }
::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--primary); }

/* ── 반응형 ─────────────────────────────────────────────── */
@media (max-width: 991px) {
  #sideNav {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem 1.5rem;
    justify-content: space-between;
    align-items: center;
  }
  #sideNav .sidebar-brand { margin-bottom: 0; display: flex; align-items: center; gap: .8rem; }
  #sideNav .sidebar-brand .img-profile { width: 3rem; height: 3rem; margin: 0; }
  #sideNav .sidebar-name { font-size: 1.2rem; }
  #sideNav .sidebar-title { display: none; }
  #sideNav hr, #sideNav .sidebar-social { display: none; }
  #sideNav .sidebar-nav { display: none; }
  #sideNav.open .sidebar-nav {
    display: block;
    width: 100%;
    margin-top: .5rem;
  }
  #sidebar-toggle { display: block; position: static; margin-left: auto; }
  article.page.sans { margin-left: 0 !important; }
  .pf-section { padding: 3rem 1.5rem; }
  article.page header { padding: 3rem 1.5rem 2.5rem; }
}
</style>
`;

const sidebar = `
<button id="sidebar-toggle" onclick="document.getElementById('sideNav').classList.toggle('open')">&#9776;</button>
<nav id="sideNav">
  <a class="sidebar-brand" href="#page-top">
    <img class="img-profile" src="%EC%82%AC%EC%A7%84.png" alt="조은정 프로필">
    <span>
      <span class="sidebar-name">조은정</span>
      <span class="sidebar-title">하이브리드 개발자</span>
    </span>
  </a>
  <hr>
  <div class="sidebar-nav">
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#experience">경력</a></li>
      <li><a href="#education">학력 &amp; 교육</a></li>
      <li><a href="#skills">기술 스택</a></li>
      <li><a href="#projects">프로젝트</a></li>
    </ul>
  </div>
  <div class="sidebar-social">
    <a href="https://github.com/jjonjung" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
    <a href="https://www.youtube.com/@eunjunggame" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
    <a href="https://eun15eun.tistory.com/" target="_blank" title="Blog"><i class="fas fa-blog"></i></a>
  </div>
</nav>`;

const script = `
<script id="pf-script">
(function() {
  function init() {
    var article = document.querySelector('article.page');
    if (!article) return;

    // ── 섹션 ID 태깅 ──────────────────────────────────────────
    var sectionMap = [
      { keys: ['PROFILE'],             id: 'about'      },
      { keys: ['RESUME', '경력'],       id: 'experience' },
      { keys: ['학력', '교육'],          id: 'education'  },
      { keys: ['SKILL', '스킬', '기술'], id: 'skills'     },
      { keys: ['프로젝트', 'CitRush', 'ThirdMotion'], id: 'projects' },
    ];

    var h2s = article.querySelectorAll('h2');
    h2s.forEach(function(h2) {
      var text = h2.textContent.trim();
      sectionMap.forEach(function(m) {
        if (m.keys.some(function(k){ return text.includes(k); })) {
          var parent = h2.closest('.column-list') || h2.closest('.column') || h2.closest('.callout') || h2.parentElement;
          if (parent && !parent.id) parent.id = m.id;
        }
      });
    });

    // ── page-body 직계 자식에 pf-section 클래스 ───────────────
    var body = article.querySelector('.page-body');
    if (body) {
      Array.from(body.children).forEach(function(el) {
        if (el.tagName !== 'HR') el.classList.add('pf-section');
      });
    }

    // ── 사이드바 링크 스무스 스크롤 ───────────────────────────
    document.querySelectorAll('#sideNav a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ── 스크롤 스파이 ─────────────────────────────────────────
    var navLinks = document.querySelectorAll('#sideNav .sidebar-nav a');
    var sections = ['about','experience','education','skills','projects']
      .map(function(id){ return document.getElementById(id); })
      .filter(Boolean);

    function onScroll() {
      var scrollY = window.scrollY + 120;
      var active = sections[0];
      sections.forEach(function(s) {
        if (s.offsetTop <= scrollY) active = s;
      });
      navLinks.forEach(function(a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + (active && active.id));
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>`;

// ── HTML에 주입 ────────────────────────────────────────────────────────────
html = html.replace('</head>', head + '</head>');
html = html.replace('<body>', '<body>' + sidebar);
html = html.replace('</body>', script + '</body>');

fs.writeFileSync(filePath, html, 'utf8');
console.log('완료');
