import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { product: allProducts, currency, fetchProduct, axios } = useAppContext();
  const [products, setProducts] = useState([]);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || "http://localhost:5000/uploads";

  const getFullImageURL = (img) => {
    if (!img) return "/fallback.png";
    return img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img.startsWith("/") ? img : "/" + img}`;
  };

  useEffect(() => {
  const fetchSellerProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/seller", { withCredentials: true });
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading seller products:", error);
      setProducts([]);
    }
  };

  fetchSellerProducts();
}, []);


  const toggleStock = async (id, currentStock) => {
    const newInStock = !currentStock;

    // Optimistically update local state
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, inStock: newInStock } : p))
    );

    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock: newInStock });
      if (data.success) toast.success(data.message);
      else {
        toast.error(data.message);
        // Revert if failed
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, inStock: currentStock } : p))
        );
      }
    } catch (error) {
      toast.error(error.message);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, inStock: currentStock } : p))
      );
    }
  };

  return (
    <div className="flex-1 h-[95vh] overflow-y-auto p-4 md:p-10 no-scrollbar">
      <h2 className="pb-4 text-lg font-medium">All Products</h2>
      <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
        <table className="w-full table-auto">
          <thead className="text-gray-900 text-sm text-left bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold hidden md:table-cell">Selling Price</th>
              <th className="px-4 py-3 font-semibold">In Stock</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500 divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-300">
                    <img
                      src={getFullImageURL(p.images?.[0])}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/fallback.png")}
                    />
                  </div>
                  <span className="truncate">{p.name}</span>
                </td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {currency}
                  {p.offerPrice}
                </td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={p.inStock}
                      onChange={() => toggleStock(p._id, p.inStock)}
                    />
                    <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;

