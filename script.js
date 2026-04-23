// State Management
let tasks = JSON.parse(localStorage.getItem('mustafa_tasks_v2')) || [];
let currentFilter = 'all';
let searchQuery = '';
let sortBy = 'order'; // Default sort

// Initialize App
function init() {
    renderTasks();
    updateStats();
    checkTheme();
    setDefaultDate();
    setupEventListeners();
}

function setupEventListeners() {
    const taskInput = document.getElementById('taskName');
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('taskDate');
    if (dateInput) dateInput.value = today;
}

// Theme Logic
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('mustafa_theme', newTheme);
}

function checkTheme() {
    const savedTheme = localStorage.getItem('mustafa_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// CRUD Operations
function addTask() {
    const nameEl = document.getElementById('taskName');
    const priorityEl = document.getElementById('taskPriority');
    const dateEl = document.getElementById('taskDate');

    const name = nameEl.value.trim();
    if (!name) return;

    const newTask = {
        id: Date.now(),
        title: name,
        priority: priorityEl.value,
        dueDate: dateEl.value,
        completed: false,
        createdAt: new Date().toISOString(),
        order: tasks.length
    };

    tasks.unshift(newTask);
    saveToStorage();
    nameEl.value = '';
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveToStorage();
    renderTasks();
    updateStats();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToStorage();
    renderTasks();
    updateStats();
}

function clearAllTasks() {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
        tasks = [];
        saveToStorage();
        renderTasks();
        updateStats();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Edit Task Title:', task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle.trim();
        saveToStorage();
        renderTasks();
    }
}

// Filtering & Sorting
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active states
    document.querySelectorAll('.nav-item, .filter-tab').forEach(item => {
        const text = item.innerText.toLowerCase();
        if (text.includes(filter) || (filter === 'all' && text === 'all')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    renderTasks();
}

function setSort(type) {
    sortBy = type;
    renderTasks();
}

function handleSearch() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('taskList');
    if (!container) return;

    let filtered = [...tasks];

    // Search
    if (searchQuery) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery));
    }

    // Filter
    if (currentFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(t => t.dueDate === today);
    } else if (currentFilter === 'high') {
        filtered = filtered.filter(t => t.priority === 'high');
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    } else if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    }

    // Sort
    if (sortBy === 'priority') {
        const pMap = { high: 1, medium: 2, low: 3 };
        filtered.sort((a, b) => pMap[a.priority] - pMap[b.priority]);
    } else if (sortBy === 'date') {
        filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
        filtered.sort((a, b) => a.order - b.order);
    }

    container.innerHTML = filtered.length ? '' : `<div style="text-align:center; padding:3rem; color:var(--text-muted);">No tasks found.</div>`;
    
    filtered.forEach(task => {
        const card = createTaskCard(task);
        container.appendChild(card);
    });
}

function createTaskCard(task) {
    const div = document.createElement('div');
    div.className = `task-card ${task.priority} ${task.completed ? 'completed' : ''}`;
    
    const isOverdue = !task.completed && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
    const dateColor = isOverdue ? 'var(--danger-coral)' : 'var(--text-muted)';

    div.innerHTML = `
        <div class="checkbox-wrapper ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
        <div class="task-content">
            <div class="task-title">${task.title}</div>
            <div class="task-meta">
                <span class="badge badge-${task.priority}">${task.priority}</span>
                <span class="date-text" style="color: ${dateColor}">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v10m-5-5h10M3 10a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/></svg>
                    ${formatDate(task.dueDate)}
                </span>
            </div>
        </div>
        <div class="task-actions">
            <div class="action-btn" onclick="editTask(${task.id})">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div class="action-btn delete" onclick="deleteTask(${task.id})">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
        </div>
    `;
    return div;
}

// Stats & UI Update
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const totalEl = document.getElementById('statTotal');
    const remainingEl = document.getElementById('statRemaining');
    const completedEl = document.getElementById('statCompleted');
    const barEl = document.getElementById('progressBar');
    const percentEl = document.getElementById('progressPercent');

    if (totalEl) totalEl.innerText = total;
    if (remainingEl) remainingEl.innerText = total - completed;
    if (completedEl) completedEl.innerText = completed;
    if (barEl) barEl.style.width = percent + '%';
    if (percentEl) percentEl.innerText = percent + '%';
}

function formatDate(dateStr) {
    if (!dateStr) return 'No date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function saveToStorage() {
    localStorage.setItem('mustafa_tasks_v2', JSON.stringify(tasks));
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', init);
