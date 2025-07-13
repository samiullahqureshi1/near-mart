import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { categoriesData } from "../../../static/data";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (allProducts?.length > 0) {
      const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sorted.slice(0, 8));
    }
  }, [allProducts]);

  const handleNext = () => {
    if (slideIndex < 1) setSlideIndex(slideIndex + 1);
  };

  const handlePrev = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
  };

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Banner */}
          <div
            className="w-full lg:w-[260px] rounded-md overflow-hidden relative"
            style={{
              backgroundImage: "url('/sam.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "720px",
            }}
          >
            {/* Soft Yellow Overlay to improve readability */}
            <div className="absolute inset-0 "></div>

            <div className="relative z-10 h-full flex flex-col justify-between p-4">
              {/* Top Text Content */}
              <div>
                <p className="text-xs uppercase mb-1 text-[#3b3b3b] font-semibold tracking-wide">
                  Computer & Accessories
                </p>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  32% Discount
                </h3>
                <p className="text-[15px] text-[#333] mb-4">
                  For all electronics products
                </p>
                {/* <p className="text-[13px] text-[#3b3b3b] mb-1">Offers ends in:</p>
      <button className="px-3 py-[6px] bg-white border border-gray-300 text-[13px] font-semibold text-[#111] rounded-sm">
        ENDS OF CHRISTMAS
      </button> */}
              </div>

              {/* CTA Button at bottom */}
              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 transition text-white text-[14px] rounded-md font-semibold mt-4">
                SHOP NOW →
              </button>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full">
            {/* Header + Filter */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">
                Featured Products
              </h2>
              <div className="flex gap-4 text-sm font-medium text-gray-600 flex-wrap">
                {/* <button className="text-blue-600 underline">All Product</button>
                <button>Smart Phone</button>
                <button>Laptop</button>
                <button>Headphone</button>
                <button>TV</button> */}
                <button className="text-orange-500 font-semibold">
                  Browse All Product →
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
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

    // badge colors
    const badgeColor = {
      hot: "bg-red-500",
      sale: "bg-green-600",
      best: "bg-blue-500",
      deal: "bg-yellow-500",
    };

    // detect badge type (custom logic can vary)
    const badge = product.badge?.toLowerCase(); // e.g. "hot", "sale", etc.

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

        {/* Product Image */}
        <a href={`/product/${product.slug || product._id}`}>
          <img
            src={images[currentImage]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-[160px] object-contain mb-2"
          />
        </a>

        {/* Name */}
        <h3 className="text-[14px] font-medium text-gray-800 leading-tight mb-1">
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

export default FeaturedProduct;
