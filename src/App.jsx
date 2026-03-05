import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./login/Login";
import Signin from "./signin/Signin";
import Cart from "./cart/Cart";
import Dashboard from "./dashboard/Dashboard";
import UserIntro from "./HomePage/UserIntro";
import CheckOutPage from "./cart/CheckOutPage";
// import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delivery from "./cart/Delivery";
// import Apps from "./dashboard/Apps"
import AdminLogin from "./login/AdminLogin";
import AdminSignup from "./signin/AdminSignup";
import AdminCart from "./cart/AdminCart";
import Map from "./Map";
import Products from "./products/Products";

function App() {
  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home setCart={setCart}></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signin" element={<Signin></Signin>} />
        <Route path="/AdminSignup" element={<AdminSignup></AdminSignup>} />
        <Route path="/AdminLogin" element={<AdminLogin></AdminLogin>} />

        <Route path="/AdminCart" element={<AdminCart></AdminCart>} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            ></Cart>
          }
        />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/" element={<UserIntro></UserIntro>} />
        <Route
          path="/CheckOutPage"
          element={
            <CheckOutPage
              cart={cart}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            ></CheckOutPage>
          }
        />
        <Route path="/Delivery" element={<Delivery></Delivery>} />
        <Route
          path="/products/:category"
          element={<Products setCart={setCart} />}
        />
      </Routes>
      <ToastContainer style={{ zIndex: 9999 }} />
    </>
  );
}

export default App;
