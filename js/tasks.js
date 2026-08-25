// ==========================================
// COLLEGEHUB TASK MANAGER (GLOBAL EXPORT FIX)
// ==========================================

let tasks = JSON.parse(localStorage.getItem("collegeHubTasks")) || [];

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("collegeHubTasks", JSON.stringify(tasks));
}

// Escape HTML Utility
function escapeHTML(value) {
    if (!value) return "";
    const div = document.createElement("div");
    div.textContent = String(value);
    return div.innerHTML;
}

// 1. ADD TASK (Global Scope)
window.addTask = function () {
    const titleInput = document.getElementById("taskInput");
    const categoryInput = document.getElementById("taskCategory");
    const priorityInput = document.getElementById("taskPriority");
    const descriptionInput = document.getElementById("taskDescription");

    if (!titleInput) return;

    const title = titleInput.value.trim();

    if (!title) {
        alert("Please enter a task title.");
        titleInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        category: categoryInput ? categoryInput.value : "General",
        priority: priorityInput ? priorityInput.value : "Medium",
        description: descriptionInput ? descriptionInput.value.trim() : "",
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };

    tasks.unshift(newTask);
    saveTasks();
    displayTasks();

    // Clear Inputs
    titleInput.value = "";
    if (descriptionInput) descriptionInput.value = "";
    if (categoryInput) categoryInput.value = "General";
    if (priorityInput) priorityInput.value = "Medium";

    titleInput.focus();
};

// 2. DISPLAY TASKS (Global Scope)
window.displayTasks = function () {
    const container = document.getElementById("tasksList");
    if (!container) return;

    const searchInput = document.getElementById("taskSearch");
    const categoryFilter = document.getElementById("taskCategoryFilter");
    const statusFilter = document.getElementById("taskStatusFilter");

    const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const category = categoryFilter ? categoryFilter.value : "All";
    const status = statusFilter ? statusFilter.value : "All";

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search) ||
                              task.description.toLowerCase().includes(search);
        const matchesCategory = category === "All" || task.category === category;
        const matchesStatus = status === "All" ||
                              (status === "Completed" && task.completed) ||
                              (status === "Pending" && !task.completed);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="no-tasks" style="text-align:center; padding: 30px;">
                <div class="no-task-icon" style="font-size: 2rem;">📭</div>
                <h3>No Tasks Found</h3>
                <p>Add a new task or change your filters.</p>
            </div>
        `;
        updateTaskStats();
        return;
    }

    container.innerHTML = "";

    filteredTasks.forEach(task => {
        const item = document.createElement("div");
        item.className = `task-card ${task.completed ? "task-completed" : ""}`;

        item.innerHTML = `
            <div class="task-card-left">
                <button class="task-check-btn" onclick="toggleTask(${task.id})" title="${task.completed ? "Mark as pending" : "Mark as completed"}">
                    ${task.completed ? "✓" : ""}
                </button>

                <div class="task-content">
                    <div class="task-title-row">
                        <h3 style="${task.completed ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
                            ${escapeHTML(task.title)}
                        </h3>
                        <span class="badge">${escapeHTML(task.category)}</span>
                        <span class="task-priority ${String(task.priority).toLowerCase()}">
                            ${escapeHTML(task.priority)}
                        </span>
                    </div>

                    ${task.description ? `<p class="task-description">${escapeHTML(task.description)}</p>` : ""}

                    <div class="task-meta">
                        <span>📚 ${escapeHTML(task.category)}</span>
                        <span>🕒 ${escapeHTML(task.createdAt)}</span>
                        <span>${task.completed ? "✅ Completed" : "⏳ Pending"}</span>
                    </div>
                </div>
            </div>

            <div class="task-actions">
                <button class="edit-task-btn" onclick="editTask(${task.id})" title="Edit task">✏️</button>
                <button class="delete-task-btn" onclick="deleteTask(${task.id})" title="Delete task">🗑️</button>
            </div>
        `;

        container.appendChild(item);
    });

    updateTaskStats();
};

// 3. TOGGLE TASK
window.toggleTask = function (id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    displayTasks();
};

// 4. DELETE TASK
window.deleteTask = function (id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    displayTasks();
};

// 5. EDIT TASK
window.editTask = function (id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle === null || !newTitle.trim()) return;
    task.title = newTitle.trim();
    saveTasks();
    displayTasks();
};

// 6. UPDATE STATS
function updateTaskStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (document.getElementById("totalTasks")) document.getElementById("totalTasks").textContent = total;
    if (document.getElementById("completedTasks")) document.getElementById("completedTasks").textContent = completed;
    if (document.getElementById("pendingTasks")) document.getElementById("pendingTasks").textContent = pending;
    if (document.getElementById("taskProgress")) document.getElementById("taskProgress").textContent = `${percentage}%`;
}

// Global Event Binds
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput) {
        taskInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                window.addTask();
            }
        });
    }
    window.displayTasks();
});