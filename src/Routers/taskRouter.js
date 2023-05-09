const express = require("express");
const {
	getTask,
	createTask,
	updateTask,
	deleteTask
} = require("../Controllers/taskController");
const taskRouter = express.Router();

taskRouter.get("/get-task", getTask);
taskRouter.post("/create-task", createTask);
taskRouter.put("/update-taks", updateTask);
taskRouter.delete("delete-task", deleteTask);

module.exports = taskRouter;
