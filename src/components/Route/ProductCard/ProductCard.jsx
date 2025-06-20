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
import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiExpand } from "react-icons/bi";
import { Link } from "react-router-dom";
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
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setClick(wishlist && wishlist.find((i) => i._id === data._id));
  }, [wishlist]);

  const handleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data));
      setClick(false);
    } else {
      dispatch(addToWishlist(data));
      setClick(true);
    }
  };

  const handleAddToCart = () => {
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

  const discountPercentage = data.originalPrice
    ? Math.round(
        ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
      )
    : 0;

return (
  <div className="group relative cursor-pointer w-[300px] bg-[#f6f6f6] rounded-xl overflow-hidden shadow-md transition">
    {/* Wishlist + Expand */}
    <div className="absolute top-3  left-3 z-10 flex flex-col opacity-0 group-hover:opacity-100 transition">
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
        onClick={() => setOpen(true)}
        className="text-white bg-black/40 p-2 rounded-full mt-2"
      >
        <BiExpand size={22} />
      </button>
    </div>

    {/* Discount badge */}
    {discountPercentage > 0 && (
      <div className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full z-10">
        -{discountPercentage}%
      </div>
    )}

    {/* Product Image */}
    <Link to={`/product/${data._id}`}>
      <div className="h-[360px] flex items-center justify-center p-6">
        <img
          src={data.images?.[0]?.url}
          alt={data.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </Link>

    {/* Hover Buttons */}
   <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition bg-black/10 backdrop-blur-sm">

  {/* Quick View Button */}
  <button
    onClick={() => setOpen(true)}
    className="bg-white  text-black text-base font-medium py-2 px-6 rounded-full shadow group/quickview relative overflow-hidden transition"
  >
    <span className="transition duration-300 group-hover/quickview:opacity-0">
      Quick View
    </span>

    <span className="hover:bg-black text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover/quickview:opacity-100 transition duration-300">
      <AiOutlineEye size={20} />
    </span>
  </button>

  {/* Quick Shop Button */}
  <button
    onClick={handleAddToCart}
    className="bg-sky-400 hover:bg-sky-500 text-white text-base font-medium py-2 px-6 rounded-full shadow group/quickshop relative overflow-hidden transition"
  >
    <span className="transition duration-300 group-hover/quickshop:opacity-0">
      Quick Shop
    </span>

    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/quickshop:opacity-100 transition duration-300">
      <AiOutlineShoppingCart size={20} />
    </span>
  </button>

</div>
    {/* Name + Price */}
    <div className="px-5 py-4 text-left bg-white">
      <h4 className="text-base font-semibold text-gray-800 truncate mb-2">
        {data.name}
      </h4>
      <div className="flex items-center gap-2">
        <span className="text-[17px] font-bold text-black">
          Rs.{data.discountPrice}
        </span>
        {discountPercentage > 0 && (
          <span className="text-sm text-gray-500 line-through">
            Rs.{data.originalPrice}
          </span>
        )}
      </div>
    </div>

    {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
  </div>
);


};

export default ProductCard;
