import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <div className="navbar">
        <h2>Welcome to Task Management Application</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="home-container">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
