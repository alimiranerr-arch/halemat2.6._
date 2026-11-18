/* Hako/Presents v2.7.0 - Özel Sistem ve Özellik Uzantısı */
(function () {
  'use strict';

  // 7. Sınıf MEB Müfredatı Konuları (1. Dönem ve 2. Dönem ayrımı)
  const CURRICULUM_7 = {
    term1: [
      { id: 't1_tamsayilar', name: 'Tam Sayılarla İşlemler', icon: '➕➖' },
      { id: 't1_rasyonel', name: 'Rasyonel Sayılar', icon: '½' },
      { id: 't1_rasyonel_islem', name: 'Rasyonel Sayılarla İşlemler', icon: '➗' },
      { id: 't1_cebir', name: 'Cebirsel İfadeler', icon: '✖️' },
      { id: 't1_denklem', name: 'Eşitlik ve Denklem', icon: '⚖️' }
    ],
    term2: [
      { id: 't2_oran', name: 'Oran ve Orantı', icon: '📊' },
      { id: 't2_yuzdeler', name: 'Yüzdeler', icon: '💯' },
      { id: 't2_dogrular_acilar', name: 'Doğrular ve Açılar', icon: '📐' },
      { id: 't2_cokgenler', name: 'Çokgenler', icon: '⬡' },
      { id: 't2_cember_daire', name: 'Çember ve Daire', icon: '⭕' },
      { id: 't2_veri_analizi', name: 'Veri Analizi', icon: '📈' },
      { id: 't2_cisimler', name: 'Cisimlerin Farklı Yönlerden Görünümleri', icon: '🧊' }
    ]
  };

  // Genişletilmiş 7. Sınıf Soru Havuzu
  const EXTRA_QUESTIONS_7 = [
    { topic: 't1_tamsayilar', diff: 'easy', q: '(-12) + (+7) işleminin sonucu kaçtır?', opts: ['-5', '5', '-19', '19'], a: 0 },
    { topic: 't1_tamsayilar', diff: 'medium', q: '(-4) . (-6) - (+10) işleminin sonucu kaçtır?', opts: ['14', '-14', '34', '-34'], a: 0 },
    { topic: 't1_tamsayilar', diff: 'hard', q: '(-3)³ + (-2)⁴ işleminin sonucu kaçtır?', opts: ['-11', '11', '-43', '43'], a: 0 },
    { topic: 't1_rasyonel', diff: 'easy', q: '-3/4 rasyonel sayısının ondalık gösterimi nedir?', opts: ['-0,75', '-0,25', '-0,34', '0,75'], a: 0 },
    { topic: 't1_rasyonel_islem', diff: 'medium', q: '(2/3) + (-1/6) işleminin sonucu kaçtır?', opts: ['1/2', '1/3', '5/6', '-1/2'], a: 0 },
    { topic: 't1_cebir', diff: 'easy', q: '3(2x - 4) + 5 cebirsel ifadesinin en sade hali nedir?', opts: ['6x - 7', '6x - 1', '5x - 7', '6x + 7'], a: 0 },
    { topic: 't1_denklem', diff: 'medium', q: '3x - 7 = 2x + 5 denkleminde x kaçtır?', opts: ['12', '-2', '2', '10'], a: 0 },
    { topic: 't2_oran', diff: 'easy', q: 'Bir sınıftaki kızların erkeklere oranı 3/5 tir. 15 erkek varsa kaç kız vardır?', opts: ['9', '12', '10', '6'], a: 0 },
    { topic: 't2_yuzdeler', diff: 'medium', q: '200 TL lik bir ürüne %20 indirim yapılırsa yeni fiyatı kaç TL olur?', opts: ['160', '180', '140', '150'], a: 0 },
    { topic: 't2_dogrular_acilar', diff: 'medium', q: 'Tümler iki açıdan biri diğerinin 2 katı ise büyük açı kaç derecedir?', opts: ['60', '30', '120', '90'], a: 0 },
    { topic: 't2_cokgenler', diff: 'hard', q: 'Bir iç açısı 135° olan düzgün çokgen kaç kenarlıdır?', opts: ['8', '6', '10', '12'], a: 0 },
    { topic: 't2_cember_daire', diff: 'medium', q: 'Yarıçapı 5 cm olan dairenin alanı kaç cm² dir? (π = 3 alınız)', opts: ['75', '30', '15', '150'], a: 0 }
  ];

  // Durum (State) Yönetimi
  const state = {
    isLoggedIn: localStorage.getItem('hp_gmail_logged') === 'true',
    userEmail: localStorage.getItem('hp_user_email') || '',
    userName: localStorage.getItem('hp_locked_name') || '',
    nameLocked: localStorage.getItem('hp_name_locked') === 'true',
    allowNameChange: localStorage.getItem('hp_allow_name_change') === 'true',
    isBanned: localStorage.getItem('hp_is_banned') === 'true' && localStorage.getItem('hp_forced_ban') === 'true',
    semester2Active: localStorage.getItem('hp_sem2_active') === 'true',
    sysFlags: JSON.parse(localStorage.getItem('hp_sys_flags') || '{"adminBox":true,"wheel":true,"tasks":true,"market":true,"online":true}'),
    savedSettings: JSON.parse(localStorage.getItem('hp_saved_settings') || '{"mode":"auto","fx":"auto","bw":false,"bg":false}'),
    tempSettings: null,
    locationData: JSON.parse(localStorage.getItem('hp_location_once') || 'null'),
    feedbacks: JSON.parse(localStorage.getItem('hp_feedbacks') || '[]'),
    customTasks: JSON.parse(localStorage.getItem('hp_admin_tasks') || '[]'),
    customBadges: JSON.parse(localStorage.getItem('hp_admin_badges') || '[]')
  };

  state.tempSettings = { ...state.savedSettings };

  function saveState() {
    localStorage.setItem('hp_gmail_logged', state.isLoggedIn);
    localStorage.setItem('hp_user_email', state.userEmail);
    localStorage.setItem('hp_locked_name', state.userName);
    localStorage.setItem('hp_name_locked', state.nameLocked);
    localStorage.setItem('hp_allow_name_change', state.allowNameChange);
    localStorage.setItem('hp_is_banned', state.isBanned);
    localStorage.setItem('hp_sem2_active', state.semester2Active);
    localStorage.setItem('hp_sys_flags', JSON.stringify(state.sysFlags));
    localStorage.setItem('hp_saved_settings', JSON.stringify(state.savedSettings));
    localStorage.setItem('hp_feedbacks', JSON.stringify(state.feedbacks));
    localStorage.setItem('hp_admin_tasks', JSON.stringify(state.customTasks));
    localStorage.setItem('hp_admin_badges', JSON.stringify(state.customBadges));
  }

  // 1. Ban Kontrolü
  function checkBanStatus() {
    const ov = document.getElementById('bannedOverlay');
    if (ov) {
      if (state.isBanned) ov.classList.remove('hide');
      else ov.classList.add('hide');
    }
  }

  // 2. Gmail Giriş Kilitlerini ve Admin Yetkilerini Güncelle
  function applyAuthAndLocks() {
    const logged = state.isLoggedIn;
    const isGoldAdmin = state.userEmail.toLowerCase() === 'alimiranerr@gmail.com';

    // Alimiranerr altın admin stili
    const meName = document.getElementById('meName');
    const meTitleTag = document.getElementById('meTitleTag');
    const tabAdmin = document.getElementById('tabAdmin');
    const adminProfileBanBtn = document.getElementById('adminProfileBanBtn');

    if (isGoldAdmin) {
      if (meName) meName.classList.add('gold-name');
      if (meTitleTag) {
        meTitleTag.textContent = ' [Admin]';
        meTitleTag.className = 'gold-admin-title';
      }
      if (tabAdmin) tabAdmin.classList.remove('hide');
      if (adminProfileBanBtn) adminProfileBanBtn.classList.remove('hide');
    }

    // Görevler kilidi
    const tasksLock = document.getElementById('tasksLockOver');
    if (tasksLock) tasksLock.classList.toggle('hide', logged);

    // Çark kilidi
    const wheelLock = document.getElementById('wheelLockOver');
    if (wheelLock) wheelLock.classList.toggle('hide', logged);

    // Geri bildirim buhulu kilit
    const fbLock = document.getElementById('fbLockOver');
    if (fbLock) fbLock.classList.toggle('hide', logged);

    // Sistem bayrakları (Admin panelden kapatma)
    const adminBox = document.getElementById('adminLogin');
    if (adminBox) adminBox.classList.toggle('hide', !state.sysFlags.adminBox);

    const tabTasks = document.getElementById('tabTasks');
    if (tabTasks) tabTasks.classList.toggle('hide', !state.sysFlags.tasks);

    const tabMarket = document.getElementById('tabMarket');
    if (tabMarket) tabMarket.classList.toggle('hide', !state.sysFlags.market);

    const tabCompete = document.getElementById('tabCompete');
    const tabSocial = document.getElementById('tabSocial');
    if (tabCompete) tabCompete.classList.toggle('hide', !state.sysFlags.online);
    if (tabSocial) tabSocial.classList.toggle('hide', !state.sysFlags.online);

    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) spinBtn.disabled = !state.sysFlags.wheel || !logged;
  }

  // 3. Ad Girilip Enter'a Basılınca Dondurma (Silinmeme) & Admin İzni
  function setupNameFreeze() {
    const nmInput = document.getElementById('nm');
    const unlockBtn = document.getElementById('unlockNameBtn');
    const meName = document.getElementById('meName');

    if (!nmInput) return;

    if (state.nameLocked && state.userName && !state.allowNameChange) {
      nmInput.value = state.userName;
      nmInput.readOnly = true;
      nmInput.style.opacity = '0.75';
      if (meName) meName.textContent = state.userName;
    }

    if (state.allowNameChange && unlockBtn) {
      unlockBtn.classList.remove('hide');
      unlockBtn.onclick = () => {
        nmInput.readOnly = false;
        nmInput.style.opacity = '1';
        nmInput.focus();
      };
    }

    nmInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = nmInput.value.trim();
        if (val.length >= 2) {
          state.userName = val;
          state.nameLocked = true;
          state.allowNameChange = false;
          nmInput.readOnly = true;
          nmInput.style.opacity = '0.75';
          if (meName) meName.textContent = val;
          if (unlockBtn) unlockBtn.classList.add('hide');
          saveState();
          const msg = document.getElementById('nmMsg');
          if (msg) {
            msg.className = 'msg ok';
            msg.textContent = '✅ Adınız kaydedildi ve kilitlendi.';
          }
        }
      }
    });
  }

  // 4. Gece / Gündüz Otomatik Döngüsü + Güneşli Hava Küçük Güneş + Kaydete Basılmazsa Geri Alma
  function applyVisualSettings(cfg) {
    const sunnyOrb = document.getElementById('sunnyOrb');
    const hour = new Date().getHours();
    const isNightTime = hour >= 19 || hour < 6;

    // Gece / Gündüz modu
    document.body.classList.remove('theme-night', 'theme-day');
    if (cfg.mode === 'dark') {
      document.body.classList.add('theme-night');
    } else if (cfg.mode === 'light') {
      document.body.classList.add('theme-day');
    } else {
      // Otomatik: Akşam karanlık, sabah aydınlık
      document.body.classList.add(isNightTime ? 'theme-night' : 'theme-day');
    }

    // Güneşli hava tepedeki küçük güneş
    const isSunny = cfg.fx === 'sunny' || (cfg.fx === 'auto' && state.locationData && state.locationData.weather === 'sunny');
    if (sunnyOrb) sunnyOrb.classList.toggle('hide', !isSunny);
    document.body.classList.toggle('sunny-glow', isSunny);
  }

  function setupSettingsRevert() {
    applyVisualSettings(state.savedSettings);

    const modeSeg = document.getElementById('modeSeg');
    if (modeSeg) {
      modeSeg.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
          modeSeg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', 'false'));
          btn.setAttribute('aria-selected', 'true');
          state.tempSettings.mode = btn.dataset.md;
          applyVisualSettings(state.tempSettings);
        });
      });
    }

    const fxSel = document.getElementById('fxSel');
    if (fxSel) {
      fxSel.value = state.savedSettings.fx || 'auto';
      fxSel.addEventListener('change', () => {
        state.tempSettings.fx = fxSel.value;
        applyVisualSettings(state.tempSettings);
      });
    }

    const saveBtn = document.getElementById('saveSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        state.savedSettings = { ...state.tempSettings };
        saveState();
        applyVisualSettings(state.savedSettings);
      });
    }

    // Başka sekmeye geçildiğinde kaydete basılmadıysa eski haline döndür
    document.querySelectorAll('#tabs button').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        if (tabBtn.dataset.go !== 's7') {
          state.tempSettings = { ...state.savedSettings };
          applyVisualSettings(state.savedSettings);
          if (fxSel) fxSel.value = state.savedSettings.fx || 'auto';
        }
      });
    });
  }

  // 5. Tek Seferlik Konum İzni ve Her Girişte Tekrar Kontrol
  function setupLocationWeather() {
    const reqBtn = document.getElementById('reqLocationBtn');
    const wxNow = document.getElementById('wxNow');

    function updateWeatherFromCoords(lat, lon) {
      // Gerçekçi hafif hava simülasyonu (konum koordinatına göre sabit tek seferlik kayıt)
      const isWarm = Math.abs(lat) < 42;
      const wType = isWarm ? 'sunny' : 'rain';
      state.locationData = {
        lat: lat.toFixed(4),
        lon: lon.toFixed(4),
        weather: wType,
        checkedAt: new Date().toLocaleString('tr-TR')
      };
      localStorage.setItem('hp_location_once', JSON.stringify(state.locationData));
      if (wxNow) {
        wxNow.textContent = `Konum aktif (${state.locationData.lat}, ${state.locationData.lon}) · Hava: ${wType === 'sunny' ? '☀️ Güneşli' : '🌧️ Yağmurlu'}`;
      }
      applyVisualSettings(state.tempSettings);
      renderAdminVisitors();
    }

    // Daha önce tek seferlik izin alındıysa her girişte tekrar kontrol et
    if (state.locationData) {
      state.locationData.checkedAt = new Date().toLocaleString('tr-TR');
      localStorage.setItem('hp_location_once', JSON.stringify(state.locationData));
      if (wxNow) {
        wxNow.textContent = `Konum doğrulandı (${state.locationData.lat}, ${state.locationData.lon}) · Hava: ${state.locationData.weather === 'sunny' ? '☀️ Güneşli' : '🌧️ Yağmurlu'}`;
      }
    }

    if (reqBtn) {
      reqBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
          if (wxNow) wxNow.textContent = 'Tarayıcı konum desteklemiyor.';
          return;
        }
        if (wxNow) wxNow.textContent = 'Konum izni isteniyor...';
        navigator.geolocation.getCurrentPosition(
          (pos) => updateWeatherFromCoords(pos.coords.latitude, pos.coords.longitude),
          () => {
            if (wxNow) wxNow.textContent = 'Konum izni reddedildi.';
          },
          { enableHighAccuracy: false, timeout: 8000 }
        );
      });
    }
  }

  // 6. 7. Sınıf Konuları Render & Zorluktan Sonsuz Modunu Temizleme
  function renderCurriculumAndFilterDiffs() {
    const tpContainer = document.getElementById('tp');
    const badge = document.getElementById('curriculumBadge');
    if (tpContainer) {
      const list = state.semester2Active
        ? [...CURRICULUM_7.term1, ...CURRICULUM_7.term2]
        : [...CURRICULUM_7.term1];

      if (badge) {
        badge.textContent = state.semester2Active ? '1. + 2. Dönem Konuları' : '1. Dönem Konuları';
      }

      tpContainer.innerHTML = list
        .map(
          (t) =>
            `<button type="button" class="topic" data-t="${t.id}"><span>${t.icon}</span><b>${t.name}</b></button>`
        )
        .join('');

      tpContainer.querySelectorAll('.topic').forEach((btn) => {
        btn.addEventListener('click', () => {
          tpContainer.querySelectorAll('.topic').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const dwrap = document.getElementById('dwrap');
          if (dwrap) dwrap.classList.remove('hide');
        });
      });
    }

    // Zorluk seviyesinde "Sonsuz" seçeneği varsa kaldır
    const dfContainer = document.getElementById('df');
    if (dfContainer) {
      const cleanEndlessDiff = () => {
        dfContainer.querySelectorAll('button').forEach((b) => {
          if ((b.dataset.d || '').toLowerCase() === 'endless' || b.textContent.toLowerCase().includes('sonsuz')) {
            b.remove();
          }
        });
      };
      cleanEndlessDiff();
      const obs = new MutationObserver(cleanEndlessDiff);
      obs.observe(dfContainer, { childList: true });
    }

    // Global soru havuzu varsa 7. sınıf sorularını enjekte et
    if (window.QUESTIONS && Array.isArray(window.QUESTIONS)) {
      EXTRA_QUESTIONS_7.forEach((eq) => {
        if (!window.QUESTIONS.some((x) => x.q === eq.q)) window.QUESTIONS.push(eq);
      });
    }
  }

  // 7. Öğretmen Formu Dinamik İletişim (E-posta <-> Telefon geçişi)
  function setupTeacherFormDynamic() {
    const pref = document.getElementById('teacherContactPref');
    const emailLbl = document.getElementById('teacherEmailLabel');
    const emailInp = document.getElementById('teacherEmailInput');
    const phoneLbl = document.getElementById('teacherPhoneLabel');
    const phoneInp = document.getElementById('teacherPhoneInput');

    if (!pref) return;
    pref.addEventListener('change', () => {
      if (pref.value === 'Telefon') {
        emailLbl.classList.add('hide');
        emailInp.required = false;
        phoneLbl.classList.remove('hide');
        phoneInp.required = true;
      } else {
        phoneLbl.classList.add('hide');
        phoneInp.required = false;
        emailLbl.classList.remove('hide');
        emailInp.required = true;
      }
    });
  }

  // 8. Geri Bildirim Kaydı & Admin Yanıt/Ban/Ad İzni Listesi
  function setupFeedbackAndAdmin() {
    const fbForm = document.getElementById('fbForm');
    if (fbForm) {
      fbForm.addEventListener('submit', () => {
        const tur = document.getElementById('fbTur')?.value || 'Öneri';
        const mesaj = document.getElementById('fbMsg')?.value.trim();
        if (!mesaj) return;
        state.feedbacks.unshift({
          id: 'FB-' + Date.now(),
          user: state.userName || 'Misafir',
          email: state.userEmail || 'Giriş yapılmamış',
          type: tur,
          text: mesaj,
          date: new Date().toLocaleString('tr-TR'),
          reply: ''
        });
        saveState();
        renderAdminFeedbacks();
      });
    }
    renderAdminFeedbacks();
    renderAdminVisitors();
  }

  function renderAdminFeedbacks() {
    const box = document.getElementById('adminFeedbackList');
    if (!box) return;
    if (!state.feedbacks.length) {
      box.innerHTML = '<p class="note">Henüz geri bildirim yok.</p>';
      return;
    }
    box.innerHTML = state.feedbacks
      .map(
        (f, idx) => `
      <div style="border:1px solid rgba(0,0,0,0.1); border-radius:10px; padding:10px; margin-bottom:8px;">
        <div class="row" style="justify-content:space-between;">
          <b>👤 ${f.user} (${f.email})</b>
          <span class="tag">${f.type}</span>
        </div>
        <p style="margin:6px 0;">${f.text}</p>
        <small class="note">${f.date}</small>
        ${f.reply ? `<div style="background:rgba(16,185,129,0.12); padding:6px; border-radius:6px; margin-top:6px;"><b>Admin Yanıtı:</b> ${f.reply}</div>` : ''}
        <div class="inline" style="margin-top:8px; gap:6px;">
          <input id="fbReplyInp_${idx}" placeholder="Kullanıcıya yanıt yaz..." style="font-size:0.85rem;">
          <button type="button" class="btn" onclick="window.__admReplyFb(${idx})">Yanıtla</button>
          <button type="button" class="btn" style="background:#f59e0b;color:#fff;" onclick="window.__admAllowNameChange()">✏️ Ad Değişiklik İzni</button>
          <button type="button" class="btn" style="background:#ef4444;color:#fff;" onclick="window.__admBanUser()">🚫 Banla</button>
        </div>
      </div>`
      )
      .join('');
  }

  function renderAdminVisitors() {
    const box = document.getElementById('adminVisitorsList');
    if (!box) return;
    const locStr = state.locationData
      ? `📍 ${state.locationData.lat}, ${state.locationData.lon} (${state.locationData.weather === 'sunny' ? '☀️ Güneşli' : '🌧️ Yağmurlu'} · Son kontrol: ${state.locationData.checkedAt})`
      : '📍 Konum izni henüz verilmedi';
    const isGold = state.userEmail.toLowerCase() === 'alimiranerr@gmail.com';
    const displayName = state.userName || 'Misafir Oyuncu';

    box.innerHTML = `
      <div style="border:1px solid rgba(0,0,0,0.1); border-radius:10px; padding:10px; margin-bottom:8px;">
        <div class="row" style="justify-content:space-between; align-items:center;">
          <div>
            <b class="${isGold ? 'gold-name' : ''}">${displayName}</b>
            ${isGold ? '<span class="gold-admin-title"> [Admin]</span>' : ''}
            <span class="pill" style="margin-left:6px;">🟢 Gerçek Durum: Online</span>
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn" style="background:#f59e0b;color:#fff;font-size:0.8rem;" onclick="window.__admAllowNameChange()">✏️ Ad İzni Ver</button>
            <button type="button" class="btn" style="background:#ef4444;color:#fff;font-size:0.8rem;" onclick="window.__admBanUser()">🚫 Banla</button>
          </div>
        </div>
        <div class="note" style="margin-top:4px;">📧 Gmail: ${state.userEmail || 'Giriş Yapılmamış'} · 📱 Cihaz: ${navigator.platform || 'Web Tarayıcı'}</div>
        <div class="note" style="margin-top:2px;">${locStr}</div>
      </div>
    `;
  }

  // Global Admin Aksiyonları
  window.__admReplyFb = function (idx) {
    const inp = document.getElementById('fbReplyInp_' + idx);
    if (inp && inp.value.trim()) {
      state.feedbacks[idx].reply = inp.value.trim();
      saveState();
      renderAdminFeedbacks();
    }
  };
  window.__admAllowNameChange = function () {
    state.allowNameChange = true;
    saveState();
    setupNameFreeze();
    alert('Kullanıcının adını değiştirmesine izin verildi!');
  };
  window.__admBanUser = function () {
    state.isBanned = true;
    saveState();
    checkBanStatus();
  };

  // 9. Admin Sistem Kontrolleri & Görev / Rozet Yayınlama
  function setupAdminControls() {
    const semBtn = document.getElementById('toggleSemesterBtn');
    if (semBtn) {
      semBtn.textContent = state.semester2Active
        ? '✅ 2. Dönem Aktif (1. Döneme Dönmek İçin Tıkla)'
        : '📅 2. Dönem Konularına Geç (1. + 2. Dönem Birlikte)';
      semBtn.addEventListener('click', () => {
        state.semester2Active = !state.semester2Active;
        saveState();
        semBtn.textContent = state.semester2Active
          ? '✅ 2. Dönem Aktif (1. Döneme Dönmek İçin Tıkla)'
          : '📅 2. Dönem Konularına Geç (1. + 2. Dönem Birlikte)';
        renderCurriculumAndFilterDiffs();
      });
    }

    const bindFlag = (elId, key) => {
      const el = document.getElementById(elId);
      if (!el) return;
      el.checked = state.sysFlags[key];
      el.addEventListener('change', () => {
        state.sysFlags[key] = el.checked;
        saveState();
        applyAuthAndLocks();
      });
    };

    bindFlag('admToggleAdminBox', 'adminBox');
    bindFlag('admToggleWheel', 'wheel');
    bindFlag('admToggleTasks', 'tasks');
    bindFlag('admToggleMarket', 'market');
    bindFlag('admToggleOnline', 'online');

    // Görev Yayınla (GIF + Yazı + Ödül)
    const pubTaskBtn = document.getElementById('admPublishTaskBtn');
    if (pubTaskBtn) {
      pubTaskBtn.addEventListener('click', () => {
        const text = document.getElementById('admTaskText')?.value.trim();
        const url = document.getElementById('admTaskGifUrl')?.value.trim();
        const reward = parseInt(document.getElementById('admTaskReward')?.value || '25', 10);
        const fileInp = document.getElementById('admTaskGifFile');

        const finishTaskPublish = (gifSrc) => {
          state.customTasks.unshift({ text, gif: gifSrc, reward });
          saveState();
          renderCustomTasks();
          const msg = document.getElementById('admTaskMsg');
          if (msg) {
            msg.className = 'msg ok';
            msg.textContent = '✅ GIF görev başarıyla yayınlandı!';
          }
        };

        if (!text) return;
        if (fileInp && fileInp.files && fileInp.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => finishTaskPublish(e.target.result);
          reader.readAsDataURL(fileInp.files[0]);
        } else {
          finishTaskPublish(url || '');
        }
      });
    }

    renderCustomTasks();
  }

  function renderCustomTasks() {
    const ul = document.getElementById('dailyTasks');
    if (!ul || !state.customTasks.length) return;
    const html = state.customTasks
      .map(
        (t) => `
      <li style="display:flex; align-items:center; gap:10px; padding:8px; border-bottom:1px solid rgba(0,0,0,0.08);">
        ${t.gif ? `<img src="${t.gif}" alt="Görev GIF" style="width:44px; height:44px; border-radius:8px; object-fit:cover;">` : '🎯'}
        <div style="flex:1;"><b>${t.text}</b><div class="note">Ödül: +${t.reward} 🪙</div></div>
        <button type="button" class="btn">Tamamla</button>
      </li>`
      )
      .join('');
    ul.insertAdjacentHTML('afterbegin', html);
  }

  // 10. Mini Oyun: Denklem Denge Terazisi Modalı
  function setupBalanceMiniGame() {
    const modes = document.getElementById('modes');
    if (!modes) return;
    modes.querySelectorAll('.mode').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.m === 'balance') {
          const modal = document.getElementById('modal');
          const mbody = document.getElementById('mbody');
          const xVal = Math.floor(Math.random() * 9) + 2;
          const a = Math.floor(Math.random() * 4) + 2;
          const b = Math.floor(Math.random() * 10) + 1;
          const total = a * xVal + b;
          if (modal && mbody) {
            mbody.innerHTML = `
              <h3>⚖️ Denklem Denge Terazisi</h3>
              <p>Terazinin iki kefesini eşitlemek için <b>x</b> kaç olmalıdır?</p>
              <div style="font-size:1.4rem; font-weight:800; text-align:center; padding:12px; background:rgba(255,183,3,0.15); border-radius:12px; margin:10px 0;">
                ${a}x + ${b} = ${total}
              </div>
              <div class="inline">
                <input id="balAnsInp" type="number" placeholder="x değeri...">
                <button type="button" class="go" id="balCheckBtn">Dengele!</button>
              </div>
              <p class="msg" id="balResMsg"></p>
            `;
            modal.classList.remove('hide');
            document.getElementById('balCheckBtn').onclick = () => {
              const ans = parseInt(document.getElementById('balAnsInp').value, 10);
              const res = document.getElementById('balResMsg');
              if (ans === xVal) {
                res.className = 'msg ok';
                res.textContent = `🎉 Harika! Terazi dengelendi (x = ${xVal}). +15 Altın kazandın!`;
              } else {
                res.className = 'msg err';
                res.textContent = `❌ Denge bozuldu! Tekrar dene.`;
              }
            };
          }
        }
      });
    });
  }

  // Kayıt formundan giriş yakalama
  function hookRegistration() {
    const openBtn = document.getElementById('openRegModalBtn');
    const regForm = document.getElementById('accountRegisterForm');
    if (openBtn && regForm) {
      openBtn.addEventListener('click', () => regForm.classList.toggle('hide'));
    }

    const compBtn = document.getElementById('completeGmailRegBtn');
    if (compBtn) {
      compBtn.addEventListener('click', () => {
        const gmail = document.getElementById('regGmail')?.value.trim();
        const fName = document.getElementById('regFirstName')?.value.trim();
        if (!gmail || !gmail.includes('@')) return;
        state.isLoggedIn = true;
        state.userEmail = gmail;
        if (fName) {
          state.userName = fName;
          state.nameLocked = true;
        }
        saveState();
        applyAuthAndLocks();
        setupNameFreeze();
        renderAdminVisitors();
        if (regForm) regForm.classList.add('hide');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    checkBanStatus();
    applyAuthAndLocks();
    setupNameFreeze();
    setupSettingsRevert();
    setupLocationWeather();
    renderCurriculumAndFilterDiffs();
    setupTeacherFormDynamic();
    setupFeedbackAndAdmin();
    setupAdminControls();
    setupBalanceMiniGame();
    hookRegistration();
  });
})();
