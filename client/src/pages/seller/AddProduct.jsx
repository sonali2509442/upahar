// import React, { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Allcategories = [
//   { text: "Flowers", path: "flowers" },
//   { text: "Cakes", path: "cakes" },
//   { text: "Chocolates", path: "chocolates" },
//   { text: "Personalized Gifts", path: "gifts" },
//   { text: "Greeting Cards", path: "cards" },
//   { text: "Gift Hampers", path: "hampers" },
//   { text: "Plants", path: "plants" },
//   { text: "Soft Toys", path: "softoy" },
// ];

// const AddProduct = () => {
//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [offerPrice, setOfferPrice] = useState("");
//   const { axios } = useAppContext();

//   const onsubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = { name, description, category, price, offerPrice };
//       const formData = new FormData();
//       formData.append("productData", JSON.stringify(productData));
//       files.forEach((file) => formData.append("images", file));

//       const { data } = await axios.post("/api/product/add", formData, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         toast.success(data.message);
//         setName("");
//         setDescription("");
//         setCategory("");
//         setPrice("");
//         setOfferPrice("");
//         setFiles([]);
//       } else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-[95vh] bg-gradient-to-br from-pink-50 via-white to-pink-100 flex justify-center py-10 px-4">
//       <form
//         onSubmit={onsubmitHandler}
//         className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 space-y-6 border border-pink-100"
//       >
//         <h2 className="text-3xl font-semibold text-center text-pink-600 mb-4">
//           💕 Add a New Product
//         </h2>

//         {/* Upload Section */}
//         <div>
//           <p className="font-medium text-gray-700 mb-2">Upload Images</p>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {Array(4)
//               .fill("")
//               .map((_, index) => (
//                 <label
//                   key={index}
//                   htmlFor={`image${index}`}
//                   className="cursor-pointer flex items-center justify-center border-2 border-dashed border-pink-200 rounded-xl h-24 hover:border-pink-400 hover:bg-pink-50 transition"
//                 >
//                   <input
//                     type="file"
//                     id={`image${index}`}
//                     hidden
//                     onChange={(e) => {
//                       const updated = [...files];
//                       updated[index] = e.target.files[0];
//                       setFiles(updated);
//                     }}
//                   />
//                   {files[index] ? (
//                     <img
//                       src={URL.createObjectURL(files[index])}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded-xl"
//                     />
//                   ) : (
//                     <FaCloudUploadAlt className="text-4xl text-pink-400" />
//                   )}
//                 </label>
//               ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Product Name
//             </label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               type="text"
//               placeholder="E.g., Red Velvet Cake"
//               className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Category
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition"
//               required
//             >
//               <option value="">Select Category</option>
//               {Allcategories.map((item, idx) => (
//                 <option key={idx} value={item.path}>
//                   {item.text}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             placeholder="Describe your product..."
//             className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none resize-none transition"
//           />
//         </div>

//         {/* Prices */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Price (₹)
//             </label>
//             <input
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               type="number"
//               placeholder="0"
//               className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Offer Price (₹)
//             </label>
//             <input
//               value={offerPrice}
//               onChange={(e) => setOfferPrice(e.target.value)}
//               type="number"
//               placeholder="0"
//               className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-3 mt-6 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
//         >
//           Add Product 🌸
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

// pages/seller/AddProduct.jsx (frontend)
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Allcategories = [
  { text: "Flowers", path: "flowers" },
  { text: "Cakes", path: "cakes" },
  { text: "Chocolates", path: "chocolates" },
  { text: "Personalized Gifts", path: "gifts" },
  { text: "Greeting Cards", path: "cards" },
  { text: "Gift Hampers", path: "hampers" },
  { text: "Plants", path: "plants" },
  { text: "Soft Toys", path: "softoy" },
];

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const { axios, fetchProduct } = useAppContext();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = { name, description, category, price, offerPrice };
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/api/product/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        toast.success(data.message || "Product added");
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
        // refresh product list so UI shows new product
        if (typeof fetchProduct === "function") fetchProduct();
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      // show friendly error
      const msg = error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-pink-50 via-white to-pink-100 flex justify-center py-10 px-4">
      <form
        onSubmit={onsubmitHandler}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 space-y-6 border border-pink-100"
      >
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-4">
          💕 Add a New Product
        </h2>

        {/* upload grid */}
        <div>
          <p className="font-medium text-gray-700 mb-2">Upload Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer flex items-center justify-center border-2 border-dashed border-pink-200 rounded-xl h-24 hover:border-pink-400 hover:bg-pink-50 transition"
                >
                  <input
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const updated = [...files];
                      updated[index] = e.target.files[0];
                      setFiles(updated);
                    }}
                  />
                  {files[index] ? (
                    <img
                      src={URL.createObjectURL(files[index])}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <FaCloudUploadAlt className="text-4xl text-pink-400" />
                  )}
                </label>
              ))}
          </div>
        </div>

        {/* product fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="E.g., Red Velvet Cake" className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition" required />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition" required>
              <option value="">Select Category</option>
              {Allcategories.map((item, idx) => <option key={idx} value={item.path}>{item.text}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe your product..." className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none resize-none transition" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Price (₹)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="0" className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition" required />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Offer Price (₹)</label>
            <input value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} type="number" placeholder="0" className="w-full p-3 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-300 outline-none transition" required />
          </div>
        </div>

        <button type="submit" className="w-full py-3 mt-6 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all">Add Product 🌸</button>
      </form>
    </div>
  );
};

export default AddProduct;
