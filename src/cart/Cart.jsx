import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Cart = ({ cart, setCart,setProductDetails,productDetails }) => {
  const styles = {
    container: {
      maxWidth: "420px",
      margin: "auto",
      background: "#f9fff5",
      minHeight: "100vh",
      paddingBottom: "110px",
      fontFamily: "Segoe UI, sans-serif",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px",
      background: "#ffffff",
      position: "sticky",
      top: 0,
      zIndex: 10,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      borderBottomLeftRadius: "16px",
      borderBottomRightRadius: "16px",
    },

    eta: {
      color: "#1faa59",
      fontSize: "12px",
      fontWeight: "600",
      background: "#e8f5e9",
      padding: "4px 8px",
      borderRadius: "20px",
    },

    cartItems: {
      // padding: "1px",
      marginTop:"40px"
    },

    cartItem: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "16px",
      marginBottom: "14px",
      borderRadius: "16px",
      background: "#ffffff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
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

    qtyBox: {
      display: "flex",
      alignItems: "center",
      borderRadius: "30px",
      background: "#f1f8f4",
      border: "1px solid #d7eadf",
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

    bill: {
      margin: "16px",
      padding: "18px",
      background: "#ffffff",
      borderRadius: "18px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    },

    billRow: {
      display: "flex",
      justifyContent: "space-between",
      margin: "12px 0",
      fontSize: "14px",
      color: "#555",
    },

    totalRow: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#000",
    },

    checkoutBar: {
      position: "fixed",
      bottom: 0,
      width: "100%",
      maxWidth: "420px",
      background: "linear-gradient(90deg, #0c831f, #2ecc71)",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      boxShadow: "0 -6px 20px rgba(0,0,0,0.2)",
    },

    checkoutBtn: {
      background: "#ffffff",
      color: "#0c831f",
      border: "none",
      padding: "12px 18px",
      borderRadius: "12px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },
  };

  // const [qty, setQty] = useState(1);
  // const [productDetails, setProductDetails] = useState({});
  // const details = productDetails[item.name];

  // const Increment = () => setQty((prev) => prev + 1);
  // const Decrement = () => setQty((prev) => (prev > 0 ? prev - 1 : 0));
  useEffect(() => {
    cart.forEach((item) => {
      // const details = productDetails[item.name];

      axios
        .get(
          `${import.meta.env.VITE_API_URL}/products/${encodeURIComponent(item.name.trim())}`,
        )
        .then((res) => {
          setProductDetails((prev) => ({
            ...prev,
            [item.name]: res.data,
          }));
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    });
    document.title="Cart"
  }, [cart]);

  const [deliveryFee] = useState(() => Math.floor(Math.random() * 11) + 5);

  let itemTotal = 0;
  let totalGST = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    itemTotal += item.price * item.pieces;

    const gstPercent = productDetails[item.name]?.gst || 9.76;
    totalGST += (gstPercent / 100) * item.price * item.pieces;
  }

  const grandTotal = itemTotal + totalGST + deliveryFee;

  return (
    <div style={{ background: "#ecfdf3" }}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Your Cart</h3>
          <span style={styles.eta}>10 min delivery</span>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <h1
            style={{
              textAlign: "center",
              
            }}
          >
            Your cart is empty
          </h1>
        ) : (
          cart.map((item, i) => (
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

              <div style={styles.qtyBox}>
                {/* Decrement */}
                <button
                  onClick={() => {
                    const newQty = item.pieces > 1 ? item.pieces - 1 : 0;
                    if (newQty === 0) {
                      setCart((prev) => prev.filter((_, index) => index !== i));
                    } else {
                      const newCart = [...cart];
                      newCart[i] = { ...newCart[i], pieces: newQty };
                      setCart(newCart);
                    }
                  }}
                  style={styles.qtyBtn}
                >
                  −
                </button>

                {/* Display quantity */}
                <span style={styles.qtyText}>{item.pieces}</span>

                {/* Increment */}
                <button
                  onClick={() => {
                    const newCart = [...cart];
                    const currentQty = newCart[i].pieces || 1;
                    newCart[i] = { ...newCart[i], pieces: currentQty + 1 };
                    setCart(newCart);
                  }}
                  style={styles.qtyBtn}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}

        {/* Bill */}
        {cart.length > 0 && (
          <div style={styles.bill}>
            <h4>Bill Details</h4>

            <div style={styles.billRow}>
              <span>Item Price</span>
              <span>₹{itemTotal}</span>
            </div>
            <div style={styles.billRow}>
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div style={styles.billRow}>
              <span>G.S.T</span>
              <span>₹{totalGST}</span>
            </div>

            <hr />

            <div style={{ ...styles.billRow, ...styles.totalRow }}>
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        )}

        {/* Checkout */}

        {cart.length > 0 && (
          <div style={styles.checkoutBar}>
            <div>
              <h4 style={{ margin: 0 }}>₹{grandTotal}</h4>
              <p style={{ margin: 0, fontSize: "12px" }}>Total</p>
            </div>
           <NavLink to="/CheckOutPage"><button style={styles.checkoutBtn}>Checkout & Order→</button></NavLink> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
