import API from "./axios";

// ================= GET TASKS =================

export const getTasks = async () => {
  const response = await API.get("/tasks");

  return response.data;
};

// ================= CREATE TASK =================

export const createTask = async (
  taskData: {
    title: string;
    description: string;
    priority: string;
  }
) => {
  const response = await API.post(
    "/tasks",
    taskData
  );

  return response.data;
};

// ================= UPDATE TASK =================

export const updateTask = async (
  id: string,
  taskData: any
) => {
  const response = await API.put(
    `/tasks/${id}`,
    taskData
  );

  return response.data;
};

// ================= DELETE TASK =================

export const deleteTask = async (
  id: string
) => {
  const response = await API.delete(
    `/tasks/${id}`
  );

  return response.data;
};