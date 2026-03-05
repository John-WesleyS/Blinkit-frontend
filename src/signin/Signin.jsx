import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signin`, data);
      const { userId } = res.data;
      localStorage.setItem("userId", userId);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const [hover, setHover] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    document.title = "Signin";
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
  };

  const formCardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: transition
      ? "0 15px 40px rgba(0,0,0,0.4)"
      : "0 8px 20px rgba(0,0,0,0.2)",
    transition: "all 0.4s ease",
  };

  const labelStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "15px",
    fontWeight: "500",
    color: "#1b4332",
  };

  const inputStyle = {
    padding: "12px",
    fontSize: "15px",
    marginTop: "5px",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.2)",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          marginBottom: "25px",
          color: "#1b4332",
          fontWeight: "700",
          letterSpacing: "1px",
          textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        Create your Blinkit Account
      </h2>

      <div
        style={formCardStyle}
        onMouseEnter={() => setTransition(true)}
        onMouseLeave={() => setTransition(false)}
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <label style={labelStyle}>
            Name:
            <input
              type="text"
              {...register("name", { required: true })}
              style={inputStyle}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "13px" }}>
                This field is required
              </span>
            )}
          </label>

          <label style={labelStyle}>
            Email:
            <input
              type="email"
              {...register("email", { required: true })}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Phone:
            <input
              type="number"
              {...register("phone", { required: true })}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            State:
            <input
              type="text"
              {...register("state", { required: true })}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            City:
            <input
              type="text"
              {...register("city", { required: true })}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Area:
            <input
              type="text"
              {...register("area", { required: true })}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Door Number:
            <input
              type="text"
              {...register("doorNumber", { required: true })}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Password:
            <input
              type="password"
              {...register("password", { required: true })}
              style={inputStyle}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: "15px",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              color: "white",
              background: hover
                ? "linear-gradient(135deg, #1b4332, #081c15)"
                : "linear-gradient(135deg, #2d6a4f, #40916c)",
              boxShadow: hover
                ? "0 12px 30px rgba(0,0,0,0.5)"
                : "0 6px 15px rgba(0,0,0,0.3)",
              transition: "all 0.4s ease",
              transform: hover ? "translateY(-3px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
