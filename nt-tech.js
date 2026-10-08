/**
 * NT Tech Innovation — Special Interview Portal Engine
 * Full-Stack, High-Throughput Asynchronous Controller
 */

(function () {
  'use strict';

  // --- State Architecture ---
  const STATE = {
    categories: ['frontend', 'backend', 'database', 'devops', 'dokani', 'hr'],
    currentCat: 'frontend',
    currentTopic: 'all',
    currentLevel: 'all',
    currentLang: localStorage.getItem('nt_lang_pref') || 'mix',
    hideDone: false,
    searchQuery: '',
    mastered: new Set(JSON.parse(localStorage.getItem('nt_mastered_ids') || '[]')),
    theme: localStorage.getItem('nt_theme') || 'dark',
    expandedCats: new Set(['frontend'])
  };

  // --- DOM Elements ---
  const el = {
    // Nav & Sidebar
    sidebar: document.getElementById('sidebar'),
    catNav: document.getElementById('catNav'),
    mobileCatChipsTrack: document.getElementById('mobileCatChipsTrack'),
    overallPct: document.getElementById('overallPct'),
    overallBar: document.getElementById('overallBar'),
    overallCount: document.getElementById('overallCount'),
    resetBtn: document.getElementById('resetBtn'),
    menuBtn: document.getElementById('menuBtn'),

    // Topbar
    search: document.getElementById('search'),
    searchClear: document.getElementById('searchClear'),
    langSeg: document.getElementById('langSeg'),
    expandBtn: document.getElementById('expandBtn'),
    hideDoneBtn: document.getElementById('hideDoneBtn'),
    mockBtn: document.getElementById('mockBtn'),
    themeBtn: document.getElementById('themeBtn'),
    mobileThemeBtn: document.getElementById('mobileThemeBtn'),
    mobileProgressPill: document.getElementById('mobileProgressPill'),
    mobileCurrentCatTitle: document.getElementById('mobileCurrentCatTitle'),

    // Hero & Filters
    catHeroIcon: document.getElementById('catHeroIcon'),
    catHeroBadge: document.getElementById('catHeroBadge'),
    catHeroTitle: document.getElementById('catHeroTitle'),
    catHeroDesc: document.getElementById('catHeroDesc'),
    catHeroTotalCount: document.getElementById('catHeroTotalCount'),
    catHeroDoneCount: document.getElementById('catHeroDoneCount'),

    // Levels
    levelFilterTrack: document.getElementById('levelFilterTrack'),
    cntAll: document.getElementById('cntAll'),
    cntLvl1: document.getElementById('cntLvl1'),
    cntLvl2: document.getElementById('cntLvl2'),
    cntLvl3: document.getElementById('cntLvl3'),
    cntSituation: document.getElementById('cntSituation'),
    cntRealworld: document.getElementById('cntRealworld'),

    // Topics & Main
    topicsChipsTrack: document.getElementById('topicsChipsTrack'),
    contentContainer: document.getElementById('contentContainer'),

    // Mobile Bottom Nav
    mobileBottomNav: document.getElementById('mobileBottomNav'),
    bottomSheetOverlay: document.getElementById('bottomSheetOverlay'),
    bottomSheetCard: document.getElementById('bottomSheetCard'),
    bottomSheetTitle: document.getElementById('bottomSheetTitle'),
    bottomSheetClose: document.getElementById('bottomSheetClose'),
    bottomSheetContent: document.getElementById('bottomSheetContent'),

    // Mock Modal
    mockModalOverlay: document.getElementById('mockModalOverlay'),
    mockModalBody: document.getElementById('mockModalBody'),
    mockModalClose: document.getElementById('mockModalClose'),
    mockNextBtn: document.getElementById('mockNextBtn'),
    mockDoneBtn: document.getElementById('mockDoneBtn'),

    // Toast
    toastHub: document.getElementById('toastHub')
  };

  // --- Safe Data Accessor ---
  function getCategoryData(catId) {
    if (!window.NT_DATA) return null;
    return window.NT_DATA[catId] || null;
  }

  function getAllQuestions(catId) {
    const data = getCategoryData(catId);
    if (!data || !data.topics) return [];
    const questions = [];
    data.topics.forEach((t) => {
      (t.items || []).forEach((item, idx) => {
        questions.push({
          ...item,
          catId: data.id,
          catTitle: data.title,
          topicId: t.id,
          topicName: t.name,
          globalId: `${data.id}__${t.id}__${idx}`
        });
      });
    });
    return questions;
  }

  // --- Initializer ---
  function init() {
    applyTheme(STATE.theme);
    setupEventListeners();
    renderSidebarNav();
    renderMobileCatChips();
    loadCategory(STATE.currentCat);
    updateOverallProgress();

    // Set initial active lang in seg
    el.langSeg.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('active', b.dataset.lang === STATE.currentLang);
    });
  }

  // --- Asynchronous Category Loading ---
  function loadCategory(catId) {
    STATE.currentCat = catId;
    STATE.currentTopic = 'all';
    STATE.currentLevel = 'all';

    const data = getCategoryData(catId);
    if (!data) {
      el.contentContainer.innerHTML = `
        <div class="empty-state">
          <h3>⚠️ কেটাগরি ডাটা পাওয়া যায়নি</h3>
          <p>${catId} মডিউলটি লোড হয়নি। দয়া করে পেজটি রিফ্রেশ করুন।</p>
        </div>`;
      return;
    }

    // Update Hero
    el.catHeroIcon.textContent = data.icon || '🚀';
    el.catHeroBadge.textContent = data.badge || data.title;
    el.catHeroTitle.textContent = data.title;
    el.catHeroDesc.textContent = `${data.title}-এর অধীনে ${data.topics.length}টি প্রধান টপিকের ৫-ধাপের কমপ্রিহেনসিভ প্রশ্নোত্তর।`;
    if (el.mobileCurrentCatTitle) el.mobileCurrentCatTitle.textContent = data.title;

    // Update Nav Active states
    updateActiveCategoryNavs(catId);

    // Render Topics chips
    renderTopicsSubnav(data.topics);

    // Render Level badge counts & Render Q&A cards
    renderCards();
    updateLevelCounts();
  }

  // --- Render Navigation ---
  function renderSidebarNav() {
    el.catNav.innerHTML = '';
    STATE.categories.forEach((catId) => {
      const data = getCategoryData(catId);
      if (!data) return;
      const count = getAllQuestions(catId).length;
      const isExpanded = STATE.expandedCats.has(catId);
      const isActiveCat = catId === STATE.currentCat;

      const group = document.createElement('div');
      group.className = `cat-nav-group ${isExpanded ? 'expanded' : ''}`;
      group.dataset.cat = catId;

      // Category Header Button
      const headerBtn = document.createElement('button');
      headerBtn.className = `cat-nav-btn ${isActiveCat ? 'active' : ''}`;
      headerBtn.dataset.cat = catId;
      headerBtn.innerHTML = `
        <div class="cat-nav-btn-left">
          <span class="cat-nav-btn-icon">${data.icon}</span>
          <span>${data.title}</span>
        </div>
        <div class="cat-nav-btn-right">
          <span class="cat-nav-badge">${count}</span>
          <span class="cat-expand-chevron">▶</span>
        </div>
      `;

      headerBtn.addEventListener('click', () => {
        if (STATE.currentCat !== catId) {
          STATE.expandedCats.add(catId);
          loadCategory(catId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Toggle collapse on active category
          if (STATE.expandedCats.has(catId)) {
            STATE.expandedCats.delete(catId);
            group.classList.remove('expanded');
          } else {
            STATE.expandedCats.add(catId);
            group.classList.add('expanded');
          }
        }
      });
      group.appendChild(headerBtn);

      // Nested Topics Container
      const topicsList = document.createElement('div');
      topicsList.className = 'cat-topics-list';

      // 'All Topics' item
      const allTopicBtn = document.createElement('button');
      allTopicBtn.className = `cat-topic-btn ${isActiveCat && STATE.currentTopic === 'all' ? 'active' : ''}`;
      allTopicBtn.dataset.cat = catId;
      allTopicBtn.dataset.topic = 'all';
      allTopicBtn.innerHTML = `
        <div class="topic-btn-left">
          <span class="topic-dot"></span>
          <span class="topic-name">🌟 সব টপিক</span>
        </div>
        <span class="topic-count">${count}</span>
      `;
      allTopicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (STATE.currentCat !== catId) {
          STATE.expandedCats.add(catId);
          loadCategory(catId);
        }
        selectTopicHandler('all');
        if (window.innerWidth <= 900) el.sidebar.classList.remove('mobile-open');
      });
      topicsList.appendChild(allTopicBtn);

      // Individual topics
      (data.topics || []).forEach((t) => {
        const tCount = (t.items || []).length;
        const isTopicActive = isActiveCat && STATE.currentTopic === t.id;

        const topicBtn = document.createElement('button');
        topicBtn.className = `cat-topic-btn ${isTopicActive ? 'active' : ''}`;
        topicBtn.dataset.cat = catId;
        topicBtn.dataset.topic = t.id;
        topicBtn.innerHTML = `
          <div class="topic-btn-left">
            <span class="topic-dot"></span>
            <span class="topic-name">${escapeHtml(t.name)}</span>
          </div>
          <span class="topic-count">${tCount}</span>
        `;
        topicBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (STATE.currentCat !== catId) {
            STATE.expandedCats.add(catId);
            loadCategory(catId);
          }
          selectTopicHandler(t.id);
          if (window.innerWidth <= 900) el.sidebar.classList.remove('mobile-open');
        });
        topicsList.appendChild(topicBtn);
      });

      group.appendChild(topicsList);
      el.catNav.appendChild(group);
    });
  }

  function renderMobileCatChips() {
    el.mobileCatChipsTrack.innerHTML = '';
    STATE.categories.forEach((catId) => {
      const data = getCategoryData(catId);
      if (!data) return;
      const chip = document.createElement('button');
      chip.className = `m-cat-chip ${catId === STATE.currentCat ? 'active' : ''}`;
      chip.dataset.cat = catId;
      chip.innerHTML = `<span>${data.icon}</span> ${data.title}`;
      chip.addEventListener('click', () => {
        loadCategory(catId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      el.mobileCatChipsTrack.appendChild(chip);
    });
  }

  function updateActiveCategoryNavs(catId) {
    STATE.expandedCats.add(catId);

    el.catNav.querySelectorAll('.cat-nav-group').forEach((g) => {
      const isThisCat = g.dataset.cat === catId;
      const isExpanded = STATE.expandedCats.has(g.dataset.cat);
      g.classList.toggle('expanded', isExpanded);

      const headerBtn = g.querySelector('.cat-nav-btn');
      if (headerBtn) headerBtn.classList.toggle('active', isThisCat);

      g.querySelectorAll('.cat-topic-btn').forEach((tb) => {
        const matches = isThisCat && tb.dataset.topic === STATE.currentTopic;
        tb.classList.toggle('active', matches);
      });
    });

    el.mobileCatChipsTrack.querySelectorAll('.m-cat-chip').forEach((c) => {
      c.classList.toggle('active', c.dataset.cat === catId);
    });
  }

  function selectTopicHandler(topicId) {
    STATE.currentTopic = topicId;
    updateActiveTopicChip(topicId);
    updateActiveCategoryNavs(STATE.currentCat);
    renderCards();
    updateLevelCounts();

    if (topicId !== 'all') {
      const targetEl = document.getElementById(`topic-group-${topicId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Render Topic Chips ---
  function renderTopicsSubnav(topics) {
    el.topicsChipsTrack.innerHTML = '';

    // 'All Topics' Chip
    const allChip = document.createElement('button');
    allChip.className = `topic-chip ${STATE.currentTopic === 'all' ? 'active' : ''}`;
    allChip.textContent = '🌟 সব টপিক';
    allChip.dataset.topic = 'all';
    allChip.addEventListener('click', () => {
      selectTopicHandler('all');
    });
    el.topicsChipsTrack.appendChild(allChip);

    topics.forEach((t) => {
      const chip = document.createElement('button');
      chip.className = `topic-chip ${STATE.currentTopic === t.id ? 'active' : ''}`;
      chip.textContent = t.name;
      chip.dataset.topic = t.id;
      chip.addEventListener('click', () => {
        selectTopicHandler(t.id);
      });
      el.topicsChipsTrack.appendChild(chip);
    });
  }

  function updateActiveTopicChip(topicId) {
    el.topicsChipsTrack.querySelectorAll('.topic-chip').forEach((c) => {
      c.classList.toggle('active', c.dataset.topic === topicId);
    });
  }

  // --- Update Level Badge Counts ---
  function updateLevelCounts() {
    const questions = getAllQuestions(STATE.currentCat).filter((q) => {
      if (STATE.currentTopic !== 'all' && q.topicId !== STATE.currentTopic) return false;
      return true;
    });

    const counts = {
      all: questions.length,
      lvl1: questions.filter((q) => q.lvl === 'lvl1').length,
      lvl2: questions.filter((q) => q.lvl === 'lvl2').length,
      lvl3: questions.filter((q) => q.lvl === 'lvl3').length,
      situation: questions.filter((q) => q.lvl === 'situation').length,
      realworld: questions.filter((q) => q.lvl === 'realworld').length
    };

    el.cntAll.textContent = counts.all;
    el.cntLvl1.textContent = counts.lvl1;
    el.cntLvl2.textContent = counts.lvl2;
    el.cntLvl3.textContent = counts.lvl3;
    el.cntSituation.textContent = counts.situation;
    el.cntRealworld.textContent = counts.realworld;

    // Category Hero stats
    const doneCount = questions.filter((q) => STATE.mastered.has(q.globalId)).length;
    el.catHeroTotalCount.textContent = counts.all;
    el.catHeroDoneCount.textContent = doneCount;
  }

  // --- Filter and Search Logic ---
  function getFilteredQuestions() {
    let questions = getAllQuestions(STATE.currentCat);

    // Topic Filter
    if (STATE.currentTopic !== 'all') {
      questions = questions.filter((q) => q.topicId === STATE.currentTopic);
    }

    // Level Filter
    if (STATE.currentLevel !== 'all') {
      questions = questions.filter((q) => q.lvl === STATE.currentLevel);
    }

    // Hide Done Filter
    if (STATE.hideDone) {
      questions = questions.filter((q) => !STATE.mastered.has(q.globalId));
    }

    // Search Query
    if (STATE.searchQuery.trim()) {
      const qLower = STATE.searchQuery.toLowerCase().trim();
      questions = questions.filter((q) => {
        return (
          q.q.toLowerCase().includes(qLower) ||
          (q.m && q.m.toLowerCase().includes(qLower)) ||
          (q.b && q.b.toLowerCase().includes(qLower)) ||
          (q.e && q.e.toLowerCase().includes(qLower)) ||
          (q.code && q.code.toLowerCase().includes(qLower)) ||
          q.topicName.toLowerCase().includes(qLower)
        );
      });
    }

    return questions;
  }

  // --- Render Q&A Cards ---
  function renderCards() {
    const questions = getFilteredQuestions();

    if (questions.length === 0) {
      el.contentContainer.innerHTML = `
        <div class="empty-state">
          <div style="font-size: 2.4rem; margin-bottom: 10px;">🔍</div>
          <h3>কোনো প্রশ্ন পাওয়া যায়নি</h3>
          <p>আপনার ফিল্টার বা সার্চ কোয়েরি পরিবর্তন করে দেখুন।</p>
        </div>`;
      return;
    }

    // Group questions by topic for structural elegance
    const grouped = {};
    questions.forEach((q) => {
      if (!grouped[q.topicId]) grouped[q.topicId] = { name: q.topicName, items: [] };
      grouped[q.topicId].items.push(q);
    });

    let html = '';
    let globalIndex = 1;

    Object.keys(grouped).forEach((topicId) => {
      const group = grouped[topicId];
      html += `
        <section class="topic-group" id="topic-group-${topicId}">
          <div class="topic-group-header">
            <h2 class="topic-group-title">📑 ${escapeHtml(group.name)}</h2>
            <span class="topic-group-desc">${group.items.length}টি প্রশ্ন</span>
          </div>
          <div class="topic-cards-list">
      `;

      group.items.forEach((item) => {
        const isDone = STATE.mastered.has(item.globalId);
        const lvlBadge = getLevelBadgeHTML(item.lvl);

        html += `
          <article class="qna-card ${isDone ? 'done-card' : ''}" id="card-${item.globalId}" data-id="${item.globalId}">
            <!-- Header -->
            <div class="card-header">
              <div class="card-title-wrap">
                <span class="card-q-num">Q${globalIndex++}</span>
                <h3 class="card-question">${highlightSearch(item.q)}</h3>
              </div>
              ${lvlBadge}
            </div>

            <!-- Language & Action Tabs -->
            <div class="card-tabs">
              <div class="tab-buttons" role="tablist">
                <button class="card-tab-btn ${STATE.currentLang === 'mix' || STATE.currentLang === 'all' ? 'active' : ''}" data-target="m">🗣️ মিক্স</button>
                <button class="card-tab-btn ${STATE.currentLang === 'bn' || STATE.currentLang === 'all' ? 'active' : ''}" data-target="b">🇧🇩 বাংলা</button>
                <button class="card-tab-btn ${STATE.currentLang === 'en' || STATE.currentLang === 'all' ? 'active' : ''}" data-target="e">🇬🇧 English</button>
              </div>
              <div class="card-tools">
                <button class="card-tool-btn tts-btn" title="উচ্চারণ শুনুন" aria-label="Listen audio">🔊 শুনুন</button>
                <button class="card-tool-btn copy-btn" title="কপি করুন" aria-label="Copy text">📋 কপি</button>
              </div>
            </div>

            <!-- Answer Bodies -->
            <div class="card-body">
              <div class="ans-pane ans-m ${STATE.currentLang === 'mix' || STATE.currentLang === 'all' ? 'active' : ''}">
                ${highlightSearch(item.m || '')}
              </div>
              <div class="ans-pane ans-b ${STATE.currentLang === 'bn' || STATE.currentLang === 'all' ? 'active' : ''}">
                ${highlightSearch(item.b || '')}
              </div>
              <div class="ans-pane ans-e en ${STATE.currentLang === 'en' || STATE.currentLang === 'all' ? 'active' : ''}">
                ${highlightSearch(item.e || '')}
              </div>

              ${item.code ? `
                <div class="code-block">
                  <pre><code>${escapeHtml(item.code)}</code></pre>
                </div>
              ` : ''}

              ${item.tip ? `
                <div class="tip-box">
                  <span>💡</span>
                  <div><b>ইন্টারভিউ টিপ:</b> ${escapeHtml(item.tip)}</div>
                </div>
              ` : ''}
            </div>

            <!-- Footer Mastery Check -->
            <div class="card-footer">
              <label class="mark-done-label">
                <input type="checkbox" class="mark-done-checkbox" ${isDone ? 'checked' : ''} data-id="${item.globalId}" />
                <span>${isDone ? '✅ শেখা সম্পন্ন হয়েছে' : 'শেখা হয়েছে মার্ক করো'}</span>
              </label>
              <small style="color: var(--text-subtle);">${escapeHtml(item.topicName)}</small>
            </div>
          </article>
        `;
      });

      html += `
          </div>
        </section>
      `;
    });

    el.contentContainer.innerHTML = html;
    attachCardListeners();
  }

  // --- Attach Card Event Listeners ---
  function attachCardListeners() {
    // Tab switching per card
    el.contentContainer.querySelectorAll('.card-tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.qna-card');
        const target = e.target.dataset.target;
        card.querySelectorAll('.card-tab-btn').forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');

        card.querySelectorAll('.ans-pane').forEach((p) => p.classList.remove('active'));
        const activePane = card.querySelector(`.ans-${target}`);
        if (activePane) activePane.classList.add('active');
      });
    });

    // Mark Done Checkbox
    el.contentContainer.querySelectorAll('.mark-done-checkbox').forEach((chk) => {
      chk.addEventListener('change', (e) => {
        const qId = e.target.dataset.id;
        const card = document.getElementById(`card-${qId}`);
        const labelText = card.querySelector('.mark-done-label span');

        if (e.target.checked) {
          STATE.mastered.add(qId);
          card.classList.add('done-card');
          if (labelText) labelText.textContent = '✅ শেখা সম্পন্ন হয়েছে';
          showToast('অভিনন্দন! প্রশ্নটি সম্পন্ন মার্ক করা হয়েছে 🎉');
        } else {
          STATE.mastered.delete(qId);
          card.classList.remove('done-card');
          if (labelText) labelText.textContent = 'শেখা হয়েছে মার্ক করো';
        }

        saveMasteredProgress();
        updateOverallProgress();
        updateLevelCounts();

        if (STATE.hideDone && e.target.checked) {
          card.style.display = 'none';
        }
      });
    });

    // Copy Button
    el.contentContainer.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.qna-card');
        const question = card.querySelector('.card-question').innerText;
        const activeAns = card.querySelector('.ans-pane.active')?.innerText || '';
        const textToCopy = `Q: ${question}\n\nA: ${activeAns}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('প্রশ্ন ও উত্তর ক্লিপবোর্ডে কপি হয়েছে! 📋');
        });
      });
    });

    // TTS Audio Button
    el.contentContainer.querySelectorAll('.tts-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.qna-card');
        const activePane = card.querySelector('.ans-pane.active');
        const isEnglish = activePane && activePane.classList.contains('ans-e');
        const textToSpeak = activePane ? activePane.innerText : card.querySelector('.card-question').innerText;

        speakText(textToSpeak, isEnglish ? 'en-US' : 'bn-BD');
      });
    });
  }

  // --- Helpers & Badges ---
  function getLevelBadgeHTML(lvl) {
    switch (lvl) {
      case 'lvl1':
        return '<span class="lvl-badge lvl1">🟢 লেভেল ১ (বেসিক)</span>';
      case 'lvl2':
        return '<span class="lvl-badge lvl2">🟡 লেভেল ২ (কাজের অভিজ্ঞতা)</span>';
      case 'lvl3':
        return '<span class="lvl-badge lvl3">🟠 লেভেল ৩ (অ্যাডভান্সড)</span>';
      case 'situation':
        return '<span class="lvl-badge situation">🟣 সিচুয়েশন বেজড</span>';
      case 'realworld':
        return '<span class="lvl-badge realworld">🔴 রিয়েল-ওয়ার্ল্ড (লাইভ)</span>';
      default:
        return '<span class="lvl-badge">স্ট্যান্ডার্ড</span>';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function highlightSearch(text) {
    if (!text) return '';
    if (!STATE.searchQuery.trim()) return escapeHtml(text);
    const escapedText = escapeHtml(text);
    const safeQuery = escapeRegex(escapeHtml(STATE.searchQuery.trim()));
    const regex = new RegExp(`(${safeQuery})`, 'gi');
    return escapedText.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // --- TTS Engine ---
  function speakText(text, lang = 'en-US') {
    if (!('speechSynthesis' in window)) {
      showToast('আপনার ব্রাউজারে স্পিচ অডিও সাপোর্ট নেই।');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[`*#_]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast('অডিও প্লে হচ্ছে... 🔊');
  }

  // --- Toast System ---
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    el.toastHub.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // --- Mastery Progress Tracker ---
  function saveMasteredProgress() {
    localStorage.setItem('nt_mastered_ids', JSON.stringify(Array.from(STATE.mastered)));
  }

  function updateOverallProgress() {
    let allCount = 0;
    STATE.categories.forEach((cat) => {
      allCount += getAllQuestions(cat).length;
    });
    const doneCount = STATE.mastered.size;
    const pct = allCount > 0 ? Math.round((doneCount / allCount) * 100) : 0;

    el.overallPct.textContent = `${pct}%`;
    el.overallBar.style.width = `${pct}%`;
    el.overallCount.textContent = `${doneCount} / ${allCount}`;
    if (el.mobileProgressPill) el.mobileProgressPill.textContent = `${pct}% সম্পন্ন`;
  }

  // --- Theme Controller ---
  function applyTheme(theme) {
    STATE.theme = theme;
    localStorage.setItem('nt_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const icon = theme === 'light' ? '☀️' : '🌙';
    if (el.themeBtn) el.themeBtn.textContent = icon;
    if (el.mobileThemeBtn) el.mobileThemeBtn.textContent = icon;
  }

  // --- Mock Interview Modal ---
  function openMockInterview() {
    const questions = getAllQuestions(STATE.currentCat);
    if (!questions.length) return;
    const randItem = questions[Math.floor(Math.random() * questions.length)];

    el.mockModalBody.innerHTML = `
      <div style="margin-bottom: 12px;">${getLevelBadgeHTML(randItem.lvl)}</div>
      <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 14px; line-height: 1.5;">${escapeHtml(randItem.q)}</h2>
      <details style="background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px; margin-top: 14px;">
        <summary style="cursor: pointer; font-weight: 700; color: var(--accent);">🔍 উত্তর প্রিভিউ দেখুন</summary>
        <div style="margin-top: 10px; font-size: 0.95rem; line-height: 1.7;">
          <p><b>মিক্স:</b> ${escapeHtml(randItem.m)}</p>
          <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;" />
          <p class="en" style="font-family: var(--font-en);"><b>English:</b> ${escapeHtml(randItem.e)}</p>
        </div>
      </details>
    `;

    el.mockDoneBtn.onclick = () => {
      STATE.mastered.add(randItem.globalId);
      saveMasteredProgress();
      updateOverallProgress();
      updateLevelCounts();
      renderCards();
      showToast('মক প্রশ্নটি সম্পন্ন হয়েছে! ✅');
      openMockInterview();
    };

    el.mockModalOverlay.style.display = 'grid';
  }

  // --- Mobile Bottom Sheet Helper ---
  function openBottomSheet(title, htmlContent) {
    el.bottomSheetTitle.textContent = title;
    el.bottomSheetContent.innerHTML = htmlContent;
    el.bottomSheetOverlay.style.display = 'grid';
  }

  function closeBottomSheet() {
    el.bottomSheetOverlay.style.display = 'none';
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // Theme buttons
    const toggleTheme = () => applyTheme(STATE.theme === 'light' ? 'dark' : 'light');
    el.themeBtn.addEventListener('click', toggleTheme);
    el.mobileThemeBtn.addEventListener('click', toggleTheme);

    // Sidebar Mobile Toggle
    el.menuBtn.addEventListener('click', () => {
      el.sidebar.classList.toggle('mobile-open');
    });

    // Close mobile sidebar when clicking main
    document.addEventListener('click', (e) => {
      if (
        window.innerWidth <= 900 &&
        el.sidebar.classList.contains('mobile-open') &&
        !el.sidebar.contains(e.target) &&
        e.target !== el.menuBtn
      ) {
        el.sidebar.classList.remove('mobile-open');
      }
    });

    // Level Filter Track Buttons
    el.levelFilterTrack.querySelectorAll('.lvl-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const lvl = btn.dataset.lvl;
        STATE.currentLevel = lvl;
        el.levelFilterTrack.querySelectorAll('.lvl-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards();
      });
    });

    // Global Language Switcher
    el.langSeg.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const lang = btn.dataset.lang;
        STATE.currentLang = lang;
        localStorage.setItem('nt_lang_pref', lang);
        el.langSeg.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards();
      });
    });

    // Search Input
    el.search.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value;
      el.searchClear.style.display = STATE.searchQuery ? 'block' : 'none';
      renderCards();
    });

    el.searchClear.addEventListener('click', () => {
      el.search.value = '';
      STATE.searchQuery = '';
      el.searchClear.style.display = 'none';
      renderCards();
      el.search.focus();
    });

    // Keyboard shortcut '/' for search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== el.search) {
        e.preventDefault();
        el.search.focus();
      }
      if (e.key === 'Escape') {
        el.mockModalOverlay.style.display = 'none';
        closeBottomSheet();
      }
    });

    // Top action buttons
    el.expandBtn.addEventListener('click', () => {
      STATE.currentLang = 'all';
      el.langSeg.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.lang === 'all'));
      renderCards();
    });

    el.hideDoneBtn.addEventListener('click', () => {
      STATE.hideDone = !STATE.hideDone;
      el.hideDoneBtn.textContent = STATE.hideDone ? 'Done দেখাও' : 'Done লুকাও';
      renderCards();
    });

    el.mockBtn.addEventListener('click', openMockInterview);
    el.mockNextBtn.addEventListener('click', openMockInterview);
    el.mockModalClose.addEventListener('click', () => {
      el.mockModalOverlay.style.display = 'none';
    });

    // Reset Progress
    el.resetBtn.addEventListener('click', () => {
      if (confirm('আপনি কি নিশ্চিত যে আপনার সমস্ত প্রগ্রেস মুছে ফেলতে চান?')) {
        STATE.mastered.clear();
        saveMasteredProgress();
        updateOverallProgress();
        updateLevelCounts();
        renderCards();
        showToast('প্রগ্রেস সফলভাবে রিসেট করা হয়েছে।');
      }
    });

    // Mobile Bottom Sheet Close
    el.bottomSheetClose.addEventListener('click', closeBottomSheet);
    el.bottomSheetOverlay.addEventListener('click', (e) => {
      if (e.target === el.bottomSheetOverlay) closeBottomSheet();
    });

    // Mobile Bottom Nav actions
    el.mobileBottomNav.querySelectorAll('.m-nav-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        const target = item.dataset.target;
        el.mobileBottomNav.querySelectorAll('.m-nav-item').forEach((i) => i.classList.remove('active'));
        item.classList.add('active');

        if (target === 'categories') {
          let sheetHtml = '<div style="display:flex; flex-direction:column; gap:8px;">';
          STATE.categories.forEach((catId) => {
            const data = getCategoryData(catId);
            if (!data) return;
            sheetHtml += `
              <button class="cat-nav-btn ${catId === STATE.currentCat ? 'active' : ''}" style="width:100%" onclick="window.NT_APP.selectCategory('${catId}')">
                <div class="cat-nav-btn-left">
                  <span>${data.icon}</span>
                  <span>${data.title}</span>
                </div>
                <span class="cat-nav-badge">${getAllQuestions(catId).length}</span>
              </button>
            `;
          });
          sheetHtml += '</div>';
          openBottomSheet('ক্যাটাগরি নির্বাচন করুন', sheetHtml);
        } else if (target === 'topics') {
          const currentData = getCategoryData(STATE.currentCat);
          if (!currentData) return;
          let sheetHtml = '<div style="display:flex; flex-direction:column; gap:8px;">';
          sheetHtml += `
            <button class="cat-nav-btn ${STATE.currentTopic === 'all' ? 'active' : ''}" style="width:100%" onclick="window.NT_APP.selectTopic('all')">
              <span>🌟 সব টপিক</span>
            </button>
          `;
          currentData.topics.forEach((t) => {
            sheetHtml += `
              <button class="cat-nav-btn ${STATE.currentTopic === t.id ? 'active' : ''}" style="width:100%" onclick="window.NT_APP.selectTopic('${t.id}')">
                <span>📑 ${t.name}</span>
                <span class="cat-nav-badge">${t.items.length}</span>
              </button>
            `;
          });
          sheetHtml += '</div>';
          openBottomSheet('টপিক নির্বাচন করুন', sheetHtml);
        } else if (target === 'levels') {
          let sheetHtml = '<div style="display:flex; flex-direction:column; gap:8px;">';
          const lvls = [
            { id: 'all', label: 'সব প্রশ্ন' },
            { id: 'lvl1', label: '🟢 লেভেল ১ (বেসিক)' },
            { id: 'lvl2', label: '🟡 লেভেল ২ (কাজের অভিজ্ঞতা)' },
            { id: 'lvl3', label: '🟠 লেভেল ৩ (অ্যাডভান্সড)' },
            { id: 'situation', label: '🟣 সিচুয়েশন বেজড' },
            { id: 'realworld', label: '🔴 রিয়েল-ওয়ার্ল্ড (লাইভ)' }
          ];
          lvls.forEach((l) => {
            sheetHtml += `
              <button class="cat-nav-btn ${STATE.currentLevel === l.id ? 'active' : ''}" style="width:100%" onclick="window.NT_APP.selectLevel('${l.id}')">
                <span>${l.label}</span>
              </button>
            `;
          });
          sheetHtml += '</div>';
          openBottomSheet('লেভেল ফিল্টার করুন', sheetHtml);
        } else if (target === 'search') {
          el.search.focus();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (target === 'mock') {
          openMockInterview();
        }
      });
    });
  }

  // --- Public API for Bottom Sheet Interactions ---
  window.NT_APP = {
    selectCategory: (catId) => {
      closeBottomSheet();
      loadCategory(catId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    selectTopic: (topicId) => {
      closeBottomSheet();
      selectTopicHandler(topicId);
    },
    selectLevel: (lvlId) => {
      closeBottomSheet();
      STATE.currentLevel = lvlId;
      el.levelFilterTrack.querySelectorAll('.lvl-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.lvl === lvlId);
      });
      renderCards();
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
