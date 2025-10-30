
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import GiftReminder from "./pages/GiftReminder";
import Login from "./components/Login";
import SellerLogin from "./components/seller/SellerLogin";
import SellerRegister from "./components/seller/SellerRegister";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Order from "./pages/seller/Order";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loading from "./components/Loading";
import SplashScreen from "./components/SplashScreen";
import ContactSection from "./components/contact/ContactSection";

const App = () => {
  const location = useLocation();
  const { showUserLogin, isSeller } = useAppContext();

  const path = location.pathname;
  const isSellerPath =
    path.startsWith("/seller/") &&
    !path.includes("seller-login") &&
    !path.includes("seller-register");

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }


  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isSellerPath && <Navbar />}

      {showUserLogin && <Login />}
      <Toaster />

      <div className={`${isSellerPath ? "" : "px-4 md:px-8"}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          <Route path="/gift-reminder" element={<GiftReminder />} />
          <Route path ="/contact" element = {<ContactSection />} />

          {/* Seller Auth Routes */}
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-register" element={<SellerRegister />} />

          {/* Seller Dashboard Routes */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
