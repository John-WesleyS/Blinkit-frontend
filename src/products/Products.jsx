import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../HomePage/Header"
import Footer from "../HomePage/Footer"

const Products = ({ setCart }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/AdminCart`);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

const CartNotification = () => {
    toast.success("Added to cart!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      icon: "🛒",
    });
  };

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "");

  const filteredProducts = products.filter(
    (item) => normalize(item.Category) === normalize(category),
  );

  // Increase Quantity
  const increaseQty = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // Add to Cart
  const addToCart = (item) => {
    const quantity = qty[item._id] || 1;

    setCart((prev) => { 
      const exists = prev.find((p) => p._id === item._id);
      if (exists) {
        return prev.map((p) =>
          p._id === item._id ? { ...p, pieces: (p.pieces || 0) + quantity } : p,
        );
      }

      return [
        ...prev,
        {
          _id: item._id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          pieces: quantity,
        },
      ];
    });
    CartNotification()
  };

  return (<>
  <Header></Header>
    <div style={{ padding: "30px" }}>
      

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            style={{
              width: "200px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s, boxShadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />

            <h3 style={{ margin: "10px 0 5px", fontSize: "16px" }}>
              {item.name}
            </h3>

            <p style={{ color: "#666", fontSize: "14px" }}>₹{item.price}</p>

            {/* Quantity Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "10px",
              }}
            >
              <button onClick={() => decreaseQty(item._id)}>−</button>

              <span>{qty[item._id] || 0}</span>

              <button onClick={() => increaseQty(item._id)}>+</button>

              <button
                onClick={() => addToCart(item)}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor: "#52B788",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Products;
