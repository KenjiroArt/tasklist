const targ = document.querySelector('#task_list ul');
const taskForm = document.querySelector('#task_form');
const taskInput = document.querySelector('#add_task');
const clearAll = document.querySelector('#clear_all');
const clearChecked = document.querySelector('#clear_checked');
// addTask function
let addTask = txt => {
    let li = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${txt} <span class="float-right task_complete"><input type="checkbox"></span>
                </li>`;
    targ.innerHTML += li;
    // If more than 1 task exists, display 'clear checked' button
    if (taskList.length > 1) {
        clearChecked.style.display = "block";
    }
    // If at least 1 task exists, display 'clear all' button
    else if (taskList.length > 0) {
        clearAll.style.display = "block";
    }
}
// If taskList contains data, get Tasks. If empty? Show empty tasklist
let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
// Set items in localStorage, store as JSON string
localStorage.setItem('tasks', JSON.stringify(taskList));
// parse to JSON object
let taskItems = JSON.parse(localStorage.getItem('tasks'));
// List all open tasks
taskItems.forEach(item => {
    // Call addTask function
    addTask(item);
});
// add task
taskForm.addEventListener('submit', thisTask => {
    thisTask.preventDefault();
    if (taskInput.value !== "") {
        // Store task in localStorage
        taskList.push(taskInput.value);
        localStorage.setItem('tasks', JSON.stringify(taskList));

        addTask(taskInput.value);

        document.querySelector('#add_task').value = "";
        document.querySelector('#add_task').focus();
    } else {
        alert('please add a task first..');
    }
});
// If only 1 task left, hide the 'clear checked' button
if (taskList.length === 1) {
    clearChecked.style.display = "none";
    document.querySelector('.task_complete').style.display = "none";
}
// If no tasks exist, hide all the clear buttons
if (taskList.length === 0) {
    clearChecked.style.display = "none";
    clearAll.style.display = "none";
}
// remove task
clearChecked.addEventListener('click', () => {
    const removeTask = document.querySelectorAll('.task_complete input');
    const items = document.querySelectorAll('.list-group-item');
    taskList = [];
    for (let i = 0; i < removeTask.length; i++) {
        if (removeTask[i].checked) {
            removeTask[i].parentNode.parentNode.remove();
        } else {
            // Overwrite Locally stored items, store as JSON string
            taskList.push(items[i].innerText);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            console.log(taskList);
        }
    };
    location.reload();
});
// Clear all Tasks
clearAll.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});