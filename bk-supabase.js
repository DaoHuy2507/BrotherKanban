/**
 * BrotherKanban — Supabase Client Module
 * "Skips setup database này từ khi Internet còn là ý tưởng." — Benson
 *
 * REQUIRES: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 */
const BKSupabase = (() => {
  const SUPABASE_URL = 'https://idzzeqovnbfpangzjbpt.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkenplcW92bmJmcGFuZ3pqYnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzI0MzAsImV4cCI6MjA5MjAwODQzMH0.OarvUNhE5tcXzSWXsydEWXNrfXkMfRFq3szD4EFvDw0';

  let _client = null;

  function _sb() {
    if (!_client) {
      if (typeof window === 'undefined' || !window.supabase) {
        throw new Error('[BKSupabase] Supabase JS chưa load. Thêm CDN script vào <head>.');
      }
      _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          autoRefreshToken : true,
          persistSession   : true,
          detectSessionInUrl: true,
          storageKey       : 'bk-auth-session',
        }
      });
    }
    return _client;
  }

  /* ══════════════════════════════════════════════
     AUTH
  ══════════════════════════════════════════════ */
  async function signInWithGoogle(redirectTo) {
    if (!redirectTo) {
      // Tính tự động: lấy root của project bằng cách bỏ 2 path segment cuối
      // VD: /brotherkanban_ng_nh_p.../code.html → /auth-callback.html
      const parts = window.location.pathname.split('/'); // ['','folder','code.html']
      const rootParts = parts.slice(0, -2);              // ['',''] hoặc ['']
      const rootPath  = (rootParts.join('/') || '') + '/auth-callback.html';
      redirectTo = window.location.origin + rootPath;
    }
    console.log('[BKSupabase] Google OAuth redirectTo:', redirectTo);
    const { data, error } = await _sb().auth.signInWithOAuth({
      provider: 'google',
      options : { redirectTo }
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    localStorage.removeItem('bk-current-user');
    const { error } = await _sb().auth.signOut();
    if (error) throw error;
  }

  async function signInWithPassword(username, password) {
    const email = username.includes('@') ? username : username.toLowerCase() + '@brotherkanban.app';
    const { data, error } = await _sb().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signUp(email, password, displayName, emoji) {
    emoji = emoji || '\ud83d\udc64';
    const { data, error } = await _sb().auth.signUp({
      email,
      password,
      options: {
        data: { full_name: displayName, display_name: displayName },
      }
    });
    if (error) throw error;

    // N\u1ebfu Supabase b\u1eaft x\u00e1c nh\u1eadn email: data.user t\u1ed3n t\u1ea1i nh\u01b0ng
    // data.session === null (ch\u01b0a active). T\u1ea1o profile n\u1ebfu c\u00f3 session ngay.
    if (data.session && data.user) {
      // Email confirmation bị tắt → đăng nhập thành công liền
      try {
        await _sb().from('profiles').upsert({
          id      : data.user.id,  // ← auth UUID (UUID primary key)
          name    : displayName,
          role    : 'member',
          emoji   : emoji,
          auth_uid: data.user.id,
        }, { onConflict: 'id' });
      } catch(e) { console.warn('[BKSupabase] Profile create error:', e.message); }
      localStorage.setItem('bk-current-user', JSON.stringify({
        id: data.user.id, name: displayName, role: 'member', emoji
      }));
    }
    // data.user t\u1ed3n t\u1ea1i nh\u01b0ng data.session === null \u2192 c\u1ea7n x\u00e1c nh\u1eadn email
    return {
      user         : data.user,
      session      : data.session,
      needsConfirm : !data.session && !!data.user,
    };
  }

  async function getSession() {
    const { data } = await _sb().auth.getSession();
    return data?.session || null;
  }

  async function getCurrentUser() {
    const session = await getSession();
    return session?.user || null;
  }

  function onAuthStateChange(callback) {
    return _sb().auth.onAuthStateChange(callback);
  }

  /* ══════════════════════════════════════════════
     PROFILE
  ══════════════════════════════════════════════ */
  async function getProfile(userId) {
    // userId có thể là: auth UUID (cho Google user) hoặc profile id (cho legacy)
    // Thử tìm theo auth_uid trước
    const { data: byUid } = await _sb()
      .from('profiles')
      .select('*')
      .eq('auth_uid', userId)
      .maybeSingle();
    if (byUid) return byUid;

    // Fallback: tìm theo profile id (cho tài khoản cũ @brotherkanban.app)
    const { data, error } = await _sb()
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) throw error;
    return data; // null nếu chưa có profile
  }

  async function upsertProfile(profileData) {
    const { data, error } = await _sb()
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    // Chỉ cache nếu đây là profile của current user
    const cur = JSON.parse(localStorage.getItem('bk-current-user') || 'null');
    if (cur && cur.id === data.id) {
      localStorage.setItem('bk-current-user', JSON.stringify(data));
    }
    return data;
  }

  /* Thêm/cập nhật thành viên Team → bảng "crew" (không ràng buộc auth FK) */
  async function upsertMember(member) {
    const authRole  = (member.role === 'manager') ? 'manager' : 'member';
    const memberId  = (member.id && member.id.length > 20)
      ? member.id
      : (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(36) + Math.random().toString(36).slice(2));
    const row = {
      id   : memberId,
      name : member.name,
      role : authRole,
      emoji: member.emoji || '👤',
    };
    const { data, error } = await _sb()
      .from('crew')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /* Lấy tất cả thành viên từ bảng crew */
  async function getAllCrew() {
    const { data, error } = await _sb()
      .from('crew')
      .select('*')
      .order('name');
    if (error) throw error;
    return data || [];
  }

  async function getAllProfiles() {
    const { data, error } = await _sb()
      .from('profiles')
      .select('*')
      .order('name');
    if (error) throw error;
    return data || [];
  }

  async function getCurrentProfile() {
    // Thử cache localStorage trước
    const cached = localStorage.getItem('bk-current-user');
    if (cached) { try { return JSON.parse(cached); } catch(_) {} }
    // Fallback: lấy từ Supabase
    const user = await getCurrentUser();
    if (!user) return null;
    const profile = await getProfile(user.id);
    if (profile) localStorage.setItem('bk-current-user', JSON.stringify(profile));
    return profile;
  }

  /* ══════════════════════════════════════════════
     TASKS
     (RLS tự động filter theo role — member chỉ thấy task của mình)
  ══════════════════════════════════════════════ */
  async function getTasks() {
    const { data, error } = await _sb()
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return _mapTasksFromDB(data || []);
  }

  async function addTask(task) {
    const user = await getCurrentUser();
    const row = _mapTaskToDB(task, user?.id);
    const { data, error } = await _sb()
      .from('tasks')
      .insert(row)
      .select()
      .single();
    if (error) throw error;
    await addLog({
      user: task.assignee || (await getCurrentProfile())?.name || 'System',
      action: `Tạo task mới: "${task.title}"`,
      actionEn: `Created new task: "${task.titleEn || task.title}"`,
      taskId: data.id
    });
    return _mapTaskFromDB(data);
  }

  async function updateTask(id, updates) {
    const { data, error } = await _sb()
      .from('tasks')
      .update(_mapTaskToDB(updates))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return _mapTaskFromDB(data);
  }

  async function deleteTask(id) {
    const { error } = await _sb()
      .from('tasks')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // Map từ app format → DB format
  function _mapTaskToDB(task, createdBy) {
    const row = {};
    if (task.title       !== undefined) row.title        = task.title;
    if (task.titleEn     !== undefined) row.title_en     = task.titleEn;
    if (task.description !== undefined) row.description  = task.description;
    if (task.priority    !== undefined) row.priority      = task.priority;
    if (task.status      !== undefined) row.status        = task.status;
    if (task.assignee    !== undefined) row.assignee      = task.assignee;
    if (task.due         !== undefined) row.due           = task.due;
    if (task.progress    !== undefined) row.progress      = task.progress || 0;
    if (task.sprintId    !== undefined) row.sprint_id     = task.sprintId;
    if (createdBy)                      row.created_by    = createdBy;
    return row;
  }

  function _mapTaskFromDB(row) {
    return {
      id         : row.id,
      title      : row.title,
      titleEn    : row.title_en,
      description: row.description,
      priority   : row.priority,
      status     : row.status,
      assignee   : row.assignee,
      due        : row.due,
      progress   : row.progress || 0,
      sprintId   : row.sprint_id,
      createdAt  : new Date(row.created_at).getTime(),
      updatedAt  : new Date(row.updated_at || row.created_at).getTime(),
    };
  }

  function _mapTasksFromDB(rows) { return rows.map(_mapTaskFromDB); }

  /* ══════════════════════════════════════════════
     ACTIVITY LOGS
  ══════════════════════════════════════════════ */
  async function getLogs(limit) {
    const { data, error } = await _sb()
      .from('activity_logs')
      .select('*')
      .order('ts', { ascending: false })
      .limit(limit || 20);
    if (error) throw error;
    return (data || []).map(l => ({
      id      : l.id,
      user    : l.user_name,
      action  : l.action,
      actionEn: l.action_en || l.action,
      taskId  : l.task_id,
      ts      : new Date(l.ts).getTime(),
    }));
  }

  async function addLog(logData) {
    const user = await getCurrentUser();
    const { error } = await _sb()
      .from('activity_logs')
      .insert({
        user_id  : user?.id || null,
        user_name: logData.user,
        action   : logData.action,
        action_en: logData.actionEn || logData.action,
        task_id  : logData.taskId || null,
        ts       : new Date().toISOString(),
      });
    if (error) console.warn('[BKSupabase] addLog error:', error.message);
  }

  /* ══════════════════════════════════════════════
     SPRINTS
  ══════════════════════════════════════════════ */
  async function getSprints() {
    const { data, error } = await _sb()
      .from('sprints')
      .select('*, sprint_tasks(task_id)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(s => ({
      id        : s.id,
      name      : s.name,
      goal      : s.goal,
      startDate : s.start_date,
      endDate   : s.end_date,
      taskIds   : (s.sprint_tasks || []).map(st => st.task_id),
      createdAt : new Date(s.created_at).getTime(),
    }));
  }

  async function addSprint(sprint) {
    const user = await getCurrentUser();
    const { taskIds, ...rest } = sprint;
    const { data, error } = await _sb()
      .from('sprints')
      .insert({
        name       : rest.name,
        goal       : rest.goal,
        start_date : rest.startDate,
        end_date   : rest.endDate,
        created_by : user?.id || null,
      })
      .select()
      .single();
    if (error) throw error;

    if (taskIds && taskIds.length > 0) {
      await _sb().from('sprint_tasks').insert(
        taskIds.map(tid => ({ sprint_id: data.id, task_id: tid }))
      );
    }
    return data;
  }

  async function deleteSprint(id) {
    const { error } = await _sb()
      .from('sprints')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  /* ══════════════════════════════════════════════
     REALTIME SUBSCRIPTIONS
  ══════════════════════════════════════════════ */
  function subscribeToTasks(callback) {
    return _sb()
      .channel('bk-tasks-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
        callback(payload);
      })
      .subscribe();
  }

  function subscribeToLogs(callback) {
    return _sb()
      .channel('bk-logs-rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs' }, payload => {
        callback(payload);
      })
      .subscribe();
  }

  /* ══════════════════════════════════════════════
     PERSONALIZED NOTIFICATIONS
  ══════════════════════════════════════════════ */
  async function getManagerNotifications(lang) {
    lang = lang || localStorage.getItem('bk-lang') || 'vi';
    const notifications = [];
    try {
      const tasks    = await getTasks();
      const profiles = await getAllProfiles();
      const today    = new Date(); today.setHours(0,0,0,0);

      // 1. Thành viên nào có task quá hạn?
      const overdueByMember = {};
      tasks.filter(t => t.due && t.status !== 'done' && new Date(t.due) < today)
            .forEach(t => {
              overdueByMember[t.assignee] = (overdueByMember[t.assignee] || 0) + 1;
            });

      Object.entries(overdueByMember).forEach(([name, count]) => {
        notifications.push({
          type: 'danger',
          msg: lang === 'en'
            ? `🚨 ${name} has ${count} overdue task(s)! Send them a memo!`
            : `🚨 ${name} có ${count} task quá hạn! Đến nhắc nhở ngay!`,
        });
      });

      // 2. Thành viên nào chưa làm gì?
      const membersWithNoTasks = profiles
        .filter(p => p.role === 'member')
        .filter(p => !tasks.some(t => t.assignee === p.name && (t.status === 'doing' || t.status === 'done')));

      membersWithNoTasks.forEach(p => {
        notifications.push({
          type: 'warning',
          msg: lang === 'en'
            ? `😴 ${p.emoji} ${p.name} has no active tasks! Assign them something!`
            : `😴 ${p.emoji} ${p.name} không có task đang làm! Giao việc ngay!`,
        });
      });

      // 3. Sprint sắp kết thúc
      const sprints = await getSprints();
      sprints.filter(s => {
        const end = new Date(s.endDate);
        const diff = Math.ceil((end-today) / 86400000);
        return diff >= 0 && diff <= 2;
      }).forEach(s => {
        const done  = tasks.filter(t => s.taskIds.includes(t.id) && t.status === 'done').length;
        const total = s.taskIds.length;
        notifications.push({
          type: 'warning',
          msg: lang === 'en'
            ? `⏰ Sprint "${s.name}" ends soon! ${done}/${total} tasks done.`
            : `⏰ Sprint "${s.name}" sắp kết thúc! ${done}/${total} task hoàn thành.`,
        });
      });

    } catch(e) { console.warn('[BKSupabase] Manager notif error:', e); }
    return notifications;
  }

  async function getMemberNotifications(profileName, lang) {
    lang = lang || localStorage.getItem('bk-lang') || 'vi';
    const notifications = [];
    try {
      const tasks = await getTasks();
      const today = new Date(); today.setHours(0,0,0,0);
      const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
      const myTasks = tasks.filter(t => t.assignee === profileName && t.status !== 'done');

      // 1. Task quá hạn của tôi
      const myOverdue = myTasks.filter(t => t.due && new Date(t.due) < today);
      if (myOverdue.length > 0) {
        notifications.push({
          type: 'danger',
          msg: lang === 'en'
            ? `🚨 You have ${myOverdue.length} OVERDUE task(s)! Fix before Benson finds out!`
            : `🚨 Bạn có ${myOverdue.length} task QUÁ HẠN! Làm trước khi Benson phát hiện!`,
        });
      }

      // 2. Task hạn ngày mai
      const dueTomorrow = myTasks.filter(t => {
        if (!t.due) return false;
        const d = new Date(t.due).getTime();
        return d >= today.getTime() && d < tomorrow.getTime();
      });
      dueTomorrow.forEach(t => {
        notifications.push({
          type: 'warning',
          msg: lang === 'en'
            ? `⏰ "${t.title}" is due TOMORROW! No more YouTube breaks.`
            : `⏰ "${t.title}" hạn nộp NGÀY MAI! Đừng xem YouTube nữa.`,
        });
      });

      // 3. Task high priority chưa làm
      const highPrio = myTasks.filter(t => t.priority === 'high' && t.status === 'todo');
      if (highPrio.length > 0) {
        notifications.push({
          type: 'info',
          msg: lang === 'en'
            ? `🔴 ${highPrio.length} high-priority task(s) still not started! Benson is watching.`
            : `🔴 ${highPrio.length} task ưu tiên cao chưa bắt đầu! Benson đang theo dõi.`,
        });
      }

    } catch(e) { console.warn('[BKSupabase] Member notif error:', e); }
    return notifications;
  }

  /* ══════════════════════════════════════════════
     SYNC HELPER — đẩy data localStorage lên Supabase (migration)
  ══════════════════════════════════════════════ */
  async function pushLocalToSupabase() {
    if (!window.BKStore) { console.warn('[BKSupabase] BKStore not found'); return; }
    const user    = await getCurrentUser();
    if (!user) { console.warn('[BKSupabase] Not logged in'); return; }

    const localTasks = BKStore.getTasks();
    const localLogs  = BKStore.getLogs();

    let pushed = 0;
    for (const task of localTasks) {
      try {
        const row = _mapTaskToDB(task, user.id);
        await _sb().from('tasks').upsert({ ...row, id: task.id }, { onConflict: 'id' });
        pushed++;
      } catch(e) { console.warn('Task push error:', task.id, e.message); }
    }

    for (const log of localLogs.slice(0, 50)) {
      try {
        await _sb().from('activity_logs').upsert({
          id       : log.id,
          user_id  : user.id,
          user_name: log.user,
          action   : log.action,
          action_en: log.actionEn || log.action,
          ts       : new Date(log.ts).toISOString(),
        }, { onConflict: 'id' });
      } catch(e) {}
    }

    console.info(`[BKSupabase] Pushed ${pushed}/${localTasks.length} tasks to Supabase ✅`);
    return pushed;
  }

  /* ══════════════════════════════════════════════
     PULL — kéo Supabase data về localStorage
  ══════════════════════════════════════════════ */
  async function pullToLocal() {
    if (!window.BKStore) return;
    try {
      const [tasks, logs, sprints, crewRows, profiles] = await Promise.all([
        getTasks(), getLogs(50), getSprints(),
        getAllCrew().catch(() => []),
        getAllProfiles().catch(() => [])
      ]);
      BKStore.saveTasks(tasks);
      BKStore.saveLogs(logs);
      BKStore.saveSprints(sprints);

      const existing = BKStore.getMembers ? BKStore.getMembers() : [];

      function toMember(p) {
        const ex = existing.find(m => m.name === p.name || m.id === p.id) || {};
        return {
          id         : p.id,
          name       : p.name || 'Unknown',
          role       : p.role || 'member',
          emoji      : p.emoji || '\ud83d\udc64',
          bio        : ex.bio         || '',
          color      : ex.color       || '#b7004d',
          capacity   : ex.capacity    || 5,
          reliability: ex.reliability || 70,
          speed      : ex.speed       || 60,
          skills     : ex.skills      || [],
        };
      }

      const fromCrew  = (crewRows  || []).map(toMember);
      const crewNames = new Set(fromCrew.map(m => m.name));
      const fromAuth  = (profiles  || []).filter(p => !crewNames.has(p.name)).map(toMember);
      const allNames  = new Set([...crewNames, ...fromAuth.map(m => m.name)]);
      const localOnly = existing.filter(m => !allNames.has(m.name));

      const merged = [...fromCrew, ...fromAuth, ...localOnly];
      if (merged.length > 0 && BKStore.saveMembers) BKStore.saveMembers(merged);

      console.info('[BKSupabase] Pulled \u2713', (tasks||[]).length, 'tasks,',
        merged.length, 'members (crew:', (crewRows||[]).length,
        '| auth:', (profiles||[]).length, '| local-only:', localOnly.length, ')');
      return { tasks, logs, sprints, profiles };
    } catch(e) {
      console.warn('[BKSupabase] Pull failed (offline?):', e.message);
      return null;
    }
  }


  /* ══════════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════════ */
  return {
    // Raw client (for advanced usage)
    client: _sb,
    // Auth
    signInWithGoogle, signInWithPassword, signUp, signOut, getSession, getCurrentUser, onAuthStateChange,
    // Profile
    getProfile, upsertProfile, upsertMember, getAllProfiles, getAllCrew, getCurrentProfile,
    // Tasks
    getTasks, addTask, updateTask, deleteTask,
    // Logs
    getLogs, addLog,
    // Sprints
    getSprints, addSprint, deleteSprint,
    // Realtime
    subscribeToTasks, subscribeToLogs,
    // Notifications
    getManagerNotifications, getMemberNotifications,
    // Sync
    pushLocalToSupabase, pullToLocal,
  };
})();
