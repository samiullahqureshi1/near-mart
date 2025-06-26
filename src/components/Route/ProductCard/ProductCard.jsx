import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiExpand } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setClick(wishlist && wishlist.find((i) => i._id === data._id));
  }, [wishlist]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (click) {
      dispatch(removeFromWishlist(data));
      setClick(false);
    } else {
      dispatch(addToWishlist(data));
      setClick(true);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Added to cart!");
    }
  };

  const handleNavigate = () => {
    navigate(`/product/${data._id}`);
  };

  const discountPercentage = data.originalPrice
    ? Math.round(
        ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
      )
    : 0;

  return (
   <div className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg relative text-[#1c1c1c]">
        {/* Bestseller badge */}
        <span className="bg-[#f1f1f1] text-[13px] font-semibold text-black px-2 py-1 rounded inline-block mb-2">
          Best seller
        </span>
  
        {/* Image and navigation */}
        <div className="relative mb-4">
          
          <a href={`/product/${data.slug || data._id}`}>
            <img
          src={data.images?.[0]?.url}
              alt={data.name}
              className="w-full h-[180px] object-contain"
            />
          </a>
        </div>
  
        {/* Title */}
        <h3 className="text-[15px] font-semibold leading-tight mb-1">
          {data.name?.split(" ")[0] + " " + data.name?.split(" ")[1] ||
            "iPhone 13"}
        </h3>
  
        {/* Subtitle */}
        <p className="text-[13px] text-gray-600 mb-1">
          {data.name || "iPhone 13 128GB - Midnight - Unlocked"}
        </p>
  
        {/* Rating */}
        {/* Rating with 5 stars */}
        <div className="flex items-center text-[13px] font-medium text-gray-700 mb-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>
              {index < Math.round(data.ratings || 4.3) ? "★" : "☆"}
            </span>
          ))}
          <span className="ml-1">{(data.ratings || 4.3).toFixed(1)}/5</span>
          <span className="ml-1 text-gray-500">({data.reviews || 3888})</span>
        </div>
  
        {/* Price */}
        <div className="mt-1">
          <p className="text-[16px] font-semibold text-black">
            ${data.discountPrice || data.price}
          </p>
          {data.originalPrice && (
            <p className="text-[13px] text-gray-400 line-through">
              ${data.originalPrice} <span className="text-gray-500">new</span>
            </p>
          )}
        </div>
      </div>
  );
};

export default ProductCard;
