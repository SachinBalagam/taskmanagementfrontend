import axios from "axios";
import { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import "../styles/TaskItem.css";

const TaskItem = ({ task }) => {
  const { fetchTasks } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const token = localStorage.getItem("token");

  const toggleStatus = async () => {
    try {
      await axios.put(
        `https://taskmanagementbackend-4ohq.onrender.com/api/tasks/${task._id}`,
        { status: task.status === "Pending" ? "Completed" : "Pending" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task", error.response?.data?.message);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(
        `https://taskmanagementbackend-4ohq.onrender.com/api/tasks/${task._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error.response?.data?.message);
    }
  };

  const updateTask = async () => {
    try {
      await axios.put(
        `https://taskmanagementbackend-4ohq.onrender.com/api/tasks/${task._id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task", error.response?.data?.message);
    }
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="edit-task">
          <input
            className="task-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="task-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="save-btn" onClick={updateTask}>
            Save
          </button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p className={`status ${task.status.toLowerCase()}`}>
            Status: {task.status}
          </p>
          <button className="toggle-btn" onClick={toggleStatus}>
            {task.status === "Pending"
              ? "Mark as Completed"
              : "Mark as Pending"}
          </button>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={deleteTask}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
