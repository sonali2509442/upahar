import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";
import axios from "axios";

const Order = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Helper function for correct image URL
  const getFullImageURL = (img) => {
    if (!img) return "/placeholder.png";
    return img.startsWith("http")
      ? img
      : `${BACKEND_URL}/${img.startsWith("/") ? img.slice(1) : img}`;
  };

  // Fetch seller orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders/seller`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setOrders(res.data.orders || []);
      } else {
        setOrders([]);
        console.error("No orders found:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll bg-gradient-to-br from-pink-50 via-white to-pink-100 no-scrollbar">
      <div className="md:p-10 p-5">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-8 drop-shadow-sm">
          🌸 Seller Orders Dashboard
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-pink-500 text-lg animate-pulse">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center mt-24 text-gray-500">
            <FaBoxOpen className="mx-auto text-6xl text-pink-300 mb-4" />
            <p className="text-xl">No orders received yet 💌</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {orders.map((order, index) => (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-pink-100 hover:shadow-2xl transition-all duration-300 p-6"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="font-mono text-pink-600">
                      {order._id?.slice(-6) || ""}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* ✅ Product Info */}
                  <div className="flex-1">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex gap-3 mb-3 items-center">
                        <img
                          src={getFullImageURL(item.product?.images?.[0])}
                          alt={item.product?.name || "Product"}
                          className="w-16 h-16 object-cover rounded-xl border border-pink-100"
                          onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.product?.name || "Unknown Product"}
                          </p>
                          <p className="text-pink-500 text-sm">
                            × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="text-sm text-gray-600 leading-snug max-w-xs">
                    <p className="font-semibold text-gray-800 mb-1">
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <p>{order.address?.street}</p>
                    <p>
                      {order.address?.city}, {order.address?.state}{" "}
                      {order.address?.zipcode}
                    </p>
                    <p>{order.address?.country}</p>
                    <p className="text-pink-500 mt-1">
                      📞 {order.address?.phone}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-xl font-semibold text-pink-600">
                      {currency}
                      {order.amount || 0}
                    </p>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Method:</span>{" "}
                      {order.paymentType || "N/A"}
                    </p>
                    <p className="mt-1">
                      <span className="font-medium">Payment:</span>{" "}
                      {order.isPaid ? (
                        <span className="text-green-500 font-semibold">Paid</span>
                      ) : (
                        <span className="text-yellow-500 font-semibold">
                          Pending
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

