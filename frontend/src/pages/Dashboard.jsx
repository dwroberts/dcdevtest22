import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Dashboard() {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

  // redirect to front page if already logged in
  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <h1>Hi, {user.name}</h1>
    </>
  );
}

export default Dashboard;
