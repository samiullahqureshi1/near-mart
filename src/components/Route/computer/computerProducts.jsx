import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ComputerProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allProducts?.length > 0) {
      const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sorted.slice(0, 8));
    }
  }, [allProducts]);

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        {/* LEFT: Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-y-2">
            <h2 className="text-xl md:text-2xl font-semibold">Computer Accessories</h2>
            <button className="text-orange-500 font-semibold text-sm">
              Browse All Product →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>

        {/* RIGHT: Promo Sidebar */}
     <div className="flex flex-col gap-4 h-full min-h-[700px]">
  <div className="flex flex-col justify-between h-full">
    {/* Promo 1 – 70% */}
    <div className="shadow bg-white rounded-md p-6 flex flex-col justify-between basis-[65%]">
      <div className="text-center">
        <img src="/earbuds.webp" alt="Xiaomi Earbuds" className="w-20 mx-auto mb-5" />
        <h3 className="text-[18px] font-semibold text-[#1a1a1a] mb-2 leading-tight">
          Xiaomi True <br /> Wireless Earbuds
        </h3>
        <p className="text-[14px] text-[#3b3b3b] mb-3 leading-snug">
          Escape the noise. It’s time to hear the magic with Xiaomi Earbuds.
        </p>
        <p className="text-[14px] font-semibold text-[#3b3b3b] mb-5">
          Only for: <span className="bg-white px-3 py-1 rounded text-[14px] font-semibold text-[#1a1a1a] border"> $299 USD </span>
        </p>
      </div>
      <button className="w-full bg-[#FF6B00] hover:bg-[#e95d00] transition text-white text-[13px] font-semibold py-2 rounded flex items-center justify-center gap-1">
        SHOP NOW <span className="text-[16px]">→</span>
      </button>
    </div>

    {/* Promo 2 – 30% */}
    <div className="bg-[#1e2c3c] rounded-md p-6 text-white text-center shadow flex flex-col justify-between basis-[35%] mt-4">
      <div>
        <p className="text-[10px] uppercase text-[#a1c9f7] font-semibold mb-1 tracking-widest">
          SUMMER SALES
        </p>
        <h3 className="text-[20px] font-bold mb-1">37% DISCOUNT</h3>
        <p className="text-[13px] leading-snug">
          only for <span className="text-[#FFD700] font-semibold">SmartPhone</span> product.
        </p>
      </div>
      <button className="w-full mt-4 bg-[#2e8ef7] hover:bg-[#1170cd] transition text-white text-[13px] font-semibold py-2 rounded flex items-center justify-center gap-1">
        SHOP NOW <span className="text-[16px]">→</span>
      </button>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = product.images || [];

  const badgeColor = {
    hot: "bg-red-500",
    sale: "bg-green-600",
    best: "bg-blue-500",
    deal: "bg-yellow-500",
  };

  const badge = product.badge?.toLowerCase();

  return (
    <div className="bg-white rounded-md border hover:shadow-md transition p-3 relative">
      {/* Badge */}
      {badge && (
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-[10px] text-white font-semibold uppercase rounded-sm ${
            badge === "hot"
              ? badgeColor.hot
              : badge === "sale"
              ? badgeColor.sale
              : badge === "best deals"
              ? badgeColor.best
              : badgeColor.deal
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Image */}
      <a href={`/product/${product.slug || product._id}`}>
        <img
          src={images[currentImage]?.url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-[160px] object-contain mb-2"
        />
      </a>

      {/* Name */}
      <h3 className="text-[14px] font-medium text-gray-800 leading-tight mb-1 line-clamp-2">
        {product.name?.split(" ").slice(0, 2).join(" ") || "Product Name"}
      </h3>

      {/* Description */}
      <p className="text-[12px] text-gray-600 mb-2">
        {product.name || "Product full title"}
      </p>

      {/* Rating */}
      <div className="text-xs text-yellow-500 flex items-center mb-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(product.ratings || 4.3) ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1 text-gray-700 font-medium">
          {(product.ratings || 4.3).toFixed(1)}/5
        </span>
        <span className="ml-1 text-gray-500">({product.reviews || 3888})</span>
      </div>

      {/* Pricing */}
      <div className="mt-1">
        <p className="text-sm font-semibold text-[#1a1a1a]">
          ${product.discountPrice || product.price}
        </p>
        {product.originalPrice && (
          <p className="text-xs text-gray-400 line-through">
            ${product.originalPrice}
          </p>
        )}
      </div>
    </div>
  );
};

export default ComputerProduct;
