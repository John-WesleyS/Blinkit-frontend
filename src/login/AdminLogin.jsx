import React from "react";
import { useForm} from "react-hook-form";
import {useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    document.title="Admin Login"
  }, [])
  

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/AdminLogin`, data);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/AdminCart")
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#0f2027,#2c5364)",
      fontFamily: "sans-serif",
    },
    card: {
      width: "400px",
      padding: "30px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(15px)",
      boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
      color: "white",
    },
    row: {
      display: "flex",
      alignItems: "center",
      marginBottom: "14px",
      gap: "10px",
    },
    label: { width: "100px", fontWeight: "bold" },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      background: "rgba(255,255,255,0.25)",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(45deg,#ff512f,#dd2476)",
      color: "white",
      cursor: "pointer",
      marginTop: "10px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>

        <div style={styles.row}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} {...register("email")} />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            {...register("password")}
          />
        </div>

        <button style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
