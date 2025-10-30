import React, { useState } from "react";

const GiftQRCodeOption = ({ basePrice, onPriceChange }) => {
  const [addQR, setAddQR] = useState(false);
  const qrPrice = 50; // extra cost for QR code

  const handleChange = () => {
    const newState = !addQR;
    setAddQR(newState);
    onPriceChange(newState ? basePrice + qrPrice : basePrice);
  };

  return (
    <div className="mb-4">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={addQR}
          onChange={handleChange}
          className="mr-2"
        />
        Add QR Code for Digital Message / Video / Scrapbook (+₹{qrPrice})
      </label>
    </div>
  );
};

export default GiftQRCodeOption;
