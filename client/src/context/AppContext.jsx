





import { useEffect, useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";



axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "https://upahar-backend.vercel.app";
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currency] = useState("₹");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [cart, setCart] = useState([]);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [product, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

 
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-sauth", { withCredentials: true });
      setIsSeller(data.success);
    } catch (error) {
      console.error("fetchSeller error:", error);
      setIsSeller(false);
    }
  };

 
const fetchUser = async () => {
  try {
    const { data } = await axios.get("/api/user/is-auth");
    if (data.success) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCartItems(data.user.cartItems || {});
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  } catch (error) {
    setUser(null);
    localStorage.removeItem("user");
  } finally {
    setUserLoaded(true);
  }
};

  
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else {
        toast.error("No products from backend.");
        setProducts([]);
      }
    } catch (error) {
      console.error("❌ Error loading products:", error.message);
      toast.error("Backend error. Could not load products.");
      setProducts([]);
    }
  };

  const addToCart = (itemId, extraPrice = 0, qrSelected = false, qrData = "") => {
    let cartData = structuredClone(cartItems);

  
    if (cartData[itemId]) {
      if (typeof cartData[itemId] === "object") {
        cartData[itemId].quantity = (cartData[itemId].quantity || 0) + 1;
        
        if (extraPrice) cartData[itemId].extraPrice = extraPrice;
        if (qrSelected !== undefined) cartData[itemId].qrSelected = qrSelected;
        if (qrData) cartData[itemId].qrData = qrData;
      } else {
       
        const prevQty = cartData[itemId];
        cartData[itemId] = { quantity: prevQty + 1, extraPrice, qrSelected, qrData };
      }
    } else {
      cartData[itemId] = { quantity: 1, extraPrice, qrSelected, qrData };
    }

    setCartItems(cartData);
    toast.success("Product added to cart");
  };

  
  const updateCartItem = (itemId, quantity, extraPrice = null) => {
    let cartData = structuredClone(cartItems);
    const entry = cartData[itemId];
    if (!entry) return;
    if (typeof entry === "object") {
      entry.quantity = quantity;
      if (extraPrice !== null) entry.extraPrice = extraPrice;
   
      if (entry.quantity <= 0) delete cartData[itemId];
    } else {
      
      if (quantity <= 0) delete cartData[itemId];
      else cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    const entry = cartData[itemId];
    if (!entry) return;

    if (typeof entry === "object") {
      entry.quantity = (entry.quantity || 0) - 1;
      if (entry.quantity <= 0) delete cartData[itemId];
    } else {
      
      cartData[itemId] = cartData[itemId] - 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }

    setCartItems(cartData);
    toast.success("Product removed from cart");
  };

  
  const getCartCount = () => {
    let totalCount = 0;
    for (const id in cartItems) {
      const item = cartItems[id];
      if (typeof item === "object") totalCount += item.quantity || 0;
      else totalCount += item || 0; 
    }
    return totalCount;
  };


  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((acc, [key, value]) => {
      const productItem = product.find(
        (p) => String(p._id) === String(key) || String(p.id) === String(key)
      );
      if (!productItem) return acc;
      const qty = typeof value === "object" ? value.quantity || 1 : value;
      const extraPrice = typeof value === "object" ? value.extraPrice || 0 : 0;
      return acc + (productItem.offerPrice + extraPrice) * qty;
    }, 0);
  };

  
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProduct();
  }, []);

  
  useEffect(() => {
    const updateCart = async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user) updateCart();
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    userLoaded,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    product,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    cart,
    getCartAmount,
    getCartCount,
    axios,
    fetchProduct,
    setCartItems,
    fetchSeller,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
export default AppContext;
