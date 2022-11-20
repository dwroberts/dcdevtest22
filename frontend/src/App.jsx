import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export const UserContext = React.createContext();
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";

function App() {
  const userState = useState(() => {
    const userInLocalStorage = localStorage.getItem("user");
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : {};
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userState[0]));
    console.log("Called", userState);
  }, userState);

  return (
    <>
      <UserContext.Provider value={userState}>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
