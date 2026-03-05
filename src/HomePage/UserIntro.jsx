import React from "react";
import { NavLink } from "react-router-dom";

function UserIntro() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop
"
        alt="pic"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          animation: "zoom 20s infinite alternate ease-in-out",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Buttons Container */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px",
          zIndex: 2,
        }}
      >
        {/* Admin Sign Up */}
        <NavLink
          to="/AdminSignup"
          style={({ isActive }) => ({
            padding: "14px 30px",
            fontSize: "clamp(14px, 2vw, 18px)",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255, 245, 157, 0.85)",
            color: "#333",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.4s ease",
          })}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-5px) scale(1.05)";
            e.target.style.background =
              "linear-gradient(135deg, #fbc02d, #ffeb3b)";
            e.target.style.boxShadow =
              "0 15px 30px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.background =
              "rgba(255, 245, 157, 0.85)";
            e.target.style.boxShadow =
              "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          Admin Sign Up
        </NavLink>

        {/* Sign Up */}
        <NavLink
          to="/signin"
          style={{
            padding: "14px 30px",
            fontSize: "clamp(14px, 2vw, 18px)",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255, 245, 157, 0.85)",
            color: "#333",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-5px) scale(1.05)";
            e.target.style.background =
              "linear-gradient(135deg, #fbc02d, #ffeb3b)";
            e.target.style.boxShadow =
              "0 15px 30px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.background =
              "rgba(255, 245, 157, 0.85)";
            e.target.style.boxShadow =
              "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          Sign Up
        </NavLink>

        {/* Admin Login */}
        <NavLink
          to="/AdminLogin"
          style={{
            padding: "14px 30px",
            fontSize: "clamp(14px, 2vw, 18px)",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255, 245, 157, 0.85)",
            color: "#333",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-5px) scale(1.05)";
            e.target.style.background =
              "linear-gradient(135deg, #fbc02d, #ffeb3b)";
            e.target.style.boxShadow =
              "0 15px 30px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.background =
              "rgba(255, 245, 157, 0.85)";
            e.target.style.boxShadow =
              "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          Admin Login
        </NavLink>

        {/* Login */}
        <NavLink
          to="/login"
          style={{
            padding: "14px 30px",
            fontSize: "clamp(14px, 2vw, 18px)",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(82, 183, 136, 0.9)",
            color: "white",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-5px) scale(1.05)";
            e.target.style.background =
              "linear-gradient(135deg, #40916c, #1b4332)";
            e.target.style.boxShadow =
              "0 15px 30px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.background =
              "rgba(82, 183, 136, 0.9)";
            e.target.style.boxShadow =
              "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          Login
        </NavLink>
      </div>

      {/* Keyframe Animation */}
      <style>
        {`
          @keyframes zoom {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
          }
        `}
      </style>
    </div>
  );
}

export default UserIntro;
