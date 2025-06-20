// import React, { useState } from "react";
// import {
//   AiFillHeart,
//   AiFillStar,
//   AiOutlineEye,
//   AiOutlineHeart,
//   AiOutlineShoppingCart,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { useEffect } from "react";
// import { addTocart } from "../../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "../../Products/Ratings";

// const ProductCard = ({ data,isEvent }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
//   const [click, setClick] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-[370px] bg-white rounded-2xl shadow-sm p-3 relative cursor-pointer">
//         <div className="flex justify-end"></div>
//         <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//           <img
//             src={`${data.images && data.images[0]?.url}`}
//             alt=""
//             className="w-full h-[170px] object-contain"
//           />
//         </Link>
//         <Link to={`/shop/preview/${data?.shop._id}`}>
//           <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
//         </Link>
//         <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//           <h4 className="pb-3 font-[500]">
//             {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//           </h4>

//           <div className="flex">
//           <Ratings rating={data?.ratings} />
//           </div>

//           <div className="py-2 flex items-center justify-between">
//             <div className="flex">
//               <h5 className={`${styles.productDiscountPrice}`}>
//               Rs.{data.originalPrice === 0
//                   ? data.originalPrice
//                   : data.discountPrice}
//               </h5>
//               <h4 className={`${styles.price}`}>
//                 Rs.{data.originalPrice ? data.originalPrice + "" : null}
//               </h4>
//             </div>
//             <span className="font-[400] text-[17px] text-[#68d284]">
//               {data?.sold_out} sold
//             </span>
//           </div>
//         </Link>

//         {/* side options */}
//         <div>
//           {click ? (
//             <AiFillHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => removeFromWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Remove from wishlist"
//             />
//           ) : (
//             <AiOutlineHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => addToWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Add to wishlist"
//             />
//           )}
//           <AiOutlineEye
//             size={22}
//             className="cursor-pointer absolute right-2 top-14"
//             onClick={() => setOpen(!open)}
//             color="#333"
//             title="Quick view"
//           />
//           <AiOutlineShoppingCart
//             size={25}
//             className="cursor-pointer absolute right-2 top-24"
//             onClick={() => addToCartHandler(data._id)}
//             color="#444"
//             title="Add to cart"
//           />
//           {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;
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
    <div
      className="group relative cursor-pointer w-[240px] overflow-hidden"
      onClick={handleNavigate}
    >
      {/* Image Section */}
      <div className="w-full h-[300px] bg-white flex items-center justify-center">
        <img
          src={data.images?.[0]?.url}
          alt={data.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="py-3 text-left px-2">
        <h4 className="text-base font-Poppins text-black truncate mb-1">
          {data.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-gray-700">
            Rs.{data.discountPrice}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through">
              Rs.{data.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition z-10">
        {/* Top Left: Wishlist + Expand */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className="text-white bg-black/40 p-2 rounded-full"
          >
            {click ? (
              <AiFillHeart size={22} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={22} />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="text-white bg-black/40 p-2 rounded-full"
          >
            <BiExpand size={22} />
          </button>
        </div>

        {/* Center Buttons */}
<div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
  {/* Quick View */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpen(true);
    }}
    className="bg-white text-black text-base font-medium py-2 px-6 rounded-full shadow group/quickview relative overflow-hidden
               opacity-0 -translate-y-6 transition-all duration-[800ms] ease-in-out
               group-hover:opacity-100 group-hover:translate-y-0"
  >
    <span className="transition duration-300 group-hover/quickview:opacity-0">
      Quick View
    </span>
    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/quickview:opacity-100 transition duration-300 bg-black text-white rounded-full">
      <AiOutlineEye size={20} />
    </span>
  </button>

  {/* Quick Shop */}
  <button
    onClick={handleAddToCart}
    className="bg-sky-400 hover:bg-sky-500 text-white text-base font-medium py-2 px-6 rounded-full shadow group/quickshop relative overflow-hidden
               opacity-0 -translate-y-6 transition-all duration-[800ms] ease-in-out delay-150
               group-hover:opacity-100 group-hover:translate-y-0"
  >
    <span className="transition duration-300 group-hover/quickshop:opacity-0">
      Quick Shop
    </span>
    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/quickshop:opacity-100 transition duration-300">
      <AiOutlineShoppingCart size={20} />
    </span>
  </button>
</div>

      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
