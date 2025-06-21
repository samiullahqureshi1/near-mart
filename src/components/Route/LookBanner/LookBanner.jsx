import React from "react";
import styles from "../../../styles/styles";


const LookbookBanner = () => {
  return (
    <div className="w-full py-10 px-4 md:px-8 lg:px-20 bg-white">
<div className={`${styles.category} grid grid-cols-1 md:grid-cols-2 gap-6 items-center`}>

        {/* LEFT BLOCK - Single Image with Overlay */}
        <div className="relative w-full h-[300px]">
          <img
            src="https://demo-kalles-4-1.myshopify.com/cdn/shop/files/5_2022-03-02.jpg?format=pjpg&v=1652057918&width=720"
            alt="lookbook"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-1">LOOKBOOK 2023</h3>
            <p className="text-sm md:text-base tracking-wide">MAKE LOVE THIS LOOK</p>
          </div>
        </div>

        {/* RIGHT BLOCK - Single Image with Centered Text */}
        <div className="relative w-full h-[300px]">
          <img
            src="https://demo-kalles-4-1.myshopify.com/cdn/shop/files/6_2022-03-02.jpg?format=pjpg&v=1652057917&width=720"
            alt="summer-sale"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center px-4">
            <h4 className="text-lg md:text-xl font-medium mb-1">SUMMER SALE</h4>
            <h2 className="text-2xl md:text-3xl font-bold">UP TO 70%</h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LookbookBanner;
