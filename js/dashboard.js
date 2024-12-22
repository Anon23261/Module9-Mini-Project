// Dashboard Data
let dashboardData = {
    tasks: [
        {
            id: 1,
            title: "Security Audit Implementation",
            priority: "critical",
            status: "active",
            dueDate: "2 days",
            description: "Implement comprehensive security audit protocols across all systems.",
            tags: ["Security", "Phase 1"]
        },
        {
            id: 2,
            title: "Network Infrastructure Upgrade",
            priority: "high",
            status: "active",
            dueDate: "5 days",
            description: "Upgrade core network infrastructure to support new security protocols.",
            tags: ["Infrastructure", "Phase 2"]
        }
    ]
};

// Calculate statistics based on actual tasks
function calculateStatistics() {
    const stats = {
        total: dashboardData.tasks.length,
        active: 0,
        pending: 0,
        completed: 0
    };

    dashboardData.tasks.forEach(task => {
        switch(task.status) {
            case 'active':
                stats.active++;
                break;
            case 'pending':
                stats.pending++;
                break;
            case 'completed':
                stats.completed++;
                break;
        }
    });

    return stats;
}

// Update statistics display
function updateStatistics() {
    const stats = calculateStatistics();
    
    // Update counters
    document.getElementById('totalOps').textContent = stats.total;
    document.getElementById('activeOps').textContent = stats.active;
    document.getElementById('pendingOps').textContent = stats.pending;
    document.getElementById('completedOps').textContent = stats.completed;

    // Update progress bars
    if (stats.total > 0) {
        const activePercent = (stats.active / stats.total) * 100;
        const pendingPercent = (stats.pending / stats.total) * 100;
        const completedPercent = (stats.completed / stats.total) * 100;

        document.getElementById('activeProgress').style.width = activePercent + '%';
        document.getElementById('pendingProgress').style.width = pendingPercent + '%';
        document.getElementById('completedProgress').style.width = completedPercent + '%';
    } else {
        document.getElementById('activeProgress').style.width = '0%';
        document.getElementById('pendingProgress').style.width = '0%';
        document.getElementById('completedProgress').style.width = '0%';
    }
}

// Add a random task
function addRandomTask() {
    const titles = [
        "Firewall Configuration Update",
        "Database Optimization",
        "Server Maintenance",
        "Security Patch Deployment",
        "Network Performance Audit"
    ];
    const priorities = ["critical", "high", "medium"];
    const statuses = ["active", "pending"];

    const newTask = {
        id: dashboardData.tasks.length + 1,
        title: titles[Math.floor(Math.random() * titles.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        dueDate: Math.floor(Math.random() * 10 + 1) + " days",
        description: "Automated task generated by system monitoring.",
        tags: ["Automated", "Phase " + Math.floor(Math.random() * 3 + 1)]
    };

    dashboardData.tasks.push(newTask);
    updateTaskList();
    updateStatistics();
}

// Update random task status
function updateRandomTaskStatus() {
    if (dashboardData.tasks.length === 0) return;

    const taskIndex = Math.floor(Math.random() * dashboardData.tasks.length);
    const task = dashboardData.tasks[taskIndex];
    const statuses = ["active", "pending", "completed"];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

    if (task.status !== newStatus) {
        task.status = newStatus;
        updateTaskList();
        updateStatistics();
    }
}

// Update task list display
function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    dashboardData.tasks.forEach(task => {
        const priorityClass = {
            critical: 'bg-danger',
            high: 'bg-warning',
            medium: 'bg-info'
        }[task.priority];

        const statusClass = {
            active: 'bg-success',
            pending: 'bg-warning',
            completed: 'bg-secondary'
        }[task.status];

        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item';
        taskElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1 text-white">
                    <span class="badge ${priorityClass} me-2">${task.priority}</span>
                    ${task.title}
                </h6>
                <small class="text-muted">Due in ${task.dueDate}</small>
            </div>
            <p class="mb-1">${task.description}</p>
            <small>
                <span class="badge ${statusClass}">${task.status}</span>
                ${task.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(' ')}
            </small>
        `;

        // Add hover effect
        taskElement.addEventListener('mouseenter', () => {
            taskElement.style.transform = 'translateY(-2px)';
            taskElement.style.transition = 'all 0.3s ease';
        });

        taskElement.addEventListener('mouseleave', () => {
            taskElement.style.transform = 'translateY(0)';
        });

        taskList.appendChild(taskElement);
    });
}

// Real-time monitoring simulation
function simulateRealTimeUpdates() {
    // Update task statuses periodically
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to update a task status
            updateRandomTaskStatus();
        }
    }, 5000);
}

// Filter tasks
function filterTasks() {
    const priorityFilters = {
        critical: document.getElementById('criticalPriority').checked,
        high: document.getElementById('highPriority').checked,
        medium: document.getElementById('mediumPriority').checked
    };

    const statusFilters = {
        active: document.getElementById('activeStatus').checked,
        pending: document.getElementById('pendingStatus').checked,
        completed: document.getElementById('completedStatus').checked
    };

    const hasActiveFilters = Object.values(priorityFilters).some(v => v) || 
                           Object.values(statusFilters).some(v => v);

    const filteredTasks = dashboardData.tasks.filter(task => {
        if (!hasActiveFilters) return true;
        
        const priorityMatch = !Object.values(priorityFilters).some(v => v) || 
                            priorityFilters[task.priority];
        const statusMatch = !Object.values(statusFilters).some(v => v) || 
                          statusFilters[task.status];
        
        return priorityMatch && statusMatch;
    });

    updateTaskListWithFiltered(filteredTasks);
}

// Add event listeners for filter checkboxes
document.addEventListener('DOMContentLoaded', () => {
    const filterCheckboxes = document.querySelectorAll('.form-check-input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterTasks);
    });

    // Initialize the dashboard
    updateStatistics();
    updateTaskList();
    simulateRealTimeUpdates();
});
