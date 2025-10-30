import React from 'react'
import { useNavigate } from 'react-router-dom';

const StartSellingSec = () => {
    const navigate = useNavigate();

  return (
   <section className="flex flex-col items-center justify-center bg-pink-50 py-16 mt-10 rounded-2xl shadow-md mx-4 md:mx-16">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">
        Want to Start Selling on Uphar?
      </h2>
      <p className="text-gray-600 text-center max-w-xl mb-6">
        Join our community of creative sellers and share your gifts with the world!  
        Whether it's handmade crafts, flowers, or sweet surprises — your creations deserve love. 💖
      </p>
      <button
        onClick={() => navigate("/seller-login")}
        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 shadow-lg"
      >
        Start Selling Now
      </button>
    </section>
  )
}

export default StartSellingSec