/* Interview Prep — app logic */
(function () {
  'use strict';

  const DATA = window.QA || [];
  const STORE_KEY = 'rit-prep-done-v1';
  const PREF_KEY = 'rit-prep-prefs-v1';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const done = new Set(JSON.parse(localStorage.getItem(STORE_KEY) || '[]'));
  const prefs = Object.assign({ lang: 'mix', theme: 'dark', hideDone: false }, JSON.parse(localStorage.getItem(PREF_KEY) || '{}'));
  const savePrefs = () => localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
  const saveDone = () => localStorage.setItem(STORE_KEY, JSON.stringify([...done]));

  const TIER_LABEL = { t1: 'TIER 1 · MUST', t2: 'TIER 2 · IMPORTANT', t3: 'TIER 3 · BONUS', tp: 'PROJECT DEEP DIVE' };
  const GROUPS = [
    { key: 't1', label: 'Tier 1 — অবশ্যই', dot: 'var(--t1)' },
    { key: 't2', label: 'Tier 2 — ভালোভাবে', dot: 'var(--t2)' },
    { key: 't3', label: 'Tier 3 — Bonus', dot: 'var(--t3)' },
    { key: 'tp', label: 'Projects + HR', dot: 'var(--tp)' },
  ];

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (s) =>
    esc(s || '')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .split(/\n+/)
      .map((p) => `<p>${p}</p>`)
      .join('');
  const plain = (s) => String(s || '').replace(/[`*]/g, '');

  // flatten for search & quiz
  const ALL = [];
  DATA.forEach((cat) => cat.items.forEach((it, i) => ALL.push({ cat, it, id: `${cat.id}-${i + 1}`, n: i + 1 })));

  /* ---------- theme ---------- */
  function applyTheme() {
    document.documentElement.dataset.theme = prefs.theme;
    const icon = prefs.theme === 'dark' ? '🌙' : '☀️';
    const tb = $('#themeBtn'); if (tb) tb.textContent = icon;
    const mb = $('#mobileThemeBtn'); if (mb) mb.textContent = icon;
    const mt = $('#metaThemeColor'); if (mt) mt.setAttribute('content', prefs.theme === 'dark' ? '#0b0e17' : '#f8fafc');
  }
  $('#themeBtn').onclick = () => { prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark'; savePrefs(); applyTheme(); };
  $('#mobileThemeBtn')?.addEventListener('click', () => { prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark'; savePrefs(); applyTheme(); });

  /* ---------- sidebar nav ---------- */
  function renderNav() {
    $('#nav').innerHTML = GROUPS.map((g) => {
      const cats = DATA.filter((c) => c.tier === g.key);
      if (!cats.length) return '';
      return `<div class="nav-group"><div class="nav-label" style="--dot:${g.dot}">${g.label}</div>${cats
        .map((c) => `<a class="nav-item" href="#${c.id}" data-id="${c.id}"><span class="ic">${c.icon}</span><span class="nm">${esc(c.title)}</span><span class="ct">${c.items.length}</span><span class="mini-ring" data-ring="${c.id}"></span></a>`)
        .join('')}</div>`;
    }).join('');
    $$('.nav-item').forEach((a) => a.addEventListener('click', () => $('#sidebar').classList.remove('open')));
  }

  /* ---------- hero, must-practice, pitch ---------- */
  const MUST = [
    ['Login → JWT → Protected Route', 'Access/refresh token, httpOnly cookie, role check middleware'],
    ['Product Create flow', 'Zod validation → controller → service → Prisma → 201 response'],
    ['Sale + Stock Transaction', 'prisma.$transaction, conditional decrement (stock ≥ qty)'],
    ['Shop data isolation', 'shopId token থেকে, body থেকে না — সব query-তে shopId filter'],
    ['Payment verification', 'Gateway verify API, HMAC, amount match, reconciliation cron'],
    ['Duplicate submit রোধ', 'Button disable + idempotency key + DB unique constraint'],
    ['Search + Filter + Pagination', 'Debounce, index, limit/offset বা cursor, total count'],
    ['Slow API debugging', 'Logs (pino), EXPLAIN ANALYZE, N+1, index, cache'],
    ['Git conflict + PR review', 'Feature branch, rebase/merge, conflict resolve, review checklist'],
    ['Full architecture explain', 'Browser → Nginx → React/Next → Express → PostgreSQL, Docker, VPS'],
  ];
  function renderTop() {
    const total = ALL.length;
    $('#heroStats').innerHTML = `
      <div class="stat"><b>${total}</b><span>মোট প্রশ্ন</span></div>
      <div class="stat"><b>${DATA.length}</b><span>Category</span></div>
      <div class="stat"><b>3×</b><span>ভাষায় উত্তর</span></div>
      <div class="stat"><b id="heroDone">0</b><span>প্র্যাকটিস করা</span></div>`;
    $('#mustGrid').innerHTML = MUST.map((m, i) => `<div class="must"><div class="n">${String(i + 1).padStart(2, '0')}</div><div><div class="t">${esc(m[0])}</div><div class="d">${esc(m[1])}</div></div></div>`).join('');

    const P = window.PITCH || {};
    $('#pitchBox').innerHTML = `
      <div class="ans" data-l="mix"><div class="ans-label">মিক্স — মুখে বলার জন্য</div>${fmt(P.mix)}</div>
      <div class="ans" data-l="bn"><div class="ans-label">বাংলা</div>${fmt(P.bn)}</div>
      <div class="ans" data-l="en"><div class="ans-label">English <button class="speak" data-speak="pitch">🔊 শুনুন</button></div>${fmt(P.en)}</div>`;
  }

  /* ---------- categories ---------- */
  function answerBlock(it, id) {
    return `
      <div class="ans" data-l="mix"><div class="ans-label">মিক্স (বাংলা + English)</div>${fmt(it.m)}</div>
      <div class="ans" data-l="bn"><div class="ans-label">বাংলা</div>${fmt(it.b)}</div>
      <div class="ans" data-l="en"><div class="ans-label">English <button class="speak" data-speak="${id}">🔊 শুনুন</button></div>${fmt(it.e)}</div>
      ${it.code ? `<pre class="code">${esc(it.code)}</pre>` : ''}
      ${it.tip ? `<div class="tip">${fmt(it.tip).replace(/^<p>|<\/p>$/g, '')}</div>` : ''}`;
  }

  function renderCategories() {
    $('#categories').innerHTML = DATA.map((cat) => `
      <section class="cat" id="${cat.id}">
        <div class="cat-head">
          <div class="cat-icon">${cat.icon}</div>
          <h2>${esc(cat.title)}</h2>
          <span class="badge ${cat.tier}">${TIER_LABEL[cat.tier]}</span>
          <div class="cat-head-actions">
            <span class="cat-progress" data-cp="${cat.id}"></span>
            <button class="cat-toggle-btn" data-cat="${cat.id}" title="এই ক্যাটাগরির সব প্রশ্ন একসাথে খোলো বা বন্ধ করো" aria-label="Toggle all questions in category">
              <span class="cat-toggle-text">সব খোলো</span>
              <span class="cat-toggle-icon">▾</span>
            </button>
          </div>
        </div>
        ${cat.note ? `<p class="cat-note">${fmt(cat.note).replace(/<\/?p>/g, '')}</p>` : ''}
        <div class="qa-list">
          ${cat.items.map((it, i) => {
            const id = `${cat.id}-${i + 1}`;
            return `<article class="qa${done.has(id) ? ' done' : ''}" data-id="${id}">
              <div class="qa-head">
                <span class="qa-num">${cat.short || ''}${String(i + 1).padStart(2, '0')}</span>
                <div class="qa-q">${fmt(it.q).replace(/<\/?p>/g, '')}${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ''}</div>
                <button class="check" title="প্র্যাকটিস করা হয়েছে" aria-label="Mark practiced">✓</button>
                <span class="chev">▾</span>
              </div>
              <div class="qa-body"><div class="qa-inner"><div class="qa-content">${answerBlock(it, id)}</div></div></div>
            </article>`;
          }).join('')}
        </div>
      </section>`).join('');
    applyLang();
  }

  /* ---------- language filter ---------- */
  function applyLang() {
    $$('#langSeg button').forEach((b) => b.classList.toggle('active', b.dataset.lang === prefs.lang));
    $$('.ans').forEach((a) => {
      if (a.closest('#pitchBox')) { a.style.display = prefs.lang === 'all' || a.dataset.l === prefs.lang ? '' : 'none'; return; }
      a.style.display = prefs.lang === 'all' || a.dataset.l === prefs.lang ? '' : 'none';
    });
  }
  $('#langSeg').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    prefs.lang = b.dataset.lang; savePrefs(); applyLang();
  });

  /* ---------- progress ---------- */
  function updateProgress() {
    const total = ALL.length;
    const n = ALL.filter((x) => done.has(x.id)).length;
    const pct = total ? Math.round((n / total) * 100) : 0;
    $('#overallPct').textContent = pct + '%';
    $('#overallBar').style.width = pct + '%';
    $('#overallCount').textContent = `${n} / ${total} প্রশ্ন`;
    const hd = $('#heroDone'); if (hd) hd.textContent = n;
    const mp = $('#mobileProgressPill'); if (mp) mp.textContent = `${pct}% সম্পন্ন (${n}/${total})`;
    DATA.forEach((cat) => {
      const c = cat.items.filter((_, i) => done.has(`${cat.id}-${i + 1}`)).length;
      const p = Math.round((c / cat.items.length) * 100);
      const ring = $(`[data-ring="${cat.id}"]`); if (ring) ring.style.setProperty('--p', p);
      const cp = $(`[data-cp="${cat.id}"]`); if (cp) cp.textContent = `${c}/${cat.items.length} done`;
    });
    renderSheetTopics();
  }

  /* ---------- category toggle helper ---------- */
  function updateCatToggleBtn(catEl, forceState) {
    if (!catEl) return;
    const btn = catEl.querySelector('.cat-toggle-btn');
    if (!btn) return;
    const visibleQas = [...catEl.querySelectorAll('.qa:not(.hidden)')];
    const qas = visibleQas.length ? visibleQas : [...catEl.querySelectorAll('.qa')];
    const isAllOpen = forceState !== undefined ? forceState : (qas.length > 0 && qas.every((q) => q.classList.contains('open')));
    btn.classList.toggle('is-expanded', isAllOpen);
    const txt = btn.querySelector('.cat-toggle-text');
    const icn = btn.querySelector('.cat-toggle-icon');
    if (txt) txt.textContent = isAllOpen ? 'সব বন্ধ করো' : 'সব খোলো';
    if (icn) icn.textContent = isAllOpen ? '▴' : '▾';
  }

  /* ---------- card interactions ---------- */
  document.addEventListener('click', (e) => {
    const speakBtn = e.target.closest('.speak');
    if (speakBtn) { e.stopPropagation(); speak(speakBtn); return; }

    const catToggle = e.target.closest('.cat-toggle-btn');
    if (catToggle) {
      e.stopPropagation();
      const catId = catToggle.dataset.cat;
      const catEl = document.getElementById(catId);
      if (!catEl) return;
      const visibleQas = [...catEl.querySelectorAll('.qa:not(.hidden)')];
      const targetQas = visibleQas.length ? visibleQas : [...catEl.querySelectorAll('.qa')];
      const isAllOpen = targetQas.length > 0 && targetQas.every((q) => q.classList.contains('open'));
      const nextOpen = !isAllOpen;
      targetQas.forEach((q) => q.classList.toggle('open', nextOpen));
      updateCatToggleBtn(catEl, nextOpen);
      return;
    }

    const check = e.target.closest('.check');
    if (check) {
      e.stopPropagation();
      const card = check.closest('.qa'); const id = card.dataset.id;
      done.has(id) ? done.delete(id) : done.add(id);
      card.classList.toggle('done', done.has(id));
      saveDone(); updateProgress(); applyFilter();
      return;
    }
    const head = e.target.closest('.qa-head');
    if (head) {
      const card = head.parentElement;
      card.classList.toggle('open');
      const catEl = card.closest('.cat');
      if (catEl) updateCatToggleBtn(catEl);
    }
  });

  let allOpen = false;
  $('#expandBtn').onclick = () => {
    allOpen = !allOpen;
    $$('.qa').forEach((q) => q.classList.toggle('open', allOpen));
    $('#expandBtn').textContent = allOpen ? 'সব বন্ধ করো' : 'সব খোলো';
    $$('.cat').forEach((catEl) => updateCatToggleBtn(catEl, allOpen));
  };
  $('#hideDoneBtn').onclick = () => { prefs.hideDone = !prefs.hideDone; savePrefs(); applyFilter(); };
  $('#resetBtn').onclick = () => {
    if (!confirm('সব progress মুছে ফেলবে?')) return;
    done.clear(); saveDone(); $$('.qa.done').forEach((q) => q.classList.remove('done')); updateProgress(); applyFilter();
  };

  /* ---------- search ---------- */
  const qIndex = new Map(ALL.map((x) => [x.id, (plain(x.it.q) + ' ' + plain(x.it.m) + ' ' + plain(x.it.b) + ' ' + plain(x.it.e) + ' ' + (x.it.code || '')).toLowerCase()]));
  function applyFilter() {
    const term = $('#search').value.trim().toLowerCase();
    $('#hideDoneBtn').classList.toggle('on', prefs.hideDone);
    $('#hideDoneBtn').textContent = prefs.hideDone ? 'Done দেখাও' : 'Done লুকাও';
    DATA.forEach((cat) => {
      let visible = 0;
      const catEl = $(`#${cat.id}`);
      cat.items.forEach((it, i) => {
        const id = `${cat.id}-${i + 1}`;
        const card = $(`.qa[data-id="${id}"]`);
        const match = !term || qIndex.get(id).includes(term);
        const show = match && !(prefs.hideDone && done.has(id));
        card.classList.toggle('hidden', !show);
        const qEl = $('.qa-q', card);
        const base = fmt(it.q).replace(/<\/?p>/g, '') + (it.tag ? `<span class="tag">${esc(it.tag)}</span>` : '');
        qEl.innerHTML = term && term.length > 1 ? highlight(base, term) : base;
        if (show) visible++;
      });
      if (catEl) {
        catEl.style.display = visible ? '' : 'none';
        if (visible) updateCatToggleBtn(catEl);
      }
    });
    const anyVisible = $$('.cat').some((c) => c.style.display !== 'none');
    let empty = $('#emptyMsg');
    if (!anyVisible) {
      if (!empty) { empty = document.createElement('div'); empty.id = 'emptyMsg'; empty.className = 'empty'; $('#categories').appendChild(empty); }
      empty.textContent = `“${term}” দিয়ে কিছু পাওয়া যায়নি 🙁`;
    } else if (empty) empty.remove();
  }
  function highlight(html, term) {
    const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return html.replace(/(^|>)([^<]+)(?=<|$)/g, (m, a, txt) => a + txt.replace(re, (x) => `<mark>${x}</mark>`));
  }
  let st;
  const searchInput = $('#search');
  const searchClear = $('#searchClear');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(st);
      st = setTimeout(applyFilter, 180);
      if (searchClear) searchClear.style.display = searchInput.value ? 'flex' : 'none';
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchClear.style.display = 'none';
        applyFilter();
        searchInput.focus();
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); $('#search')?.focus(); }
    if (e.key === 'Escape') { closeQuiz(); $('#sidebar')?.classList.remove('open'); closeAllSheets(); }
  });

  /* ---------- speech (English pronunciation) ---------- */
  let speaking = null;
  function speak(btn) {
    if (!('speechSynthesis' in window)) { alert('এই browser-এ speech support নেই'); return; }
    const key = btn.dataset.speak;
    if (speaking === btn) { speechSynthesis.cancel(); btn.classList.remove('playing'); speaking = null; return; }
    speechSynthesis.cancel(); $$('.speak.playing').forEach((b) => b.classList.remove('playing'));
    let text = '';
    if (key === 'pitch') text = plain((window.PITCH || {}).en);
    else if (key === 'quiz') text = plain(currentQuiz && currentQuiz.it.e);
    else { const x = ALL.find((a) => a.id === key); text = x ? plain(x.it.e) : ''; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    const v = speechSynthesis.getVoices().find((v) => /en-(US|GB)/.test(v.lang));
    if (v) u.voice = v;
    u.onend = () => { btn.classList.remove('playing'); speaking = null; };
    btn.classList.add('playing'); speaking = btn;
    speechSynthesis.speak(u);
  }

  /* ---------- mock interview ---------- */
  let currentQuiz = null, timerId = null, t0 = 0;
  const quizSel = $('#quizCat');
  quizSel.innerHTML = `<option value="all">সব Category</option><option value="t1">শুধু Tier 1</option><option value="todo">যেগুলো এখনো পারি না</option>` +
    DATA.map((c) => `<option value="${c.id}">${c.icon} ${esc(c.title)}</option>`).join('');
  function pool() {
    const v = quizSel.value;
    if (v === 'all') return ALL;
    if (v === 't1') return ALL.filter((x) => x.cat.tier === 't1');
    if (v === 'todo') return ALL.filter((x) => !done.has(x.id));
    return ALL.filter((x) => x.cat.id === v);
  }
  function nextQuiz() {
    const p = pool();
    if (!p.length) { $('#quizQ').textContent = '🎉 এই সেটের সব প্রশ্ন পারো!'; $('#quizA').hidden = true; return; }
    let pick; do { pick = p[Math.floor(Math.random() * p.length)]; } while (p.length > 1 && currentQuiz && pick.id === currentQuiz.id);
    currentQuiz = pick;
    $('#quizMeta').textContent = `${pick.cat.icon} ${pick.cat.title} · #${pick.n}`;
    $('#quizQ').innerHTML = fmt(pick.it.q).replace(/<\/?p>/g, '');
    $('#quizA').innerHTML = `<div class="ans" data-l="mix"><div class="ans-label">মিক্স</div>${fmt(pick.it.m)}</div>
      <div class="ans" data-l="en"><div class="ans-label">English <button class="speak" data-speak="quiz">🔊 শুনুন</button></div>${fmt(pick.it.e)}</div>
      ${pick.it.code ? `<pre class="code">${esc(pick.it.code)}</pre>` : ''}`;
    $('#quizA').hidden = true; $('#quizReveal').textContent = 'উত্তর দেখাও';
    clearInterval(timerId); t0 = Date.now();
    timerId = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); $('#quizTimer').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }, 500);
  }
  function openQuiz() { $('#quizModal').classList.add('show'); nextQuiz(); }
  function closeQuiz() { $('#quizModal').classList.remove('show'); clearInterval(timerId); speechSynthesis && speechSynthesis.cancel(); }
  $('#quizBtn').onclick = openQuiz;
  $('#quizClose').onclick = closeQuiz;
  $('#quizModal').addEventListener('click', (e) => { if (e.target.id === 'quizModal') closeQuiz(); });
  $('#quizNext').onclick = nextQuiz;
  quizSel.onchange = nextQuiz;
  $('#quizReveal').onclick = () => { const a = $('#quizA'); a.hidden = !a.hidden; $('#quizReveal').textContent = a.hidden ? 'উত্তর দেখাও' : 'উত্তর লুকাও'; };
  $('#quizKnown').onclick = () => {
    if (!currentQuiz) return;
    done.add(currentQuiz.id); saveDone();
    const card = $(`.qa[data-id="${currentQuiz.id}"]`); if (card) card.classList.add('done');
    updateProgress(); nextQuiz();
  };

  /* ---------- mobile bottom navigation & bottom sheets ---------- */
  const sheetBackdrop = $('#sheetBackdrop');
  const topicsSheet = $('#topicsSheet');
  const menuSheet = $('#menuSheet');

  function closeAllSheets() {
    if (sheetBackdrop) sheetBackdrop.classList.remove('active');
    if (topicsSheet) topicsSheet.classList.remove('open');
    if (menuSheet) menuSheet.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showSheet(sheet) {
    if (!sheet) return;
    closeAllSheets();
    if (sheetBackdrop) sheetBackdrop.classList.add('active');
    sheet.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (sheetBackdrop) sheetBackdrop.onclick = closeAllSheets;
  $('#topicsSheetClose')?.addEventListener('click', closeAllSheets);
  $('#menuSheetClose')?.addEventListener('click', closeAllSheets);

  // Render topics list in topicsSheet
  function renderSheetTopics() {
    const list = $('#sheetTopicsList');
    if (!list) return;
    const filterInput = $('#sheetTopicsSearch');
    const q = filterInput ? filterInput.value.toLowerCase().trim() : '';

    const filtered = DATA.filter((c) => {
      if (!q) return true;
      return c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    });

    list.innerHTML = filtered.map((c) => {
      const doneCount = c.items.filter((_, i) => done.has(`${c.id}-${i + 1}`)).length;
      const pct = Math.round((doneCount / c.items.length) * 100);
      return `<a class="sheet-cat-item" href="#${c.id}" data-cat="${c.id}">
        <span class="cat-ic">${c.icon}</span>
        <div class="cat-info">
          <span class="cat-nm">${esc(c.title)}</span>
          <span class="cat-meta">${c.items.length}টি প্রশ্ন · ${doneCount}টি সম্পন্ন (${pct}%)</span>
        </div>
        <div class="cat-rt">
          <span class="mini-ring" style="--p:${pct}"></span>
          <span class="chev">›</span>
        </div>
      </a>`;
    }).join('') || `<div class="empty" style="padding:20px;text-align:center;color:var(--muted)">কোনো মডিউল মেলেনি</div>`;

    list.querySelectorAll('.sheet-cat-item').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const catId = a.dataset.cat;
        closeAllSheets();
        const target = document.getElementById(catId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.style.transition = 'box-shadow 0.4s ease';
          target.style.boxShadow = '0 0 0 3px var(--accent)';
          setTimeout(() => { target.style.boxShadow = ''; }, 1600);
        }
      });
    });
  }

  $('#sheetTopicsSearch')?.addEventListener('input', () => {
    renderSheetTopics();
  });

  // Mobile Horizontal Category Chips Carousel
  function renderMobileCatChips() {
    const track = $('#mobileCatChipsTrack');
    if (!track) return;
    const totalCount = ALL.length;
    let html = `<button class="cat-chip active" data-cat="all">⚡ সব (${totalCount})</button>`;
    html += DATA.map((c) => `<button class="cat-chip" data-cat="${c.id}">${c.icon} ${esc(c.title.split(' ')[0])}</button>`).join('');
    track.innerHTML = html;

    track.querySelectorAll('.cat-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        track.querySelectorAll('.cat-chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const catId = btn.dataset.cat;
        if (catId === 'all') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const target = document.getElementById(catId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.style.transition = 'box-shadow 0.4s ease';
            target.style.boxShadow = '0 0 0 3px var(--accent)';
            setTimeout(() => { target.style.boxShadow = ''; }, 1600);
          }
        }
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }

  // Touch gesture to drag-down to dismiss bottom sheets
  function attachSheetDrag(sheet) {
    if (!sheet) return;
    const handle = sheet.querySelector('.sheet-handle-bar') || sheet.querySelector('.sheet-header');
    if (!handle) return;
    let startY = 0;
    let currentY = 0;
    let dragging = false;

    handle.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      currentY = startY;
      dragging = true;
      sheet.style.transition = 'none';
    }, { passive: true });

    handle.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        sheet.style.transform = `translateY(${deltaY}px)`;
      }
    }, { passive: true });

    handle.addEventListener('touchend', () => {
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      const deltaY = currentY - startY;
      if (deltaY > 75) {
        closeAllSheets();
      } else {
        sheet.style.transform = 'translateY(0)';
      }
    });
  }

  attachSheetDrag(topicsSheet);
  attachSheetDrag(menuSheet);

  // Update menu sheet status indicators
  function updateMenuSheetState() {
    const themeIcon = $('#sheetThemeIcon');
    const themeLabel = $('#sheetThemeLabel');
    if (themeIcon) themeIcon.textContent = prefs.theme === 'dark' ? '🌙' : '☀️';
    if (themeLabel) themeLabel.textContent = prefs.theme === 'dark' ? 'ডার্ক মোড' : 'লাইট মোড';

    const hideDoneLabel = $('#sheetHideDoneLabel');
    if (hideDoneLabel) hideDoneLabel.textContent = prefs.hideDone ? 'লুকানো আছে' : 'সব দেখাচ্ছে';

    const expandLabel = $('#sheetExpandLabel');
    if (expandLabel) expandLabel.textContent = allOpen ? 'সব বন্ধ করো' : 'সব খোলো';

    $$('#sheetLangSeg button').forEach((b) => b.classList.toggle('active', b.dataset.lang === prefs.lang));
  }

  // Mobile Bottom Bar tab clicks
  const bottomNav = $('#mobileBottomBar');
  if (bottomNav) {
    bottomNav.addEventListener('click', (e) => {
      const tab = e.target.closest('.nav-tab');
      if (!tab) return;
      const action = tab.dataset.tab;
      $$('.nav-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (action === 'home') {
        closeAllSheets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (action === 'topics') {
        renderSheetTopics();
        showSheet(topicsSheet);
      } else if (action === 'search') {
        closeAllSheets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          const s = $('#search');
          if (s) { s.focus(); s.select(); }
        }, 250);
      } else if (action === 'mock') {
        closeAllSheets();
        openQuiz();
      } else if (action === 'menu') {
        updateMenuSheetState();
        showSheet(menuSheet);
      }
    });
  }

  // Menu Sheet Quick Actions
  $('#sheetToggleTheme')?.addEventListener('click', () => {
    $('#themeBtn').click();
    updateMenuSheetState();
  });

  $('#sheetToggleHideDone')?.addEventListener('click', () => {
    $('#hideDoneBtn').click();
    updateMenuSheetState();
  });

  $('#sheetToggleAllQuestions')?.addEventListener('click', () => {
    $('#expandBtn').click();
    updateMenuSheetState();
  });

  $('#sheetResetProgress')?.addEventListener('click', () => {
    closeAllSheets();
    $('#resetBtn').click();
  });

  $('#sheetLangSeg')?.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    prefs.lang = b.dataset.lang;
    savePrefs();
    applyLang();
    updateMenuSheetState();
  });

  /* ---------- misc ---------- */
  $('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
  window.addEventListener('scroll', () => {
    $('#toTop').classList.toggle('show', scrollY > 600);
    // highlight home tab when near top
    if (scrollY < 300) {
      const homeTab = $('#tabHome');
      if (homeTab && !document.querySelector('.bottom-sheet.open')) {
        $$('.nav-tab').forEach((t) => t.classList.remove('active'));
        homeTab.classList.add('active');
      }
      const allChip = $('#mobileCatChipsTrack .cat-chip[data-cat="all"]');
      if (allChip) {
        $$('#mobileCatChipsTrack .cat-chip').forEach((c) => c.classList.remove('active'));
        allChip.classList.add('active');
      }
    }
  }, { passive: true });
  $('#toTop').onclick = () => scrollTo({ top: 0 });

  // active nav on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        $$('.nav-item').forEach((a) => a.classList.toggle('active', a.dataset.id === en.target.id));
        const activeChip = $(`#mobileCatChipsTrack .cat-chip[data-cat="${en.target.id}"]`);
        if (activeChip) {
          $$('#mobileCatChipsTrack .cat-chip').forEach((c) => c.classList.remove('active'));
          activeChip.classList.add('active');
          activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    });
  }, { rootMargin: '-30% 0px -55% 0px' });

  /* ---------- init ---------- */
  applyTheme();
  renderNav();
  renderTop();
  renderCategories();
  renderMobileCatChips();
  renderSheetTopics();
  updateProgress();
  applyFilter();
  $$('.cat').forEach((c) => io.observe(c));
})();
