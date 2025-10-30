import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import AddQRCodeModal from "../components/AddQRCodeModal";

const ProductDetails = () => {
  const { id } = useParams();
  const { product: allProducts, addToCart } = useAppContext();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrSelected, setQrSelected] = useState(false);
  const [qrData, setQrData] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);

  const baseURL = import.meta.env.VITE_IMAGE_URL || "http://localhost:5000";

  // ✅ Helper: Get full image path
  const getFullImageURL = (img) => {
    if (!img) return "/fallback.png";
    return img.startsWith("http")
      ? img
      : `${baseURL}${img.startsWith("/") ? img : "/" + img}`;
  };

  // ✅ Find product from context
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;
    const found = allProducts.find(
      (item) => item._id === id || item.id === id
    );
    setProduct(found);

    if (found) {
      setSelectedImage(getFullImageURL(found.images?.[0] || found.image));
      setTotalPrice(found.offerPrice);
    }
  }, [id, allProducts]);

  // ✅ Update total price if QR selected
  useEffect(() => {
    if (!product) return;
    const qrPrice = qrSelected ? 200 : 0;
    setTotalPrice(product.offerPrice + qrPrice);
  }, [qrSelected, product]);

  if (!product)
    return <div className="text-center mt-20">Loading product...</div>;

  // ✅ Related products
  const relatedProducts = allProducts.filter(
    (item) => item._id !== product._id && item.id !== product.id
  );

  // ✅ Add to Cart
 // inside ProductDetails component (replace the existing handleAddToCart)
const handleAddToCart = () => {
  // pass extra price and qr info to context addToCart
  const extra = qrSelected ? 200 : 0;
  addToCart(product._id, extra, qrSelected, qrData);
};


  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="border p-4 flex justify-center items-center rounded-lg">
            <img
              src={getFullImageURL(selectedImage)}
              alt={product.name}
              className="w-full h-72 object-contain"
              onError={(e) => (e.target.src = "/fallback.png")}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {(product.images || [product.image]).map((img, idx) => (
              <img
                key={idx}
                src={getFullImageURL(img)}
                alt={`thumb-${idx}`}
                className={`w-16 h-16 object-cover border cursor-pointer rounded ${
                  selectedImage === getFullImageURL(img)
                    ? "border-pink-500"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(getFullImageURL(img))}
                onError={(e) => (e.target.src = "/fallback.png")}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-2xl font-semibold">{product.name}</h2>

          <div className="mt-4">
            <p className="line-through text-gray-400">
              MRP: ₹{product.price}
            </p>
            <p className="text-lg font-bold text-gray-800">
              Total Price: ₹{totalPrice}
            </p>
            <p className="text-sm text-gray-500">(inclusive of all taxes)</p>
          </div>

          {/* QR Code Option */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={qrSelected}
                onChange={() => setQrSelected(!qrSelected)}
              />
              <span>
                Add QR Code for Digital Message / Video / Scrapbook (+₹200)
              </span>
            </label>

            {qrSelected && (
              <button
                className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                onClick={() => setShowQRModal(true)}
              >
                Add QR Code Content
              </button>
            )}
          </div>

          {/* About Product */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">About Product</h4>
            <p className="text-gray-600 text-sm">
              {product.desc || product.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
            >
              Add to Cart
            </button>
            <button
  onClick={() => {
    handleAddToCart();
    navigate("/cart");
  }}
  className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
>
  Buy Now
</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p>Related Products</p>
          <div className="w-20 h-0.5 bg-pink-500 rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <AddQRCodeModal
          onClose={() => setShowQRModal(false)}
          setQrData={setQrData}
        />
      )}
    </div>
  );
};

export default ProductDetails;


