import React from "react";

const PromoBanner = () => {
  return (
    <div className="w-full py-8 px-4 md:px-12 xl:px-24 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Apple Homepod Card */}
     <div className="bg-[#f8f9fa] rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
  {/* Text */}
  <div>
    <span className="text-xs font-semibold text-white bg-blue-500 px-3 py-1 rounded-full inline-block mb-3">
      INTRODUCING
    </span>
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
      New Apple iMac 24"
    </h2>
    <p className="text-sm text-gray-600 mb-4 max-w-[300px]">
      Stunning 4.5K Retina display powered by the M3 chip. Designed for productivity and creativity.
    </p>
    <button className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-orange-600 transition">
      SHOP NOW →
    </button>
  </div>

  {/* iMac Image */}
  <img
    src="https://www.apple.com/newsroom/images/product/imac/standard/Apple_imac-magickeyboardnum-magicmouse2-macos-wallpaper_08042020_big.jpg.large.jpg"
    alt="Apple iMac"
    className="w-[260px] h-auto mt-6 md:mt-0"
  />
</div>



        {/* Xiaomi Mi 11 Card */}
            <div className="flex-1 relative bg-black text-white rounded-md shadow overflow-hidden flex items-center justify-between px-4 py-6">
  {/* Price Badge */}
  <div className="absolute top-4 right-4 bg-blue-500 text-white text-sm font-semibold rounded-full w-[60px] h-[60px] flex items-center justify-center shadow-md">
    $799
  </div>

  {/* Text Section */}
  <div>
    <span className="text-xs font-semibold text-black bg-yellow-400 px-3 py-1 rounded-full inline-block mb-3">
      INTRODUCING NEW
    </span>
    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
      Google Pixel 8 <br />
      12GB+256GB
    </h2>
    <p className="text-sm text-gray-300 mb-4 max-w-[300px]">
      Powered by Google Tensor G3. Stunning camera and smooth performance.
    </p>
    <button className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-orange-600 transition">
      SHOP NOW →
    </button>
  </div>

  {/* Bigger Phone Image */}
  <img
    src="/googlepixel8.jpeg"
    alt="Google Pixel 8"
    className="w-[280px] h-auto object-contain"
  />
</div>

      </div>
    </div>
  );
};

export default PromoBanner;
