import { useState, useContext } from "react";
import axios from "axios";
import TaskContext from "../context/TaskContext";
import "../styles.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { fetchTasks } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        console.error("No token found, user not authenticated");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Failed to create task", error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="logout-button">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
