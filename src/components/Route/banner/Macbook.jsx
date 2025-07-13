import React from "react";

const MacbookBannerWithGrid = () => {
 const productGroups = [
  {
    title: "FLASH SALE TODAY",
    products: [
      {
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: "$1,500",
        img: "https://discountstore.pk/cdn/shop/files/bose-sport-true-wireless-in-ear-headphones.jpg?v=1750833615",
      },
      {
        name: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: "$1,500",
        img: "https://images-na.ssl-images-amazon.com/images/I/71L1ezoIH9L._AC_UL495_SR435,495_.jpg",
      },
      {
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: "$1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-34.jpg",
      },
    ],
  },
  {
    title: "BEST SELLERS",
    products: [
      {
        name: "Samsung Electronics Samsung Galaxy S21 5G",
        price: "$1,500",
        img: "https://images.samsung.com/is/image/samsung/p6pim/pk/galaxy-s21/gallery/pk-galaxy-s21-5g-g991-366070-sm-g991bzagmea-362622379",
      },
      {
        name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
        price: "$1,500",
        img: "https://s.alicdn.com/@sc04/kf/H93b436371a1844d4858a34e210bf75d24.jpg_300x300.jpg",
      },
      {
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        img: "https://m.media-amazon.com/images/I/81y6Sj1S91L._UF1000,1000_QL80_.jpg",
      },
    ],
  },
  {
    title: "TOP RATED",
    products: [
      {
        name: "Portable Wishing Machine, 11lbs capacity Model 18NMF...",
        price: "$1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-14.jpg",
      },
      {
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        img: "https://m.media-amazon.com/images/I/81y6Sj1S91L._UF1000,1000_QL80_.jpg",
      },
      {
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: "$1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-16.jpg",
      },
    ],
  },
  {
    title: "NEW ARRIVAL",
    products: [
      {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones...",
        price: "$1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-11.jpg",
      },
      {
        name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker...",
        price: "$1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-17.jpg",
      },
      {
        name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart...",
        price: "$1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-19.jpg",
      },
    ],
  },
];


  return (
    <>
      {/* MacBook Banner */}
      <div className="w-full px-4 py-10">
        <div className="max-w-[1200px] mx-auto bg-[#e1eff7] rounded-md px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-[#2196f3] text-white text-[11px] font-semibold px-3 py-[6px] rounded mb-3 tracking-wide">
              SAVE UP TO $200.00
            </span>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1a1a1a] leading-tight mb-2">
              Macbook Pro
            </h2>
            <p className="text-[15px] text-[#333] leading-snug mb-6">
              Apple M1 Max Chip, 32GB Unified <br className="hidden sm:block" />
              Memory, 1TB SSD Storage
            </p>
            <button className="bg-[#ff6600] hover:bg-[#e65c00] transition text-white font-semibold text-[13px] px-5 py-2 rounded flex items-center justify-center gap-2 mx-auto lg:mx-0">
              SHOP NOW <span className="text-[16px]">→</span>
            </button>
          </div>

          <div className="relative flex-1 w-full flex justify-center">
            <img
              src="https://images.macrumors.com/t/Z2etxaxTR_KRMxAZKv1MmV2HGvs=/1600x1200/smart/article-new/2025/03/Apple-MacBook-Air-hero.jpg"
              alt="Macbook Pro"
              className="w-full max-w-[200px] h-auto object-contain"
            />
            <div className="absolute top-4 right-6 bg-white text-[#1a1a1a] border-2 border-[#FFEADB] rounded-full px-5 py-2 text-[13px] font-semibold shadow-md">
              $1999
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid Section */}
    <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {productGroups.map((group, idx) => (
    <div key={idx}>
      <h3 className="text-sm font-semibold mb-4 text-[#333] uppercase">
        {group.title}
      </h3>
      <div className="flex flex-col gap-4">
        {group.products.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border rounded-md p-3 hover:shadow-sm transition h-[100px]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 object-contain rounded"
            />
            <div className="flex flex-col justify-between h-full py-1">
              <p className="text-sm text-gray-700 leading-tight line-clamp-2">
                {item.name}
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default MacbookBannerWithGrid;
