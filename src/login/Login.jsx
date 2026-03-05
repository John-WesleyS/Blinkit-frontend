import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  useEffect(() => {
    document.title = "LogIn";
  }, []);

  const [hover, setHover] = useState(false);
  const [transition, setTransition] = useState(false);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "360px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: transition
      ? "0 20px 45px rgba(0,0,0,0.4)"
      : "0 10px 25px rgba(0,0,0,0.2)",
    transition: "all 0.4s ease",
  };

  const labelStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "18px",
    fontWeight: "500",
    color: "#2d6a4f",
  };

  const inputStyle = {
    padding: "12px",
    fontSize: "15px",
    marginTop: "6px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.2)",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.1)",
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
        User Log In
      </h2>

      <div
        style={cardStyle}
        onMouseEnter={() => setTransition(true)}
        onMouseLeave={() => setTransition(false)}
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          
          {/* Email */}
          <label style={labelStyle}>
            Email:
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
              })}
              style={inputStyle}
            />
            {errors.email && (
              <div style={{ color: "red", fontSize: "13px" }}>
                {errors.email.message}
              </div>
            )}
          </label>

          {/* Password */}
          <label style={labelStyle}>
            Password:
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              style={inputStyle}
            />
            {errors.password && (
              <div style={{ color: "red", fontSize: "13px" }}>
                {errors.password.message}
              </div>
            )}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              marginTop: "10px",
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
