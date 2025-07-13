import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allProducts?.length > 0) {
      const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sorted.slice(0, 9)); // 1 tall + 8 compact
    }
  }, [allProducts]);

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10 lg:px-20 xl:px-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Best Deals</h2>
          <p className="text-sm text-gray-600">
            Deals ends in:{" "}
            <span className="bg-yellow-300 text-black px-2 py-1 text-xs font-bold rounded">
              16d : 2h : 57m : 23s
            </span>
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Tall Left Card */}
          {data[0] && (
            <div className="lg:row-span-2 border border-gray-300 h-full">
              <ProductCard product={data[0]} highlight />
            </div>
          )}

          {/* 2 Rows x 4 Compact Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {data.slice(1).map((item, i) => (
              <div
                key={i}
                className={`border border-gray-300 h-[280px] ${
                  i % 4 !== 3 ? "border-r-0" : ""
                } ${i < 4 ? "border-b-0" : ""}`}
              >
                <ProductCard product={item} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, highlight = false, compact = false }) => {
  return (
    <div className="text-[#1c1c1c] h-full flex flex-col justify-between p-4">
      {/* Discount badge */}
      {product.discountPercent && (
        <span className="bg-yellow-400 text-[10px] font-semibold px-2 py-[2px] rounded text-black mb-1 inline-block">
          {product.discountPercent}% OFF
        </span>
      )}

      {/* Image */}
      <div className="w-full flex-1 flex items-center justify-center mb-2">
        <img
          src={product?.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          className={`object-contain ${compact ? "max-h-[70px]" : "max-h-[140px]"}`}
        />
      </div>

      {/* Title - now clickable */}
      <Link
        to={`/product/${product.slug || product.handle || product._id}`}
        className={`${compact ? "text-xs" : "text-sm"} font-semibold line-clamp-2 mb-1 hover:text-blue-600 transition`}
      >
        {product.name}
      </Link>

      {/* Price */}
      <p className={`${compact ? "text-sm" : "text-base"} font-semibold text-blue-600`}>
        ${product.discountPrice || product.price}
      </p>
      {product.originalPrice && (
        <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
      )}
    </div>
  );
};

export default BestDeals;
