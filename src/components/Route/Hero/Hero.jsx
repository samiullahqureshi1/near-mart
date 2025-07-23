import React from "react";
import { TbTruckDelivery, TbLock } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { FiRotateCcw } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  return (
    <div className="bg-white w-full px-4 py-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-4 bg-[#f5f7f9] shadow rounded-md px-6 py-8 flex flex-col md:flex-row items-center justify-between min-h-[400px]">
            <div className="w-full md:w-1/2 pr-6">
              <p className="text-xs text-blue-600 font-semibold tracking-wide uppercase">
                THE BEST PLACE TO PLAY
              </p>
              <h2 className="text-lg md:text-3xl font-semibold mt-2">
                Xbox Consoles
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
                Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for GH₵2 USD.
              </p>
              <Link to="/products">
                <button className="mt-5 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition">
                  SHOP NOW →
                </button>
              </Link>
            </div>
            <div className="relative mt-6 md:mt-0 w-full md:w-auto flex justify-center">
              <div className="relative p-3 inline-block">
                <img
                  src="/xboxConsole.webp"
                  alt="Xbox"
                  className="w-[170px] md:w-[220px] object-contain"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-sky-500 text-white text-xs font-bold rounded-full px-4 py-1.5 shadow-md">
                    GH₵299
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 h-[400px] flex flex-col gap-4">
            <div className="flex-1 relative bg-black text-white rounded-md shadow overflow-hidden flex items-center justify-between px-4 py-4">
              <div className="max-w-[60%] z-10">
                <p className="text-yellow-400 text-xs font-semibold">
                  SUMMER SALES
                </p>
                <h3 className="text-sm font-semibold mt-1 leading-snug">
                  New Google Pixel 6 Pro
                </h3>
                <Link to="/products">
                  <button className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded transition">
                    SHOP NOW →
                  </button>
                </Link>
              </div>
              <div className="relative w-[40%] h-full flex justify-end items-start">
                <img
                  src="/googlepixel8.jpeg"
                  alt="Pixel Phone"
                  className="h-full object-cover rounded-tr-md"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-sm shadow-md z-20">
                  29% OFF
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-md shadow px-6 py-4 flex items-center h-full">
              <div className="w-[90px] h-[90px] flex-shrink-0">
                <img
                  src="/earbuds.webp"
                  alt="Earbuds"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-5 flex flex-col justify-center">
                <h3 className="text-base font-semibold mb-1">
                  Xiaomi FlipBuds Pro
                </h3>
                <p className="text-sky-500 text-sm font-bold mb-3">GH₵299 USD</p>
                <Link to="/products">
                  <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded transition w-fit">
                    SHOP NOW →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 border-t pt-6 text-center text-sm">
          <div className="flex flex-col items-center">
            <TbTruckDelivery size={22} className="text-gray-700 mb-1" />
            <p className="font-semibold text-xs">FASTED DELIVERY</p>
            <p className="text-gray-500 text-xs">Delivery in 24H</p>
          </div>
          <div className="flex flex-col items-center">
            <FiRotateCcw size={22} className="text-gray-700 mb-1" />
            <p className="font-semibold text-xs">24 HOURS RETURN</p>
            <p className="text-gray-500 text-xs">100% money-back guarantee</p>
          </div>
          <div className="flex flex-col items-center">
            <TbLock size={22} className="text-gray-700 mb-1" />
            <p className="font-semibold text-xs">SECURE PAYMENT</p>
            <p className="text-gray-500 text-xs">Your money is safe</p>
          </div>
          <div className="flex flex-col items-center">
            <BiSupport size={22} className="text-gray-700 mb-1" />
            <p className="font-semibold text-xs">SUPPORT 24/7</p>
            <p className="text-gray-500 text-xs">Live contact/message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
