import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

const AdminCart = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "sans-serif",
      background: "#f5f5f5",
      minHeight: "100vh",
      maxWidth: "1100px",
      margin: "auto",
    },

    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "10px",
      width: "100%", // full width
      maxWidth: "350px", // limit on desktop
    },

    button: {
      padding: "10px 14px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      marginRight: "6px",
      fontWeight: "bold",
    },
    image: {
      width: "100%",
      maxWidth: "150px",
      height: "auto",
      objectFit: "cover",
      borderRadius: "8px",
    },

    leftSection: {
      display: "flex",
      flexWrap: "wrap", // wrap image + text
      alignItems: "center",
      gap: "12px",
      flex: "1 1 300px", // grow + shrink
    },

    addBtn: { background: "#00c853", color: "white" },
    updateBtn: { background: "#ff9800", color: "white" },
    deleteBtn: { background: "#f44336", color: "white" },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },

    card: {
      background: "white",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "15px",
      display: "flex",
      flexWrap: "wrap", // allows wrap on small screens
      gap: "15px",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  useEffect(() => {
    document.title = "Admin Cart";
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/AdminCart`,);
        setProducts(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/AdminCart`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    // 🔥 RELOAD FROM DATABASE
    const productsRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/AdminCart`
    );

    setProducts(productsRes.data);
    setEditIndex(null);
    reset();
  } catch (err) {
    console.log("ERROR:", err.response?.data || err);
  }
};

  const handleEdit = (index) => {
    const product = products[index];

    Object.keys(product).forEach((key) => {
      setValue(key, product[key]);
    });

    setEditIndex(index);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`${import.meta.env.VITE_API_URL}/AdminCart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filtered = products.filter((p) => p._id !== id);
      setProducts(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🛒 Product Management</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          style={styles.input}
          placeholder="Product Name"
          {...register("name", { required: true })}
        />

        <input
          style={styles.input}
          placeholder="Price"
          {...register("price", { valueAsNumber: true })}
        />

        <input
          style={styles.input}
          placeholder="GST"
          {...register("gst", { valueAsNumber: true })}
        />

        <input
          style={styles.input}
          placeholder="Delivery Charges"
          {...register("DeliveryFee", { valueAsNumber: true })}
        />
        <input
          style={styles.input}
          placeholder="MRP"
          {...register("finalPrice")}
        />
        <input
          style={styles.input}
          placeholder="Image URL"
          {...register("imageUrl")}
        />

        <input
          style={styles.input}
          type="date"
          {...register("dateOfManufactured")}
        />

        <input style={styles.input} type="date" {...register("dateOfExpiry")} />
        <input
          style={styles.input}
          placeholder="No. of Pieces"
          {...register("piecesAvailable", { valueAsNumber: true })}
        />
        <input
          style={styles.input}
          placeholder="Category"
          {...register("Category")}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(editIndex !== null ? styles.updateBtn : styles.addBtn),
          }}
        >
          {editIndex !== null ? "Update Item" : "Add Item"}
        </button>
      </form>

      {products.map((p, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.leftSection}>
            {p.imageUrl && (
              <img src={p.imageUrl} alt={p.name} style={styles.image} />
            )}

            <div>
              <strong>{p.name}</strong>
              <p>Price: ₹{p.price}</p>
              <p>GST: ₹{p.gst}</p>
              <p>Manufactured On: {p.dateOfManufactured}</p>
              <p>Date Of Expiry: {p.dateOfExpiry}</p>
              <p>Delivery Charges: ₹{p.DeliveryFee}</p>
              <p>Stock : {p.piecesAvailable} Pieces</p>
              <p>Category : {p.Category}</p>
              <small>
                Total: ₹
                {Number(p.finalPrice) + Number(p.DeliveryFee) + Number(p.gst)}
              </small>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={{ ...styles.button, ...styles.updateBtn }}
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button
              style={{ ...styles.button, ...styles.deleteBtn }}
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCart;
