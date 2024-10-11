const fs = require('fs');
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
        case 'update':
            id = parseInt(process.argv[3]);
            const newStatus = process.argv[4];
            updateTask(id, newStatus);
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
    console.log('#   add                - Add a new task. (Ex: node index.js add "Learn Node.js")   ');
    console.log('#   list               - List all tasks                                            ');
    console.log('#   list:todo          - List incomplete tasks                                     ');
    console.log('#   list:completed     - List completed tasks                                      ');
    console.log('#   list:inprogress    - List in progress tasks                                    ');
    console.log("#   update             - Update a task's status to 'completed' or 'inprogress' or"
        + " 'todo'. (Ex: node index.js update 1 completed.) ");
    console.log('#   delete             - Deletes a task. (Ex: node index.js delete 1)              ');
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
    console.log(`Added task: ${description}`);
    console.log('Task list has been updated.');
    listAllTasks();
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
        console.log(`Task with id ${id} has been updated.`);
        console.log('Task list has been updated.');
        listAllTasks();
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
        console.log('Task list has been updated.');
        listAllTasks();
    }
}


function listAllTasks() { // include each task's id, description, and status
    const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));

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
    const completedTasks = getTasks().find(task => task.status === 'completed');
    if (!completedTasks) {
        console.log('No completed tasks found.');
    } else {
        console.log(completedTasks);
    }

}

function listInProgressTasks() {
    const inProgress = getTasks().find(task => task.status === 'inprogress');
    if (!inProgress) {
        console.log('No in-progress tasks found.');
    } else {
        console.log(inProgress);
    }
}

function listTodoTasks() {
    const todo = getTasks().find(task => task.status === 'todo');
    if (!todo) {
        console.log('No tasks with todo status found.');
    } else {
        console.log(todo);
    }
}

userInterface();