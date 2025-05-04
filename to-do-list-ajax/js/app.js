document.getElementById('addTaskBtn').addEventListener('click', addTask);

let tasks = [];  // Stores tasks, simulating data from a server

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear the list before reloading
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${task.text} <button class="btn btn-sm btn-warning mx-2" onclick="editTask(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") return;  // Don't add empty tasks

    const newTask = { text: taskText };

    // Simulate AJAX request to add task to the server
    setTimeout(() => {
        tasks.push(newTask);
        taskInput.value = '';  // Clear input field
        loadTasks();  // Reload task list
        saveTasksToServer();  // Simulate saving tasks to server
    }, 500);  // Simulate server delay
}

function editTask(index) {
    const newTaskText = prompt("Edit task", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        loadTasks();
        saveTasksToServer();
    }
}

function deleteTask(index) {
    // Simulate AJAX request to delete task from the server
    setTimeout(() => {
        tasks.splice(index, 1);
        loadTasks();  // Reload task list
        saveTasksToServer();  // Simulate saving tasks to server
    }, 500);  // Simulate server delay
}

function saveTasksToServer() {
    // Simulating an AJAX call to save the tasks to the server
    console.log("Tasks saved to server:", tasks);
}

loadTasks();  // Load tasks on page load (if any)
