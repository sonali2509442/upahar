import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { FaBox, FaRupeeSign } from "react-icons/fa";
import { MdLocationOn, MdAccessTimeFilled } from "react-icons/md";
import ProductReview from "../components/ProductReview";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, axios, user, userLoaded, navigate } = useAppContext();

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/user");
      if (data.success) setMyOrders(data.orders);
      else setMyOrders([]);
    } catch (error) {
      console.error("❌ Error fetching orders:", error?.response?.data || error.message);
      setMyOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLoaded && user) fetchMyOrders();
    else if (userLoaded && !user) navigate("/login");
  }, [userLoaded, user]);

  const getFullImageURL = (img) => {
    if (!img) return "/placeholder.png";
    return img.startsWith("http")
      ? img
      : `${BACKEND_URL}/${img.startsWith("/") ? img.slice(1) : img}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="mt-20 pb-16 px-5 md:px-10 lg:px-20 min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-wide">
          My Orders
        </h1>
        <p className="text-gray-500 mt-2">
          View all your recent purchases and see your total spending 💌
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
      </div>

      {myOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <FaBox className="text-5xl mb-4 opacity-40" />
          <p>No orders found yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {myOrders.map((order) => {
            // Calculate subtotal
            const subtotal = order.items?.reduce((sum, item) => {
              const price = item.product?.offerPrice || 0;
              const qty = item.quantity || 1;
              return sum + price * qty;
            }, 0) || 0;

            // ✅ Only apply QR charge if any item has qrCode
            const qrCharge =
              order.items?.some((item) => item.qrCode) ? 200 : 0;

            const tax = subtotal * 0.02; // 2% tax
            const totalAmount = subtotal + qrCharge + tax;

            return (
              <div
                key={order._id}
                className="border border-gray-200 bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* 🆔 Order Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">
                    Order ID:{" "}
                    <span className="font-medium text-gray-600">{order._id}</span>
                  </span>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* 🛍️ Ordered Items */}
                <div className="space-y-6">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-100 pb-5 last:border-none"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={getFullImageURL(item.product?.images?.[0])}
                            alt={item.product?.name || "Product"}
                            className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                            onError={(e) => (e.target.src = "/placeholder.png")}
                          />
                          <div>
                            <h2 className="font-semibold text-gray-800 text-lg">
                              {item.product?.name || "Product Name"}
                            </h2>
                            <p className="text-gray-500 text-sm">
                              Category: {item.product?.category || "N/A"}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Quantity: {item.quantity || 1}
                            </p>
                            {item.qrCode && (
                              <p className="text-xs text-blue-500 mt-1">
                                Includes QR customization
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-primary font-semibold flex items-center text-lg">
                          <FaRupeeSign className="mr-1" />
                          {(item.product?.offerPrice * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>

                      {/* ⭐ Rating Section */}
                      <ProductReview productId={item.product?._id} />
                    </div>
                  ))}
                </div>

                {/* 📦 Order Footer */}
                <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1">
                      <MdAccessTimeFilled className="text-primary" /> Date
                    </span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1">
                      <MdLocationOn className="text-primary" /> Payment
                    </span>
                    <span>{order.paymentType}</span>
                  </div>

                  {/* 💰 Totals Section */}
                  <div className="pt-3 border-t border-gray-100 space-y-1 text-gray-700">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>
                        {currency}
                        {subtotal.toFixed(2)}
                      </span>
                    </div>

                    {qrCharge > 0 && (
                      <div className="flex justify-between">
                        <span>QR Charge:</span>
                        <span>
                          {currency}
                          {qrCharge.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Tax (2%):</span>
                      <span>
                        {currency}
                        {tax.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between font-semibold text-gray-900 text-base mt-1">
                      <span>Total Amount:</span>
                      <span>
                        {currency}
                        {totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/products/${order.items[0]?.product?.category?.toLowerCase()}/${order.items[0]?.product?._id}`
                    )
                  }
                  className="mt-6 w-full bg-primary text-white py-2 rounded-full font-medium hover:bg-primary/90 transition"
                >
                  View Product
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;






// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { FaBox, FaRupeeSign } from "react-icons/fa";
// import { MdLocationOn, MdAccessTimeFilled } from "react-icons/md";

// const MyOrders = () => {
//   const [myOrders, setMyOrders] = useState([]);
//   const { currency, axios, user, userLoaded, navigate } = useAppContext();

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//   const fetchMyOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/orders/user");
//       if (data.success) {
//         setMyOrders(data.orders);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     if (userLoaded && user) {
//       fetchMyOrders();
//     }
//   }, [userLoaded, user]);

//   const getFullImageURL = (img) => {
//     if (!img) return "/placeholder.png";
//     return img.startsWith("http")
//       ? img
//       : `${BACKEND_URL}/${img.startsWith("/") ? img.slice(1) : img}`;
//   };

//   return (
//     <div className="mt-20 pb-16 px-5 md:px-10 lg:px-20 min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">
//       <div className="text-center mb-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-wide">
//           My Orders
//         </h1>
//         <p className="text-gray-500 mt-2">
//           View all your recent purchases and track your deliveries
//         </p>
//         <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//           <FaBox className="text-5xl mb-4 opacity-40" />
//           <p>No orders found yet.</p>
//           <button
//             onClick={() => navigate("/products")}
//             className="mt-4 bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dull transition"
//           >
//             Start Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           {myOrders.map((order, index) => (
//             <div
//               key={index}
//               className="border border-gray-200 bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-sm text-gray-400">
//                   Order ID: <span className="font-medium text-gray-600">{order._id}</span>
//                 </span>
//                 <span
//                   className={`text-sm font-semibold px-3 py-1 rounded-full ${
//                     order.status === "Delivered"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-yellow-100 text-yellow-600"
//                   }`}
//                 >
//                   {order.status || "Pending"}
//                 </span>
//               </div>

//               <div className="space-y-5">
//                 {order.items?.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-none"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={getFullImageURL(item.product?.images?.[0])}
//                         alt={item.product?.name || "Product"}
//                         className="w-20 h-20 object-cover rounded-xl border border-gray-200"
//                         onError={(e) => (e.target.src = "/placeholder.png")}
//                       />
//                       <div>
//                         <h2 className="font-semibold text-gray-800 text-lg">
//                           {item.product?.name || "Product Name"}
//                         </h2>
//                         <p className="text-gray-500 text-sm">
//                           Category: {item.product?.category || "N/A"}
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                           Quantity: {item.quantity || 1}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-primary font-semibold flex items-center">
//                       <FaRupeeSign className="mr-1" />
//                       {(item.product?.offerPrice || 0) * (item.quantity || 1)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-5 border-t border-gray-200 pt-4 text-sm text-gray-600">
//                 <div className="flex justify-between mb-1">
//                   <span className="flex items-center gap-1">
//                     <MdAccessTimeFilled className="text-primary" /> Date
//                   </span>
//                   <span>{new Date(order.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex justify-between mb-1">
//                   <span className="flex items-center gap-1">
//                     <MdLocationOn className="text-primary" /> Payment
//                   </span>
//                   <span>{order.paymentType}</span>
//                 </div>
//                 <div className="flex justify-between mt-2 font-medium text-gray-800 text-base">
//                   <span>Total Amount:</span>
//                   <span>
//                     {currency}
//                     {order.amount}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={() =>
//                   navigate(
//                     `/products/${order.items[0]?.product?.category?.toLowerCase()}/${order.items[0]?.product?._id}`
//                   )
//                 }
//                 className="mt-6 w-full bg-primary text-white py-2 rounded-full font-medium hover:bg-primary-dull transition"
//               >
//                 View Product
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

