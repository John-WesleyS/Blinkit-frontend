import React, { useEffect } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import Map from "../Map";
import { NavLink } from "react-router-dom";

export default function Delivery() {
  const styles = {
    page: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f1aa11, #f1aa11)",
      fontFamily: "Poppins, sans-serif",
    },

    container: {
      width: "360px",
      padding: "30px",
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      background: "rgba(188, 41, 41, 0.15)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      textAlign: "center",
      color: "white",
    },

    title: {
      marginBottom: "6px",
    },

    subtitle: {
      fontSize: "18px",
      opacity: 0.85,
      marginBottom: "22px",
    },

    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "14px",
      fontSize: "16px",
      cursor: "pointer",
      background: "linear-gradient(45deg, #f96611, #e87110)",
      color: "white",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      marginTop: "5px",
    },

    resend: {
      marginTop: "15px",
      fontSize: "14px",
      opacity: 0.9,
    },

    resendSpan: {
      color: "#da840b",
      cursor: "pointer",
      marginLeft: "4px",
    },
  };
  useEffect(() => {
    document.title = "Delivery Code";
    // axios.get(`http://localhost:5000/deliverycode`)
  }, []);
  // const sendCode = async () => {
  //   try {
  //     const token = localStorage.getItem("token"); // or wherever you store it

  //     const res = await axios.post(
  //       "http://localhost:5000/deliverycode",
  //       {}, // no body needed
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     console.log(res.data);
  //   } catch (err) {
  //     console.log("Error sending code:", err);
  //   }
  // };
  const CartNotification = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    toast.success(`Your Delivery Code: ${code}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // icon: "",
    });
  };
  //   const [phone, setPhone] = useState("");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          onClick={CartNotification}
          style={{
            padding: "12px",
            borderRadius: "12px",
            color: "white",
            background: "linear-gradient(45deg, #f96611, #e87110)",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Send Delivery Code
        </button>
        {/* <h2 style={styles.title}>Delivery code</h2> */}
        <p style={styles.subtitle}>Dont share your code to anyone</p>

        <NavLink to="/Map">
          <button style={styles.button}>Track ur Order</button>
        </NavLink>
        <div style={styles.resend}>
          Didn’t receive code?
          <span style={styles.resendSpan} onClick={CartNotification}>
            {" "}
            Resend
          </span>
        </div>
      </div>
    </div>
  );
}
