// components/HybridGiftingSelector.jsx
import React, { useState } from 'react';
import api from '../utils/api';

export default function HybridGiftingSelector({ product, onAddToCart }) {
  const [includeDigital, setIncludeDigital] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleAdd = () => {
    // pass digital options as meta
    onAddToCart({
      productId: product._id,
      qty: 1,
      digital: includeDigital ? { message, file } : null
    });
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">{product.name}</h3>
      <div className="mt-3 space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeDigital} onChange={e => setIncludeDigital(e.target.checked)} />
          <span>Add digital gift (e-card, video)</span>
        </label>

        {includeDigital && (
          <>
            <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} />
            <textarea placeholder="Write a short message" value={message} onChange={e => setMessage(e.target.value)} className="w-full p-2 border rounded" />
          </>
        )}

        <div className="flex gap-2 mt-3">
          <button onClick={handleAdd} className="px-4 py-2 rounded bg-indigo-600 text-white">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
