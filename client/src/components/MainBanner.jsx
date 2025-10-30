import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";

const MainBanner = () => {
    return (
        <div className="relative">
            {/* Desktop Image */}
            <img 
                src="/images/top-view-bouquet-flowers-with-gift-box-copy-space (1).jpg" 
                alt="banner"
                className="w-full h-[500px] object-cover hidden md:block" 
            />

            {/* Mobile Image */}
            <img 
                src="/images/top-view-bouquet-flowers-with-gift-box-copy-space (1).jpg" 
                alt="banner"
                className="w-full h-[300px] object-cover md:hidden" 
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-16 lg:pl-24">
                
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left 
                max-w-md leading-tight lg:leading-snug text-[#DC143C] drop-shadow-md">
                    Wrap your feelings Unwrap a smile
                </h1>

                {/* Buttons */}
                <div className="flex items-center mt-6 font-medium gap-4">
                    <Link 
                        to="/products" 
                        className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-[#DC143C] cursor-pointer"
                    >
                        Shop now
                        <IoIosArrowRoundForward className="text-[#DC143C] transition group-hover:translate-x-1"/>
                    </Link>

                    <Link 
                        to="/products" 
                        className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer text-[#DC143C]"
                    >
                        Explore deals
                        <IoIosArrowRoundForward className="transition group-hover:translate-x-1"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
