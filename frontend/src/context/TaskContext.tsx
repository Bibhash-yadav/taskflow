// Full Updated TaskContext.tsx

import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task.api";

// ================= TYPES =================

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt?: string;
};

type AddTaskType = {
  title: string;
  description: string;
  priority: string;
};

type UpdateTaskType = {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
};

type TaskContextType = {
  tasks: Task[];

  setTasks: React.Dispatch<
    React.SetStateAction<Task[]>
  >;

  loading: boolean;

  addTask: (
    task: AddTaskType
  ) => Promise<void>;

  updateTaskStatus: (
    id: string,
    data: UpdateTaskType
  ) => Promise<void>;

  removeTask: (
    id: string
  ) => Promise<void>;

  totalTasks: number;

  todoTasks: number;

  progressTasks: number;

  doneTasks: number;

  highPriorityTasks: number;
};

// ================= CONTEXT =================

export const TaskContext =
  createContext<TaskContextType | null>(
    null
  );

// ================= PROVIDER =================

export const TaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<
    Task[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      // Latest task first
      const sortedTasks = data.sort(
        (
          a: Task,
          b: Task
        ) =>
          new Date(
            b.createdAt || ""
          ).getTime() -
          new Date(
            a.createdAt || ""
          ).getTime()
      );

      setTasks(sortedTasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD TASK =================

  const addTask = async (
    taskData: AddTaskType
  ) => {
    try {
      const newTask =
        await createTask(taskData);

      // Add latest task at top
      setTasks((prev) => [
        newTask,
        ...prev,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= UPDATE TASK =================

  const updateTaskStatus =
    async (
      id: string,
      data: UpdateTaskType
    ) => {
      try {
        const updatedTask =
          await updateTask(
            id,
            data
          );

        const updatedTasks =
          tasks.map((task) =>
            task._id === id
              ? updatedTask
              : task
          );

        setTasks(updatedTasks);
      } catch (error) {
        console.log(error);
      }
    };

  // ================= DELETE TASK =================

  const removeTask = async (
    id: string
  ) => {
    try {
      await deleteTask(id);

      const filteredTasks =
        tasks.filter(
          (task) =>
            task._id !== id
        );

      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= COUNTS =================

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const progressTasks = tasks.filter(
    (task) =>
      task.status === "inprogress"
  ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const highPriorityTasks =
    tasks.filter(
      (task) =>
        task.priority === "high"
    ).length;

  // ================= EFFECT =================

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= PROVIDER =================

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,

        loading,

        addTask,

        updateTaskStatus,

        removeTask,

        totalTasks,

        todoTasks,

        progressTasks,

        doneTasks,

        highPriorityTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;