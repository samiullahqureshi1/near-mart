import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Categories = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const handleNavigate = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  const handleScroll = (direction) => {
    const newIndex =
      direction === "right"
        ? Math.min(startIndex + 1, categoriesData.length - 1)
        : Math.max(startIndex - 1, 0);
    setStartIndex(newIndex);
  };

  const visibleItems = categoriesData.slice(startIndex, startIndex + 6);

  return (
    <div className="bg-white w-full px-4 md:px-10 lg:px-20 xl:px-32 mb-12 relative">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center">
        Shop with Categories
      </h2>

      {/* Arrows (hidden on mobile) */}
      <div className="hidden md:block">
        {startIndex > 0 && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-1 top-[50%] -translate-y-1/2 z-10 bg-orange-400 text-white p-2 rounded-full hover:bg-orange-500"
          >
            <FaArrowLeft size={14} />
          </button>
        )}
        {startIndex + 6 < categoriesData.length && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-1 top-[50%] -translate-y-1/2 z-10 bg-orange-400 text-white p-2 rounded-full hover:bg-orange-500"
          >
            <FaArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Scrollable wrapper for mobile */}
      <div className="flex md:hidden overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-2">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            onClick={() => handleNavigate(category)}
            className="min-w-[120px] h-[160px] bg-white border border-gray-300 rounded-md flex-shrink-0 flex flex-col items-center justify-center cursor-pointer"
          >
            <img
              src={category.image_Url}
              alt={category.title}
              className="w-[60px] h-[60px] object-contain mb-2"
            />
            <p className="text-[13px] font-medium text-center">{category.title}</p>
          </div>
        ))}
      </div>

      {/* Grid for tablet/desktop */}
      <div className="hidden md:flex justify-center gap-4 transition-all duration-300 ease-in-out">
        {visibleItems.map((category) => (
          <div
            key={category.id}
            onClick={() => handleNavigate(category)}
            className="w-[150px] h-[180px] bg-white border border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
          >
            <img
              src={category.image_Url}
              alt={category.title}
              className="w-[80px] h-[80px] object-contain mb-2"
            />
            <p className="text-[14px] font-medium text-center">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
