import React, { useEffect, useState } from "react";
import UserHome from "../Profil/index";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    fetch("http://localhost:3000/user/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        
        

        if (data.status === "error" && data.message === "Token expired or invalid") {
          alert("Token expired, please log in again.");
          window.localStorage.clear();
          navigate("/login"); // Redirect to login page
        } else {
          setUserData(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>; // Display a loading state until data is available
  }

  return <UserHome userData={userData} />;
}
