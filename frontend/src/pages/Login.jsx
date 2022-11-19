import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5050/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
      // Send back to the dashboard
      setUser(data);
      navigate("/");
    } else {
      alert("Please check your username and password");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
