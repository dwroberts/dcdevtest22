import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../App";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const logoutUser = () => {
    // localStorage.removeItem("user");
    setUser({});
    navigate("/login");
  };

  return (
    <header className="header">
      <ul className="user-menu">
        {user.token && (
          <>
            <li>
              <Link to="/edit-profile">Edit Profile</Link>
            </li>
            <li>
              <Link onClick={logoutUser}>Logout</Link>
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
