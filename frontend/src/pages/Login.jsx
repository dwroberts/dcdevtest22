import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  // redirect to dash if already logged in
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user]);

  const loginUser = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setHasErrors(true);
      setErrorMessage("Form must be filled in");
    }

    // local API endpoint "http://localhost:5050/api/users/login",
    const response = await fetch(
      "https://dcdevtest22.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.token) {
      /* Get the user session id and assign it to the user state
       *  There's a CORS issue fetching direct so
       *  it's run through a proxy.
       *  This could be moved to the server side
       */
      const userSession = await fetch(
        // "http://dev-test.drawandcode.com/api/get-session-id", CORS issues
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          "http://dev-test.drawandcode.com/api/get-session-id"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userSessionData = await userSession.json();

      data.sessionId = JSON.parse(userSessionData.contents).sessionId;
      // data.sessionId = "123456789";
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } else {
      setHasErrors(true);
      setErrorMessage("Invalid login details");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="form-container">
        {hasErrors && <div className="error-text">{errorMessage}</div>}
        <form onSubmit={loginUser} className="form">
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
          <div className="form__footer">
            <button type="submit" className="btn">
              Login
            </button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
