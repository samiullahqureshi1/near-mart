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
    <div className="w-full bg-[#f8f9fb] py-8 px-4 md:px-12 xl:px-24">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Shop our best deals
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Banner Image */}
        <div className="w-full lg:w-[30%] rounded-lg overflow-hidden">
          <img
            src="https://images.ctfassets.net/mmeshd7gafk1/7cudeRsHd4wC6xa2xSqrfR/06c53d8fc0a8efb4d5e89818c587461f/Desktop.jpg"
            alt="deal-banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side Categories + Product Slider */}
        <div className="w-full lg:w-[70%]">
          {/* Categories Bar */}
          <div className="flex gap-4 overflow-x-auto mb-4 scrollbar-hide cursor-pointer">
            {categoriesData.slice(0, 8).map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col items-center min-w-[80px]"
              >
                <div className="w-20 h-20  rounded-md shadow-sm flex items-center justify-center mb-1">
                  <img
                    src={cat.image_Url}
                    alt={cat.title}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <span className="text-xs text-gray-700 text-center">
                  {cat.title}
                </span>
              </div>
            ))}
          </div>

          {/* Product Slider with Arrows */}
          <div className="relative">
            <div className="flex justify-end mb-3 gap-2">
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
                    : "bg-black text-white"
                }`}
              >
                <FiChevronRight size={18} />
              </button>
            </div>

            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: "200%",
                  transform: `translateX(-${slideIndex * 50}%)`,
                }}
              >
                {[0, 1].map((slide) => (
                  <div
                    key={slide}
                    className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {data
                      .slice(slide * 4, slide * 4 + 4)
                      .map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                      ))}
                  </div>
                ))}
              </div>
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

  return (
    <div className="bg-white p-4  rounded-xl shadow hover:shadow-md transition">
      <a href={`/product/${product.slug || product._id}`}>
        <img
          src={images[currentImage]?.url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-[180px] object-contain mb-2"
        />
      </a>
      <h3 className="text-[15px] font-semibold leading-tight mb-1">
        {product.name?.split(" ")[0] + " " + product.name?.split(" ")[1] ||
          "iPhone 13"}
      </h3>{" "}
      <p className="text-[13px] text-gray-600 mb-1">
        {product.name || "iPhone 13 128GB - Midnight - Unlocked"}
      </p>
      <div className="text-xs mt-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(product.ratings || 4.3) ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1">{(product.ratings || 4.3).toFixed(1)}/5</span>
        <span className="ml-1 text-gray-500">
          ({product.reviews || 3888})
        </span>{" "}
      </div>
      <div className="mt-1">
        <p className="text-sm font-semibold">
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
