import { Response } from "express";

import Task from "../models/Task";

import { AuthRequest } from "../middleware/auth.middleware";

// ================= CREATE TASK =================

export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET TASKS =================

export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= UPDATE TASK =================

export const updateTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= DELETE TASK =================

export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};