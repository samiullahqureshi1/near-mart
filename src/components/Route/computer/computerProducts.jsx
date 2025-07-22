import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import { addToWishlist } from "../../../redux/actions/wishlist";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiExpand } from "react-icons/bi";

const ComputerProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

 useEffect(() => {
  if (allProducts?.length > 0) {
    const filtered = allProducts.filter(
      (p) => p.category?.trim().toLowerCase() === "computer & laptop".toLowerCase()
    );

    const sorted = filtered.sort((a, b) => b.sold_out - a.sold_out);
    setData(sorted.slice(0, 8)); // or remove `.slice(0, 8)` to show all
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
          Only for: <span className="bg-white px-3 py-1 rounded text-[14px] font-semibold text-[#1a1a1a] border"> GH₵299  </span>
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const images = product.images || [];
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - (product.discountPrice || product.price)) /
          product.originalPrice) *
          100
      )
    : 0;

  const badgeColor = {
    hot: "bg-red-500",
    sale: "bg-green-600",
    best: "bg-blue-500",
    deal: "bg-yellow-500",
  };

  const badge = product.badge?.toLowerCase();
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});
  const isWishlisted = wishlistItems.some(
    (item) => item._id === product._id || item.id === product._id
  );

  const handleNavigate = () => {
    navigate(`/product/${product.slug || product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addTocart({ ...product, qty: 1 }));
    toast.success("Added to cart");
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      toast.info("Already in wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative bg-white border hover:shadow-lg p-3 rounded-md group cursor-pointer transition-all duration-300"
    >
      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-2 left-2 z-10 text-white text-xs px-2 py-0.5 rounded uppercase ${
            badgeColor[badge] || "bg-gray-500"
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Discount Tag */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-black text-[11px] font-bold px-1.5 py-0.5 rounded">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-[180px] flex items-center justify-center mb-3">
        <img
          src={images[currentImage]?.url || "/placeholder.jpg"}
          alt={product.name}
          className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Icons */}
        <div className="absolute inset-0 bg-black/5 hidden group-hover:flex items-center justify-center gap-3 z-10">
          <button
            onClick={handleWishlist}
            className="bg-white p-2 rounded-full shadow"
          >
            {isWishlisted ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full shadow"
          >
            <AiOutlineShoppingCart />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.info("Zoom/Expand coming soon");
            }}
            className="bg-white p-2 rounded-full shadow"
          >
            <BiExpand />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-[13px] font-medium leading-snug truncate mb-1 line-clamp-2">
        {product.name}
      </h4>

      {/* Rating */}
      <div className="text-[12px] flex items-center mb-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="text-yellow-500">
            {index < Math.round(product.ratings || 4.2) ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1 text-gray-500">
          ({product.reviews || 1200})
        </span>
      </div>

      {/* Pricing */}
      <div className="text-[14px] font-semibold text-blue-500">
        GH₵{product.discountPrice || product.price}
        {product.originalPrice && (
          <span className="ml-2 text-gray-400 line-through text-[12px]">
            GH₵{product.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
};


export default ComputerProduct;
