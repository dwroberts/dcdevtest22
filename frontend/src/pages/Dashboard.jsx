import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = jwt.decode(token);
  //     if (!user) {
  //       localStorage.removeItem("token");
  //       // history.replace("/login");
  //     } else {
  //       // populateQuote()
  //     }
  //   }
  // }, []);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;
