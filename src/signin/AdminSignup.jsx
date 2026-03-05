import React from "react";
import { useForm, } from "react-hook-form";
import {useNavigate}from "react-router-dom"
import axios from "axios"
// require("dotenv").config();


const AdminSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const navigate = useNavigate();



const onSubmit = async (data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/AdminSignin`, data);
    console.log(res.data)
    const {AdminId}=res.data
    localStorage.setItem("AdminId",AdminId)
    navigate("/Adminlogin");
  } catch (err) {
    alert(err.response?.data?.message || "Error");
  }
};
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#11998e,#38ef7d)",
      fontFamily: "sans-serif",
    },
    card: {
      width: "420px",
      padding: "30px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(15px)",
      boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      color: "white",
    },
    row: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px",
      gap: "10px",
    },
    label: {
      width: "100px",
      fontWeight: "bold",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      background: "rgba(255,255,255,0.3)",
    },
    select: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
      background: "rgba(255,255,255,0.3)",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(45deg,#00c6ff,#0072ff)",
      color: "white",
      cursor: "pointer",
      marginTop: "10px",
      fontWeight: "bold",
    },
    error: { color: "#ff4d4d", fontSize: "12px" },
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ textAlign: "center" }}>Admin Sign Up</h2>

        <div style={styles.row}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            {...register("name", { required: true })}
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Phone</label>
          <input
            style={styles.input}
            {...register("phone", { required: true })}
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            {...register("email", { required: true })}
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Role</label>
          <select style={styles.select} {...register("role")}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Super Admin</option>
          </select>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            {...register("password", { required: true })}
          />
        </div>

        <button style={styles.button}>Create Account</button>
      </form>
    </div>
  );
};

export default AdminSignup;
