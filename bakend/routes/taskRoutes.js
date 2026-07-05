const express = require("express");

const router = express.Router();

const {
  createTask,
  getAllTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", createTask);

router.get("/", getAllTasks);

router.put("/:id", updateTaskStatus);


router.delete("/:id", deleteTask);

router.put("/edit/:id", updateTask);

module.exports = router;