import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Header from "../components/Header";
import MissingAvatar from "../assets/missing_avatar.png";

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
      <div className="profile-container">
        <Header />
        <h1>Hi, {user.name}</h1>
        {user.avatar && <img src={user.avatar} className="avatar" />}
        {!user.avatar && <img src={MissingAvatar} className="avatar" />}
        {user.sessionId && (
          <div className="sessionid">SessionID: {user.sessionId}</div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
