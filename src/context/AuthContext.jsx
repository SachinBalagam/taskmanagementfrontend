import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(); // ✅ Create context

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // ✅ Initialize with stored value
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); // ❌ Remove corrupted data
        localStorage.removeItem("token"); // ❌ Also remove token
      }
    }
  }, []);

  const login = (userData) => {
    if (!userData || !userData.token) {
      console.error("❌ Invalid user data received:", userData);
      return;
    }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user data
    localStorage.setItem("token", userData.token); // ✅ Store token
    console.log("✅ User logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("🚪 User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; // ✅ Named exports
