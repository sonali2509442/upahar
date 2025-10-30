// components/Checkout.jsx
import React, { useState } from 'react';
import api from '../utils/api';

export default function Checkout({ cartItems, address }) {
  const [secretSender, setSecretSender] = useState(false);
  const [senderAlias, setSenderAlias] = useState('');
  const [digitalFile, setDigitalFile] = useState(null);
  const [digitalMessage, setDigitalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('items', JSON.stringify(cartItems));
      form.append('address', JSON.stringify(address));
      form.append('secretSender', secretSender);
      form.append('senderAlias', secretSender ? (senderAlias || 'A Secret Admirer') : '');
      form.append('message', digitalMessage);
      if (digitalFile) form.append('digitalFile', digitalFile);

      const { data } = await api.post('/api/orders/checkout', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.success) {
        alert('Order placed!');
        // redirect etc
      } else alert('Failed');
    } catch (e) {
      console.error(e);
      alert('Error placing order');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Checkout</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <input type="checkbox" id="secret" checked={secretSender} onChange={e => setSecretSender(e.target.checked)} />
          <label htmlFor="secret">Send as Secret Sender</label>
        </div>

        {secretSender && (
          <div className="space-y-2">
            <input placeholder="Alias shown to recipient (optional)" value={senderAlias} onChange={e => setSenderAlias(e.target.value)} className="w-full p-2 border rounded" />
            <div className="text-sm text-gray-500">If blank, recipient will see "A Secret Admirer".</div>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-medium">Add a digital gift (image/video/e-card)</h4>
          <input type="file" accept="image/*,video/*" onChange={e => setDigitalFile(e.target.files[0])} />
          <textarea placeholder="Write a digital message" value={digitalMessage} onChange={e => setDigitalMessage(e.target.value)} className="w-full p-2 border rounded mt-2" />
        </div>

        <button type="submit" className="px-6 py-2 rounded bg-green-600 text-white">Place Order</button>
      </form>
    </div>
  );
}
