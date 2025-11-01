import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { currency = '₹', addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  // Helper to get product image
  const getProductImage = () => {
    const baseURL =  import.meta.env.VITE_IMAGE_URL || "https://upahar-backend.vercel.app";
;
    if (Array.isArray(product.images) && product.images.length > 0) {
      const img = product.images[0];
      return img.startsWith("http") ? img : `${baseURL}${img.startsWith('/') ? img : '/' + img}`;
    } else if (product.image) {
      return product.image.startsWith("http")
        ? product.image
        : `${baseURL}${product.image.startsWith('/') ? product.image : '/' + product.image}`;
    }
    return "/fallback.png";
  };

  if (!product) {
    return (
      <div className="border border-gray-300 rounded-md p-4 bg-white w-full flex items-center justify-center text-gray-400">
        Loading product...
      </div>
    );
  }

  // Get current cart item object safely
  const cartItem = cartItems[product.id || product._id] || {};

  return (
    <div
      onClick={() => {
        if (product?.category && (product.id || product._id)) {
          navigate(`/products/${product.category.toLowerCase()}/${product.id || product._id}`);
          window.scrollTo(0, 0);
        }
      }}
      className="border border-gray-200 rounded-lg bg-white shadow-sm cursor-pointer flex flex-col hover:shadow-md transition"
    >
      {/* Image */}
    <div className="w-full h-52 sm:h-40 md:h-48 flex items-center justify-center overflow-hidden bg-gray-50 rounded-t-lg">
  <img
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    src={getProductImage()}
    alt={product.name || "Product"}
    onError={(e) => (e.target.src = "/fallback.png")}
  />
</div>


      {/* Content */}
      <div className="px-3 pb-3 flex flex-col flex-grow text-gray-700">
        <p className="text-xs text-gray-500">{product.category}</p>
        <p className="font-medium text-sm sm:text-base truncate">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 text-yellow-500 text-sm mt-1">
          {[...Array(5)].map((_, i) =>
            i < 4 ? <FaStar key={i} /> : <FaStarHalfAlt key={i} />
          )}
          <span className="text-gray-500 text-xs ml-1">(4)</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-end justify-between mt-3">
          <p className="text-sm sm:text-base md:text-lg font-medium text-primary">
            {currency}{product.offerPrice}{" "}
            <span className="text-gray-500 line-through text-xs sm:text-sm">
              {currency}{product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItem.quantity ? (
              <button
                className="flex items-center gap-1 bg-primary/10 border border-primary/40 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
                onClick={() => addToCart(product.id || product._id)}
              >
                <BsCart4 />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-primary/20 rounded px-2 py-1 text-xs sm:text-sm">
                <button onClick={() => removeFromCart(product.id || product._id)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => addToCart(product.id || product._id)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
