import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const featured = [...allProducts].filter(p => p.isFeatured); // Optional: filter if you want
      setData(featured.length > 0 ? featured : allProducts);
    }
  }, [allProducts]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visibleProducts = data.slice(0, visibleCount);

  return (
    <div className="w-full my-12 px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold tracking-wide uppercase">Featured</h2>
        <p className="text-gray-600 italic">Top view in this week</p>
      </div>

      {/* Grid Wrapper */}
      <div className="max-w-[1400px] mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {visibleProducts.map((product, index) => (
            <div key={index} className="w-full">
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      {visibleCount < data.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="border border-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProduct;
