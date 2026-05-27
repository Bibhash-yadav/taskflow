import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;