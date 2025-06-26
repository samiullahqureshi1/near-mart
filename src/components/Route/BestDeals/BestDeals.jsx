import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0); 

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sorted.slice(0, 8)); 
    }
  }, [allProducts]);

  const handleNext = () => {
    if (slideIndex < 1) setSlideIndex(1);
  };

  const handlePrev = () => {
    if (slideIndex > 0) setSlideIndex(0);
  };

  return (
    <div className="w-full bg-[#f8f9fb] py-12 px-4 md:px-12 lg:px-20 xl:px-32 overflow-hidden">
      {/* Navigation Arrows */}
      <div className="flex items-center justify-between mb-4 px-2 md:px-4 lg:px-0">
        {/* Left: Title */}
        <h2 className="text-lg md:text-lg font-medium">
          Recommended for you
        </h2>

        {/* Right: Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={slideIndex === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              slideIndex === 0
                ? "bg-gray-300 text-white"
                : "bg-black text-white"
            }`}
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            disabled={slideIndex === 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              slideIndex === 1
                ? "bg-gray-300 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Animated Slider */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: "200%", // 2 slides (4 cards each)
            transform: `translateX(-${slideIndex * 50}%)`,
          }}
        >
          {[0, 1].map((slide) => (
            <div
              key={slide}
              className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
            >
              {data.slice(slide * 4, slide * 4 + 4).map((product, index) => (
                <ProductCardWithSlider key={index} product={product} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCardWithSlider = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = product.images || [];

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg relative text-[#1c1c1c]">
      {/* Bestseller badge */}
      <span className="bg-[#f1f1f1] text-[13px] font-semibold text-black px-2 py-1 rounded inline-block mb-2">
        Bestseller
      </span>

      {/* Image and navigation */}
      <div className="relative mb-4">
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-2 z-10 bg-white text-black p-1 rounded-full shadow hover:scale-110"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-2 z-10 bg-white text-black p-1 rounded-full shadow hover:scale-110"
            >
              <FiChevronRight size={16} />
            </button>
          </>
        )}
        <a href={`/product/${product.slug || product._id}`}>
          <img
            src={images[currentImage]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-[180px] object-contain"
          />
        </a>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold leading-tight mb-1">
        {product.name?.split(" ")[0] + " " + product.name?.split(" ")[1] ||
          "iPhone 13"}
      </h3>

      {/* Subtitle */}
      <p className="text-[13px] text-gray-600 mb-1">
        {product.name || "iPhone 13 128GB - Midnight - Unlocked"}
      </p>

      {/* Rating */}
      {/* Rating with 5 stars */}
      <div className="flex items-center text-[13px] font-medium text-gray-700 mb-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(product.ratings || 4.3) ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1">{(product.ratings || 4.3).toFixed(1)}/5</span>
        <span className="ml-1 text-gray-500">({product.reviews || 3888})</span>
      </div>

      {/* Price */}
      <div className="mt-1">
        <p className="text-[16px] font-semibold text-black">
          ${product.discountPrice || product.price}
        </p>
        {product.originalPrice && (
          <p className="text-[13px] text-gray-400 line-through">
            ${product.originalPrice} <span className="text-gray-500">new</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
