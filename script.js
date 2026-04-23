// State Management
let tasks = JSON.parse(localStorage.getItem('mustafa_ultimate_tasks')) || [];
let currentFilter = 'all';
let searchQuery = '';

// Initialize App
function init() {
    renderTasks();
    updateStats();
    checkTheme();
    setDefaultDate();
}

function setDefaultDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('taskDate');
    if (dateInput) {
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
}

// Theme Logic
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('mustafa_ultimate_theme', newTheme);
}

function checkTheme() {
    const savedTheme = localStorage.getItem('mustafa_ultimate_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// CRUD Operations
function addTask() {
    const nameInput = document.getElementById('taskName');
    const priorityInput = document.getElementById('taskPriority');
    const dateInput = document.getElementById('taskDate');

    if (!nameInput || !priorityInput || !dateInput) return;

    const name = nameInput.value.trim();
    const priority = priorityInput.value;
    const date = dateInput.value;

    if (!name) return;

    const newTask = {
        id: Date.now(),
        title: name,
        priority: priority,
        dueDate: date,
        completed: false,
        order: tasks.length
    };

    tasks.unshift(newTask);
    saveToStorage();
    nameInput.value = '';
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveToStorage();
    renderTasks();
    updateStats();
}

function deleteTask(id, el) {
    const card = el.closest('.task-card');
    if (card) {
        card.classList.add('delete-anim');
        setTimeout(() => {
            tasks = tasks.filter(t => t.id !== id);
            saveToStorage();
            renderTasks();
            updateStats();
        }, 300);
    }
}

function clearCompleted() {
    if (confirm('Archive all completed objectives?')) {
        tasks = tasks.filter(t => !t.completed);
        saveToStorage();
        renderTasks();
        updateStats();
    }
}

// Filtering & Search
function setFilter(filter, el) {
    currentFilter = filter;
    
    // Update active states in UI
    document.querySelectorAll('.nav-item, .filter-tab').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter.toLowerCase()) || (filter === 'all' && text.includes('all'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    renderTasks();
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchQuery = searchInput.value.toLowerCase();
        renderTasks();
    }
}

function renderTasks() {
    const container = document.getElementById('taskList');
    if (!container) return;

    let filtered = [...tasks];

    // Apply Filters
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

    // Apply Search
    if (searchQuery) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery));
    }

    filtered.sort((a, b) => a.order - b.order);

    container.innerHTML = '';
    filtered.forEach((task, index) => {
        const card = createTaskCard(task, index);
        container.appendChild(card);
    });
}

function createTaskCard(task, index) {
    const div = document.createElement('div');
    div.className = `task-card ${task.priority} ${task.completed ? 'completed' : ''}`;
    div.style.setProperty('--index', index);
    div.setAttribute('draggable', 'true');
    div.setAttribute('data-id', task.id);
    
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);

    const isOverdue = !task.completed && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
    const isToday = task.dueDate === new Date().toISOString().split('T')[0];
    const dateClass = isOverdue ? 'date-overdue' : (isToday ? 'date-today' : '');

    div.innerHTML = `
        <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
        <div class="task-body">
            <span class="task-title">${task.title}</span>
            <div class="task-meta">
                <span class="priority-badge badge-${task.priority}">${task.priority}</span>
                <div class="date-chip ${dateClass}">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    ${formatDate(task.dueDate)}
                </div>
            </div>
        </div>
        <div class="task-actions">
            <svg class="action-icon action-delete" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" onclick="deleteTask(${task.id}, this)"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </div>
    `;
    return div;
}

// Stats & UI Polish
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;

    animateNumber('statTotal', total);
    animateNumber('statRemaining', remaining);
    animateNumber('statCompleted', completed);

    // Progress Ring
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    const circle = document.getElementById('progressCircle');
    if (circle) {
        const offset = 282.7 - (282.7 * percent / 100);
        circle.style.strokeDashoffset = offset;
    }
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = percent + '%';
    }
}

function animateNumber(id, endValue) {
    const el = document.getElementById(id);
    if (!el) return;
    const startValue = parseInt(el.textContent) || 0;
    if (startValue === endValue) return;
    
    const duration = 800;
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * (endValue - startValue) + startValue);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function formatDate(dateStr) {
    if (!dateStr) return 'No date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Drag & Drop
let draggedItem = null;
function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.style.opacity = '0.5', 0);
}

function handleDragEnd() {
    this.style.opacity = '1';
    const rows = Array.from(document.querySelectorAll('.task-card'));
    tasks = rows.map((row, index) => {
        const task = tasks.find(t => t.id == row.getAttribute('data-id'));
        return { ...task, order: index };
    });
    saveToStorage();
}

function handleDragOver(e) {
    e.preventDefault();
    const container = document.getElementById('taskList');
    if (!container) return;

    const afterElement = Array.from(container.querySelectorAll('.task-card:not(.dragging)')).reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) return { offset, element: child };
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;

    if (draggedItem) {
        if (afterElement) container.insertBefore(draggedItem, afterElement);
        else container.appendChild(draggedItem);
    }
}

function saveToStorage() {
    localStorage.setItem('mustafa_ultimate_tasks', JSON.stringify(tasks));
}

// Event Listeners for Enter key
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    const taskNameInput = document.getElementById('taskName');
    if (taskNameInput) {
        taskNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }
});
