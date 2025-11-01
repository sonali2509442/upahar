
// import React from 'react'
// import ProductCard from './ProductCard'
// import { useAppContext } from '../context/AppContext'

// const Bestseller = () => {
//   const { product } = useAppContext();

//   if (!product || !Array.isArray(product)) {
//     return <p className="text-center mt-6">Loading bestsellers...</p>;
//   }

//   const bestsellers = product.filter((p) => p.inStock).slice(0, 10);

//   if (bestsellers.length === 0) {
//     return <p className="text-center mt-6">No bestsellers available right now.</p>;
//   }

//   return (
//     <div className="mt-16">
//       <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

//       <div
//         className="
//           grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
//           gap-4 md:gap-6 mt-6
//         "
//       >
//         {bestsellers.map((p, index) => (
//           <ProductCard key={index} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Bestseller;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const Bestseller = () => {
//   const [bestsellers, setBestsellers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/product/bestsellers") // ✅ fixed route
//       .then((res) => {
//         if (res.data.success && Array.isArray(res.data.products)) {
//           setBestsellers(res.data.products); // ✅ access `res.data.products`
//         }
//       })
//       .catch((err) => console.error("Error fetching bestsellers:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-6">Loading bestsellers...</p>;
//   }

//   if (!bestsellers.length) {
//     return <p className="text-center mt-6">No bestsellers available right now.</p>;
//   }

//   return (
//     <div className="mt-16">
//       <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

//       <div
//         className="
//           grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
//           gap-4 md:gap-6 mt-6
//         "
//       >
//         {bestsellers.map((p, index) => (
//           <div key={index} className="border rounded-xl p-2 text-center shadow-sm">
//             <img
//               src={p.images?.[0]}
//               alt={p.name}
//               className="w-full h-40 object-cover rounded-lg"
//             />
//             <h3 className="mt-2 font-medium">{p.name}</h3>
//             <p className="text-gray-600 text-sm">Sold: {p.soldCount}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Bestseller;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Bestseller = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const { addToCart, currency } = useAppContext();
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_BACKEND_URL || "https://upahar-backend.vercel.app";
const imageBase = import.meta.env.VITE_IMAGE_URL || apiURL;


 useEffect(() => {
  axios
    .get(`${apiURL}/api/product/bestsellers`, { withCredentials: true })
    .then((res) => {
      console.log("✅ Bestsellers:", res.data);
      if (res.data.success) setBestsellers(res.data.products);
    })
    .catch((err) => console.error("Error fetching bestsellers:", err));
}, []);

const getFullImageURL = (img) => {
  if (!img) return "/fallback.png";
  if (img.startsWith("http")) return img;
  if (img.startsWith("/uploads")) return `${imageBase}${img}`;
  return `${imageBase}/uploads/${img}`;
};

  const handleProductClick = (category, id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/products/${category}/${id}`);
  };

  if (!bestsellers.length) {
    return <p className="text-center mt-6">Loading bestsellers...</p>;
  }

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium text-gray-800 text-center">
        Best Sellers
      </p>

      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
          gap-4 md:gap-6 mt-6
        "
      >
        {bestsellers.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl p-3 text-center shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <div
              onClick={() => handleProductClick(p.category, p._id)}
              className="cursor-pointer"
            >
              <img
                src={getFullImageURL(p.images?.[0])}
                alt={p.name}
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => (e.target.src = "/fallback.png")}
              />
              <h3 className="mt-2 font-medium text-gray-800 truncate">
                {p.name}
              </h3>
            </div>

            <p className="text-gray-900 font-semibold">
              {currency}
              {p.offerPrice}
            </p>

            <div className="flex justify-center gap-1 text-yellow-400 mt-1 text-sm">
              ⭐⭐⭐⭐☆
            </div>

            <button
              onClick={() => addToCart(p._id)}
              className="bg-pink-500 text-white px-3 py-1 rounded-lg mt-2 text-sm hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestseller;

