"use strict";

// --- GLOBAL STATE & PERSISTENCE ---
const STORE_KEYS = {
    CONFIG: "config",
    FINANCES: "finances",
    TASKS: "tasks",
    CALENDAR: "calendar",
    WRITER: "writer_docs",
    CALC: "calc_tables",
    SLIDES: "slides_decks",
    PROJECTS: "projects",
    DAY_HISTORY: "day_history"
};

const defaultState = {
    config: { theme: 'light', accent: '#4A90E2', lang: 'es' },
    finances: { budget: 0, expenses: [] },
    tasks: [],
    calendar: [],
    writer_docs: [],
    calc_tables: [],
    slides_decks: [],
    projects: [],
    day_history: []
};

let appState = {};

function initStorage() {
    Object.values(STORE_KEYS).forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
            try { appState[key] = JSON.parse(data); } catch (e) { appState[key] = defaultState[key]; }
        } else {
            appState[key] = defaultState[key];
            localStorage.setItem(key, JSON.stringify(appState[key]));
        }
    });

    // Ensure config exists
    if (!appState.config) appState.config = defaultState.config;
}

function saveState(key) {
    localStorage.setItem(key, JSON.stringify(appState[key]));
}

// --- I18N (TRANSLATIONS) ---
const translations = {
    es: {
        app_title: "Productivity V2", nav_dashboard: "Dashboard", nav_finance: "Finanzas", nav_missions: "Misiones", nav_calendar: "Calendario", nav_office: "Office Lite", nav_tools: "Herramientas", nav_files: "Archivos", nav_settings: "Ajustes",
        available_balance: "SALDO DISPONIBLE", latest_missions: "Últimas 3 Misiones Activas", upcoming_events: "Próximos eventos", initial_budget: "Presupuesto Inicial", set_budget: "Establecer", current_balance: "Saldo actual", expenses_list: "Gastos (Máx 10)", expense_name: "Nombre del gasto", expense_amount: "Monto", add_expense: "Añadir Gasto", tasks: "Tareas", new_mission: "Nueva misión...", add: "Añadir", timer: "Temporizador", start: "Iniciar", pause: "Pausar", reset: "Reset",
        day_mon: "Lu", day_tue: "Ma", day_wed: "Mi", day_thu: "Ju", day_fri: "Vi", day_sat: "Sa", day_sun: "Do", new_event: "NUEVO EVENTO", event_title: "Título del evento", add_event: "Añadir Evento", events: "Eventos del día", new_doc: "Nuevo Doc", saved_docs: "Mis Documentos", type_here: "Escribe aquí...", save_doc: "Guardar", rows: "Filas (1-20)", cols: "Cols (1-10)", create_table: "Crear nueva", autosum: "Autosuma", save_table: "Guardar", export_pdf: "Exportar a PDF", slides: "Diapositivas", bg: "Fondo", insert_img: "Imagen", slide_title: "TÍTULO", slide_content: "Contenido...",
        export_files: "Exportar a PDF", export_saved_docs: "DOCUMENTOS WRITER", upload_device: "ARCHIVO LOCAL", export_formats: "Soporte: .txt, .docx, .jpg, .png", export_calc_table: "Exportar Tabla Calc Abierta", ocr_scanner: "Escáner OCR IA", drag_drop: "Arrastra imagen o haz clic", scan_text: "Escanear Texto Mágicamente", save_writer: "A Writer", appearance: "Apariencia", dark_mode: "Modo Oscuro", accent_color: "Color de Acento Global", language: "Idioma Regional", data: "Datos y Respaldo", export_data: "Exportar Colección (JSON)", import_data: "Restaurar Colección (JSON)", clear_data: "BORRAR TODOS LOS DATOS", search_files: "Buscar por nombre..."
    },
    en: {
        app_title: "Productivity V2", nav_dashboard: "Dashboard", nav_finance: "Finance", nav_missions: "Missions", nav_calendar: "Calendar", nav_office: "Office Lite", nav_tools: "Tools", nav_files: "Files", nav_settings: "Settings",
        available_balance: "AVAILABLE BALANCE", latest_missions: "Latest 3 Active Missions", upcoming_events: "Upcoming events", initial_budget: "Initial Budget", set_budget: "Set", current_balance: "Current balance", expenses_list: "Expenses (Max 10)", expense_name: "Expense name", expense_amount: "Amount", add_expense: "Add Expense", tasks: "Tasks", new_mission: "New mission...", add: "Add", timer: "Timer", start: "Start", pause: "Pause", reset: "Reset",
        day_mon: "Mo", day_tue: "Tu", day_wed: "We", day_thu: "Th", day_fri: "Fr", day_sat: "Sa", day_sun: "Su", new_event: "NEW EVENT", event_title: "Event title", add_event: "Add Event", events: "Today's events", new_doc: "New Doc", saved_docs: "My Documents", type_here: "Type here...", save_doc: "Save", rows: "Rows (1-20)", cols: "Cols (1-10)", create_table: "Create new", autosum: "Auto-sum", save_table: "Save", export_pdf: "Export to PDF", slides: "Slides", bg: "Bg", insert_img: "Image", slide_title: "TITLE", slide_content: "Content...",
        export_files: "Export to PDF", export_saved_docs: "WRITER DOCUMENTS", upload_device: "LOCAL FILE", export_formats: "Support: .txt, .docx, .jpg, .png", export_calc_table: "Export Open Calc Table", ocr_scanner: "AI OCR Scanner", drag_drop: "Drag image or click", scan_text: "Magically Scan Text", save_writer: "To Writer", appearance: "Appearance", dark_mode: "Dark Mode", accent_color: "Global Accent Color", language: "Regional Language", data: "Data & Backup", export_data: "Export Collection (JSON)", import_data: "Restore Collection (JSON)", clear_data: "CLEAR ALL DATA", search_files: "Search by name..."
    },
    zh: {
        app_title: "Productivity V2", nav_dashboard: "仪表盘", nav_finance: "财务", nav_missions: "任务", nav_calendar: "日历", nav_office: "Office Lite", nav_tools: "工具", nav_files: "文件", nav_settings: "设置",
        available_balance: "可用余额", latest_missions: "最近3个活跃任务", upcoming_events: "即将到来的事件", initial_budget: "初始预算", set_budget: "设置", current_balance: "当前余额", expenses_list: "支出 (最多10个)", expense_name: "支出名称", expense_amount: "金额", add_expense: "添加支出", tasks: "任务", new_mission: "新任务...", add: "添加", timer: "计时器", start: "开始", pause: "暂停", reset: "重置",
        day_mon: "一", day_tue: "二", day_wed: "三", day_thu: "四", day_fri: "五", day_sat: "六", day_sun: "日", new_event: "新事件", event_title: "事件标题", add_event: "添加事件", events: "今日事件", new_doc: "新文档", saved_docs: "我的文档", type_here: "在此输入...", save_doc: "保存", rows: "行 (1-20)", cols: "列 (1-10)", create_table: "创建新的", autosum: "自动求和", save_table: "保存", export_pdf: "导出为 PDF", slides: "幻灯片", bg: "背景", insert_img: "图片", slide_title: "标题", slide_content: "内容...",
        export_files: "导出为 PDF", export_saved_docs: "WRITER 文档", upload_device: "本地文件", export_formats: "支持: .txt, .docx, .jpg, .png", export_calc_table: "导出当前 Calc 表", ocr_scanner: "AI OCR 扫描仪", drag_drop: "拖放图片或点击", scan_text: "神奇扫描文本", save_writer: "到 Writer", appearance: "外观", dark_mode: "深色模式", accent_color: "全局强调色", language: "区域语言", data: "数据与备份", export_data: "导出集合 (JSON)", import_data: "恢复集合 (JSON)", clear_data: "清除所有数据", search_files: "按名称搜索..."
    }
};

function applyTranslations(lang) {
    const dict = translations[lang] || translations.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
            if(el.getAttribute('data-placeholder')) el.setAttribute('data-placeholder', dict[key]);
        }
    });

    // Update OCR Language for Tesseract dynamically
    ocrLang = lang === 'zh' ? 'chi_sim' : (lang === 'en' ? 'eng' : 'spa');
}

// --- THEMING & UI ---
function applyTheme(theme, accentColor) {
    document.body.className = `theme-${theme}`;
    document.documentElement.setAttribute('data-theme', theme);
    const root = document.documentElement;
    root.style.setProperty('--primary', accentColor);
    
    // Hex to RGBA for primary-light
    let r = parseInt(accentColor.slice(1,3), 16), g = parseInt(accentColor.slice(3,5), 16), b = parseInt(accentColor.slice(5,7), 16);
    root.style.setProperty('--primary-light', `rgba(${r}, ${g}, ${b}, 0.15)`);
    root.style.setProperty('--primary-rgb', `${r},${g},${b}`);

    // Update toggles
    const tt = document.getElementById('theme-toggle'); if(tt) tt.checked = (theme === 'dark');
    document.querySelectorAll('.color-swatch').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color.toUpperCase() === accentColor.toUpperCase());
        if(btn.dataset.color.toUpperCase() === accentColor.toUpperCase()) {
            btn.innerHTML = '<i class="fa-solid fa-check text-white text-sm"></i>';
        } else {
            btn.innerHTML = '';
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === appState.config.lang);
    });

    // Re-draw chart on theme change
    drawFinanceChart();
}

// Sidebar logic
function isMobile() { return window.innerWidth <= 768; }

function openMobileSidebar() {
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('sidebar-overlay').classList.add('active');
    playUISound('open');
}
function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebar-overlay').classList.remove('active');
    playUISound('close');
}

document.getElementById('toggle-sidebar').addEventListener('click', () => {
    if (isMobile()) {
        closeMobileSidebar();
    } else {
        const sb = document.getElementById('sidebar');
        const wasCollapsed = sb.classList.contains('collapsed');
        sb.classList.toggle('collapsed');
        playUISound(wasCollapsed ? 'open' : 'close');
    }
});

const navBtns = document.querySelectorAll('.sidebar-nav .nav-btn');
const modules = document.querySelectorAll('.main-content .module');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.target;
        modules.forEach(mod => {
            mod.style.display = mod.id === target ? 'block' : 'none';
        });
        if (isMobile()) closeMobileSidebar();
        if(target === 'dashboard') updateDashboard();
        if(target === 'finance') renderExpenses();
        if(target === 'files') renderFiles();
        if(target === 'office') populateExportSelect();
        if(target === 'projects') renderProjects();
    });
});

// Notifications & Audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTinTin() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    
    function beep(timeOffset) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = 880;
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0, audioCtx.currentTime + timeOffset);
        gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + timeOffset + 0.01);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + timeOffset + 0.05);
        osc.start(audioCtx.currentTime + timeOffset);
        osc.stop(audioCtx.currentTime + timeOffset + 0.05);
    }
    beep(0);
    beep(0.2);
}

// ─── UI SOUNDS ───────────────────────────────────────────────
function playUISound(type) {
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const t = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        if (type === 'open') {
            osc.type='sine'; osc.frequency.setValueAtTime(320,t); osc.frequency.exponentialRampToValueAtTime(540,t+0.1);
            gain.gain.setValueAtTime(0,t); gain.gain.linearRampToValueAtTime(0.1,t+0.02); gain.gain.linearRampToValueAtTime(0,t+0.12);
            osc.start(t); osc.stop(t+0.13);
        } else if (type === 'close') {
            osc.type='sine'; osc.frequency.setValueAtTime(540,t); osc.frequency.exponentialRampToValueAtTime(280,t+0.1);
            gain.gain.setValueAtTime(0,t); gain.gain.linearRampToValueAtTime(0.09,t+0.02); gain.gain.linearRampToValueAtTime(0,t+0.12);
            osc.start(t); osc.stop(t+0.13);
        } else if (type === 'add') {
            osc.type='triangle'; osc.frequency.setValueAtTime(660,t); osc.frequency.exponentialRampToValueAtTime(880,t+0.06);
            gain.gain.setValueAtTime(0.12,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.1);
            osc.start(t); osc.stop(t+0.11);
        } else if (type === 'delete') {
            osc.type='sine'; osc.frequency.setValueAtTime(200,t); osc.frequency.exponentialRampToValueAtTime(80,t+0.12);
            gain.gain.setValueAtTime(0.14,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.15);
            osc.start(t); osc.stop(t+0.16);
        }
    } catch(e) {}
}

// ─── ANIMATIONS ──────────────────────────────────────────────

// Burst particles from the entire element rect (Xiaomi-style)
function spawnParticlesFromEl(el, color) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = color
        ? [color, lightenColor(color, 40), '#facc15', '#fb7185']
        : ['#a78bfa', '#818cf8', '#38bdf8', '#34d399', '#fb7185'];
    const count = 16;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 30 + Math.random() * 55;
        const size = 4 + Math.random() * 6;
        p.style.cssText = `
            left:${cx}px; top:${cy}px;
            width:${size}px; height:${size}px;
            background:${colors[i % colors.length]};
            --tx:${(Math.cos(angle) * dist).toFixed(1)}px;
            --ty:${(Math.sin(angle) * dist).toFixed(1)}px;
            animation: particleBurst ${0.6 + Math.random() * 0.3}s cubic-bezier(0.22,1,0.36,1) forwards;
            animation-delay:${i * 12}ms;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 900);
    }
}

function lightenColor(hex, amt) {
    try {
        const n = parseInt(hex.slice(1), 16);
        const r = Math.min(255, (n >> 16) + amt);
        const g = Math.min(255, ((n >> 8) & 0xff) + amt);
        const b = Math.min(255, (n & 0xff) + amt);
        return `rgb(${r},${g},${b})`;
    } catch { return hex; }
}

function animateItemIn(el) {
    el.classList.add('item-appear');
    el.addEventListener('animationend', () => el.classList.remove('item-appear'), { once: true });
}

function animateItemOut(el, callback, color) {
    playUISound('delete');
    spawnParticlesFromEl(el, color);
    el.classList.add('item-delete');
    setTimeout(() => {
        if (el.parentNode) el.remove();
        if (callback) callback();
    }, 450);
}

function notifyUser(title, options = {}) {
    if (Notification.permission === 'granted') {
        new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(perm => {
            if(perm === 'granted') new Notification(title, options);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if ("Notification" in window) Notification.requestPermission();
});
// --- DASHBOARD & FINANCES ---
function calculateFinances() {
    const totalExp = appState.finances.expenses.reduce((s, e) => s + Number(e.amount), 0);
    const budget = Number(appState.finances.budget);
    return { budget, spent: totalExp, balance: budget - totalExp };
}

function updateDashboard() {
    const { budget, spent, balance } = calculateFinances();

    // Stat card: Saldo
    const balEl = document.getElementById('dash-balance');
    if (balEl) {
        balEl.textContent = (balance < 0 ? '-' : '') + Math.abs(balance).toFixed(2) + '€';
        balEl.style.color = balance < 0 ? '#ef4444' : '#4ade80';
    }
    const subEl = document.getElementById('dash-subtext');
    if (subEl) subEl.textContent = `Pres: ${budget.toFixed(0)}€ | Gast: ${spent.toFixed(0)}€`;

    // Stat card: Misiones
    const activeTasks = appState.tasks.filter(t => !t.completed);
    const missEl = document.getElementById('dash-missions-count');
    if (missEl) missEl.textContent = activeTasks.length;

    // Stat card: Eventos
    const now = new Date();
    const future = appState.calendar
        .filter(e => new Date(e.date + 'T' + e.time) >= now)
        .sort((a,b) => new Date(a.date+'T'+a.time) - new Date(b.date+'T'+b.time));
    const evCountEl = document.getElementById('dash-events-count');
    if (evCountEl) evCountEl.textContent = future.length;

    // Stat card: Archivos
    const totalFiles = (appState.writer_docs||[]).length + (appState.calc_tables||[]).length + (appState.slides_decks||[]).length;
    const filesEl = document.getElementById('dash-files-count');
    if (filesEl) filesEl.textContent = totalFiles;

    // Recent Missions list
    const list = document.getElementById('dash-missions-list');
    if (list) {
        list.innerHTML = '';
        const top3 = activeTasks.slice(0,3);
        if (top3.length === 0) {
            list.innerHTML = `<p class="p-16 text-success text-center font-bold">✅ Estás al día</p>`;
        } else {
            const ul = document.createElement('ul');
            ul.className = 'modern-list tiny-list';
            top3.forEach(t => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-regular fa-circle text-primary mr-8"></i><span>${t.text}</span>`;
                ul.appendChild(li);
            });
            list.appendChild(ul);
        }
    }

    // Upcoming Events list
    const evList = document.getElementById('dash-events-list');
    if (evList) {
        evList.innerHTML = '';
        const top2 = future.slice(0,2);
        if (top2.length === 0) {
            evList.innerHTML = `<p class="p-16 text-muted text-center italic">Sin eventos próximos</p>`;
        } else {
            const ul = document.createElement('ul');
            ul.className = 'modern-list tiny-list';
            top2.forEach(e => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-regular fa-clock text-primary mr-8"></i><span>${e.date} ${e.time} — <b>${e.title}</b></span>`;
                ul.appendChild(li);
            });
            evList.appendChild(ul);
        }
    }

    drawFinanceChart();
}

function drawFinanceChart() {
    const canvas = document.getElementById('finance-chart');
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 2;
    const displaySize = 220;
    canvas.style.width = displaySize + 'px';
    canvas.style.height = displaySize + 'px';
    const size = displaySize * dpr;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displaySize, displaySize);

    const { budget, spent, balance } = calculateFinances();
    const cx = displaySize / 2, cy = displaySize / 2;
    const outerR = 88, innerR = 58;
    const startAngle = -Math.PI / 2;

    // Update legend
    const legendBalance = document.getElementById('chart-legend-balance');
    if (legendBalance) {
        legendBalance.textContent = `Saldo: ${balance.toFixed(2)}€`;
        legendBalance.style.color = balance < 0 ? '#ef4444' : '#4ade80';
    }
    // Update center %
    const pctEl = document.getElementById('chart-center-pct');
    if (pctEl) {
        const pct = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
        pctEl.textContent = pct + '%';
    }

    // If no data — draw empty ring
    if (budget === 0 && spent === 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Sin datos', cx, cy + 4);
        return;
    }

    const total = Math.max(budget, spent);
    const spentRatio = total > 0 ? Math.min(1, spent / total) : 0;
    const balanceRatio = 1 - spentRatio;

    function drawGlassArc(startA, endA, colorInner, colorOuter, glowColor) {
        // Glow
        ctx.save();
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 18;

        // Gradient fill
        const grad = ctx.createLinearGradient(cx - outerR, cy, cx + outerR, cy);
        grad.addColorStop(0, colorInner);
        grad.addColorStop(1, colorOuter);

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startA, endA);
        ctx.arc(cx, cy, innerR, endA, startA, true);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Highlight shimmer on top edge
        const shimGrad = ctx.createLinearGradient(cx, cy - outerR, cx, cy - innerR);
        shimGrad.addColorStop(0, 'rgba(255,255,255,0.22)');
        shimGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startA, Math.min(endA, startA + 0.6));
        ctx.arc(cx, cy, innerR, Math.min(endA, startA + 0.6), startA, true);
        ctx.closePath();
        ctx.fillStyle = shimGrad;
        ctx.fill();

        ctx.restore();
    }

    // Draw balance segment (green/teal glass)
    if (balanceRatio > 0) {
        const endA = startAngle + balanceRatio * Math.PI * 2;
        drawGlassArc(
            startAngle, endA,
            'rgba(52,211,153,0.85)', 'rgba(16,185,129,0.7)',
            'rgba(52,211,153,0.6)'
        );
    }

    // Draw spent segment (red glass)
    if (spentRatio > 0) {
        const segStart = startAngle + balanceRatio * Math.PI * 2;
        const segEnd = startAngle + Math.PI * 2;
        drawGlassArc(
            segStart, segEnd,
            'rgba(252,100,100,0.85)', 'rgba(239,68,68,0.7)',
            'rgba(239,68,68,0.6)'
        );
    }

    // Thin separator lines between segments
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 2;
    [startAngle, startAngle + balanceRatio * Math.PI * 2].forEach(a => {
        ctx.beginPath();
        ctx.moveTo(cx + innerR * Math.cos(a), cy + innerR * Math.sin(a));
        ctx.lineTo(cx + outerR * Math.cos(a), cy + outerR * Math.sin(a));
        ctx.stroke();
    });
    ctx.restore();

    // Inner dark circle for donut hole
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8,12,24,0.75)';
    ctx.fill();
    ctx.restore();

    // Thin inner border
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Finances Module
document.getElementById('finance-budget-set').addEventListener('click', () => {
    appState.finances.budget = Number(document.getElementById('finance-budget-input').value) || 0;
    saveState(STORE_KEYS.FINANCES);
    renderExpenses();
});

function renderExpenses() {
    const list = document.getElementById('expenses-list');
    list.innerHTML = '';
    document.getElementById('finance-budget-input').value = appState.finances.budget;
    
    const { balance } = calculateFinances();
    const mega = document.getElementById('finance-mega-balance');
    mega.textContent = balance.toFixed(2);
    mega.className = 'balance-mega ' + (balance < 0 ? 'negative' : '');
    
    appState.finances.expenses.forEach((exp, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="flex-1 font-bold">${exp.name}</span>
            <span class="text-danger w-100 text-right">- ${Number(exp.amount).toFixed(2)}</span>
            <button class="icon-btn hover-text-danger ml-16" onclick="deleteExpense(${idx}, event)"><i class="fa-solid fa-trash"></i></button>
        `;
        li.style.animationDelay = (idx * 40) + 'ms';
        animateItemIn(li);
        list.appendChild(li);
    });
    document.getElementById('add-expense-btn').disabled = appState.finances.expenses.length >= 10;
    drawFinanceChart();
}

function deleteExpense(idx, event) {
    const btn = event ? event.currentTarget : null;
    const li = btn ? btn.closest('li') : null;
    if (li) {
        animateItemOut(li, () => {
            appState.finances.expenses.splice(idx, 1);
            saveState(STORE_KEYS.FINANCES);
            renderExpenses();
        }, '#ef4444');
        return;
    }
    appState.finances.expenses.splice(idx, 1);
    saveState(STORE_KEYS.FINANCES);
    renderExpenses();
}

document.getElementById('add-expense-btn').addEventListener('click', () => {
    if(appState.finances.expenses.length >= 10) return;
    const name = document.getElementById('expense-name').value;
    const amount = Number(document.getElementById('expense-amount').value);
    if(!name || !amount) return;
    appState.finances.expenses.push({name, amount});
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    saveState(STORE_KEYS.FINANCES);
    playUISound('add');
    renderExpenses();
});

// --- MISSIONS & TASKS ---
function renderTasks() {
    const list = document.getElementById('tasks-list');
    list.innerHTML = '';
    appState.tasks.forEach((t, i) => {
        const li = document.createElement('li');
        if(t.completed) li.classList.add('completed');
        li.innerHTML = `
            <div class="custom-checkbox" onclick="toggleTask(${i})"></div>
            <span class="task-text">${t.text}</span>
            <button class="icon-btn hover-text-danger ml-8" onclick="deleteTask(${i}, event)"><i class="fa-solid fa-trash"></i></button>
        `;
        li.style.animationDelay = (i * 35) + 'ms';
        animateItemIn(li);
        list.appendChild(li);
    });
}
window.toggleTask = function(i) {
    appState.tasks[i].completed = !appState.tasks[i].completed;
    saveState(STORE_KEYS.TASKS);
    renderTasks();
};
window.deleteTask = function(i, event) {
    const btn = event ? event.currentTarget : null;
    const li = btn ? btn.closest('li') : null;
    if (li) {
        animateItemOut(li, () => {
            appState.tasks.splice(i, 1);
            saveState(STORE_KEYS.TASKS);
            renderTasks();
        }, '#a78bfa');
        return;
    }
    appState.tasks.splice(i, 1);
    saveState(STORE_KEYS.TASKS);
    renderTasks();
};
document.getElementById('add-task-btn').addEventListener('click', () => {
    const v = document.getElementById('task-input').value.trim();
    if(!v) return;
    appState.tasks.unshift({text: v, completed: false});
    document.getElementById('task-input').value = '';
    saveState(STORE_KEYS.TASKS);
    playUISound('add');
    renderTasks();
});

// Timer Logic
let timerInt = null;
let timerSecs = 0;
function pad(n) { return n.toString().padStart(2,'0'); }
function updateTimerDisp() {
    const h = Math.floor(timerSecs/3600), m = Math.floor((timerSecs%3600)/60), s = timerSecs%60;
    document.getElementById('timer-display').textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}
document.getElementById('timer-start').addEventListener('click', () => {
    if(timerInt) return;
    if(timerSecs === 0) {
        let h = Number(document.getElementById('timer-h').value) || 0;
        let m = Number(document.getElementById('timer-m').value) || 0;
        let s = Number(document.getElementById('timer-s').value) || 0;
        timerSecs = h*3600 + m*60 + s;
        if(timerSecs <= 0) return;
    }
    document.getElementById('timer-start').classList.add('hidden');
    document.getElementById('timer-pause').classList.remove('hidden');
    timerInt = setInterval(() => {
        timerSecs--;
        updateTimerDisp();
        if(timerSecs <= 0) {
            clearInterval(timerInt); timerInt=null;
            document.getElementById('timer-pause').classList.add('hidden');
            document.getElementById('timer-start').classList.remove('hidden');
            playTinTin();
            notifyUser("⏰ Tiempo completado", {body: "El temporizador ha terminado."});
        }
    }, 1000);
});
document.getElementById('timer-pause').addEventListener('click', () => {
    clearInterval(timerInt); timerInt=null;
    document.getElementById('timer-pause').classList.add('hidden');
    document.getElementById('timer-start').classList.remove('hidden');
});
document.getElementById('timer-reset').addEventListener('click', () => {
    clearInterval(timerInt); timerInt=null;
    timerSecs=0; updateTimerDisp();
    document.getElementById('timer-pause').classList.add('hidden');
    document.getElementById('timer-start').classList.remove('hidden');
});

// Timer tabs
document.querySelectorAll('.timer-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.timer-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.color = 'rgba(255,255,255,0.4)';
        });
        btn.classList.add('active');
        btn.style.background = 'rgba(var(--primary-rgb),0.2)';
        btn.style.color = 'white';
        const tab = btn.dataset.timerTab;
        document.getElementById('tab-countdown').style.display = tab === 'countdown' ? 'flex' : 'none';
        document.getElementById('tab-work').style.display = tab === 'work' ? 'flex' : 'none';
    });
});

// WORK TIMER
let workTimerInt = null, workPhase = 'idle', workCycle = 1, workSecs = 0;

function workTimerTick() {
    workSecs--;
    const m = Math.floor(workSecs/60), s = workSecs%60;
    document.getElementById('work-timer-display').textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    if (workSecs <= 0) {
        clearInterval(workTimerInt); workTimerInt = null;
        playTinTin();
        if (workPhase === 'working') {
            workPhase = 'break';
            const breakMins = parseInt(document.getElementById('work-break').value)||5;
            workSecs = breakMins*60;
            document.getElementById('work-status-label').textContent = '☕ Descanso';
            document.getElementById('work-status-label').style.color = '#34d399';
            notifyUser('⏰ Descanso de '+breakMins+' min', {});
            workTimerInt = setInterval(workTimerTick, 1000);
        } else {
            workPhase = 'working';
            workCycle++;
            const workMins = parseInt(document.getElementById('work-duration').value)||25;
            workSecs = workMins*60;
            document.getElementById('work-status-label').textContent = '💼 Trabajando';
            document.getElementById('work-status-label').style.color = 'rgba(var(--primary-rgb),1)';
            document.getElementById('work-cycle-label').textContent = 'Ciclo '+workCycle;
            notifyUser('🚀 Ciclo '+workCycle+' — a trabajar!', {});
            workTimerInt = setInterval(workTimerTick, 1000);
        }
    }
}

document.getElementById('work-start-btn').addEventListener('click', () => {
    if (workTimerInt) return;
    const workMins = parseInt(document.getElementById('work-duration').value)||25;
    workSecs = workMins*60; workPhase = 'working'; workCycle = 1;
    document.getElementById('work-cycle-label').textContent = 'Ciclo 1';
    document.getElementById('work-status-label').textContent = '💼 Trabajando';
    document.getElementById('work-config').style.display = 'none';
    document.getElementById('work-start-btn').classList.add('hidden');
    document.getElementById('work-pause-btn').classList.remove('hidden');
    workTimerInt = setInterval(workTimerTick, 1000);
    playUISound('add');
});

document.getElementById('work-pause-btn').addEventListener('click', () => {
    if (workTimerInt) {
        clearInterval(workTimerInt); workTimerInt = null;
        document.getElementById('work-pause-btn').innerHTML = '<i class="fa-solid fa-play mr-8"></i>Reanudar';
    } else {
        workTimerInt = setInterval(workTimerTick, 1000);
        document.getElementById('work-pause-btn').innerHTML = '<i class="fa-solid fa-pause mr-8"></i>Pausar';
    }
});

document.getElementById('work-stop-btn').addEventListener('click', () => {
    clearInterval(workTimerInt); workTimerInt = null;
    workPhase = 'idle'; workCycle = 1; workSecs = 0;
    document.getElementById('work-timer-display').textContent = '00:00';
    document.getElementById('work-status-label').textContent = 'Listo';
    document.getElementById('work-cycle-label').textContent = 'Ciclo 1';
    document.getElementById('work-config').style.display = 'flex';
    document.getElementById('work-start-btn').classList.remove('hidden');
    document.getElementById('work-pause-btn').classList.add('hidden');
    document.getElementById('work-pause-btn').innerHTML = '<i class="fa-solid fa-pause mr-8"></i>Pausar';
});

// --- CALENDAR ---
let currDate = new Date();
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById('cal-month-year').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const diff = firstDay === 0 ? 6 : firstDay - 1; // Mon to Sun
    const daysInMonth = new Date(year, month+1, 0).getDate();
    
    const today = new Date();
    
    // Previous month filler
    for(let i=0; i<diff; i++) {
        const d = document.createElement('div');
        d.className = 'cal-day other-month';
        grid.appendChild(d);
    }
    
    for(let i=1; i<=daysInMonth; i++) {
        const d = document.createElement('div');
        d.className = 'cal-day';
        d.textContent = i;
        if(year===today.getFullYear() && month===today.getMonth() && i===today.getDate()) d.classList.add('today');
        
        const dateStr = `${year}-${pad(month+1)}-${pad(i)}`;
        const hasEv = appState.calendar.some(e=>e.date === dateStr);
        if(hasEv) d.classList.add('has-event');
        
        d.addEventListener('click', () => openDayPanel(dateStr, d));
        grid.appendChild(d);
    }
}
document.getElementById('cal-prev').addEventListener('click', () => { currDate.setMonth(currDate.getMonth()-1); renderCalendar(); });
document.getElementById('cal-next').addEventListener('click', () => { currDate.setMonth(currDate.getMonth()+1); renderCalendar(); });

let currentSelDate = null;
function openDayPanel(dateStr, el) {
    document.getElementById('calendar-grid').querySelectorAll('.cal-day').forEach(d=>d.classList.remove('selected'));
    if(el) el.classList.add('selected');
    currentSelDate = dateStr;
    document.getElementById('cal-event-panel').style.display = 'block';
    document.getElementById('cal-selected-date').textContent = dateStr;
    renderDayEvents();
}
document.getElementById('close-event-panel').addEventListener('click', () => { document.getElementById('cal-event-panel').style.display='none'; });

function renderDayEvents() {
    const list = document.getElementById('day-events-list');
    list.innerHTML = '';
    const evs = appState.calendar.filter(e => e.date === currentSelDate).sort((a,b)=> a.time.localeCompare(b.time));
    evs.forEach((e, i) => {
        const li = document.createElement('li');
        li.className = "flex-between align-center py-8 border-bottom";
        li.innerHTML = `
            <div><span class="font-bold text-primary mr-8">${e.time}</span> <span>${e.title}</span></div>
            <button class="icon-btn btn-sm hover-text-danger p-0 w-24 h-24" onclick="deleteEvent('${e.id}', event)"><i class="fa-solid fa-trash text-xs"></i></button>
        `;
        li.style.animationDelay = (i * 40) + 'ms';
        animateItemIn(li);
        list.appendChild(li);
    });
}
document.getElementById('add-event-btn').addEventListener('click', () => {
    const title = document.getElementById('event-title').value;
    const time = document.getElementById('event-time').value;
    if(!title || !time || !currentSelDate) return;
    appState.calendar.push({id: Date.now().toString(), date: currentSelDate, time, title, notified: false});
    saveState(STORE_KEYS.CALENDAR);
    document.getElementById('event-title').value = '';
    renderDayEvents();
    renderCalendar();
});
window.deleteEvent = function(id, event) {
    const btn = event ? event.currentTarget : null;
    const li = btn ? btn.closest('li') : null;
    if (li) {
        animateItemOut(li, () => {
            appState.calendar = appState.calendar.filter(e => e.id !== id);
            saveState(STORE_KEYS.CALENDAR);
            renderDayEvents();
            renderCalendar();
        }, '#14b8a6');
        return;
    }
    appState.calendar = appState.calendar.filter(e => e.id !== id);
    saveState(STORE_KEYS.CALENDAR);
    renderDayEvents();
    renderCalendar();
};

// Calendar Event Checker (every 60s)
setInterval(() => {
    const now = new Date();
    const dStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    const hStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    
    let changed = false;
    appState.calendar.forEach(e => {
        if(!e.notified && e.date === dStr && e.time === hStr) {
            playTinTin();
            notifyUser(`📅 Evento: ${e.title}`, {body: `Es hora: ${e.time}`});
            e.notified = true;
            changed = true;
        }
    });
    if(changed) saveState(STORE_KEYS.CALENDAR);
}, 60000);
// --- OFFICE LITE ---
// Tabs
document.querySelectorAll('.js-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const p = btn.closest('.module');
        p.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        p.querySelectorAll('.tab-pane').forEach(b=>b.style.display='none');
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).style.display = 'block';
        if(btn.dataset.tab === 'writer') renderWriterDocs();
        if(btn.dataset.tab === 'slides') renderSlidesThumbs();
    });
});

// WRITER
function renderWriterDocs() {
    const list = document.getElementById('writer-docs-list');
    list.innerHTML = '';
    const empty = document.getElementById('fm-writer-empty');
    if(appState.writer_docs.length === 0) {
        if(empty) empty.classList.remove('hidden');
    } else {
        if(empty) empty.classList.add('hidden');
        appState.writer_docs.forEach(doc => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="truncate" title="${doc.name}">${doc.name}</span> <span class="text-xs text-muted w-100">${new Date(doc.date).toLocaleDateString()}</span>`;
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => loadWriterDoc(doc.id));
            list.appendChild(li);
        });
    }
}
let currentWriterId = null;
function loadWriterDoc(id) {
    const doc = appState.writer_docs.find(d=>d.id===id);
    if(doc) {
        currentWriterId = id;
        document.getElementById('writer-editor').innerHTML = doc.content;
    }
}
document.getElementById('writer-new').addEventListener('click', () => {
    currentWriterId = null;
    document.getElementById('writer-editor').innerHTML = '';
});
document.getElementById('writer-save').addEventListener('click', () => {
    const content = document.getElementById('writer-editor').innerHTML;
    if(!content.trim()) return;
    
    if(currentWriterId) {
        const doc = appState.writer_docs.find(d=>d.id===currentWriterId);
        if(doc) { doc.content = content; doc.date = Date.now(); }
    } else {
        let name = prompt("Nombre del documento:", "Nuevo Documento");
        if(name === null) return;
        if(!name.trim()) name = "Sin Título";
        currentWriterId = Date.now().toString();
        appState.writer_docs.push({id: currentWriterId, name, content, date: Date.now()});
    }
    saveState(STORE_KEYS.WRITER);
    renderWriterDocs();
    populateExportSelect();
    renderFiles();
});

// Formatting tools Writer

function applyFormat(command, value = null) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  document.execCommand(command, false, value);
}

document.querySelectorAll('.format-btn:not(.slide-fmt)').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = btn.dataset.cmd;
        if (['bold', 'italic', 'underline'].includes(cmd)) {
          applyFormat(cmd);
          btn.classList.toggle('active');
          document.getElementById('writer-editor').focus();
        } else {
          applyFormat(cmd);
          btn.classList.toggle('active');
          document.getElementById('writer-editor').focus();
        }
    });
});
document.getElementById('writer-color').addEventListener('input', (e) => applyFormat('foreColor', e.target.value));
document.getElementById('writer-hilite').addEventListener('input', (e) => applyFormat('hiliteColor', e.target.value));
document.getElementById('writer-size').addEventListener('change', (e) => applyFormat('fontSize', e.target.value));

document.getElementById('writer-save-mobile')?.addEventListener('click', () => {
  document.getElementById('writer-save').click();
});
document.getElementById('writer-new-mobile')?.addEventListener('click', () => {
  document.getElementById('writer-new').click();
});

// CALC
function generateCalcTable(rows, cols) {
    const table = document.getElementById('calc-table');
    table.innerHTML = '';
    // Header row
    let thead = '<tr><th>#</th>';
    for(let c=0; c<cols; c++) thead += `<th>${String.fromCharCode(65+c)}</th>`;
    thead += '</tr>';
    table.innerHTML += thead;
    
    // Body
    for(let r=0; r<rows; r++) {
        let tr = `<tr><th>${r+1}</th>`;
        for(let c=0; c<cols; c++) tr += `<td contenteditable="true" data-c="${c}"></td>`;
        tr += '</tr>';
        table.innerHTML += tr;
    }
}
document.getElementById('calc-create').addEventListener('click', () => {
    const r = document.getElementById('calc-rows').value;
    const c = document.getElementById('calc-cols').value;
    generateCalcTable(r, c);
});
document.getElementById('calc-autosum').addEventListener('click', () => {
    const table = document.getElementById('calc-table');
    const rows = table.querySelectorAll('tr:not(:first-child):not(.totals-row)');
    if(rows.length===0) return;
    const cols = rows[0].querySelectorAll('td').length;
    
    // Remove existing total row
    const existTotal = table.querySelector('.totals-row');
    if(existTotal) existTotal.remove();
    
    let sums = Array(cols).fill(0);
    rows.forEach(tr => {
        tr.querySelectorAll('td').forEach((td, i) => {
            const val = parseFloat(td.textContent);
            if(!isNaN(val)) sums[i] += val;
        });
    });
    
    let totalTr = `<tr class="totals-row"><th>TOTAL</th>`;
    sums.forEach(s => totalTr += `<td>${s.toFixed(2)}</td>`);
    totalTr += '</tr>';
    table.innerHTML += totalTr;
});
document.getElementById('calc-save').addEventListener('click', () => {
    let name = prompt("Nombre de la tabla Calc:");
    if(!name) return;
    const tableOrig = document.getElementById('calc-table');
    appState.calc_tables.push({
        id: Date.now().toString(),
        name,
        date: Date.now(),
        html: tableOrig.innerHTML,
        rows: document.getElementById('calc-rows').value,
        cols: document.getElementById('calc-cols').value
    });
    saveState(STORE_KEYS.CALC);
    renderFiles();
});
document.getElementById('calc-export-pdf').addEventListener('click', async () => {
  try {
    await new Promise(r => setTimeout(r, 30));
    const { jsPDF } = window.jspdf;
    if (!jsPDF) { alert('jsPDF no disponible'); return; }
    
    const table = document.getElementById('calc-table');
    if (!table) { alert('No hay tabla activa'); return; }
    
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.setFontSize(14);
    pdf.text('Tabla Calc — Productivity V2', 14, 16);
    pdf.setFontSize(9);
    
    const rows = table.querySelectorAll('tr');
    let y = 26;
    const colWidth = Math.min(35, 260 / Math.max(1, rows[0]?.querySelectorAll('th,td').length || 1));
    
    rows.forEach((row, ri) => {
      const cells = row.querySelectorAll('th, td');
      let x = 14;
      cells.forEach(cell => {
        const text = (cell.innerText || cell.textContent || '').trim().slice(0, 20);
        if (ri === 0) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFillColor(60, 60, 80);
          pdf.rect(x, y - 4, colWidth - 1, 8, 'F');
          pdf.setTextColor(255, 255, 255);
        } else {
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(30, 30, 30);
        }
        pdf.text(text, x + 1, y);
        x += colWidth;
      });
      y += 9;
      if (y > 190) { pdf.addPage(); y = 20; }
    });
    
    pdf.save('tabla_calc.pdf');
  } catch(err) {
    console.error(err);
    alert('Error al exportar: ' + err.message);
  }
});

// SLIDES
let currentDeckId = null;
let currentSlideIdx = 0;
let slidesArray = []; // [{title, content, bg, img...}]

function renderSlidesThumbs() {
    const list = document.getElementById('slides-thumbnails');
    list.innerHTML = '';
    slidesArray.forEach((s, i) => {
        const thumb = document.createElement('div');
        thumb.className = `slide-thumb ${i===currentSlideIdx?'active':''}`;
        thumb.innerHTML = `
            <div class="text-xs absolute top-8 left-8 bg-black-50 text-white px-4 rounded">${i+1}</div>
            <div class="text-xs truncate max-w-full px-16 text-center font-bold" style="color: ${s.bg==='#000000'?'#fff':'#000'}">${s.title || 'Slide '+ (i+1)}</div>
            <button class="icon-btn btn-sm bg-danger text-white rounded-full p-4 w-24 h-24 del-btn flex-center border-none shadow-md" onclick="event.stopPropagation(); deleteSlide(${i})"><i class="fa-solid fa-xmark text-xs"></i></button>
        `;
        thumb.style.backgroundColor = s.bg || '#ffffff';
        if(s.bgImage) thumb.style.backgroundImage = `url(${s.bgImage})`;
        thumb.style.backgroundSize = 'cover';
        
        thumb.addEventListener('click', () => loadSlide(i));
        list.appendChild(thumb);
    });
    if(slidesArray.length === 0) list.innerHTML = `<p class="p-16 text-muted text-xs text-center">No hay diapositivas.</p>`;
}

function renderSlideToDOM(s) {
    // Render slide data into the DOM WITHOUT saving first
    document.getElementById('slide-title-input').value = s.title || '';
    document.getElementById('slide-editor').innerHTML = s.content || '';
    const container = document.getElementById('slide-active-container');
    container.style.backgroundColor = s.bg || '#ffffff';
    container.style.backgroundImage = s.bgImage ? `url(${s.bgImage})` : 'none';
}

function loadSlide(i) {
    saveCurrentSlide();          // save the PREVIOUS slide first
    currentSlideIdx = i;
    const s = slidesArray[i];
    if (!s) return;
    renderSlideToDOM(s);         // then render the NEW slide
    renderSlidesThumbs();
    const el = document.getElementById('slide-counter-display');
    if (el) el.textContent = `${currentSlideIdx + 1} / ${slidesArray.length || 1}`;
}

function saveCurrentSlide() {
    if (currentSlideIdx < 0 || !slidesArray[currentSlideIdx]) return;
    slidesArray[currentSlideIdx].title   = document.getElementById('slide-title-input').value;
    slidesArray[currentSlideIdx].content = document.getElementById('slide-editor').innerHTML;
    slidesArray[currentSlideIdx].bg      = document.getElementById('slide-active-container').style.backgroundColor || '#ffffff';
}

document.getElementById('slide-add').addEventListener('click', () => {
    saveCurrentSlide();                              // 1. save current slide
    slidesArray.push({title:'', content:'', bg:'#ffffff'}); // 2. push NEW empty slide
    currentSlideIdx = slidesArray.length - 1;       // 3. point to new slide
    renderSlideToDOM(slidesArray[currentSlideIdx]); // 4. render empty — NO saveCurrentSlide call
    renderSlidesThumbs();
    const el = document.getElementById('slide-counter-display');
    if (el) el.textContent = `${currentSlideIdx + 1} / ${slidesArray.length}`;
});

window.deleteSlide = function(i) {
    slidesArray.splice(i, 1);
    if (currentSlideIdx >= slidesArray.length) currentSlideIdx = Math.max(0, slidesArray.length - 1);
    if (slidesArray.length === 0) {
        renderSlideToDOM({title:'', content:'', bg:'#ffffff'});
    } else {
        // Don't call loadSlide (which saves first) - just render directly
        renderSlideToDOM(slidesArray[currentSlideIdx]);
    }
    renderSlidesThumbs();
    const el = document.getElementById('slide-counter-display');
    if (el) el.textContent = slidesArray.length === 0 ? '0 / 0' : `${currentSlideIdx + 1} / ${slidesArray.length}`;
};

document.getElementById('deck-save').addEventListener('click', () => {
    saveCurrentSlide();
    if(slidesArray.length === 0) return;
    if(currentDeckId) {
        const deck = appState.slides_decks.find(d=>d.id===currentDeckId);
        if(deck) { deck.slides = JSON.parse(JSON.stringify(slidesArray)); deck.date = Date.now(); }
    } else {
        let name = prompt("Nombre de la presentación:", "Nueva Presentación");
        if(!name) return;
        currentDeckId = Date.now().toString();
        appState.slides_decks.push({
            id: currentDeckId,
            name,
            date: Date.now(),
            slides: JSON.parse(JSON.stringify(slidesArray))
        });
    }
    saveState(STORE_KEYS.SLIDES);
    renderFiles();
});

// Formatting tools Slides
document.querySelectorAll('.slide-fmt').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = btn.dataset.cmd;
        applyFormat(cmd);
        btn.classList.toggle('active');
        document.getElementById('slide-editor').focus();
    });
});
document.getElementById('slide-text-color').addEventListener('input', (e) => applyFormat('foreColor', e.target.value));
document.getElementById('slide-hilite-color').addEventListener('input', (e) => applyFormat('hiliteColor', e.target.value));
document.getElementById('slide-bg-color').addEventListener('input', (e) => {
    document.getElementById('slide-active-container').style.backgroundColor = e.target.value;
    if(slidesArray[currentSlideIdx]) slidesArray[currentSlideIdx].bg = e.target.value;
    renderSlidesThumbs();
});

document.getElementById('slide-insert-img').addEventListener('click', () => insertImageToSlide());

function insertImageToSlide() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      const img = document.createElement('img');
      img.src = base64;
      img.style.cssText = 'max-width:100%;max-height:300px;display:block;margin:8px auto;';
      const editor = document.getElementById('slide-editor');
      if (!editor) return;
      editor.focus();
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.insertNode(img);
      } else {
        editor.appendChild(img);
      }
      saveCurrentSlide();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// PRESENTATION FULLSCREEN
let presentationIndex = 0;

function startPresentation() {
  saveCurrentSlide();
  if(slidesArray.length === 0) return;
  const overlay = document.getElementById('presentation-overlay');
  if (!overlay) {
    const el = document.createElement('div');
    el.id = 'presentation-overlay';
    el.style.cssText = `
      display:none; position:fixed; inset:0; background:#000;
      z-index:9999; justify-content:center; align-items:center;
      flex-direction:column;
    `;
    el.innerHTML = `
      <button id="exit-presentation" style="position:absolute;top:16px;right:16px;
        background:rgba(255,255,255,0.15);border:none;color:white;padding:8px 14px;
        border-radius:8px;cursor:pointer;font-size:13px;z-index:10000;">✕ Salir</button>
      <div id="presentation-slide-view" style="width:90vw;max-width:1200px;
        aspect-ratio:16/9;background:white;border-radius:12px;overflow:hidden;
        display:flex;flex-direction:column;padding:40px;box-sizing:border-box;">
      </div>
      <div style="display:flex;gap:24px;margin-top:20px;">
        <button id="prev-slide-btn" style="background:rgba(255,255,255,0.2);border:none;
          color:white;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:18px;">←</button>
        <span id="slide-counter" style="color:white;align-self:center;font-size:14px;"></span>
        <button id="next-slide-btn" style="background:rgba(255,255,255,0.2);border:none;
          color:white;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:18px;">→</button>
      </div>
    `;
    document.body.appendChild(el);
    document.getElementById('exit-presentation').onclick = stopPresentation;
    document.getElementById('prev-slide-btn').onclick = () => navigatePresentation(-1);
    document.getElementById('next-slide-btn').onclick = () => navigatePresentation(1);
  }

  presentationIndex = currentSlideIdx;
  const overlay2 = document.getElementById('presentation-overlay');
  overlay2.style.display = 'flex';
  if (overlay2.requestFullscreen) overlay2.requestFullscreen().catch(() => {});
  else if (overlay2.webkitRequestFullscreen) overlay2.webkitRequestFullscreen().catch(() => {});
  else if (overlay2.msRequestFullscreen) overlay2.msRequestFullscreen().catch(() => {});
  renderPresentationSlide();
}

function stopPresentation() {
  if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch(() => {});
  else if (document.msExitFullscreen) document.msExitFullscreen().catch(() => {});
  const overlay = document.getElementById('presentation-overlay');
  if(overlay) overlay.style.display = 'none';
}

function navigatePresentation(dir) {
  presentationIndex = Math.max(0, Math.min(slidesArray.length - 1, presentationIndex + dir));
  renderPresentationSlide();
}

function renderPresentationSlide() {
  const slide = slidesArray[presentationIndex];
  if(!slide) return;
  const view = document.getElementById('presentation-slide-view');
  view.style.background = slide.bg || '#ffffff';
  if (slide.bgImage) view.style.backgroundImage = `url(${slide.bgImage})`;
  else view.style.backgroundImage = 'none';
  view.style.backgroundSize = 'contain';
  view.innerHTML = `
    <h1 style="font-size:2.5em;margin:0 0 20px;color:#1a1a1a;text-align:center;">${slide.title || ''}</h1>
    <div style="font-size:1.2em;color:#333;flex:1;overflow-y:auto;" class="custom-scrollbar">${slide.content || ''}</div>
  `;
  document.getElementById('slide-counter').textContent =
    `${presentationIndex + 1} / ${slidesArray.length}`;
}

document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('presentation-overlay');
  if (overlay && overlay.style.display === 'flex') {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Space') { e.preventDefault(); navigatePresentation(1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); navigatePresentation(-1); }
    if (e.key === 'Escape') stopPresentation();
  }
});

document.getElementById('slide-present').addEventListener('click', startPresentation);

// --- SLIDES: FLECHAS Y BOTONES MÓVIL ---
function updateSlideCounter() {
    const el = document.getElementById('slide-counter-display');
    if (el) el.textContent = `${currentSlideIdx + 1} / ${slidesArray.length || 1}`;
}

// Sobreescribir renderSlidesThumbs para actualizar contador
const _origRenderThumbs = renderSlidesThumbs;
// Patch loadSlide para actualizar contador
const _origLoadSlide = loadSlide;

// Flechas de navegación
function navigateSlide(dir) {
    if (slidesArray.length === 0) return;
    saveCurrentSlide();                                          // 1. save current
    currentSlideIdx = (currentSlideIdx + dir + slidesArray.length) % slidesArray.length;
    renderSlideToDOM(slidesArray[currentSlideIdx]);             // 2. render target directly
    renderSlidesThumbs();
    const el = document.getElementById('slide-counter-display');
    if (el) el.textContent = `${currentSlideIdx + 1} / ${slidesArray.length}`;
}

document.getElementById('slide-prev-btn').addEventListener('click', () => navigateSlide(-1));
document.getElementById('slide-next-btn').addEventListener('click', () => navigateSlide(1));

// Botones móvil: añadir
document.getElementById('slide-add-mobile').addEventListener('click', () => {
    saveCurrentSlide();
    slidesArray.push({title:'', content:'', bg: '#ffffff'});
    currentSlideIdx = slidesArray.length - 1;
    renderSlideToDOM(slidesArray[currentSlideIdx]);
    renderSlidesThumbs();
    const el = document.getElementById('slide-counter-display');
    if (el) el.textContent = `${currentSlideIdx + 1} / ${slidesArray.length}`;
});

// Botones móvil: eliminar
document.getElementById('slide-delete-mobile').addEventListener('click', () => {
    if (slidesArray.length === 0) return;
    if (!confirm('¿Eliminar esta diapositiva?')) return;
    window.deleteSlide(currentSlideIdx);
    updateSlideCounter();
});

// Botones móvil: imagen
document.getElementById('slide-insert-img-mobile').addEventListener('click', () => insertImageToSlide());
document.getElementById('slide-img-upload-mobile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.style.cssText = 'max-width:100%;max-height:200px;display:block;margin:8px auto;border-radius:8px;';
        const editor = document.getElementById('slide-editor');
        editor.focus();
        editor.appendChild(img);
        saveCurrentSlide();
    };
    reader.readAsDataURL(file);
    e.target.value = '';
});

// Botones móvil: guardar
document.getElementById('deck-save-mobile').addEventListener('click', () => {
    document.getElementById('deck-save').click();
});

// Botones móvil: presentar
document.getElementById('slide-present-mobile').addEventListener('click', startPresentation);

// Actualizar contador al cargar slides
setTimeout(updateSlideCounter, 500);


// PDF Export
function populateExportSelect() {
    const sel = document.getElementById('export-writer-select');
    sel.innerHTML = '';
    appState.writer_docs.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `${d.name} (${new Date(d.date).toLocaleDateString()})`;
        sel.appendChild(opt);
    });
}
document.getElementById('btn-export-writer').addEventListener('click', async () => {
    const id = document.getElementById('export-writer-select').value;
    if (!id) return;
    await exportWriterDocToPDF(id);
});

async function exportWriterDocToPDF(docId) {
  try {
    // Liberar hilo principal antes de procesar
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      alert('Error: jsPDF no está disponible. Comprueba tu conexión.');
      return;
    }

    const docs = appState.writer_docs || []; // using existing runtime state (appState)
    const doc_data = docs.find(d => d.id === docId);
    if (!doc_data) { alert('Documento no encontrado'); return; }

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    
    // Extraer texto plano del HTML guardado
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = doc_data.contenido_html || doc_data.content || '';
    const plainText = tempDiv.innerText || tempDiv.textContent || '';
    
    // Configurar fuente y tamaño
    pdf.setFont('helvetica');
    pdf.setFontSize(12);
    
    // Título del documento
    pdf.setFontSize(18);
    pdf.text(doc_data.nombre || doc_data.name || 'Documento', 10, 20);
    pdf.setFontSize(12);
    
    // Dividir texto en líneas que quepan en A4
    const lines = pdf.splitTextToSize(plainText, 185);
    
    // Añadir páginas si el texto es largo
    let y = 35;
    for (let i = 0; i < lines.length; i++) {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(lines[i], 10, y);
      y += 7;
    }
    
    pdf.save((doc_data.nombre || doc_data.name || 'documento') + '.pdf');
    
  } catch (err) {
    console.error('Error exportando PDF:', err);
    alert('Error al exportar: ' + err.message);
  }
}

document.getElementById('export-local-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const btn = document.getElementById('btn-export-local');
    const nameEl = document.getElementById('export-local-name');
    if(file) {
        btn.disabled = false;
        nameEl.textContent = file.name;
        nameEl.classList.remove('hidden');
    } else {
        btn.disabled = true;
        nameEl.classList.add('hidden');
    }
});

document.getElementById('btn-export-local').addEventListener('click', async () => {
    const file = document.getElementById('export-local-file').files[0];
    if(!file) return;
    const ext = file.name.split('.').pop().toLowerCase();

    try {
        await new Promise(r => setTimeout(r, 0));
        const { jsPDF } = window.jspdf;
        if (!jsPDF) { alert("jsPDF no cargado"); return; }
        const pdf = new jsPDF();
        
        const lang = appState.config ? appState.config.lang : 'es';
        if (lang === 'zh') {
            pdf.setFont('helvetica');
            pdf.setFontSize(8);
            pdf.text('Nota: caracteres CJK en PDF requieren fuente embebida', 10, 285);
        }

        if(['jpg','jpeg','png','webp'].includes(ext)) {
            exportImageToPDF(file);
        } else if(ext === 'txt') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = pdf.splitTextToSize(e.target.result, 180);
                pdf.text(text, 10, 10);
                pdf.save(file.name + '.pdf');
            };
            reader.readAsText(file);
        } else if(ext === 'docx') {
            alert("Conversión de DOCX limitada: se exportará el texto plano (Solo simulación).");
            const reader = new FileReader();
            reader.onload = () => {
                const text = pdf.splitTextToSize("Contenido simulado de DOCX: " + file.name, 180);
                pdf.text(text, 10, 10);
                pdf.save(file.name + '.pdf');
            };
            reader.readAsArrayBuffer(file);
        }
    } catch (err) {
        console.error('Error exportando PDF:', err);
        alert('Error al exportar: ' + err.message);
    }
});

function exportImageToPDF(file) {
  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      pdf.addImage(e.target.result, 'JPEG', 10, 10, 190, 0);
      pdf.save(file.name.replace(/\.[^/.]+$/, '') + '.pdf');
    } catch(err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsDataURL(file);
}

async function exportHtmlToJsPdf(el, filename) {
    try {
        await new Promise(r => setTimeout(r, 0));
        const { jsPDF } = window.jspdf;
        if (!jsPDF) { alert("jsPDF no cargado"); return; }
        const pdf = new jsPDF('p', 'pt', 'a4');
        
        const lang = appState.config ? appState.config.lang : 'es';
        if (lang === 'zh') {
            pdf.setFont('helvetica');
            pdf.setFontSize(8);
            pdf.text('Nota: caracteres CJK en PDF requieren fuente embebida', 10, 830);
        }
        
        pdf.html(el, {
            callback: function (doc) { doc.save(filename); },
            x: 10, y: 10,
            width: 500, //target width in the PDF document
            windowWidth: 800 //window width in CSS pixels
        });
    } catch (err) {
        console.error('Error exportando PDF:', err);
        alert('Error al exportar: ' + err.message);
    }
}

// OCR Scanner
let ocrLang = 'spa'; // default, updated by applyTranslations
const dropzone = document.getElementById('ocr-drop-zone');
const ocrFile = document.getElementById('ocr-file-input');
const ocrPrevC = document.getElementById('ocr-preview-container');
const ocrPrev = document.getElementById('ocr-preview-img');
const ocrProgC = document.getElementById('ocr-progress-container');
const ocrProgBar = document.getElementById('ocr-progress-bar');
const ocrProgText = document.getElementById('ocr-progress-text');
const ocrResC = document.getElementById('ocr-result-container');
const ocrText = document.getElementById('ocr-result-text');

dropzone.addEventListener('click', () => ocrFile.click());
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if(e.dataTransfer.files.length) handleOcrFile(e.dataTransfer.files[0]);
});
ocrFile.addEventListener('change', (e) => { if(e.target.files.length) handleOcrFile(e.target.files[0]); });

function handleOcrFile(file) {
    if(!file.type.startsWith('image/')) return alert("Por favor, sube una imagen.");
    const reader = new FileReader();
    reader.onload = (e) => {
        ocrPrev.src = e.target.result;
        ocrPrevC.style.display = 'block';
        dropzone.style.display = 'none';
        ocrResC.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

document.getElementById('ocr-scan-btn').addEventListener('click', async () => {
    if(!ocrPrev.src) return alert("Sube una imagen primero");
    
    ocrProgC.style.display = 'block';
    ocrProgText.textContent = "Iniciando motor AI...";
    ocrProgBar.style.width = '0%';
    try {
        const result = await Tesseract.recognize(ocrPrev.src, ocrLang, {
            logger: m => {
                if(m.status === 'recognizing text') {
                    const pct = Math.round(m.progress * 100);
                    ocrProgBar.style.width = pct + '%';
                    ocrProgText.textContent = `Escaneando: ${pct}%`;
                }
            }
        });
        ocrText.value = result.data.text;
        ocrProgC.style.display = 'none';
        ocrResC.classList.remove('hidden');
    } catch (err) {
        alert("Error en OCR: " + err.message);
        ocrProgC.style.display = 'none';
    }
});
document.getElementById('btn-ocr-to-writer').addEventListener('click', () => {
    const text = ocrText.value.trim();
    if(!text) return;
    appState.writer_docs.push({
        id: Date.now().toString(),
        name: "Escaneo " + new Date().toLocaleDateString(),
        content: `<p>${text.replace(/\n/g, '<br>')}</p>`,
        date: Date.now()
    });
    saveState(STORE_KEYS.WRITER);
    alert("Guardado en Writer.");
});
document.getElementById('btn-ocr-to-pdf').addEventListener('click', async () => {
    const text = ocrText.value.trim();
    if(!text) return;

    try {
        await new Promise(r => setTimeout(r, 0));
        const { jsPDF } = window.jspdf;
        if (!jsPDF) return;
        const pdf = new jsPDF();
        
        const lang = appState.config ? appState.config.lang : 'es';
        if (lang === 'zh') {
            pdf.setFont('helvetica');
            pdf.setFontSize(8);
            pdf.text('Nota: caracteres CJK en PDF requieren fuente embebida', 10, 285);
        }

        const split = pdf.splitTextToSize(text, 180);
        pdf.text(split, 10, 10);
        pdf.save(`OCR_${Date.now()}.pdf`);
    } catch(err) {
        console.error('Error exportando PDF:', err);
        alert('Error al exportar: ' + err.message);
    }
});

// --- ARCHIVOS ---
function renderFiles() {
    const renderList = (data, containerId, countId, onOpen, onDel, onRename) => {
        const c = document.getElementById(containerId);
        c.innerHTML = '';
        document.getElementById(countId).textContent = data.length;
        if(data.length === 0) {
            c.nextElementSibling?.classList.remove('hidden'); // show empty state if exists
        } else {
            c.nextElementSibling?.classList.add('hidden');
            data.forEach(item => {
                const li = document.createElement('li');
                li.className = "flex-between align-center p-16 file-list-item transition-colors";
                li.innerHTML = `
                    <div class="flex-1 min-w-0 mr-16">
                        <div class="font-bold text-md truncate">${item.name}</div>
                        <div class="text-xs text-muted">${new Date(item.date).toLocaleString()}</div>
                    </div>
                    <div class="flex-row gap-8 align-center">
                        <button class="btn btn-outline btn-sm px-12" onclick="${onOpen}('${item.id}')">Abrir</button>
                        <button class="icon-btn btn-sm text-primary hover-text-primary bg-primary-light" onclick="${onRename}('${item.id}')"><i class="fa-solid fa-pen text-xs"></i></button>
                        <button class="icon-btn btn-sm text-danger hover-text-white hover-bg-danger bg-danger-light" onclick="${onDel}('${item.id}')"><i class="fa-solid fa-trash text-xs"></i></button>
                    </div>
                `;
                c.appendChild(li);
            });
        }
    };
    
    // Update Total files count
    document.getElementById('total-files-count').textContent = appState.writer_docs.length + appState.calc_tables.length + appState.slides_decks.length;

    renderList(appState.writer_docs, 'fm-writer-list', 'count-writer', 'openWriterFromFM', 'delWriterDoc', 'renWriterDoc');
    renderList(appState.calc_tables, 'fm-calc-list', 'count-calc', 'openCalcFromFM', 'delCalcTable', 'renCalcTable');
    renderList(appState.slides_decks, 'fm-slides-list', 'count-slides', 'openSlidesFromFM', 'delSlidesDeck', 'renSlidesDeck');
}

// Window functions for Archivos
window.openWriterFromFM = (id) => {
    document.querySelector('.sidebar-nav .nav-btn[data-target="office"]').click();
    document.querySelector('.js-tabs .tab-btn[data-tab="writer"]').click();
    loadWriterDoc(id);
};
window.delWriterDoc = (id) => { if(confirm("¿Eliminar documento?")) { appState.writer_docs = appState.writer_docs.filter(d=>d.id!==id); saveState(STORE_KEYS.WRITER); renderFiles(); } };
window.renWriterDoc = (id) => {
    const doc = appState.writer_docs.find(d=>d.id===id);
    if(doc) {
        const n = prompt("Nuevo nombre:", doc.name);
        if(n && n.trim()) { doc.name = n.trim(); saveState(STORE_KEYS.WRITER); renderFiles(); }
    }
};

window.openCalcFromFM = (id) => {
    document.querySelector('.sidebar-nav .nav-btn[data-target="office"]').click();
    document.querySelector('.js-tabs .tab-btn[data-tab="calc"]').click();
    const table = appState.calc_tables.find(t=>t.id===id);
    if(table) {
        document.getElementById('calc-table').innerHTML = table.html;
        document.getElementById('calc-rows').value = table.rows;
        document.getElementById('calc-cols').value = table.cols;
    }
};
window.delCalcTable = (id) => { if(confirm("¿Eliminar tabla?")) { appState.calc_tables = appState.calc_tables.filter(d=>d.id!==id); saveState(STORE_KEYS.CALC); renderFiles(); } };
window.renCalcTable = (id) => {
    const table = appState.calc_tables.find(d=>d.id===id);
    if(table) {
        const n = prompt("Nuevo nombre:", table.name);
        if(n && n.trim()) { table.name = n.trim(); saveState(STORE_KEYS.CALC); renderFiles(); }
    }
};

window.openSlidesFromFM = (id) => {
    document.querySelector('.sidebar-nav .nav-btn[data-target="office"]').click();
    document.querySelector('.js-tabs .tab-btn[data-tab="slides"]').click();
    const deck = appState.slides_decks.find(d=>d.id===id);
    if(deck) {
        currentDeckId = id;
        slidesArray = JSON.parse(JSON.stringify(deck.slides));
        loadSlide(0);
    }
};
window.delSlidesDeck = (id) => { if(confirm("¿Eliminar presentación?")) { appState.slides_decks = appState.slides_decks.filter(d=>d.id!==id); saveState(STORE_KEYS.SLIDES); renderFiles(); } };
window.renSlidesDeck = (id) => {
    const deck = appState.slides_decks.find(d=>d.id===id);
    if(deck) {
        const n = prompt("Nuevo nombre:", deck.name);
        if(n && n.trim()) { deck.name = n.trim(); saveState(STORE_KEYS.SLIDES); renderFiles(); }
    }
};

// Search File manager
document.getElementById('file-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const clrBtn = document.getElementById('clear-search-btn');
    if(q) clrBtn.classList.remove('hidden'); else clrBtn.classList.add('hidden');
    
    document.querySelectorAll('.file-manager-list li').forEach(li => {
        const name = li.querySelector('.truncate').textContent.toLowerCase();
        li.style.display = name.includes(q) ? 'flex' : 'none';
    });
});
document.getElementById('clear-search-btn').addEventListener('click', () => {
    const input = document.getElementById('file-search');
    input.value = '';
    input.dispatchEvent(new Event('input'));
});

// Collapsible logic
document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if(content.style.display === 'block' || window.getComputedStyle(content).display === 'block') {
            content.style.display = 'none';
            header.querySelector('.icon-collapse').style.transform = 'rotate(0deg)';
        } else {
            content.style.display = 'block';
            header.querySelector('.icon-collapse').style.transform = 'rotate(180deg)';
        }
    });
});


// --- AJUSTES & INIT ---
const _themeToggle = document.getElementById('theme-toggle');
if (_themeToggle) _themeToggle.addEventListener('change', (e) => {
    appState.config.theme = e.target.checked ? 'dark' : 'light';
    applyTheme(appState.config.theme, appState.config.accent);
    saveState(STORE_KEYS.CONFIG);
});

document.querySelectorAll('.color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
        appState.config.accent = btn.dataset.color;
        applyTheme(appState.config.theme, appState.config.accent);
        saveState(STORE_KEYS.CONFIG);
    });
});

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        appState.config.lang = btn.dataset.lang;
        applyTranslations(appState.config.lang);
        document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        saveState(STORE_KEYS.CONFIG);
    });
});

document.getElementById('btn-export-data').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `ProductivityV2_Backup_${new Date().toLocaleDateString().replace(/\//g,'-')}.json`;
    a.click();
});

document.getElementById('btn-import-data-trigger').addEventListener('click', () => document.getElementById('import-data-file').click());
document.getElementById('import-data-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const data = JSON.parse(ev.target.result);
            Object.keys(STORE_KEYS).forEach(k => {
                const key = STORE_KEYS[k];
                if(data[key] !== undefined) {
                    appState[key] = data[key];
                    saveState(key);
                }
            });
            alert("Datos restaurados correctamente. La página se recargará.");
            location.reload();
        } catch(err) { alert("Error al leer el archivo JSON."); }
    };
    reader.readAsText(file);
});

document.getElementById('btn-clear-data').addEventListener('click', () => {
    document.getElementById('confirm-modal').classList.remove('hidden');
    document.getElementById('confirm-msg').textContent = "Esta acción es irreversible y borrará absolutamente todos tus datos guardados localmente.";
    
    document.getElementById('confirm-ok').onclick = () => {
        localStorage.clear();
        location.reload();
    };
    document.getElementById('confirm-cancel').onclick = () => {
        document.getElementById('confirm-modal').classList.add('hidden');
    };
});

// Initialization
function init() {
    initStorage();
    applyTheme(appState.config.theme, appState.config.accent);
    applyTranslations(appState.config.lang);
    
    updateDashboard();
    renderTasks();
    renderCalendar();
    
    // Default open slides state
    if(slidesArray.length === 0) {
        slidesArray.push({title:'', content:'', bg: '#ffffff'});
    }
}

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    // Basic SW registration - offline capability relies on standard SW fetching
    // Creating an inline pseudo SW since this is a local scratchpad test
    const swCode = `
        const CACHE_NAME = 'prodv2-cache-v1';
        self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['/', '/index.html', '/styles.css', '/script.js']))));
        self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
    `;
    const swBlob = new Blob([swCode], {type: 'application/javascript'});
    const swUrl = URL.createObjectURL(swBlob);
    navigator.serviceWorker.register(swUrl).then(r => console.log('SW Registered')).catch(e => console.log('SW Registration failed', e));
}


// ─── INFO MODAL ───────────────────────────────────────────────
(function() {
    const infoBtn = document.getElementById('info-btn');
    const infoModal = document.getElementById('info-modal');
    const infoClose = document.getElementById('info-modal-close');
    if (!infoBtn || !infoModal) return;
    const sidebarLogo = document.querySelector('.logo-img');
    const infoLogo = document.getElementById('info-app-logo');
    if (sidebarLogo && infoLogo) infoLogo.src = sidebarLogo.src;
    infoBtn.addEventListener('click', () => {
        infoModal.style.display = 'flex';
        playUISound('open');
    });
    if (infoClose) infoClose.addEventListener('click', () => { infoModal.style.display = 'none'; });
    infoModal.addEventListener('click', e => { if (e.target === infoModal) infoModal.style.display = 'none'; });
})();


// ═══════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════
let currentProjectId = null;

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const projects = appState.projects || [];
    grid.innerHTML = '';
    if (projects.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:rgba(255,255,255,0.3);"><div style="font-size:3rem;margin-bottom:12px;">🚀</div><p>No tienes proyectos aún.<br>¡Crea tu primer proyecto!</p></div>';
        return;
    }
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.borderColor = p.color || 'rgba(255,255,255,0.1)';
        const tasks = p.tasks || [];
        const done = tasks.filter(t=>t.completed).length;
        card.innerHTML = `
            <div class="project-card-icon">${p.icon || '📁'}</div>
            <div class="project-card-title">${p.title}</div>
            <div class="project-card-meta">${done}/${tasks.length} misiones</div>
            <div class="project-card-bar">
                <div style="height:3px;background:${p.color||'var(--primary)'};border-radius:99px;width:${tasks.length?Math.round(done/tasks.length*100):0}%;transition:width 0.5s;"></div>
            </div>
            <button class="project-delete-btn" onclick="event.stopPropagation();deleteProject('${p.id}')"><i class="fa-solid fa-xmark"></i></button>
        `;
        card.addEventListener('click', () => openProject(p.id));
        grid.appendChild(card);
    });
}

function openProject(id) {
    currentProjectId = id;
    const p = (appState.projects||[]).find(x=>x.id===id);
    if (!p) return;
    document.getElementById('pm-title').textContent = p.title;
    document.getElementById('pm-icon-display').textContent = p.icon || '📁';
    document.getElementById('pm-editor').innerHTML = p.notes || '';
    renderProjectTasks();
    // Switch to notes tab
    document.querySelectorAll('.pm-tab').forEach(b => {
        b.style.background = 'transparent'; b.style.color = 'rgba(255,255,255,0.4)';
    });
    document.querySelector('.pm-tab[data-pm-tab="notes"]').style.background = 'rgba(var(--primary-rgb),0.2)';
    document.querySelector('.pm-tab[data-pm-tab="notes"]').style.color = 'white';
    document.getElementById('pm-tab-notes').style.display = 'block';
    document.getElementById('pm-tab-tasks').style.display = 'none';
    document.getElementById('project-modal').style.display = 'flex';
}

function renderProjectTasks() {
    const p = (appState.projects||[]).find(x=>x.id===currentProjectId);
    if (!p) return;
    const ul = document.getElementById('pm-tasks-list');
    ul.innerHTML = '';
    (p.tasks||[]).forEach((t,i) => {
        const li = document.createElement('li');
        if (t.completed) li.classList.add('completed');
        li.innerHTML = `<div class="custom-checkbox" onclick="toggleProjectTask(${i})"></div><span class="task-text">${t.text}</span><button class="icon-btn hover-text-danger" onclick="deleteProjectTask(${i})"><i class="fa-solid fa-trash"></i></button>`;
        ul.appendChild(li);
    });
}

window.toggleProjectTask = function(i) {
    const p = (appState.projects||[]).find(x=>x.id===currentProjectId);
    if (!p) return;
    p.tasks[i].completed = !p.tasks[i].completed;
    saveState('projects');
    renderProjectTasks(); renderProjects();
};
window.deleteProjectTask = function(i) {
    const p = (appState.projects||[]).find(x=>x.id===currentProjectId);
    if (!p) return;
    p.tasks.splice(i,1);
    saveState('projects');
    renderProjectTasks(); renderProjects();
};
window.deleteProject = function(id) {
    if (!confirm('¿Eliminar este proyecto?')) return;
    appState.projects = (appState.projects||[]).filter(p=>p.id!==id);
    saveState('projects');
    renderProjects();
    playUISound('delete');
};

// PM tab switching
document.querySelectorAll('.pm-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.pm-tab').forEach(b => { b.style.background='transparent'; b.style.color='rgba(255,255,255,0.4)'; });
        btn.style.background = 'rgba(var(--primary-rgb),0.2)';
        btn.style.color = 'white';
        const tab = btn.dataset.pmTab;
        document.getElementById('pm-tab-notes').style.display = tab==='notes' ? 'block' : 'none';
        document.getElementById('pm-tab-tasks').style.display = tab==='tasks' ? 'block' : 'none';
        if (tab === 'tasks') renderProjectTasks();
    });
});

document.getElementById('pm-save-notes').addEventListener('click', () => {
    const p = (appState.projects||[]).find(x=>x.id===currentProjectId);
    if (!p) return;
    p.notes = document.getElementById('pm-editor').innerHTML;
    saveState('projects');
    playUISound('add');
});

document.getElementById('pm-add-task').addEventListener('click', () => {
    const v = document.getElementById('pm-task-input').value.trim();
    if (!v) return;
    const p = (appState.projects||[]).find(x=>x.id===currentProjectId);
    if (!p) return;
    if (!p.tasks) p.tasks = [];
    p.tasks.push({text:v, completed:false});
    document.getElementById('pm-task-input').value = '';
    saveState('projects');
    renderProjectTasks(); renderProjects();
    playUISound('add');
});

document.getElementById('pm-insert-img').addEventListener('click', () => document.getElementById('pm-img-input').click());
document.getElementById('pm-img-input').addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.style.cssText = 'max-width:100%;border-radius:12px;margin:8px 0;display:block;';
        document.getElementById('pm-editor').appendChild(img);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
});

document.getElementById('pm-close').addEventListener('click', () => { document.getElementById('project-modal').style.display = 'none'; });
document.getElementById('project-modal').addEventListener('click', e => { if(e.target===document.getElementById('project-modal')) document.getElementById('project-modal').style.display='none'; });

// New project
document.getElementById('new-project-btn').addEventListener('click', () => {
    document.getElementById('new-project-modal').style.display = 'flex';
});
document.getElementById('np-cancel').addEventListener('click', () => { document.getElementById('new-project-modal').style.display='none'; });
document.getElementById('np-create').addEventListener('click', () => {
    const title = document.getElementById('np-title').value.trim();
    if (!title) return;
    if (!appState.projects) appState.projects = [];
    appState.projects.push({
        id: 'proj_'+Date.now(),
        title,
        icon: document.getElementById('np-icon').value || '📁',
        color: document.getElementById('np-color').value,
        notes: '',
        tasks: [],
        date: Date.now()
    });
    saveState('projects');
    document.getElementById('np-title').value = '';
    document.getElementById('new-project-modal').style.display = 'none';
    renderProjects();
    playUISound('add');
});

// ═══════════════════════════════════════════
// CLOSE DAY + SPIDER CHART
// ═══════════════════════════════════════════
const closeDayQuestions = [
    { id: 'q_missions', label: '✅ Misiones completadas hoy', type: 'number', placeholder: 'Número de misiones (0-5+)', max: 5 },
    { id: 'q_exercise', label: '🏃 ¿Has hecho ejercicio?', type: 'choice', options: ['0 min (0 pts)','10-20 min (1 pt)','30-45 min (2 pts)','45-60 min (3 pts)','+60 min (4 pts)','Mucho/intenso (5 pts)'] },
    { id: 'q_projects', label: '🚀 ¿Has trabajado en proyectos?', type: 'choice', options: ['Nada (0 pts)','Un poco (1 pt)','~30 min (2 pts)','~1 hora (3 pts)','~2 horas (4 pts)','+2 horas (5 pts)'] },
    { id: 'q_habits', label: '📋 ¿Has seguido hábitos y rutinas?', type: 'choice', options: ['No (1 pt)','Un poco (2 pts)','Lo suficiente (3 pts)','Bastante (4 pts)','Mucho (5 pts)'] },
    { id: 'q_learning', label: '🧠 ¿Aprendiste algo hoy?', type: 'choice', options: ['No (1 pt)','Algo pequeño (2 pts)','Bastante (3 pts)','Mucho (4 pts)','Extraordinario (5 pts)'] }
];

const closeDayLabels = ['Misiones','Ejercicio','Proyectos','Hábitos','Aprendizaje'];

function buildCloseDayForm() {
    const container = document.getElementById('close-day-questions');
    container.innerHTML = '';
    closeDayQuestions.forEach((q, qi) => {
        const div = document.createElement('div');
        div.style.cssText = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:18px 20px;';
        let inner = `<div style="font-size:0.95rem;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:12px;">${q.label}</div>`;
        if (q.type === 'number') {
            inner += `<input type="number" id="${q.id}" min="0" max="20" placeholder="${q.placeholder}" class="input-number w-full text-center" style="max-width:120px;">`;
        } else {
            inner += '<div class="flex-col gap-8">';
            q.options.forEach((opt, oi) => {
                inner += `<label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.07);transition:all 0.2s;" onmouseover="this.style.background='rgba(var(--primary-rgb),0.1)'" onmouseout="this.style.background='transparent'">
                    <input type="radio" name="${q.id}" value="${oi}" style="accent-color:var(--primary);">
                    <span style="font-size:0.88rem;color:rgba(255,255,255,0.75);">${opt}</span>
                </label>`;
            });
            inner += '</div>';
        }
        div.innerHTML = inner;
        container.appendChild(div);
    });
}

function getCloseDayScores() {
    const scores = [];
    // Q1: missions
    const mVal = parseInt(document.getElementById('q_missions').value) || 0;
    scores.push(Math.min(5, mVal));
    // Q2-Q5: choices
    ['q_exercise','q_projects','q_habits','q_learning'].forEach(id => {
        const sel = document.querySelector(`input[name="${id}"]:checked`);
        if (sel) scores.push(parseInt(sel.value));
        else scores.push(0);
    });
    return scores;
}

function drawSpiderChart(scores) {
    const canvas = document.getElementById('spider-chart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 2;
    const size = 380;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2, cy = size / 2;
    const maxR = 130;
    const n = 5;
    const labels = closeDayLabels;
    const colors = ['#4A90E2','#34d399','#a78bfa','#f59e0b','#fb7185'];

    function getPoint(i, r) {
        const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    // Draw grid rings
    for (let ring = 1; ring <= 5; ring++) {
        const r = maxR * ring / 5;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const p = getPoint(i, r);
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring === 5 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)';
        ctx.lineWidth = ring === 5 ? 1.5 : 1;
        ctx.stroke();
    }

    // Draw axis lines
    for (let i = 0; i < n; i++) {
        const p = getPoint(i, maxR);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw filled polygon
    ctx.beginPath();
    scores.forEach((s, i) => {
        const r = maxR * (s / 5);
        const p = getPoint(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(74,144,226,0.18)';
    ctx.fill();

    // Draw LED neon border
    ctx.beginPath();
    scores.forEach((s, i) => {
        const r = maxR * (s / 5);
        const p = getPoint(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#4A90E2';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw dots on vertices
    scores.forEach((s, i) => {
        const r = maxR * (s / 5);
        const p = getPoint(i, r);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.shadowColor = colors[i];
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });

    // Draw labels
    ctx.shadowBlur = 0;
    for (let i = 0; i < n; i++) {
        const labelR = maxR + 28;
        const p = getPoint(i, labelR);
        ctx.fillStyle = colors[i];
        ctx.font = 'bold 12px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], p.x, p.y - 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.fillText(scores[i] + '/5', p.x, p.y + 12);
    }

    // Legend
    const legend = document.getElementById('spider-legend');
    legend.innerHTML = '';
    const total = scores.reduce((a,b) => a+b, 0);
    const pct = Math.round(total / 25 * 100);
    legend.innerHTML = `<div style="font-size:1.4rem;font-weight:700;color:white;text-align:center;width:100%;">Productividad total: <span style="color:#4A90E2;">${pct}%</span></div>`;
}

document.getElementById('close-day-btn').addEventListener('click', () => {
    buildCloseDayForm();
    document.getElementById('close-day-modal').style.display = 'flex';
    playUISound('tap');
});
document.getElementById('close-day-cancel').addEventListener('click', () => { document.getElementById('close-day-modal').style.display='none'; });

document.getElementById('close-day-submit').addEventListener('click', () => {
    const scores = getCloseDayScores();
    document.getElementById('close-day-modal').style.display = 'none';
    document.getElementById('day-result-modal').style.display = 'flex';
    document.getElementById('day-result-date').textContent = new Date().toLocaleDateString('es-ES', {weekday:'long',year:'numeric',month:'long',day:'numeric'});
    setTimeout(() => drawSpiderChart(scores), 100);
});

document.getElementById('day-result-close').addEventListener('click', () => { document.getElementById('day-result-modal').style.display='none'; });
document.getElementById('day-result-save').addEventListener('click', () => {
    const scores = getCloseDayScores();
    if (!appState.day_history) appState.day_history = [];
    appState.day_history.push({ date: new Date().toISOString(), scores });
    saveState('day_history');
    playUISound('add');
    document.getElementById('day-result-modal').style.display = 'none';
});


// Boot up
init();
