import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// create user context
// const UserContext = createContext();
export const UserContext = React.createContext();
// export const UserContext = React.createContext();
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
