import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Header() {
  const [minutes] = useState(() => Math.floor(Math.random() * 11) + 5);

  const texts = [
    "Search for products...",
    "Find your favorite snacks...",
    "Discover new deals...",
  ];

  const [text, setText] = useState(texts[0]);
  const [fade, setFade] = useState(true);

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [doorNumber, setdoorNumber] = useState("");

  useEffect(() => {
    const token=localStorage.getItem("token")
    axios
      .get(`${import.meta.env.VITE_API_URL}/address`,{headers:{
        Authorization: `Bearer ${token}`,}
      })
      .then((res) => {
        setArea(res.data.area);
        setCity(res.data.city);
        setdoorNumber(res.data.doorNumber);
      })
      .catch((e) => {
        console.log("Error in address: ", e);
      });

    let i = 0;

    const interval = setInterval(() => {
      setFade(false); // fade out

      setTimeout(() => {
        i = (i + 1) % texts.length;
        setText(texts[i]);
        setFade(true); // fade in
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav
        style={{
          width: "100%",
          height: "90px",
          display: "flex",
          // border: "solid 1px black",
          position: "fixed",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#f9f3bb",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <div>
          <img
            src="data:image/png;base64,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"
            alt="blinkit-logo"
            style={{
              height: "80px",
              width: "auto",
              maxWidth: "150px",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "90px",
            flex: 1,
            marginLeft: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "90px",
              gap: "10px",
              minWidth: "200px",
            }}
          >
            <span
              style={{ fontWeight: "bold", fontSize: "clamp(20px, 3vw, 25px)" }}
            >
              Delivery in {minutes} minutes
            </span>
            <h1 style={{ fontSize: "clamp(12px, 2vw, 18px)" }}>
              {city},{area},{doorNumber}
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              gap: "clamp(20px, 3vw, 80px)",
              paddingRight: "20px",
              flexWrap: "wrap",
            }}
          >
            <input
              style={{
                width: "clamp(200px, 40vw, 350px)",
                height: "45px",
                border: "2px solid black",
                borderRadius: "8px",
                paddingLeft: "10px",
                fontSize: "20px",
                marginLeft: "60px",
                transition: "opacity 0.25s ease",
                // opacity: fade ? 1 : 0,
              }}
              type="text"
              placeholder={text}
            />

            <NavLink
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "clamp(16px, 2vw, 20px)",
                whiteSpace: "nowrap",
              }}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/Cart"
              style={{
                display: "inline-block",
                width: "150px",
                height: "75px",
                lineHeight: "75px",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                background: "linear-gradient(135deg, #6dd62b, #239b0b)", // gradient
                border: "none",
                borderRadius: "12px", // smoother corners
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)", // shadow for depth
                cursor: "pointer",
                transition: "all 0.3s ease", // smooth hover animation
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.3)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #fbc02d, #f57f17)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #d7c416, #fbc02d)";
              }}
            >
              🛒 Go to Cart
            </NavLink>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "90px" }}></div>
    </>
  );
}

export default Header;
