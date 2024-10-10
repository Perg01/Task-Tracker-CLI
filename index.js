const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');
const command = process.argv[2];

function userInterface() {
    console.log('Task Tracker CLI');

}

function addTask(description) {
    const tasks = getTasks();

    const newTask = {
        id: tasks.length + 1,
        description: description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Added task: ${description}`);
}

function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks));
}

function getTasks() {
    try {
        const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return tasks;
    }
    catch (err) {
        return [];
    }
}

function updateTask(id, newStatus) {
    const task = getTasks().find(task => task.id === id);
    if (!task) {
        console.log(`Task with id ${id} not found.`);
    } else {
        task.status = newStatus;
        task.updatedAt = new Date().toISOString();
        saveTasks(task);
        console.log(`Tash with id ${id} has been updated.`);
    }
}

function deleteTask(id) {
    const task = getTasks().find(task => task.id === id);
    if (!task) {
        console.log(`Task with id ${id} not found.`);
    } else {
        const tasks = getTasks().filter(task => task.id !== id);
        saveTasks(tasks);
        console.log(`Task with id ${id} has been deleted.`);
    }

}

function listAllTasks() {

}

function listCompletedTasks() {

}

function listInProgressTasks() {

}

function listIncompleteTasks() {

}