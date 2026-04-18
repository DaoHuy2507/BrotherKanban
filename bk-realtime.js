/**
 * BrotherKanban Real-Time Engine v2.0
 * "Skips setup cái timer này từ năm 3000 BC. Nó vẫn chạy tốt." — Benson
 */
const BKRealtime = (function () {

  /* ══════════════════════════════════════════════
     LOGOUT — define đầu tiên để luôn available
     Gọi từ bất kỳ trang nào: window.doLogout()
  ══════════════════════════════════════════════ */
  (function _setupLogout() {
    var loginUrl = (window.location.origin || '') + '/brotherkanban_ng_nh_p_creative_form/code.html?logout=1';

    function _clearSessionAndGo() {
      // CHỈ xóa session/auth keys — GIỮ data (bk-members, bk-tasks, ...)
      ['bk-current-user','bk-session','bk-auth-session'].forEach(function(k) {
        localStorage.removeItem(k);
      });
      Object.keys(localStorage).forEach(function(k) {
        if (k.startsWith('sb-') || k.includes('-auth-token') || k.includes('supabase-auth')) {
          localStorage.removeItem(k);
        }
      });
      window.location.href = loginUrl;
    }

    window.doLogout = function(skipConfirm) {
      var name = '';
      try { name = (JSON.parse(localStorage.getItem('bk-current-user')) || {}).name || ''; } catch(_) {}
      var msg = name
        ? ('Đăng xuất khỏi BrotherKanban? ' + name + ' sẽ offline!')
        : 'Đăng xuất?';
      if (!skipConfirm && !confirm(msg)) return;

      if (typeof BKSupabase !== 'undefined' && BKSupabase.signOut) {
        BKSupabase.signOut().then(_clearSessionAndGo).catch(_clearSessionAndGo);
      } else {
        _clearSessionAndGo();
      }
    };

    // Alias global (cho các trang dùng onclick="doLogout()" mà không có local function)
    window.doLogout._ready = true;
  })();

  /* ══════════════════════════════════════════════
     SEEDED RANDOM — same output for same calendar date
  ══════════════════════════════════════════════ */
  function _dateSeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }
  function _seededRand(seed, index) {
    const x = Math.sin(seed * 9301 + index * 49297 + 233) * 29303;
    return Math.abs(x - Math.floor(x));
  }
  function _pickByDate(arr, offset) {
    offset = offset || 0;
    return arr[Math.floor(_seededRand(_dateSeed(), offset) * arr.length)];
  }

  /* ══════════════════════════════════════════════
     CONTENT POOLS
  ══════════════════════════════════════════════ */

  // Daily jokes — one per day, same all day, different tomorrow
  var DAILY_JOKES = {
    vi: [
      '💡 Skips: "Tao đã thấy deadline kiểu này rồi. Nó không tự làm được đâu."',
      '💡 Benson: "ĐÂY KHÔNG PHẢI NGHỈ HÈ! Ờ... nó có vẻ như vậy."',
      '💡 Mordecai triết lý: "Làm như phong trào. Nghỉ như nghệ thuật sống."',
      '💡 Rigby logic: "Task nào khó? Bỏ qua. Task nào dễ? Để sau."',
      '💡 Pops vui: "XUẤT SẮC! Tôi không biết tại sao nhưng XUẤT SẮC!"',
      '💡 Skips bổ sung: "Muốn xong việc nhanh hơn? Bắt đầu đi."',
      '💡 Muscle Man: "You know who ELSE không làm xong task? MẸ TỚ!"',
      '💡 Benson thở dài: "Một ngày nữa. Một cơ hội nữa để thất vọng."',
      '💡 Mordecai: "Procrastination là một kỹ năng... theo một nghĩa nào đó."',
      '💡 Rigby phát hiện: "Nếu task không có deadline, nó chưa tồn tại. Khoa học."',
      '💡 Hi Five Ghost: "Ngày tốt lành! Không ai nhìn thấy tôi đâu nên OK."',
      '💡 Pops an ủi: "Dù hôm nay thế nào, táo luôn ngon. Tôi chắc chắn thế."',
      '💡 Skips nhận xét: "Team này hoạt động bằng phép màu và cà phê. Chủ yếu cà phê."',
      '💡 Benson hét: "NGỪNG ĐỨNG ĐÓ NHÌN NHAU! Làm task đi nào!!!"',
    ],
    en: [
      '💡 Skips: "I\'ve seen deadlines like this before. They don\'t do themselves."',
      '💡 Benson: "THIS IS NOT A VACATION! Well... it\'s looking like one."',
      '💡 Mordecai philosophizes: "Work like a movement. Rest like an art form."',
      '💡 Rigby logic: "Hard tasks? Skip them. Easy tasks? Do them later."',
      '💡 Pops delights: "SPLENDID! I don\'t know why, but SPLENDID!"',
      '💡 Skips adds: "Want to finish faster? Start doing it."',
      '💡 Muscle Man: "You know who ELSE didn\'t finish their tasks? MY MOM!"',
      '💡 Benson sighs: "Another day. Another opportunity to be disappointed."',
      '💡 Mordecai thinks: "Procrastination is a skill... in a way."',
      '💡 Rigby discovers: "If a task has no deadline, it doesn\'t exist. Science."',
      '💡 Hi Five Ghost: "Good day! Nobody can see me anyway, so it\'s fine."',
      '💡 Pops reassures: "Whatever the day brings, apples are always good."',
      '💡 Skips observes: "This team runs on magic and coffee. Mostly coffee."',
      '💡 Benson yells: "STOP STANDING AROUND! DO YOUR TASKS!!!"',
    ]
  };

  // Hourly vibe messages
  var HOURLY_VIBES = {
    vi: [
      { h: [5, 6, 7, 8],    icon: '🌅', msg: 'Sáng sớm! Benson vào lúc 7 giờ — chuẩn bị tinh thần.' },
      { h: [9, 10, 11],     icon: '☕', msg: 'Giờ vàng năng suất. Cà phê + task = YYYEAHHH!' },
      { h: [12, 13],        icon: '🍱', msg: 'Trưa rồi. Pops đang phân bánh sandwich cho cả team.' },
      { h: [14, 15, 16],    icon: '😪', msg: 'Đỉnh điểm buồn ngủ sau cơm. Rigby ngủ từ 30 phút trước.' },
      { h: [17, 18],        icon: '🌇', msg: 'Sắp tan làm! Sprint nước rút cuối ngày!' },
      { h: [19, 20, 21],    icon: '🌙', msg: 'Làm thêm giờ à? Skips đang patrol rồi đó.' },
      { h: [22, 23, 0],     icon: '🦉', msg: 'Đêm khuya rồi. Chỉ có Rigby và ma là còn thức.' },
      { h: [1, 2, 3, 4],    icon: '💀', msg: 'Bạn đang làm gì lúc này vậy? ĐI NGỦ ĐÊ!' },
    ],
    en: [
      { h: [5, 6, 7, 8],    icon: '🌅', msg: 'Early bird! Benson arrives at 7 — mental prep time.' },
      { h: [9, 10, 11],     icon: '☕', msg: 'Golden productivity hours. Coffee + tasks = YYYEAHHH!' },
      { h: [12, 13],        icon: '🍱', msg: 'Lunchtime. Pops is handing out sandwiches to the team.' },
      { h: [14, 15, 16],    icon: '😪', msg: 'Post-lunch crash. Rigby has been asleep for 30 minutes.' },
      { h: [17, 18],        icon: '🌇', msg: 'Almost clock-out! End-of-day final sprint!' },
      { h: [19, 20, 21],    icon: '🌙', msg: 'Working overtime? Skips is already on patrol.' },
      { h: [22, 23, 0],     icon: '🦉', msg: 'Late night. Only Rigby and ghosts are still up.' },
      { h: [1, 2, 3, 4],    icon: '💀', msg: 'What are you doing right now?! GO TO SLEEP!' },
    ]
  };

  // Auto-generated log entries (bilingual — actionEn used when lang=en)
  var AUTO_LOG_POOL = [
    { user: 'Mordecai',      action: 'Phát hiện ra cà phê pha đôi. Năng suất tăng 300%.',             actionEn: 'Discovered double-shot espresso. Productivity up 300%.' },
    { user: 'Rigby',         action: 'Dành 20 phút tìm điều khiển TV thay vì làm task.',              actionEn: 'Spent 20 mins searching for the TV remote instead of working.' },
    { user: 'Benson',        action: 'Đi tuần tra công viên lần 3 hôm nay. Nghi ngờ mọi thứ.',       actionEn: 'Patrolled the park for the 3rd time today. Suspicious of everything.' },
    { user: 'Muscle Man',    action: 'Khoe mẹ lần thứ 17. Team đã miễn nhiễm hoàn toàn.',            actionEn: 'Mom-bragged for the 17th time today. Team is now immune.' },
    { user: 'Hi Five Ghost', action: 'Bay qua văn phòng. Không có lý do. Như thường lệ.',            actionEn: 'Floated through the office. No reason. As usual.' },
    { user: 'Skips',         action: 'Sửa bug server trong 3 giây. Không ai biết ông làm thế nào.',  actionEn: 'Fixed server bug in 3 seconds. Nobody knows how.' },
    { user: 'Pops',          action: 'Mời cả team ăn táo. Benson từ chối vì "đang bận lo lắng".',   actionEn: 'Offered everyone apples. Benson declined because "busy worrying".' },
    { user: 'Mordecai',      action: 'Giả vờ suy nghĩ sâu sắc. Thực ra đang nghĩ về mì xào.',      actionEn: 'Pretending to think deeply. Actually thinking about noodles.' },
    { user: 'Rigby',         action: 'Tuyên bố task "về cơ bản đã xong". Chưa bắt đầu.',            actionEn: 'Declared his task "basically done". Hasn\'t started yet.' },
    { user: 'Benson',        action: 'Uống viên thuốc huyết áp lần 2. Đang nhìn chằm chằm vào Rigby.', actionEn: 'Took blood pressure pill #2. Staring directly at Rigby.' },
    { user: 'Skips',         action: 'Nâng cấp server bằng phép thuật cổ đại. Tăng tốc 40%.',       actionEn: 'Upgraded server with ancient magic. Everything 40% faster.' },
    { user: 'Muscle Man',    action: 'Tự đặt deadline cho mình. Tự gia hạn sau 5 phút.',             actionEn: 'Set his own deadline. Extended it 5 minutes later.' },
    { user: 'Hi Five Ghost', action: 'Tổ chức cuộc họp vô hình. Chỉ có ông ấy tham dự.',            actionEn: 'Held an invisible meeting. Only he attended.' },
    { user: 'Pops',          action: 'Hát một bài ca vui vẻ trong khi đồng hồ đếm ngược.',          actionEn: 'Sang a cheerful song while the deadline timer counted down.' },
    { user: 'Mordecai',      action: 'Cập nhật trạng thái task từ "Cần làm" thành "Đang làm". Tiến bộ!', actionEn: 'Updated task status from To Do to In Progress. Progress!' },
    { user: 'Rigby',         action: 'Ngủ gật 5 phút, tỉnh dậy tuyên bố "Tao đang suy nghĩ đó".',   actionEn: 'Napped for 5 mins, woke up claiming "I was thinking".' },
  ];

  // Periodic toast pool
  var TOAST_POOL = {
    vi: [
      { msg: '🔔 Benson nhắc: "Đừng để task quá hạn thêm nữa!"', type: 'warning' },
      { msg: '📋 Skips gợi ý: "Có task chưa được giao. Ông ấy đã thấy điều này rồi."', type: 'info' },
      { msg: '⚡ Mordecai nhắc: "Nhớ cập nhật tiến độ nhé!"', type: 'info' },
      { msg: '🎯 Pops hào hứng: "XUẤT SẮC! Hôm nay làm tốt lắm!"', type: 'success' },
      { msg: '😴 Rigby thì thầm: "Nghỉ giải lao chút không? 5 phút thôi..."', type: 'neutral' },
      { msg: '🚀 Skips: "Muốn tiến nhanh? Đóng YouTube đi là xong."', type: 'info' },
    ],
    en: [
      { msg: '🔔 Benson reminds: "Stop letting tasks go overdue!"', type: 'warning' },
      { msg: '📋 Skips suggests: "There\'s an unassigned task. He\'s seen this before."', type: 'info' },
      { msg: '⚡ Mordecai says: "Remember to update your progress!"', type: 'info' },
      { msg: '🎯 Pops cheers: "SPLENDID! Great work today!"', type: 'success' },
      { msg: '😴 Rigby whispers: "How about a 5-min break?"', type: 'neutral' },
      { msg: '🚀 Skips: "Want to go faster? Close YouTube. That\'s it."', type: 'info' },
    ]
  };

  /* ══════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════ */
  function _lang() { return localStorage.getItem('bk-lang') || 'vi'; }

  function getHourlyVibe() {
    var h = new Date().getHours();
    var vibes = HOURLY_VIBES[_lang()] || HOURLY_VIBES.vi;
    for (var i = 0; i < vibes.length; i++) {
      if (vibes[i].h.indexOf(h) !== -1) return vibes[i];
    }
    return vibes[0];
  }

  function getDailyJoke() {
    return _pickByDate(DAILY_JOKES[_lang()] || DAILY_JOKES.vi, 0);
  }

  function getTimeGreeting() {
    var h = new Date().getHours();
    var l = _lang();
    if (h < 6)  return l === 'en' ? 'Hey night owl 🦉' : 'Thức khuya à? 🦉';
    if (h < 12) return l === 'en' ? 'Morning, Boss! ☀️' : 'Chào buổi sáng! ☀️';
    if (h < 14) return l === 'en' ? 'Lunch break? 🍱' : 'Giờ nghỉ trưa? 🍱';
    if (h < 18) return l === 'en' ? 'Afternoon grind 💪' : 'Chiều rồi, cố lên! 💪';
    if (h < 22) return l === 'en' ? 'Evening session 🌙' : 'Làm tối à! 🌙';
    return l === 'en' ? 'Burning midnight oil 🕯️' : 'Thức đêm rồi bạn ơi 🕯️';
  }

  /* ══════════════════════════════════════════════
     TOAST SYSTEM
  ══════════════════════════════════════════════ */
  function showToast(msg, type, duration) {
    type = type || 'info';
    duration = duration || 4000;

    var container = document.getElementById('bk-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'bk-toast-container';
      container.style.cssText = [
        'position:fixed', 'bottom:24px', 'right:24px', 'z-index:99999',
        'display:flex', 'flex-direction:column', 'gap:8px',
        'max-width:340px', 'pointer-events:none'
      ].join(';');
      document.body.appendChild(container);
    }

    var colorMap = {
      info:    'background:#1e3a5f;border-left:4px solid #60a5fa;',
      warning: 'background:#78350f;border-left:4px solid #fbbf24;',
      success: 'background:#064e3b;border-left:4px solid #34d399;',
      danger:  'background:#7f1d1d;border-left:4px solid #f87171;',
      neutral: 'background:#1f2937;border-left:4px solid #9ca3af;',
    };

    var toast = document.createElement('div');
    toast.style.cssText = (colorMap[type] || colorMap.info) +
      'color:#f9fafb;padding:12px 16px;font-family:"Space Grotesk",sans-serif;' +
      'font-size:12px;font-weight:600;line-height:1.5;border-radius:2px;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.5);transform:translateX(120%);' +
      'transition:transform .3s cubic-bezier(.34,1.56,.64,1);pointer-events:auto;' +
      'cursor:pointer;white-space:pre-wrap;';
    toast.textContent = msg;
    toast.onclick = function () { toast.style.transform = 'translateX(120%)'; setTimeout(function(){ toast.remove(); }, 400); };

    container.appendChild(toast);
    requestAnimationFrame(function () { toast.style.transform = 'translateX(0)'; });
    setTimeout(function () {
      toast.style.transform = 'translateX(120%)';
      setTimeout(function () { toast.remove(); }, 400);
    }, duration);
  }

  /* ══════════════════════════════════════════════
     LIVE CLOCK
  ══════════════════════════════════════════════ */
  function startClock(elementId) {
    function tick() {
      var el = document.getElementById(elementId);
      if (!el) return;
      var now = new Date();
      var l = _lang();
      var locale = l === 'en' ? 'en-US' : 'vi-VN';
      var timeStr = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
      var dateStr = now.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: '2-digit' });
      el.textContent = dateStr + ' \u2022 ' + timeStr;
    }
    tick();
    setInterval(tick, 30000);
  }

  /* ══════════════════════════════════════════════
     INJECT REALTIME WIDGET (sidebar / dashboard)
  ══════════════════════════════════════════════ */
  function injectWidget() {
    // Clock in sidebar bottom area
    var sidebar = document.querySelector('aside');
    if (sidebar && !document.getElementById('bk-rt-clock')) {
      var clockDiv = document.createElement('div');
      clockDiv.innerHTML = '<div id="bk-rt-clock" style="font-family:\'Space Grotesk\',sans-serif;font-size:10px;font-weight:700;letter-spacing:.5px;opacity:.6;text-align:center;padding:4px 0;"></div>';
      // Insert before last child of sidebar
      var lastChild = sidebar.lastElementChild;
      if (lastChild) sidebar.insertBefore(clockDiv, lastChild);
      else sidebar.appendChild(clockDiv);
      startClock('bk-rt-clock');
    }

    // Vibe banner — inject below page heading if it exists and hasn't been added
    if (!document.getElementById('bk-rt-vibe-bar')) {
      var heading = document.querySelector('main h2, main h1, .page-heading');
      if (heading) {
        var vibe = getHourlyVibe();
        var bar = document.createElement('div');
        bar.id = 'bk-rt-vibe-bar';
        bar.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 12px;margin-bottom:12px;' +
          'background:rgba(183,0,77,.08);border-left:3px solid #b7004d;' +
          'font-family:"Space Grotesk",sans-serif;font-size:11px;font-weight:600;opacity:.85;';
        bar.innerHTML = '<span id="bk-rt-vibe-icon">' + vibe.icon + '</span>' +
                        '<span id="bk-rt-vibe-msg">' + vibe.msg + '</span>';
        var parent = heading.parentNode;
        var next = heading.nextSibling;
        if (next) parent.insertBefore(bar, next);
        else parent.appendChild(bar);
      }
    }

    // Daily joke — inject into dashboard vibe area or generic joke slot
    var jokeSlot = document.getElementById('bk-rt-joke');
    if (!jokeSlot) {
      // Look for dashboard "dash-vibe" card
      var vibeCard = document.querySelector('[data-widget="vibe"], .vibe-card, #dash-vibe');
      if (!vibeCard) {
        // Try creating underneath a KPI section
        var kpiSection = document.getElementById('kpi-rate');
        if (kpiSection) {
          var kpiParent = kpiSection.closest('section, .grid, div[class*="grid"]');
          if (kpiParent && kpiParent.parentNode && !document.getElementById('bk-rt-joke-bar')) {
            var jBar = document.createElement('div');
            jBar.id = 'bk-rt-joke-bar';
            jBar.style.cssText = 'padding:8px 16px;background:rgba(0,0,0,.04);border-bottom:1px solid rgba(0,0,0,.06);' +
              'font-family:"Space Grotesk",sans-serif;font-size:11px;font-style:italic;opacity:.75;';
            jBar.innerHTML = '<span id="bk-rt-joke">' + getDailyJoke() + '</span>';
            kpiParent.parentNode.insertBefore(jBar, kpiParent.nextSibling);
          }
        }
      }
    } else {
      jokeSlot.textContent = getDailyJoke();
    }
  }

  function updateVibeBar() {
    var vibe = getHourlyVibe();
    var iconEl = document.getElementById('bk-rt-vibe-icon');
    var msgEl  = document.getElementById('bk-rt-vibe-msg');
    if (iconEl) iconEl.textContent = vibe.icon;
    if (msgEl)  msgEl.textContent  = vibe.msg;
    // Also update joke text if lang changed
    var jokeEl = document.getElementById('bk-rt-joke');
    if (jokeEl) jokeEl.textContent = getDailyJoke();
  }

  /* ══════════════════════════════════════════════
     AUTO ACTIVITY LOG
  ══════════════════════════════════════════════ */
  var AUTO_LOG_INTERVAL = 8 * 60 * 1000; // 8 minutes
  var AUTO_LOG_KEY = 'bk-rt-lastlog';

  function _addLogToStore(entry) {
    if (!window.BKStore) return;
    var logs = BKStore.getLogs();
    var newEntry = {
      id: 'rtlog-' + Date.now(),
      ts: Date.now(),
      user: entry.user,
      action: entry.action,
      actionEn: entry.actionEn || entry.action
    };
    logs.unshift(newEntry);
    if (logs.length > 60) logs.length = 60;
    BKStore.saveLogs(logs);
  }

  function triggerAutoLog() {
    if (!window.BKStore) return;
    var last = parseInt(localStorage.getItem(AUTO_LOG_KEY) || '0', 10);
    var now = Date.now();
    if (now - last < AUTO_LOG_INTERVAL) return;

    // Pick entry based on current 8-minute epoch for variety
    var epoch = Math.floor(now / AUTO_LOG_INTERVAL);
    var entry = AUTO_LOG_POOL[epoch % AUTO_LOG_POOL.length];
    _addLogToStore(entry);
    localStorage.setItem(AUTO_LOG_KEY, now.toString());

    // Re-render relevant section
    if (typeof window.renderDashboard === 'function') { try { window.renderDashboard(); } catch(e){} }
    if (typeof window.renderReports   === 'function') { try { window.renderReports();   } catch(e){} }
  }

  /* ══════════════════════════════════════════════
     DEADLINE CHECKER
  ══════════════════════════════════════════════ */
  var _deadlineChecked = false;
  function checkDeadlines() {
    if (_deadlineChecked || !window.BKStore) return;
    _deadlineChecked = true;

    var tasks   = BKStore.getTasks();
    var l       = _lang();
    var today   = new Date(); today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    var dueTomorrow = tasks.filter(function(t) {
      if (!t.due || t.status === 'done') return false;
      var d = new Date(t.due).getTime();
      return d >= today.getTime() && d < tomorrow.getTime();
    });

    var overdue = tasks.filter(function(t) {
      if (!t.due || t.status === 'done') return false;
      return new Date(t.due).getTime() < today.getTime();
    });

    if (overdue.length > 0) {
      setTimeout(function() {
        showToast(
          l === 'en'
            ? '🚨 Benson Alert: ' + overdue.length + ' task(s) OVERDUE! Fix before he turns red!'
            : '🚨 Benson cảnh báo: ' + overdue.length + ' task QUÁ HẠN! Sửa trước khi ông ấy đỏ mặt!',
          'danger', 6000
        );
      }, 2500);
    }

    if (dueTomorrow.length > 0) {
      var deadline = dueTomorrow[0];
      var title = (l === 'en' && deadline.titleEn) ? deadline.titleEn : deadline.title;
      setTimeout(function() {
        showToast(
          l === 'en'
            ? '⏰ Due tomorrow: "' + title + '"' + (dueTomorrow.length > 1 ? ' +' + (dueTomorrow.length - 1) + ' more' : '')
            : '⏰ Hạn ngày mai: "' + title + '"' + (dueTomorrow.length > 1 ? ' +' + (dueTomorrow.length - 1) + ' task nữa' : ''),
          'warning', 6000
        );
      }, 4500);
    }
  }

  /* ══════════════════════════════════════════════
     PERIODIC TOAST (once per session, then every 25min)
  ══════════════════════════════════════════════ */
  var TOAST_INTERVAL = 25 * 60 * 1000;
  var TOAST_TS_KEY   = 'bk-rt-toast-ts';

  function schedulePeriodicToast() {
    var last = parseInt(sessionStorage.getItem(TOAST_TS_KEY) || '0', 10);
    var now  = Date.now();
    if (now - last < TOAST_INTERVAL) return;
    var pool = TOAST_POOL[_lang()] || TOAST_POOL.vi;
    var idx  = Math.floor(now / TOAST_INTERVAL) % pool.length;
    showToast(pool[idx].msg, pool[idx].type, 4500);
    sessionStorage.setItem(TOAST_TS_KEY, now.toString());
  }

  /* ══════════════════════════════════════════════
     PERSONALIZED NOTIFICATIONS (Supabase-aware)
  ══════════════════════════════════════════════ */
  function _getCurrentUserProfile() {
    try {
      var raw = localStorage.getItem('bk-current-user');
      return raw ? JSON.parse(raw) : null;
    } catch(_) { return null; }
  }

  function showPersonalizedNotifications() {
    var profile = _getCurrentUserProfile();
    var l = _lang();

    // If no Supabase profile, fall back to generic check
    if (!profile || typeof BKSupabase === 'undefined') {
      checkDeadlines();
      return;
    }

    // Delay to avoid flooding on load
    setTimeout(function() {
      if (profile.role === 'manager') {
        BKSupabase.getManagerNotifications(l).then(function(notifs) {
          notifs.slice(0, 3).forEach(function(n, i) {
            setTimeout(function() { showToast(n.msg, n.type, 7000); }, i * 2000);
          });
        }).catch(function() { checkDeadlines(); });
      } else {
        BKSupabase.getMemberNotifications(profile.name, l).then(function(notifs) {
          notifs.slice(0, 3).forEach(function(n, i) {
            setTimeout(function() { showToast(n.msg, n.type, 7000); }, i * 2000);
          });
        }).catch(function() { checkDeadlines(); });
      }
    }, 3000);
  }

  /* ══════════════════════════════════════════════
     PERMISSIONS — role-based access control
  ══════════════════════════════════════════════ */
  var BKPermissions = {
    isManager: function() {
      var p = _getCurrentUserProfile();
      return p ? p.role === 'manager' : false;
    },
    isMember: function() {
      var p = _getCurrentUserProfile();
      return p ? p.role === 'member' : true;
    },
    can: function(action) {
      var mgr = this.isManager();
      var rules = {
        'assign-task'   : mgr,
        'delete-task'   : mgr,
        'create-sprint' : mgr,
        'delete-sprint' : mgr,
        'manage-team'   : mgr,
        'reset-data'    : mgr,
        'view-all-tasks': mgr,
        'add-task'      : true,
        'update-own-task': true,
      };
      return (action in rules) ? rules[action] : mgr;
    },
    /* Ẩn element nếu user không có quyền */
    hideIfCannot: function(action, selector) {
      if (!this.can(action)) {
        var els = document.querySelectorAll(selector);
        els.forEach(function(el) { el.style.display = 'none'; });
      }
    },
    /* Disable element nếu user không có quyền */
    disableIfCannot: function(action, selector) {
      if (!this.can(action)) {
        var els = document.querySelectorAll(selector);
        els.forEach(function(el) {
          el.disabled = true;
          el.style.opacity = '0.4';
          el.style.cursor = 'not-allowed';
          el.title = 'Chỉ Manager mới có quyền này. Benson quyết định!';
        });
      }
    },
  };


  function injectUserBadge() {
    var profile = _getCurrentUserProfile();
    if (!profile) return;
    if (document.getElementById('bk-user-badge')) return;

    var sidebar = document.querySelector('aside');
    if (!sidebar) return;

    var badge = document.createElement('div');
    badge.id = 'bk-user-badge';
    badge.style.cssText = 'display:flex;align-items:center;gap:8px;padding:10px 16px;' +
      'background:rgba(183,0,77,.1);border-top:1px solid rgba(183,0,77,.2);' +
      'font-family:"Space Grotesk",sans-serif;font-size:11px;font-weight:700;' +
      'cursor:pointer;';
    badge.innerHTML =
      '<span style="font-size:18px">' + (profile.emoji || '👤') + '</span>' +
      '<div style="flex:1;min-width:0">' +
        '<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + profile.name + '</div>' +
        '<div style="font-size:9px;opacity:.6;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">' +
          (profile.role === 'manager' ? '👑 Manager' : '👤 Member') +
        '</div>' +
      '</div>';
    badge.title = 'Click để đăng xuất | ' + (profile.role === 'manager' ? '👑 Manager' : '👤 Member');
    badge.onclick = function() { window.doLogout(); };

    // Insert at bottom of sidebar
    sidebar.appendChild(badge);
  }


  /* ══════════════════════════════════════════════
     AUTO RERENDER — keeps data fresh
  ══════════════════════════════════════════════ */
  function autoRerender() {
    if      (typeof window.renderDashboard  === 'function') { try { window.renderDashboard();  } catch(e){} }
    else if (typeof window.renderAnalytics  === 'function') { try { window.renderAnalytics();  } catch(e){} }
    else if (typeof window.renderReports    === 'function') { try { window.renderReports();    } catch(e){} }
    else if (typeof window.renderSprints    === 'function') { try { window.renderSprints();    } catch(e){} }
    updateVibeBar();
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    // Inject UI widgets
    setTimeout(injectWidget,    300);
    setTimeout(injectUserBadge, 400);

    // Welcome toast: personalized greeting
    setTimeout(function() {
      var profile = _getCurrentUserProfile();
      var name = profile ? (profile.emoji + ' ' + profile.name) : 'Boss';
      showToast(getTimeGreeting() + ' ' + name + '!\n' + getDailyJoke(), 'info', 5500);
    }, 1500);

    // Personalized notifications (role-based)
    showPersonalizedNotifications();

    // Auto log — check on load + every 60s
    triggerAutoLog();
    setInterval(triggerAutoLog, 60 * 1000);

    // Periodic toast — check every 5 min
    schedulePeriodicToast();
    setInterval(schedulePeriodicToast, 5 * 60 * 1000);

    // Vibe bar refresh every 5 min
    setInterval(updateVibeBar, 5 * 60 * 1000);

    // Full rerender every 2 min (keep stats fresh)
    setInterval(autoRerender, 2 * 60 * 1000);

    // Re-check personalized notifs every 30 min
    setInterval(showPersonalizedNotifications, 30 * 60 * 1000);

    console.info('[BKRealtime] Engine started. Skips approves. 🔧');
  }

  /* ══════════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════════ */
  return {
    init                          : init,
    showToast                     : showToast,
    getDailyJoke                  : getDailyJoke,
    getTimeGreeting               : getTimeGreeting,
    getHourlyVibe                 : getHourlyVibe,
    checkDeadlines                : checkDeadlines,
    updateVibeBar                 : updateVibeBar,
    showPersonalizedNotifications : showPersonalizedNotifications,
    permissions                   : BKPermissions,
  };
})();
