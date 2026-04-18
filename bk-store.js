/**
 * BK-STORE.JS — Shared Data Layer for BrotherKanban
 * ===================================================
 * localStorage-based state management.
 * Benson yêu cầu: tất cả data phải nhất quán. KHÔNG ĐƯỢC BỊ MẤT.
 */

/* ===== DEFAULT DATA ===== */
const BK_DEFAULT_TASKS = [
  { id: 't1', title: 'Dọn sạch đài phun nước',     titleEn: 'Clean the Fountain',
    desc:   'Benson nói nó kinh lắm. Fix trước khi hắn đỏ mặt lên!',
    descEn: "Benson says it's disgusting. Fix it before he turns red!",
    priority: 'high',   status: 'todo',  progress: 0,   assignee: 'Mordecai', createdAt: Date.now() - 86400000*2, dueDate: Date.now() + 86400000*1 },
  { id: 't2', title: 'Ngăn Muscle Man khoe mẹ',    titleEn: 'Stop Muscle Man From Bragging',
    desc:   'Nhiệm vụ bất khả thi nhưng mọi thế hệ đều phải thử.',
    descEn: 'An impossible mission, but every generation has to try.',
    priority: 'medium', status: 'todo',  progress: 0,   assignee: 'Rigby',    createdAt: Date.now() - 86400000*1, dueDate: Date.now() + 86400000*3 },
  { id: 't3', title: 'Ngủ thêm 5 phút nữa',         titleEn: 'Sleep 5 More Minutes',
    desc:   'Kỹ năng cốt lõi. Mordecai & Rigby đã master từ năm 14 tuổi.',
    descEn: 'Core skill. Mordecai & Rigby mastered this at age 14.',
    priority: 'low',    status: 'todo',  progress: 0,   assignee: 'Rigby',    createdAt: Date.now() - 86400000*1, dueDate: Date.now() + 86400000*7 },
  { id: 't4', title: 'Chạy nước rút timeline',      titleEn: 'Sprint the Timeline',
    desc:   'OOOOHH! Benson sắp nổ tung. Deadline là chiều nay friendo!',
    descEn: 'OOOOHH! Benson is about to explode. Deadline is TODAY friendo!',
    priority: 'high',   status: 'doing', progress: 60,  assignee: 'Mordecai', createdAt: Date.now() - 86400000*3, dueDate: Date.now() },
  { id: 't5', title: 'Mua đồ ăn cho cả crew',       titleEn: 'Buy Food for the Whole Crew',
    desc:   'The Ultimeatum Run\u2122. Đừng quên khăn giấy \u2014 Rigby đang đói!',
    descEn: "The Ultimeatum Run\u2122. Don't forget the napkins \u2014 Rigby is STARVING!",
    priority: 'medium', status: 'doing', progress: 80,  assignee: 'Benson',   createdAt: Date.now() - 86400000*2, dueDate: Date.now() + 86400000*1 },
  { id: 't6', title: 'Cứu thế giới khỏi bóng tối', titleEn: 'Save the World from Darkness',
    desc:   'Skips đã xử lý rồi. Như mọi khi. Không ai biết ông làm thế nào.',
    descEn: 'Skips handled it. As always. Nobody knows how.',
    priority: 'high',   status: 'done',  progress: 100, assignee: 'Skips',    createdAt: Date.now() - 86400000*5, dueDate: Date.now() - 86400000*1 },
  { id: 't7', title: 'Cắt cỏ toàn bộ khuôn viên', titleEn: 'Mow the Entire Grounds',
    desc:   'Xong rồi! Mordecai làm thiệt đó. Benson gật đầu một lần duy nhất.',
    descEn: 'Done! Mordecai actually did it. Benson nodded once. Once.',
    priority: 'medium', status: 'done',  progress: 100, assignee: 'Mordecai', createdAt: Date.now() - 86400000*4, dueDate: Date.now() - 86400000*2 },
];

const BK_DEFAULT_MEMBERS = [
  {
    id: 'm1', name: 'Mordecai', role: 'Raccoon Chính Hiệu', color: '#b7004d', emoji: '🐦',
    joinedAt: Date.now() - 86400000*30,
    bio: 'Lãng mạn, hay do dự nhưng làm được việc khi bị Benson ép.',
    skills: ['Lập Kế Hoạch', 'Nhạc', 'Chơi Game'],
    capacity: 5,
    weeklyCapacity: 10,
    reliability: 75,
    speed: 60,
  },
  {
    id: 'm2', name: 'Rigby', role: 'Chuyên Gia Nạp Energy', color: '#006760', emoji: '🦝',
    joinedAt: Date.now() - 86400000*30,
    bio: 'Ham chơi, hèn nhưng đôi khi có thể gây bất ngờ. Đôi khi thôi.',
    skills: ['Ăn Uống', 'Gaming', 'Trốn Việc'],
    capacity: 2,
    weeklyCapacity: 4,
    reliability: 30,
    speed: 25,
  },
  {
    id: 'm3', name: 'Benson', role: 'Quản Lý Cuồng Nộ\u2122', color: '#7b5400', emoji: '🍬',
    joinedAt: Date.now() - 86400000*365,
    bio: 'Quản lý, kẹo cao su, mặt đỏ. Hiệu suất cao nhưng hay hét.',
    skills: ['Quản Lý', 'Kế Toán', 'Hét To'],
    capacity: 8,
    weeklyCapacity: 20,
    reliability: 95,
    speed: 80,
  },
  {
    id: 'm4', name: 'Skips', role: 'Giải Quyết Mọi Thứ', color: '#2d2f2c', emoji: '🦍',
    joinedAt: Date.now() - 86400000*3650,
    bio: 'Bất tử, biết mọi thứ, fix mọi thứ. Không cần giải thích.',
    skills: ['Mọi Thứ', 'Huyền Bí Học', 'Cơ Khí', 'Lập Trình', 'Y Tế'],
    capacity: 15,
    weeklyCapacity: 50,
    reliability: 100,
    speed: 100,
  },
  {
    id: 'm5', name: 'Pops', role: 'Người Hỗ Trợ Tinh Thần', color: '#ff7294', emoji: '🎩',
    joinedAt: Date.now() - 86400000*365*5,
    bio: 'Jolly good! Tinh thần đội tốt, tâm hồn non nớt, nhưng mọi người đều yêu ông.',
    skills: ['Ngoại Giao', 'Khuyến Khích', 'Tiệc Tùng'],
    capacity: 3,
    weeklyCapacity: 6,
    reliability: 80,
    speed: 40,
  },
  {
    id: 'm6', name: 'Muscle Man', role: 'Chuyên Gia Khoe Mẹ', color: '#22c55e', emoji: '💪',
    joinedAt: Date.now() - 86400000*60,
    bio: 'MY MOM! Mạnh mẽ, ồn ào, nhưng làm việc chân tay tốt.',
    skills: ['Việc Tay Chân', 'Sức Mạnh', 'Khoe Khoang'],
    capacity: 6,
    weeklyCapacity: 15,
    reliability: 65,
    speed: 70,
  },
];

const BK_DEFAULT_LOGS = [
  { id: 'l1', ts: Date.now() - 3600000*1,  user: 'Mordecai',
    action:   'Đã chuyển "Chạy nước rút timeline" sang ⚡ Đang Làm',
    actionEn: 'Moved "Sprint the Timeline" to ⚡ In Progress', taskId: 't4' },
  { id: 'l2', ts: Date.now() - 3600000*2,  user: 'Skips',
    action:   'Hoàn thành "Cứu thế giới khỏi bóng tối" \u2014 như thường lệ.',
    actionEn: 'Completed "Save the World from Darkness" \u2014 as usual.', taskId: 't6' },
  { id: 'l3', ts: Date.now() - 3600000*3,  user: 'Rigby',
    action:   'Cập nhật tiến độ "Mua đồ ăn cho cả crew" lên 80%',
    actionEn: 'Updated progress on "Buy Food for the Whole Crew" to 80%', taskId: 't5' },
  { id: 'l4', ts: Date.now() - 3600000*5,  user: 'Benson',
    action:   'GỌI HỌP KHẨN. Lại nữa. Rigby trễ 3 tiếng.',
    actionEn: 'CALLED EMERGENCY MEETING. Again. Rigby was 3 hours late.', taskId: null },
  { id: 'l5', ts: Date.now() - 3600000*8,  user: 'Mordecai',
    action:   'Hoàn thành "Cắt cỏ toàn bộ khuôn viên". Benson gật đầu!',
    actionEn: 'Completed "Mow the Entire Grounds". Benson... nodded!', taskId: 't7' },
  { id: 'l6', ts: Date.now() - 3600000*12, user: 'Pops',
    action:   '"Jolly good show!" \u2014 Pops mọi buổi sáng, mọi ngày.',
    actionEn: '"Jolly good show!" \u2014 Pops every morning, every day.', taskId: null },
  { id: 'l7', ts: Date.now() - 86400000*1, user: 'Muscle Man',
    action:   'Bạn biết ai cũng tạo task không? MẸ TAO! OHHH!',
    actionEn: 'You know who else creates tasks? MY MOM! OHHH!', taskId: null },
];

const BK_DEFAULT_SPRINTS = [
  {
    id: 'sp1',
    name:   'Sprint: Cứu Lấy Công Viên 🏞️', nameEn: 'Sprint: Save The Park 🏞️',
    startDate: new Date(Date.now() - 86400000*7).toISOString().split('T')[0],
    endDate:   new Date(Date.now() + 86400000*7).toISOString().split('T')[0],
    taskIds: ['t1','t2','t4','t5'],
    goal:   'Dọn dẹp toàn bộ sự cố trước khi Benson sa thải mọi người \u2014 lần nữa.',
    goalEn: 'Clean up all incidents before Benson fires everyone \u2014 again.'
  },
  {
    id: 'sp2',
    name:   'Sprint: Nhiệm Vụ Đã Xong ✅', nameEn: 'Sprint: Mission Accomplished ✅',
    startDate: new Date(Date.now() - 86400000*14).toISOString().split('T')[0],
    endDate:   new Date(Date.now() - 86400000*1).toISOString().split('T')[0],
    taskIds: ['t6','t7'],
    goal:   'Skips xử lý tất cả. Như thường lệ.',
    goalEn: 'Skips handled everything. As usual.'
  }
];

const BK_DEFAULT_USER = {
  displayName: 'Mordecai',
  email: 'mordecai@thepark.local',
  avatarColor: '#b7004d',
  avatarEmoji: '🐦',
  bio: '',
  joinedAt: new Date().toISOString()
};

/* ===== STORE API ===== */
const BKStore = {
  /* ---- INIT ---- */
  init() {
    const needSeed = (key) => {
      const v = localStorage.getItem(key);
      if (!v) return true;
      try { const p = JSON.parse(v); return Array.isArray(p) && p.length === 0; } catch { return true; }
    };
    if (needSeed('bk-tasks'))   this.set('bk-tasks',   BK_DEFAULT_TASKS);
    if (needSeed('bk-members')) this.set('bk-members', BK_DEFAULT_MEMBERS);
    if (needSeed('bk-logs'))    this.set('bk-logs',    BK_DEFAULT_LOGS);
    if (needSeed('bk-sprints')) this.set('bk-sprints', BK_DEFAULT_SPRINTS);
    if (!localStorage.getItem('bk-user')) this.set('bk-user', BK_DEFAULT_USER);
  },

  /* ---- GENERIC ---- */
  get(key)          { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } },
  set(key, val)     { localStorage.setItem(key, JSON.stringify(val)); },

  /* ---- TASKS ---- */
  getTasks()        { return this.get('bk-tasks'); },
  saveTasks(tasks)  { this.set('bk-tasks', tasks); },

  addTask(task) {
    const tasks = this.getTasks();
    task.id = 't' + Date.now();
    task.createdAt = Date.now();
    task.progress = task.progress || 0;
    tasks.push(task);
    this.saveTasks(tasks);
    this.addLog('You', `Đã thêm task mới: "${task.title}"`, task.id);
    return task;
  },

  updateTask(id, updates) {
    const tasks = this.getTasks().map(t => t.id === id ? { ...t, ...updates } : t);
    this.saveTasks(tasks);
  },

  deleteTask(id) {
    const task = this.getTasks().find(t => t.id === id);
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
    if (task) this.addLog('You', `Đã xóa task: "${task.title}"`, null);
  },

  moveTask(id, newStatus) {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.status = newStatus;
    if (newStatus === 'done') task.progress = 100;
    if (newStatus === 'doing' && task.progress === 0) task.progress = 10;
    this.saveTasks(tasks);
    const statusLabel = { todo: '📋 Cần Làm', doing: '⚡ Đang Làm', done: '✅ Hoàn Thành' };
    this.addLog('You', `Chuyển "${task.title}" sang ${statusLabel[newStatus]}`, id);
  },

  updateProgress(id, pct) {
    this.updateTask(id, { progress: pct });
  },

  assignTask(taskId, memberName) {
    const task = this.getTasks().find(t => t.id === taskId);
    if (!task) return;
    const oldAssignee = task.assignee;
    this.updateTask(taskId, { assignee: memberName });
    const msg = oldAssignee && oldAssignee !== memberName
      ? `Chuyển "${task.title}" từ ${oldAssignee} → ${memberName}`
      : `Giao "${task.title}" cho ${memberName}`;
    this.addLog('You', msg, taskId);
  },

  /* ---- STATS (computed from tasks) ---- */
  getStats() {
    const tasks = this.getTasks();
    const total       = tasks.length;
    const done        = tasks.filter(t => t.status === 'done').length;
    const doing       = tasks.filter(t => t.status === 'doing').length;
    const todo        = tasks.filter(t => t.status === 'todo').length;
    const overdue     = tasks.filter(t => t.dueDate && t.dueDate < Date.now() && t.status !== 'done').length;
    const completion  = total > 0 ? Math.round(done / total * 100) : 0;
    return { total, done, doing, todo, overdue, completion };
  },

  getTasksForWeek(startMs, endMs) {
    return this.getTasks().filter(t => t.createdAt >= startMs && t.createdAt <= endMs);
  },

  /* ---- MEMBERS ---- */
  getMembers()          { return this.get('bk-members'); },
  saveMembers(members)  { this.set('bk-members', members); },

  addMember(member) {
    const members = this.getMembers();
    member.id             = 'm' + Date.now();
    member.joinedAt       = Date.now();
    member.capacity       = member.capacity       || 5;
    member.weeklyCapacity = member.weeklyCapacity || 10;
    member.reliability    = member.reliability    || 70;
    member.speed          = member.speed          || 60;
    member.skills         = member.skills         || [];
    member.bio            = member.bio            || '';
    members.push(member);
    this.saveMembers(members);
    this.addLog('You', `Nhân viên mới: ${member.name} (${member.role}) đã gia nhập The Park!`, null);
  },

  updateMember(id, updates) {
    const members = this.getMembers().map(m => m.id === id ? { ...m, ...updates } : m);
    this.saveMembers(members);
    this.addLog('You', `Đã cập nhật hồ sơ: ${updates.name || id}`, null);
  },

  deleteMember(id) {
    const m = this.getMembers().find(mb => mb.id === id);
    const members = this.getMembers().filter(mb => mb.id !== id);
    this.saveMembers(members);
    if (m) this.addLog('You', `${m.name} đã rời The Park (hoặc bị Benson sa thải).`, null);
  },

  getMemberTaskCounts() {
    const tasks = this.getTasks();
    return this.getMembers().map(m => ({
      ...m,
      todoCount:  tasks.filter(t => t.assignee === m.name && t.status === 'todo').length,
      doingCount: tasks.filter(t => t.assignee === m.name && t.status === 'doing').length,
      doneCount:  tasks.filter(t => t.assignee === m.name && t.status === 'done').length,
      totalCount: tasks.filter(t => t.assignee === m.name).length,
      activeTasks: tasks.filter(t => t.assignee === m.name && t.status !== 'done'),
    }));
  },

  /* ---- ADVANCED WORKLOAD ANALYTICS ---- */

  getMemberWorkloadScore(memberName) {
    const member = this.getMembers().find(m => m.name === memberName);
    if (!member) return 0;
    const tasks = this.getTasks().filter(t => t.assignee === memberName && t.status !== 'done');
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    const weightedLoad = tasks.reduce((sum, t) => sum + (priorityWeight[t.priority] || 1), 0);
    const maxLoad = (member.capacity || 5) * 2;
    return Math.min(100, Math.round(weightedLoad / maxLoad * 100));
  },

  getMemberEfficiencyScore(memberName) {
    const member = this.getMembers().find(m => m.name === memberName);
    if (!member) return 0;
    const tasks  = this.getTasks().filter(t => t.assignee === memberName);
    const done   = tasks.filter(t => t.status === 'done').length;
    const total  = tasks.length;
    if (total === 0) return 0;

    const completionRate = (done / total) * 100;
    const speedBonus     = (member.speed || 60) * 0.3;
    const reliabilityB   = (member.reliability || 70) * 0.4;
    const capacityUtil   = Math.min(1.2, total / Math.max(1, (member.weeklyCapacity || 10) * 0.5));
    const raw = completionRate * 0.3 + speedBonus + reliabilityB;
    return Math.min(100, Math.round(raw * capacityUtil));
  },

  getTeamBalanceScore() {
    const members = this.getMembers();
    if (members.length === 0) return 100;
    const scores = members.map(m => this.getMemberWorkloadScore(m.name));
    const avg = scores.reduce((a,b) => a+b, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, Math.round(100 - stdDev));
  },

  getSmartAssignRecommendation(task) {
    const members = this.getMembers();
    const scored = members.map(m => {
      const workload    = this.getMemberWorkloadScore(m.name);
      const activeCount = this.getTasks().filter(t => t.assignee === m.name && t.status !== 'done').length;
      if (activeCount >= (m.capacity || 5)) {
        return { ...m, score: -1, reason: 'Đã quá tải 🔴', overloaded: true };
      }
      let score = 100;
      score -= workload * 0.5;
      if (task.priority === 'high')   score += (m.reliability || 70) * 0.4;
      if (task.priority === 'medium') score += (m.reliability || 70) * 0.2;
      score += (m.speed || 60) * 0.2;
      const taskKeywords = (task.title + ' ' + (task.desc||'')).toLowerCase();
      const skillMatch = (m.skills||[]).some(s => taskKeywords.includes(s.toLowerCase()) || s.toLowerCase().split(' ').some(w => taskKeywords.includes(w)));
      if (skillMatch) score += 20;
      if ((m.reliability||70) < 40 && task.priority === 'high') score -= 30;
      const slots = (m.capacity||5) - activeCount;
      let reason = `${slots} slot rảnh, tải ${workload}%`;
      if (skillMatch) reason += ' ✨ skill khớp';
      return { ...m, score: Math.round(score), reason, workload, overloaded: false };
    });
    return scored.sort((a,b) => b.score - a.score);
  },

  getOverloadedMembers() {
    return this.getMembers().filter(m => {
      const active = this.getTasks().filter(t => t.assignee === m.name && t.status !== 'done').length;
      return active > (m.capacity || 5);
    });
  },

  /* ---- ACTIVITY LOG ---- */
  getLogs()     { return this.get('bk-logs'); },
  saveLogs(l)   { this.set('bk-logs', l); },

  addLog(user, action, taskId) {
    const logs = this.getLogs();
    logs.unshift({ id: 'l' + Date.now(), ts: Date.now(), user, action, taskId });
    if (logs.length > 100) logs.pop();
    this.saveLogs(logs);
  },

  updateLog(id, newAction) {
    const logs = this.getLogs().map(l => l.id === id ? { ...l, action: newAction, edited: true } : l);
    this.saveLogs(logs);
  },

  /* ---- SPRINTS ---- */
  getSprints()        { return this.get('bk-sprints'); },
  saveSprints(s)      { this.set('bk-sprints', s); },

  addSprint(sprint) {
    const sprints = this.getSprints();
    sprint.id = 'sp' + Date.now();
    sprint.taskIds = sprint.taskIds || [];
    sprints.unshift(sprint);
    this.saveSprints(sprints);
    this.addLog('You', `Tạo sprint mới: "${sprint.name}"`, null);
    return sprint;
  },

  getSprintStats(sprint) {
    const tasks  = this.getTasks().filter(t => sprint.taskIds.includes(t.id));
    const done   = tasks.filter(t => t.status === 'done').length;
    const total  = tasks.length;
    const pct    = total > 0 ? Math.round(done / total * 100) : 0;
    const today  = Date.now();
    const end    = new Date(sprint.endDate).getTime();
    const daysLeft = Math.max(0, Math.ceil((end - today) / 86400000));
    const isComplete = total > 0 && done === total;
    return { tasks, done, total, pct, daysLeft, isComplete };
  },

  /* ---- USER ---- */
  getUser()     { try { return JSON.parse(localStorage.getItem('bk-user')) || BK_DEFAULT_USER; } catch { return BK_DEFAULT_USER; } },
  saveUser(u)   { localStorage.setItem('bk-user', JSON.stringify(u)); },

  /* ---- RESET ---- */
  clearAllTasks() {
    this.saveTasks([]);
    this.addLog('You', '⚠️ Đã xóa toàn bộ task.', null);
  },

  resetToDefault() {
    this.set('bk-tasks',   BK_DEFAULT_TASKS);
    this.set('bk-members', BK_DEFAULT_MEMBERS);
    this.set('bk-logs',    BK_DEFAULT_LOGS);
    this.set('bk-sprints', BK_DEFAULT_SPRINTS);
    this.set('bk-user',    BK_DEFAULT_USER);
  }
};

/* ===== UTILITY ===== */
function bkFormatDate(ts) {
  if (!ts) return '\u2014';
  const d = new Date(ts);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function bkFormatTime(ts, lang) {
  if (!ts) return '\u2014';
  const diff = Date.now() - ts;
  const isEn = (lang || localStorage.getItem('bk-lang') || 'vi') === 'en';
  if (diff < 3600000) return Math.floor(diff/60000) + (isEn ? ' min ago' : ' phút trước');
  if (diff < 86400000) return Math.floor(diff/3600000) + (isEn ? ' hr ago' : ' giờ trước');
  return Math.floor(diff/86400000) + (isEn ? ' day(s) ago' : ' ngày trước');
}

function bkEscHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* Auto-init on load */
BKStore.init();
