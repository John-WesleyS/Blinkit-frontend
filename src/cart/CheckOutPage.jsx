import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function CheckOutPage({ cart = [], productDetails = {} }) {
  const styles = {
    cartItem: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "16px",
      marginBottom: "14px",
      borderRadius: "16px",
      background: "#ffffff",
      boxShadow: "0 8px 20px rgba(36, 27, 27, 0.06)",
      transition: "transform 0.2s ease",
    },
    image: {
      width: "78px",
      height: "105px",
      borderRadius: "14px",
      objectFit: "cover",
      background: "#f1f8e9",
    },
    itemInfo: {
      flex: 1,
    },
    itemTitle: {
      fontSize: "15px",
      margin: 0,
      color: "#1b1b1b",
      fontWeight: "600",
    },
    itemSub: {
      fontSize: "12px",
      color: "#8a8a8a",
      margin: "4px 0",
    },

    price: {
      fontWeight: "700",
      color: "#0c831f",
      fontSize: "14px",
    },
    qtyBtn: {
      padding: "6px 12px",
      border: "none",
      background: "transparent",
      fontSize: "18px",
      cursor: "pointer",
      color: "#0c831f",
      fontWeight: "bold",
    },
    qtyText: {
      padding: "0 10px",
      fontSize: "14px",
      fontWeight: "700",
      color: "#222",
    },
    qtyBox: {
      display: "flex",
      alignItems: "center",
      borderRadius: "30px",
      background: "#f1f8f4",
      border: "1px solid #d7eadf",
    },
  };
  console.log(productDetails);
  const safeCart = cart || [];
  useEffect(() => {
    document.title = "CheckOutPage";
  }, []);
  const [deliveryFee] = useState(() => Math.floor(Math.random() * 11) + 4);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Cart Items</h1>
      <h2 style={{ display: "flex", flexDirection: "row-reverse" }}>
        🚚 Delivery in {deliveryFee} minutes
      </h2>
      {safeCart.map((item, i) => (
        <div style={styles.cartItem} key={i}>
          <img
            src={item.imageUrl || "https://via.placeholder.com/80"}
            alt={item.name}
            style={styles.image}
          />

          <div style={styles.itemInfo}>
            <h2 style={styles.itemTitle}>{item.name}</h2>
            <p style={styles.itemSub}>x {item.pieces}</p>
            <span style={styles.price}>{item.price}</span>

            {productDetails[item.name] && (
              <>
                <p style={styles.itemSub}>
                  GST: {productDetails[item.name].gst}
                </p>
                <p style={styles.itemSub}>
                  Final Price: ₹{productDetails[item.name].finalPrice}
                </p>
                <p style={styles.itemSub}>
                  MFG:{" "}
                  {new Date(
                    productDetails[item.name].dateOfManufactured,
                  ).toLocaleDateString()}
                </p>
                <p style={styles.itemSub}>
                  EXP:{" "}
                  {new Date(
                    productDetails[item.name].dateOfExpiry,
                  ).toLocaleDateString()}
                </p>
                <p style={styles.itemSub}>
                  Stock:{" "}
                  {productDetails[item.name].piecesAvailable - item.pieces}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <div
        style={{
          position: "fixed",
          bottom: 10,
          width: "100%",
          maxWidth: "420px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <NavLink to="/Body" style={{ flex: 1 }}>
          <button
            style={{
              width: "100%",
              background: "#e74c3c",
              color: "white",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "18px",
              cursor: "pointer",
              // boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Cancel
          </button>
        </NavLink>

        <NavLink to="/Delivery" style={{ flex: 1 }}>
          <button
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #0c831f, #2ecc71)",
              color: "white",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "18px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Place Order
          </button>
        </NavLink>
      </div>
    </div>
  );
}
