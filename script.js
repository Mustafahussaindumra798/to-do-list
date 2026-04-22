// State Management
let tasks = JSON.parse(localStorage.getItem('mustafa_tasks')) || [];
let currentFilter = 'all';
let searchQuery = '';

// Initialize App
function init() {
    renderTasks();
    updateStats();
    updateProgressRing();
    checkTheme();
}

// Theme Logic
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('mustafa_theme', newTheme);
    updateThemeIcons();
}

function checkTheme() {
    const savedTheme = localStorage.getItem('mustafa_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.querySelector('.sun-icon').style.display = isDark ? 'none' : 'block';
    document.querySelector('.moon-icon').style.display = isDark ? 'block' : 'none';
}

// Modal Logic
function openModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const title = document.getElementById('modalTitle');
    const nameInput = document.getElementById('taskName');
    const priorityInput = document.getElementById('taskPriority');
    const dateInput = document.getElementById('taskDate');
    const idInput = document.getElementById('editTaskId');

    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        title.textContent = 'Edit Task';
        nameInput.value = task.title;
        priorityInput.value = task.priority;
        dateInput.value = task.dueDate;
        idInput.value = taskId;
    } else {
        title.textContent = 'Create New Task';
        document.getElementById('taskForm').reset();
        idInput.value = '';
        // Default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('taskModal').classList.remove('active');
}

// CRUD Operations
function saveTask(e) {
    e.preventDefault();
    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('taskName').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDate').value;

    if (id) {
        // Update
        tasks = tasks.map(t => t.id == id ? { ...t, title, priority, dueDate } : t);
        showToast('Task updated successfully!');
    } else {
        // Create
        const newTask = {
            id: Date.now(),
            title,
            priority,
            dueDate,
            completed: false,
            order: tasks.length
        };
        tasks.unshift(newTask); // Add to top
        showToast('New task added!');
    }

    saveToStorage();
    closeModal();
    renderTasks();
    updateStats();
    updateProgressRing();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveToStorage();
    renderTasks();
    updateStats();
    updateProgressRing();
}

function deleteTask(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    card.classList.add('removing');
    
    setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        saveToStorage();
        renderTasks();
        updateStats();
        updateProgressRing();
        showToast('Task deleted');
    }, 500);
}

function clearCompleted() {
    if (confirm('Are you sure you want to remove all completed tasks?')) {
        tasks = tasks.filter(t => !t.completed);
        saveToStorage();
        renderTasks();
        updateStats();
        updateProgressRing();
        showToast('Completed tasks cleared');
    }
}

// Filtering & Searching
function setFilter(filter, el) {
    currentFilter = filter;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    renderTasks();
}

function handleSearch() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    
    let filtered = tasks;

    // Apply Sidebar Filter
    if (currentFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(t => t.dueDate === today);
    } else if (currentFilter === 'high') {
        filtered = filtered.filter(t => t.priority === 'high');
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }

    // Apply Search Filter
    if (searchQuery) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery));
    }

    // Sort by order
    filtered.sort((a, b) => a.order - b.order);

    container.innerHTML = '';
    
    if (filtered.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        filtered.forEach(task => {
            const card = createTaskCard(task);
            container.appendChild(card);
        });
    }
}

function createTaskCard(task) {
    const div = document.createElement('div');
    div.className = `task-card ${task.completed ? 'completed' : ''}`;
    div.setAttribute('data-id', task.id);
    div.setAttribute('draggable', 'true');
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);

    // Date logic
    const today = new Date().toISOString().split('T')[0];
    let dateClass = '';
    if (task.dueDate === today) dateClass = 'due-today';
    else if (task.dueDate < today && !task.completed) dateClass = 'overdue';

    div.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
        </div>
        <div class="task-content">
            <span class="task-title">${task.title}</span>
            <div class="task-meta">
                <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                <span class="date-chip ${dateClass}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    ${formatDate(task.dueDate)}
                </span>
            </div>
        </div>
        <div class="task-actions">
            <button class="action-btn" onclick="openModal(${task.id})">
                <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            </button>
            <button class="action-btn delete" onclick="deleteTask(${task.id})">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            </button>
        </div>
    `;
    return div;
}

// Stats & Progress
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statRemaining').textContent = remaining;
}

function updateProgressRing() {
    const circle = document.getElementById('progressRing');
    const text = document.getElementById('progressText');
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}%`;
}

// Drag & Drop Logic
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Update order in state
    const rows = Array.from(document.querySelectorAll('.task-card'));
    const newTasks = [];
    
    rows.forEach((row, index) => {
        const id = row.getAttribute('data-id');
        const task = tasks.find(t => t.id == id);
        if (task) {
            task.order = index;
            newTasks.push(task);
        }
    });
    
    saveToStorage();
}

function handleDragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(document.getElementById('taskList'), e.clientY);
    const container = document.getElementById('taskList');
    if (afterElement == null) {
        container.appendChild(draggedItem);
    } else {
        container.insertBefore(draggedItem, afterElement);
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Helpers
function saveToStorage() {
    localStorage.setItem('mustafa_tasks', JSON.stringify(tasks));
}

function formatDate(dateStr) {
    if (!dateStr) return 'No date';
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', options);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (sidebar && mobileToggle && window.innerWidth <= 992 && 
        !sidebar.contains(e.target) && 
        !mobileToggle.contains(e.target) && 
        sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

// Start
init();
