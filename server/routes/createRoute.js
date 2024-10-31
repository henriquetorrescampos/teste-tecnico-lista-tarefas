// define the end point of the application
import express from "express";
import {
  create,
  getTasks,
  update,
  deleteTask,
} from "../controller/taskController.js";

const router = express.Router();

router.post("/newTask", create);
router.get("/tasks", getTasks);
router.put("/update/task/:id", update);
router.delete("/delete/task/:id", deleteTask);

export default router;
