import axios from "axios";

const API_URL = "/api/tasks";

export const fetchTasks = async () => {
  const { data } = await axios.get(API_URL, { withCredentials: true });
  return data;
};

export const createTask = async (task) => {
  const { data } = await axios.post(API_URL, task, { withCredentials: true });
  return data;
};

export const updateTask = async (id, updatedTask) => {
  const { data } = await axios.put(`${API_URL}/${id}`, updatedTask, {
    withCredentials: true,
  });
  return data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};
