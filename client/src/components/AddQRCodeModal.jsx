import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ use this only

const AddQRCodeModal = ({ onClose }) => {
  const [option, setOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerate = () => {
    if (!inputValue.trim()) {
      alert("Please enter something to generate QR!");
      return;
    }
    setQrGenerated(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-[url(/images/qrbg.jpg)] rounded-lg p-6 w-80 shadow-xl relative">
        <h2 className="text-xl font-semibold mb-4">Add Your QR Code</h2>

        {!qrGenerated ? (
          <>
            <p className="text-gray-600 text-sm mb-3">
              What do you want to attach?
            </p>

            <div className="flex flex-col gap-2 mb-4">
              {["Message", "Video", "Scrapbook"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="qrOption"
                    value={opt}
                    checked={option === opt}
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {option && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Enter your {option.toLowerCase()} link or text
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    option === "Message"
                      ? "Write your message"
                      : "Paste your link"
                  }
                  className="w-full border p-2 rounded-md focus:ring-primary outline-none"
                />
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={!option || !inputValue.trim()}
                className="px-4 py-2 text-sm bg-primary text-white rounded disabled:opacity-50"
              >
                Generate QR
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <QRCodeCanvas value={inputValue} size={180} />
            <p className="mt-3 text-sm text-gray-600 text-center">
              Your QR for {option.toLowerCase()} is ready 🎁
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQRCodeModal;

