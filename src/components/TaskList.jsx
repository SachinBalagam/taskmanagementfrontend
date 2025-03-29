import { useContext, useEffect } from "react";
import TaskContext from "../context/TaskContext";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = () => {
  const { tasks, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h2>Task Lists</h2>
      <div className="task-grid">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        ) : (
          <p className="no-tasks">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
