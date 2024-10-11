const fs = require('fs');
const { get } = require('http');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');
const command = process.argv[2];


function userInterface() {
    displayMenu();

    switch (command) {
        case 'add':
            const description = process.argv[3];
            addTask(description);
            break;
        case 'list':
            listAllTasks();
            break;
        case 'list:todo':
            listTodoTasks();
            break;
        case 'list:completed':
            listCompletedTasks();
            break;
        case 'list:inprogress':
            listInProgressTasks();
            break;
        case 'update:status':
            id = parseInt(process.argv[3]);
            const newStatus = process.argv[4];
            updateStatus(id, newStatus);
            break;
        case 'update:description':
            id = parseInt(process.argv[3]);
            const newDescription = process.argv[4];
            updateDescription(id, newDescription);
            break;
        case 'delete':
            id = parseInt(process.argv[3]);
            deleteTask(id);
            break;
        default:
            console.log('---------------------');
            console.log('Invalid command. Please try again.');
            break;
    }
}

function displayMenu() {
    // console.log('Task Tracker CLI');
    console.log('Please Choose a Command:');
    console.log('####################################################################################');
    console.log('#   add                      - Add a new task. (Ex: node index.js add "Learn Node.js")   ');
    console.log('#   list                     - List all tasks                                            ');
    console.log('#   list:todo                - List incomplete tasks                                     ');
    console.log('#   list:completed           - List completed tasks                                      ');
    console.log('#   list:inprogress          - List in progress tasks                                    ');
    console.log("#   update:status             - Update a task's status to 'completed' or 'inprogress' or"
        + " 'todo'. (Ex: node index.js update:status 1 'completed') ");
    console.log('#   update:description        - Update a task\'s description.'
        + ' (Ex: node index.js update:description 1 "Learn to cook") ');
    console.log('#   delete                   - Deletes a task. (Ex: node index.js delete 1)              ');
    console.log('####################################################################################');
    console.log('');
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
    listAllTasks();
    console.log(`Added task: ${description}`);
    console.log('Here\'s the updated task list.');
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

function updateStatus(id, newStatus) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        console.log(`Task with id ${id} not found.`);
    }
    else if (newStatus !== 'todo' && newStatus !== 'inprogress' && newStatus !== 'completed') {
        console.log(`Invalid status. Status must be 'todo', 'inprogress', or 'completed'.`);
    } else {
        tasks[taskIndex].status = newStatus;
        tasks[taskIndex].updatedAt = new Date().toISOString();
        saveTasks(tasks);
        listAllTasks();
        console.log(`Task with id ${id} has been updated.`);
        console.log('Here\'s the updated task list.');
    }
}

function updateDescription(id, newDescription) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        console.log(`Task with id ${id} not found.`);
    } else {
        tasks[taskIndex].description = newDescription;
        tasks[taskIndex].updatedAt = new Date().toISOString();
        saveTasks(tasks);
        listAllTasks();
        console.log(`Task with id ${id} has been updated.`);
        console.log('Here\'s the updated task list.');
    }
}

function deleteTask(id) {
    const task = getTasks().find(task => task.id === id);
    if (!task) {
        console.log(`Task with id ${id} not found.`);
    } else {
        const tasks = getTasks().filter(task => task.id !== id);
        saveTasks(tasks);
        listAllTasks();
        console.log(`Task with id ${id} has been updated.`);
        console.log('Here\'s the updated task list.');
    }
}


function listAllTasks() {
    const tasks = getTasks();

    try {
        tasks.forEach(task => {
            console.log('ID:', task.id);
            console.log('Description:', task.description);
            console.log('Status:', task.status);
            console.log('Created At:', task.createdAt);
            console.log('Updated At:', task.updatedAt);
            console.log('---------------------');
        });
    }
    catch (err) {
        console.log('Something went wrong while listing tasks.', err);
    }


}

function listCompletedTasks() {
    const allCompletedTasks = getTasks().filter(task => task.status === 'completed');
    if (allCompletedTasks.length === 0) {
        console.log('No completed tasks found.');
    } else {
        console.log(allCompletedTasks);
    }
}

function listInProgressTasks() {
    const allInProgressTasks = getTasks().filter(task => task.status === 'inprogress');
    if (allInProgressTasks.length === 0) {
        console.log('No completed tasks found.');
    } else {
        console.log(allInProgressTasks);
    }
}

function listTodoTasks() {
    const allTodos = getTasks().filter(task => task.status === 'todo');
    if (allTodos.length === 0) {
        console.log('No completed tasks found.');
    } else {
        console.log(allTodos);
    }
}

userInterface();