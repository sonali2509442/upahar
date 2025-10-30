import React from 'react';
import { CiDeliveryTruck } from "react-icons/ci";
import { IoLeaf } from "react-icons/io5";
import { CiRainbow } from "react-icons/ci";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdOutlineCompost } from "react-icons/md";

// Import images (if inside src/assets)
import bannerImage from "../assets/wrapped-green-gift-box-with-ribbon-bow-balloon-stickers-prop-colorful-candles-pink-background.jpg";

const features = [
  {
    icon: <CiDeliveryTruck />,
    title: 'Fastest Delivery',
    description: 'Surprise your loved ones with same-day or midnight delivery options.'
  },
  {
    icon: <IoLeaf />,
    title: 'Fresh Flowers & Quality Products',
    description: 'Only the freshest blooms and hand-picked products, guaranteed.'
  },
  {
    icon: <CiRainbow />,
    title: 'Wide Variety of Products',
    description: 'From flowers and cakes to plants and hampers — everything in one place.'
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Trusted by Thousands',
    description: 'Loved by 10,000+ happy customers'
  },
  {
    icon: <MdOutlineCompost />,
    title: 'Eco-Friendly Packaging',
    description: 'Sustainable packaging to protect your gifts and the planet.'
  }
];

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Banner image */}
      <img
        src={bannerImage}
        alt="Why we are the best"
        className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center md:items-end px-4 md:px-20">
        <div className="bg-white/80 md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none w-full md:w-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-6 text-center md:text-right">
            Why we are the best
          </h1>

          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 md:max-w-xs">
                <div className="text-2xl md:text-3xl text-primary mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;

