import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const ProductReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select a rating 🌸");

    try {
      const { data } = await axios.post("/api/reviews/add", {
        productId,
        rating,
        comment,
      });
      if (data.success) {
        toast.success("Thank you for your feedback 💖");
        setSubmitted(true);
      }
    } catch (error) {
      toast.error("Could not submit review 😔");
    }
  };

  if (submitted)
    return (
      <p className="text-green-600 text-sm mt-2 italic">
        ✅ Thanks for rating this product!
      </p>
    );

  return (
    <div className="mt-3 p-3 bg-pink-50 rounded-xl shadow-sm border border-pink-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">
        Rate this product
      </h3>

      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={22}
            className={`cursor-pointer transition-all ${
              star <= rating ? "text-yellow-400 scale-110" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <textarea
        className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
        placeholder="Write a short review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-primary-dull transition"
      >
        Submit
      </button>
    </div>
  );
};

export default ProductReview;
