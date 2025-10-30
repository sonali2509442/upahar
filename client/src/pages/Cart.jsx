
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    product,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    setCartItems,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || "http://localhost:5000/uploads";

  const getFullImageURL = (img) => {
    if (!img) return "/fallback.png";
    return img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img.startsWith("/") ? img : "/" + img}`;
  };

  const getCart = () => {
    const temp = [];
    for (const key in cartItems) {
      const item = product.find(
        (pdt) => String(pdt._id) === String(key) || String(pdt.id) === String(key)
      );
      if (item) {
        const cartItem = cartItems[key];
        const quantity = typeof cartItem === "object" ? cartItem.quantity || 1 : cartItem;
        const extraPrice = typeof cartItem === "object" ? cartItem.extraPrice || 0 : 0;
        const qrSelected = typeof cartItem === "object" ? cartItem.qrSelected || false : false;
        const qrData = typeof cartItem === "object" ? cartItem.qrData || "" : "";

        temp.push({ ...item, quantity, extraPrice, qrSelected, qrData });
      }
    }
    setCartArray(temp);
  };

  useEffect(() => {
    if (product.length > 0 && cartItems) getCart();
  }, [product, cartItems]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.post("/api/address/get");
        if (data.success && data.addresses.length > 0) {
          setAddresses(data.addresses);
          setSelectedAddress(data.addresses[0]);
        }
      } catch (error) {
        console.error("Address fetch error:", error);
      }
    };
    fetchAddresses();
  }, []);

  const placeOrder = async () => {
    try {
      if (!user) return toast.error("Please log in first");
      if (!selectedAddress?._id) return toast.error("Select a delivery address");
      if (cartArray.length === 0) return toast.error("Your cart is empty");

      const payload = {
        items: cartArray.map((i) => ({
          product: i._id,
          quantity: i.quantity,
          extraPrice: i.extraPrice,
          qrSelected: i.qrSelected,
          qrData: i.qrData,
        })),
        address: selectedAddress._id,
      };

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/orders/cod", payload);
        if (data.success) {
          toast.success("Order placed successfully");
          setCartItems({});
          navigate("/myorders");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post("/api/orders/stripe", payload);
        if (data.success) window.location.replace(data.url);
        else toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (!(product.length > 0 && cartItems)) return null;

  return (
    <div className="mt-16 flex flex-col md:flex-row gap-10 px-4 md:px-8 lg:px-16">
      {/* LEFT: Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-primary text-sm">({getCartCount()} items)</span>
        </h1>
        {cartArray.length === 0 ? (
          <p className="text-gray-500 text-center py-20 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-5">
            {cartArray.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 border rounded-2xl shadow hover:shadow-lg transition bg-white hover:bg-primary/5"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={
                      item?.images?.[0]
                        ? getFullImageURL(item.images[0])
                        : "/fallback.png"
                    }
                    alt={item?.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                    onError={(e) => (e.target.src = "/fallback.png")}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">Category: {item.category || "N/A"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-700 font-medium">Qty:</span>
                      <select
                        className="border rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-primary outline-none"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItem(item.id || item._id, Number(e.target.value))
                        }
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between md:justify-end items-center w-full md:w-auto gap-4">
                  <p className="text-lg font-semibold text-gray-700">
                    {currency} {(item.offerPrice + item.extraPrice) * item.quantity}
                  </p>
                  <IoIosRemoveCircleOutline
                    onClick={() => removeFromCart(item._id)}
                    className="w-7 h-7 text-red-500 cursor-pointer hover:scale-110 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => navigate("/products")}
          className="group flex items-center mt-8 gap-2 text-primary font-medium hover:text-primary-dull transition"
        >
          <FaArrowLeftLong className="group-hover:-translate-x-1 transition" />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg border p-6 h-max sticky top-24">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {/* Address */}
        <div className="mb-5">
          <h3 className="text-sm font-medium text-gray-700 uppercase">
            Delivery Address
          </h3>
          <div className="mt-2 relative">
            <p className="text-gray-600 text-sm leading-relaxed p-2 border rounded-md">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary text-sm mt-1 hover:underline"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute bg-white border border-gray-300 mt-2 rounded-lg shadow-lg z-10 w-full max-h-60 overflow-y-auto">
                {addresses.map((addr) => (
                  <p
                    key={addr._id}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.street}, {addr.city}, {addr.state}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center p-2 hover:bg-primary/10 cursor-pointer font-medium"
                >
                  + Add Address
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="mb-5">
          <h3 className="text-sm font-medium text-gray-700 uppercase">Payment Method</h3>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="my-4" />

        {/* Price Summary */}
        <div className="text-gray-700 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency} {getCartAmount()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency} {(getCartAmount() * 2) / 100}</span>
          </div>
          <div className="flex justify-between font-semibold text-base mt-3">
            <span>Total</span>
            <span>{currency} {(getCartAmount() + (getCartAmount() * 2) / 100).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
