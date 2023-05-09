const getTask = (req, res) => {
	res.status(200).send("get task");
};

const createTask = (req, res) => {
	res.status(201).send("create task");
};

const updateTask = (req, res) => {
	res.status(200).send("update task");
};

const deleteTask = (req, res) => {
	res.status(200).send("delete task");
};

module.exports = {
	getTask,
	createTask,
	updateTask,
	deleteTask
};
