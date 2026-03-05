import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";

const Body = ({ setCart }) => {
  const [qty, setQty] = useState({});
  const [products, setProducts] = useState([]);

  const increaseQty = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

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

  useEffect(() => {
    document.title = "Home Page";
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/AdminCart`);
        setProducts(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (item) => {
    const pieces = qty[item._id] || 0;
    if (pieces === 0) return;

    setCart((prev) => {
      const exists = prev.find((p) => p._id === item._id);

      if (exists) {
        return prev.map((p) =>
          p._id === item._id ? { ...p, pieces: p.pieces + pieces } : p,
        );
      }
      return [
        ...prev,
        {
          _id: item._id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          pieces,
        },
      ];
    });

    CartNotification();
  };
  const bottomImages = [
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png",
      path: "/products/MasalaAndOil",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-12.png",
      path: "/products/Sauces",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-13.png",
      path: "/products/ChickenAndFish",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-15.png",
      path: "/products/Organic",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-16.png",
      path: "/products/BabyCare",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-20.png",
      path: "/products/Pharma",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-19.png",
      path: "/products/CleaningEssentials",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-17.png",
      path: "/products/HomeAndOffice",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-18.png",
      path: "/products/PersonalCare",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-14.png",
      path: "/products/PetCare",
    },
  ];

  const gridImages = [
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png",
      path: "/products/PaanCorner",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png",
      path: "/products/Milk",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png",
      path: "/products/FruitsAndVegetables",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png",
      path: "/products/Snacks",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-6_5.png",
      path: "/products/BreakFast",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png",
      path: "/products/Drinks",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2025-11/Slice-7-1_0.png",
      path: "/products/FruitsAndVegetables",
    },
    {
      img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-10.png",
      path: "/products/Snacks",
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div>
        <img
          src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg"
          alt="banner"
          target="_self"
          style={{
            width: "100%",
            height: "275px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        ></img>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        
          <img
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg"
            alt="pharmacy"
            style={{ width: "350px", height: "200px", cursor: "pointer" }}
          />
        
        <img
          src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/pet_crystal_WEB-1.png"
          alt="dogFood"
          style={{ width: "350px", height: "200px", cursor: "pointer" }}
        />
        <img
          src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/baby_crystal_WEB-1.png"
          alt="babySitting"
          style={{ width: "350px", height: "200px", cursor: "pointer" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        {gridImages.map((item, i) => (
          <img
            key={i}
            src={item.img}
            alt="category"
            onClick={() => navigate(item.path)}
            style={{ width: "150px", height: "200px", cursor: "pointer" }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "10px",
        }}
      >
        {bottomImages.map((item, i) => (
          <img
            key={i}
            src={item.img}
            alt="bottom-category"
            onClick={() => navigate(item.path)}
            style={{ width: "150px", height: "200px", cursor: "pointer" }}
          />
        ))}
      </div>
      
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          padding: "20px 0",
        }}
      >
        {products.map((item) => (
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

            {/* QTY CONTROLS */}
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
    </>
  );
};

export default Body;
