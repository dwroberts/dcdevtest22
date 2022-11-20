import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../App";

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  console.log(user);

  const logoutUser = () => {
    // localStorage.removeItem("user");
    setUser({});
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">D&C Dev Test</Link>
      </div>
      <ul>
        {user.token && (
          <>
            <li>{user.name}</li>
            <li>
              <button className="btn" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </>
        )}

        {!user.token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
