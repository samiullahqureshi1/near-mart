import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { categoriesData } from "../../../static/data";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiExpand } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import { addToWishlist } from "../../../redux/actions/wishlist";

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

 const { wishlistItems } = useSelector((state) => state.wishlist || {});
const isWishlisted = (wishlistItems || []).some(
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
      {/* {discountPercentage > 0 && (
        <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-black text-[11px] font-bold px-1.5 py-0.5 rounded">
          {discountPercentage}% OFF
        </div>
      )} */}

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
          <button className="bg-white p-2 rounded-full shadow">
            <BiExpand />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-[13px] font-medium leading-snug truncate mb-1">
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
        ${product.discountPrice || product.price}
        {product.originalPrice && (
          <span className="ml-2 text-gray-400 line-through text-[12px]">
            ${product.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
};
export default FeaturedProduct;
