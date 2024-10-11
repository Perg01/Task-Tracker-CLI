<h1>Task Tracker CLI App</h1>

<p>This is a simple command-line interface (CLI) Task Tracker that helps you manage tasks such as adding, updating, listing, and deleting tasks. The tasks are stored in a JSON file (tasks.json) for persistent storage, and you can track their status as todo, inprogress, or completed.</p>

<h2>Features</h2>

<p>Add Tasks: Add new tasks with a description.
Update Tasks: Update the status or description of existing tasks.
Delete Tasks: Remove tasks from the tracker.
List Tasks: View all tasks or filter tasks by status (todo, inprogress, completed).
Persistent Storage: Task data is saved in a tasks.json file.
Error Handling: Handles invalid inputs, non-existent task IDs, and unsupported status updates.</p>

<h2>Prerequisites</h2>

<p>Node.js: You need to have Node.js installed on your machine.</p>

<h2>Installation</h2>

<p>Clone the repository: <br>
git clone https://github.com/your-username/task-tracker-cli.git <br>
cd task-tracker-cli <br>
npm install <br>

<h2>Run the app: </h2>
<p>No dependencies are required. You can directly run the CLI by invoking node.</p>

<h2>Usage</h2>
<p>You can use the following commands to interact with the Task Tracker app.</p>

<h2>Available Commands</h2>

<p>Add a new task:<br>
node index.js add "Task description"

List all tasks: <br>
node index.js list

List only tasks with status todo: <br>
node index.js list:todo

List only tasks with status inprogress: <br>
node index.js list:inprogress

List only tasks with status completed: <br>
node index.js list:completed

Update a task's status: <br>
node index.js update:status <task-id> <new-status> <br>
Example: <br>
node index.js update:status 1 completed

Update a task's description: <br>
node index.js update:description <task-id> "New description" <br>
Example: <br>
node index.js update:description 1 "Learn JavaScript basics"

Delete a task: <br>
node index.js delete <task-id> <br>
Example: <br>
node index.js delete 1</p>
