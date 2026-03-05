import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.log("No token found in localStorage");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/Dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load dashboard");
        navigate("/login");
      });
  }, [navigate]);
  
  if (error) {
    return <h2>Error: {error}</h2>;
  }
  
  if (!user) {
    return <h2>Unable to fetch Data.....</h2>;
  }
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "40px auto",
        background: "linear-gradient(135deg, #fef9e7, #fff7e6)",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#f59e0b",
          fontSize: "2rem",
          letterSpacing: "1px",
        }}
      >
        User Dashboard
      </h1>
      {[
        { label: "Name", value: user.name },
        { label: "Email", value: user.email },
        { label: "Phone", value: user.phone },
        { label: "State", value: user.state },
        { label: "City", value: user.city },
        { label: "Area", value: user.area },
        { label: "Door Number", value: user.doorNumber },
      ].map((field, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
          }}
        >
          <b style={{ color: "#f59e0b" }}>{field.label}:</b>
          <span>{field.value}</span>
        </div>
      ))}
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <button style={{width:"100px", height:"50px",borderRadius:"rounded-xl"}}><NavLink to="/home" style={{textDecoration:"none"}}>Home</NavLink></button>
        <button style={{width:"100px", height:"50px",borderRadius:"rounded-xl"}}><NavLink to="/cart" style={{textDecoration:"none"}}>Cart</NavLink></button>
      </div>
    </div>
  );
}

export default Dashboard;
