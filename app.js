/* ================= 工具函数 ================= */

const $ = (id) => document.getElementById(id);

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}

const shDateFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const shTimeFmt = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const shDateKey = (t) => shDateFmt.format(new Date(t));
const shTime = (t) => shTimeFmt.format(new Date(t));

function dateLabel(t) {
  const now = Date.now();
  if (shDateKey(t) === shDateKey(now)) return '今天';
  if (shDateKey(t) === shDateKey(now - 86400000)) return '昨天';
  return shDateKey(t).slice(5);
}

function badge(text, cls) {
  return el('span', 'badge ' + cls, text);
}

const LEVEL_CLASS = { '高': 'lv-high', '中': 'lv-mid', '低': 'lv-low' };
const STATUS_CLASS = {
  '待审核': 'st-pending',
  '审核中': 'st-doing',
  '已通过': 'st-pass',
  '已驳回': 'st-reject',
  '现行有效': 'st-pass',
  '修订中': 'st-doing',
  '已废止': 'st-todo',
  '已生成': 'st-pass',
  '生成中': 'st-doing',
  '待生成': 'st-todo',
  '待启动': 'st-pending',
  '进行中': 'st-doing',
  '已完成': 'st-pass',
};

/* ================= 示例数据 =================
   框架阶段的演示数据。接入真实数据时，替换以下内容即可。 */

const SAMPLE = {
  todos: [
    { text: '审核 3 笔大额交易风险预警', level: '高', state: '进行中' },
    { text: '更新第四季度风险排查台账', level: '中', state: '未开始' },
    { text: '汇总 10 月人员变动情况', level: '中', state: '进行中' },
    { text: '归档 9 月经营分析报告', level: '普通', state: '已完成' },
    { text: '完成新制度征求意见反馈', level: '普通', state: '未开始' },
  ],
  records: [
    { date: '2026-10-16', title: '四季度工作部署会组织与纪要整理', category: '会议接待', icon: '📅', status: '已完成', owner: '本人', desc: '完成会议通知、材料准备、会场协调及纪要起草，会后事项已分解到人。', detail: '拟定会议议程并通知参会人员 23 人；准备汇报材料汇编 1 份；协调会场及设备调试；会后 2 小时内完成会议纪要初稿；将 8 项决议事项分解为台账并明确责任人。' },
    { date: '2026-10-14', title: '9 月月度经营分析报告编制', category: '报表编制', icon: '📊', status: '已完成', owner: '本人', desc: '完成数据汇总、图表制作与初稿审校，已提交分管领导审阅。', detail: '汇总业务、财务数据 5 大类；制作图表 12 张；完成初稿全文 18 页并两轮校对；已提交分管领导审阅，待反馈修改意见后定稿。' },
    { date: '2026-10-13', title: '年度工作总结文稿起草', category: '文稿起草', icon: '📝', status: '进行中', owner: '本人', desc: '完成提纲与第一部分初稿，正在补充数据案例。', detail: '已确定四段式提纲；完成第一部分“年度工作回顾”初稿约 2600 字；正在收集业务数据与典型案例，预计本周完成全文初稿。' },
    { date: '2026-10-12', title: '办公区消防设施整改跟进', category: '督办事项', icon: '📌', status: '进行中', owner: '本人', desc: '已对接维保单位，整改方案确定中，预计下周进场施工。', detail: '会同安全管理员完成现场排查，发现 3 类问题；已与维保单位完成两轮沟通；整改方案和报价正在确认中，预计下周一进场施工，工期约 3 天。' },
    { date: '2026-10-10', title: '与兄弟单位业务对接会', category: '协调联络', icon: '🤝', status: '已完成', owner: '本人', desc: '就联合项目推进事项进行沟通，形成合作备忘要点 6 条。', detail: '双方就联合项目分工、进度节点、数据共享方式达成一致；形成备忘要点 6 条并邮件确认；明确下周各自提交细化方案。' },
    { date: '2026-10-09', title: '新员工入职引导安排', category: '人事协助', icon: '👥', status: '已完成', owner: '本人', desc: '完成入职材料准备、工位与设备安排、引导人指定。', detail: '准备入职材料包 2 套；协调办公位与电脑设备；指定引导人并明确首周安排；已组织简短的部门见面会。' },
    { date: '2026-10-08', title: '印章使用台账月度核对', category: '台账管理', icon: '🧾', status: '已完成', owner: '本人', desc: '核对 9 月用印记录 87 条，与系统记录一致。', detail: '逐条核对 9 月用印审批记录 87 条，与系统流程数据一致；补充扫描件 5 份归档；未发现异常用印情况。' },
    { date: '2026-10-03', title: '年度设备采购计划汇总', category: '报表编制', icon: '🖥️', status: '待启动', owner: '本人', desc: '待各部门上报需求后汇总，截止日期 10 月 25 日。', detail: '已发出需求征集通知至各部门；待汇总后进行预算比对；计划于 10 月 25 日前完成汇总表并提交审批。' },
    { date: '2026-09-30', title: '档案室资料归档整理', category: '档案管理', icon: '🗂️', status: '已完成', owner: '本人', desc: '完成三季度合同、发文类档案归档，共 132 件。', detail: '完成三季度合同类档案 76 件、发文类档案 56 件归档；更新档案电子目录；库房环境检查正常。' },
  ],
  risks: [
    { id: 'FX-2026-018', item: '客户 A 账户单笔转账金额超出日常均值 8 倍', level: '高', owner: '王强', time: '2026-10-16 09:42', status: '待审核' },
    { id: 'FX-2026-017', item: '合作方 B 工商登记信息发生变更', level: '中', owner: '李敏', time: '2026-10-16 09:05', status: '待审核' },
    { id: 'FX-2026-016', item: '某供应商入围资质即将到期', level: '低', owner: '赵磊', time: '2026-10-15 17:20', status: '待审核' },
    { id: 'FX-2026-015', item: '合同条款缺少违约责任约定', level: '中', owner: '陈静', time: '2026-10-15 15:47', status: '审核中' },
    { id: 'FX-2026-014', item: '客户 C 风险等级由低调整为中', level: '中', owner: '王强', time: '2026-10-15 11:12', status: '审核中' },
    { id: 'FX-2026-013', item: '大额付款申请缺少双人复核记录', level: '高', owner: '刘洋', time: '2026-10-14 16:33', status: '已通过' },
    { id: 'FX-2026-012', item: '员工报销单据发票抬头不一致', level: '低', owner: '陈静', time: '2026-10-14 10:08', status: '已通过' },
    { id: 'FX-2026-011', item: '外部合作方新增关联企业核查', level: '中', owner: '李敏', time: '2026-10-13 15:55', status: '已通过' },
    { id: 'FX-2026-010', item: '敏感数据导出操作未走审批流程', level: '高', owner: '赵磊', time: '2026-10-13 09:30', status: '已驳回' },
  ],
  policies: [
    { name: '薪酬管理办法', no: '综合管理〔2026〕7 号', dept: '综合办公室', date: '2026-07-01', status: '现行有效' },
    { name: '差旅费用报销制度', no: '财务管理〔2026〕3 号', dept: '财务部', date: '2026-04-15', status: '现行有效' },
    { name: '信息安全管理制度', no: '信息管理〔2025〕12 号', dept: '信息技术部', date: '2025-11-01', status: '现行有效' },
    { name: '采购管理办法', no: '综合管理〔2025〕9 号', dept: '综合办公室', date: '2025-09-01', status: '修订中' },
    { name: '印章管理规定', no: '综合管理〔2025〕5 号', dept: '综合办公室', date: '2025-06-01', status: '现行有效' },
    { name: '考勤与请假制度', no: '人事管理〔2025〕4 号', dept: '人力资源部', date: '2025-03-01', status: '现行有效' },
    { name: '员工培训管理办法', no: '人事管理〔2024〕11 号', dept: '人力资源部', date: '2024-10-01', status: '现行有效' },
    { name: '客户信息保密制度', no: '合规管理〔2024〕8 号', dept: '风控合规部', date: '2024-08-01', status: '现行有效' },
    { name: '突发事件应急预案', no: '综合管理〔2024〕3 号', dept: '综合办公室', date: '2024-05-01', status: '已废止' },
    { name: '固定资产管理制度', no: '财务管理〔2023〕10 号', dept: '财务部', date: '2023-12-01', status: '现行有效' },
  ],
  staff: {
    total: 128,
    joined: 6,
    left: 3,
    avgYears: '4.6 年',
    depts: [
      { name: '业务一部', count: 32 },
      { name: '业务二部', count: 28 },
      { name: '客户服务部', count: 16 },
      { name: '风控合规部', count: 16 },
      { name: '综合办公室', count: 14 },
      { name: '财务部', count: 12 },
      { name: '信息技术部', count: 10 },
    ],
    roles: [
      { name: '管理岗', count: 18 },
      { name: '专业岗', count: 82 },
      { name: '支持岗', count: 28 },
    ],
  },
  reports: [
    { name: '月度经营分析报告', type: '月报', period: '2026-09', generated: '2026-10-10 09:30', status: '已生成', format: 'PDF' },
    { name: '月度风险排查报告', type: '月报', period: '2026-09', generated: '2026-10-09 16:00', status: '已生成', format: 'PDF' },
    { name: '人力资源月报', type: '月报', period: '2026-09', generated: '2026-10-08 11:20', status: '已生成', format: 'Excel' },
    { name: '季度合规检查报告', type: '季报', period: '2026-Q3', generated: '2026-10-05 14:45', status: '已生成', format: 'PDF' },
    { name: '客户投诉分析报告', type: '月报', period: '2026-09', generated: '2026-10-07 10:15', status: '已生成', format: 'Excel' },
    { name: '财务快报', type: '月报', period: '2026-10', generated: '2026-10-16 08:30', status: '生成中', format: 'Excel' },
    { name: '年度审计材料清单', type: '年报', period: '2026', generated: '—', status: '待生成', format: 'PDF' },
    { name: '信息安全月报', type: '月报', period: '2026-09', generated: '2026-10-06 17:40', status: '已生成', format: 'Excel' },
  ],
};

/* ================= Tab 路由 ================= */

const TABS = [
  { id: 'overview', label: '📊 工作总览' },
  { id: 'records', label: '📝 工作记录' },
  { id: 'news', label: '📰 行业新闻' },
  { id: 'risk', label: '🛡️ 风险审核' },
  { id: 'policies', label: '📚 制度查询' },
  { id: 'staff', label: '👥 人员统计' },
  { id: 'reports', label: '📄 文稿报表' },
];

const tabsEl = $('tabs');

function buildTabs() {
  for (const t of TABS) {
    const a = el('a', 'tab', t.label);
    a.href = '#' + t.id;
    a.dataset.tab = t.id;
    tabsEl.appendChild(a);
  }
}

function currentTabId() {
  const id = location.hash.replace(/^#/, '');
  return TABS.some((t) => t.id === id) ? id : 'overview';
}

function showTab(id) {
  for (const t of TABS) {
    $('view-' + t.id).hidden = t.id !== id;
    tabsEl.querySelector(`[data-tab="${t.id}"]`).classList.toggle('active', t.id === id);
  }
  if (id === 'overview') renderOverview();
  if (id === 'records') renderRecords();
  if (id === 'risk') renderRisk();
  if (id === 'policies') renderPolicies();
  if (id === 'staff') renderStaff();
  if (id === 'reports') renderReports();
}

/* ================= 通用渲染 ================= */

function fillStats(container, stats) {
  container.textContent = '';
  for (const s of stats) {
    const card = el('div', 'stat-card');
    card.append(el('div', 'label', s.label), el('div', 'num', s.value));
    if (s.sub) card.appendChild(el('div', 'sub', s.sub));
    container.appendChild(card);
  }
}

function fillTable(table, headers, rows) {
  table.textContent = '';
  const thead = el('thead');
  const htr = el('tr');
  for (const h of headers) htr.appendChild(el('th', null, h));
  thead.appendChild(htr);
  table.appendChild(thead);

  const tbody = el('tbody');
  for (const r of rows) {
    const tr = el('tr');
    for (const cell of r) {
      const td = el('td');
      if (cell instanceof Node) td.appendChild(cell);
      else td.textContent = cell;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}

function fillBars(container, items, kind) {
  container.textContent = '';
  const max = Math.max(...items.map((i) => i.count));
  for (const it of items) {
    const row = el('div', 'bar-row');
    const track = el('div', 'bar-track');
    const fill = el('div', 'bar-fill ' + kind);
    fill.style.width = ((it.count / max) * 100).toFixed(1) + '%';
    track.appendChild(fill);
    row.append(el('span', 'bar-label', it.name), track, el('span', 'bar-value', String(it.count)));
    container.appendChild(row);
  }
}

/* ================= 工作总览 ================= */

function renderOverview() {
  const pending = SAMPLE.risks.filter((r) => r.status === '待审核').length;
  const policies = SAMPLE.policies.filter((p) => p.status !== '已废止').length;
  fillStats($('ov-stats'), [
    { label: '最新快讯', value: allItems.length ? allItems.length + ' 条' : '—', sub: newsUpdatedText || '加载中…' },
    { label: '待审核风险', value: pending + ' 项', sub: '示例数据' },
    { label: '制度文件', value: policies + ' 份', sub: '不含已废止 · 示例数据' },
    { label: '在岗人员', value: SAMPLE.staff.total + ' 人', sub: '示例数据' },
  ]);

  const newsUl = $('ov-news');
  newsUl.textContent = '';
  const top = allItems.slice(0, 5);
  if (!top.length) newsUl.appendChild(el('li', 'panel-note', '暂无数据'));
  for (const it of top) {
    const li = el('li');
    const label = dateLabel(it.time) === '今天' ? shTime(it.time) : dateLabel(it.time) + ' ' + shTime(it.time);
    const a = el('a', null, it.title);
    a.href = it.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li.append(el('span', 'mini-time', label), a);
    newsUl.appendChild(li);
  }

  const todoUl = $('ov-todos');
  todoUl.textContent = '';
  const DOT_CLASS = { '高': 'dot-high', '中': 'dot-mid', '普通': 'dot-low' };
  for (const t of SAMPLE.todos) {
    const li = el('li', 'todo-item');
    li.append(
      el('span', 'todo-dot ' + DOT_CLASS[t.level], ''),
      el('span', 'todo-text', t.text),
      el('span', 'todo-state', t.state)
    );
    todoUl.appendChild(li);
  }
}

/* ================= 行业新闻 ================= */

const SOURCE_COLOR = {
  '华尔街见闻': '#c98a2b',
  '东方财富': '#2f6fed',
  '金十数据': '#159a63',
};

const listEl = $('news-list');
const filtersEl = $('filters');
const updatedEl = $('updated');
const emptyEl = $('empty');

let allItems = [];
let active = '全部';
let newsUpdatedText = '';

function renderFilters() {
  filtersEl.textContent = '';
  const names = ['全部', ...Object.keys(SOURCE_COLOR)];
  for (const name of names) {
    const count = name === '全部' ? allItems.length : allItems.filter((i) => i.source === name).length;
    const btn = el('button', 'chip' + (name === active ? ' active' : ''), `${name} ${count}`);
    btn.type = 'button';
    btn.addEventListener('click', () => {
      active = name;
      renderNews();
    });
    filtersEl.appendChild(btn);
  }
}

function renderNews() {
  renderFilters();
  const items = active === '全部' ? allItems : allItems.filter((i) => i.source === active);
  emptyEl.hidden = items.length > 0;
  listEl.textContent = '';

  for (const it of items) {
    const li = el('li', 'card' + (it.important ? ' important' : ''));

    const timeBox = el('div', 'time');
    timeBox.append(el('span', 'hm', shTime(it.time)), el('span', 'day', dateLabel(it.time)));

    const body = el('div', 'body');

    const meta = el('div', 'meta');
    const dot = el('span', 'dot');
    dot.style.background = SOURCE_COLOR[it.source] || '#999';
    meta.append(dot, el('span', null, it.source));
    if (it.important) meta.appendChild(el('span', 'imp', '重要'));

    const h2 = el('h2');
    const a = el('a', null, it.title);
    a.href = it.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    h2.appendChild(a);

    body.append(meta, h2);
    if (it.summary && it.summary !== it.title) {
      body.appendChild(el('p', 'summary', it.summary));
    }

    li.append(timeBox, body);
    listEl.appendChild(li);
  }
}

async function load() {
  try {
    const res = await fetch('news.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    allItems = data.items || [];
    newsUpdatedText = data.updatedAt ? `更新于 ${dateLabel(data.updatedAt)} ${shTime(data.updatedAt)}` : '';
    updatedEl.textContent = newsUpdatedText;
    renderNews();
    if (currentTabId() === 'overview') renderOverview();
  } catch (err) {
    updatedEl.textContent = '加载失败';
    emptyEl.hidden = false;
    emptyEl.textContent = '新闻数据加载失败：' + err.message;
  }
}

/* ================= 风险审核 ================= */

const RISK_STATUSES = ['全部', '待审核', '审核中', '已通过', '已驳回'];
let riskFilter = '全部';

function renderRisk() {
  const filterEl = $('risk-filters');
  filterEl.textContent = '';
  for (const s of RISK_STATUSES) {
    const rows = s === '全部' ? SAMPLE.risks : SAMPLE.risks.filter((r) => r.status === s);
    const btn = el('button', 'chip' + (s === riskFilter ? ' active' : ''), `${s} ${rows.length}`);
    btn.type = 'button';
    btn.addEventListener('click', () => {
      riskFilter = s;
      renderRisk();
    });
    filterEl.appendChild(btn);
  }

  const rows = riskFilter === '全部' ? SAMPLE.risks : SAMPLE.risks.filter((r) => r.status === riskFilter);
  fillTable(
    $('risk-table'),
    ['编号', '事项概要', '风险等级', '提交人', '提交时间', '状态'],
    rows.map((r) => [r.id, r.item, badge(r.level, LEVEL_CLASS[r.level]), r.owner, r.time, badge(r.status, STATUS_CLASS[r.status])])
  );
}

/* ================= 制度查询 ================= */

function renderPolicies() {
  const q = ($('policy-search').value || '').trim().toLowerCase();
  const rows = SAMPLE.policies.filter((p) => !q || [p.name, p.no, p.dept].join(' ').toLowerCase().includes(q));
  $('policy-empty').hidden = rows.length > 0;
  fillTable(
    $('policy-table'),
    ['制度名称', '文号', '发布部门', '实施日期', '状态'],
    rows.map((p) => [p.name, p.no, p.dept, p.date, badge(p.status, STATUS_CLASS[p.status])])
  );
}

/* ================= 人员统计 ================= */

function renderStaff() {
  const s = SAMPLE.staff;
  fillStats($('staff-stats'), [
    { label: '在岗人员', value: s.total + ' 人' },
    { label: '本季新进', value: s.joined + ' 人' },
    { label: '本季离职', value: s.left + ' 人' },
    { label: '平均司龄', value: s.avgYears },
  ]);
  fillBars($('staff-depts'), s.depts, 'dept');
  fillBars($('staff-roles'), s.roles, 'role');
}

/* ================= 文稿报表 ================= */

function renderReports() {
  fillTable(
    $('report-table'),
    ['报表名称', '类别', '周期', '最近生成', '状态', '格式'],
    SAMPLE.reports.map((r) => [r.name, r.type, r.period, r.generated, badge(r.status, STATUS_CLASS[r.status]), r.format])
  );
}

/* ================= 工作记录 ================= */

function renderRecords() {
  const grid = $('records-grid');
  grid.textContent = '';
  for (const r of SAMPLE.records) {
    const card = el('div', 'rec-card');
    card.appendChild(el('div', 'rec-ph', r.icon));

    const body = el('div', 'rec-body');
    body.appendChild(el('div', 'rec-title', r.title));
    body.appendChild(el('div', 'rec-desc', r.desc));

    const meta = el('div', 'rec-meta');
    const left = el('span', 'tl');
    left.append(el('span', null, r.date), el('span', null, '·'), el('span', null, r.category));
    meta.append(left, badge(r.status, STATUS_CLASS[r.status]));
    body.appendChild(meta);

    card.appendChild(body);
    card.addEventListener('click', () => openRecord(r));
    grid.appendChild(card);
  }
}

function modalField(label, value) {
  const f = el('div', 'field');
  f.appendChild(el('div', 'label', label));
  const v = el('div', 'value');
  if (value instanceof Node) v.appendChild(value);
  else v.textContent = value;
  f.appendChild(v);
  return f;
}

function openRecord(r) {
  $('modal-title').textContent = r.title;
  const fields = $('modal-fields');
  fields.textContent = '';

  const group = el('div', 'field-group');
  group.append(
    modalField('日期', r.date),
    modalField('类别', r.category),
    modalField('状态', badge(r.status, STATUS_CLASS[r.status])),
    modalField('记录人', r.owner)
  );
  fields.append(group, modalField('工作详情', r.detail));

  $('record-modal').classList.add('show');
  document.body.classList.add('modal-open');
}

function closeRecord() {
  $('record-modal').classList.remove('show');
  document.body.classList.remove('modal-open');
}

/* ================= 初始化 ================= */

buildTabs();
$('policy-search').addEventListener('input', renderPolicies);
$('refresh').addEventListener('click', load);
window.addEventListener('hashchange', () => showTab(currentTabId()));
$('modal-close').addEventListener('click', closeRecord);
$('record-modal').addEventListener('click', (e) => {
  if (e.target === $('record-modal')) closeRecord();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeRecord();
});

showTab(currentTabId());
load();
setInterval(load, 5 * 60 * 1000);
