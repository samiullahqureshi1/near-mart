// import React, { useEffect, useState } from "react";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { addTocart } from "../../../redux/actions/cart";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";

// const ProductDetailsCard = ({ setOpen, data }) => {
//   const { cart } = useSelector((state) => state.cart);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const dispatch = useDispatch();
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//     const [select, setSelect] = useState(false);

//   const handleMessageSubmit = () => {};

//   const decrementCount = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < count) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: count };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

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

//   return (
//     <div className="bg-[#fff]">
//       {data ? (
//         <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
//           <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
//             <RxCross1
//               size={30}
//               className="absolute right-3 top-3 z-50"
//               onClick={() => setOpen(false)}
//             />

//             <div className="block w-full 800px:flex">
//               <div className="w-full 800px:w-[50%]">
//                 <img src={`${data.images && data.images[0]?.url}`} alt="" />
//                 <div className="flex">
//                   <Link to={`/shop/preview/${data.shop._id}`} className="flex">
//                     <img
//                       src={`${data.images && data.images[0]?.url}`}
//                       alt=""
//                       className="w-[50px] h-[50px] rounded-full mr-2"
//                     />
//                     <div>
//                       <h3 className={`${styles.shop_name}`}>
//                         {data.shop.name}
//                       </h3>
//                       <h5 className="pb-3 text-[15px]">{data?.ratings} Ratings</h5>
//                     </div>
//                   </Link>
//                 </div>
//                 <div
//                   className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
//                   onClick={handleMessageSubmit}
//                 >
//                   <span className="text-[#fff] flex items-center">
//                     Send Message <AiOutlineMessage className="ml-1" />
//                   </span>
//                 </div>
//                 <h5 className="text-[16px] text-[red] mt-5">(10) Sold out</h5>
//               </div>

//               <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
//                 <h1 className={`${styles.productTitle} text-[20px]`}>
//                   {data.name}
//                 </h1>
//                 <p>{data.description}</p>

//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>
//                     Rs.{data.discountPrice}
//                   </h4>
//                   <h3 className={`${styles.price}`}>
//                     {"Rs." + data.originalPrice ? data.originalPrice + "" : null}
//                   </h3>
//                 </div>
//                 <div className="flex items-center mt-12 justify-between pr-3">
//                   <div>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={decrementCount}
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={incrementCount}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {click ? (
//                       <AiFillHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => removeFromWishlistHandler(data)}
//                         color={click ? "red" : "#333"}
//                         title="Remove from wishlist"
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => addToWishlistHandler(data)}
//                         title="Add to wishlist"
//                       />
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
//                   onClick={() => addToCartHandler(data._id)}
//                 >
//                   <span className="text-[#fff] flex items-center">
//                     Add to cart <AiOutlineShoppingCart className="ml-1" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default ProductDetailsCard;



import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate=useNavigate()
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Grey");
  const [selectedSize, setSelectedSize] = useState("S");

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => setCount(count + 1);

  const addToCartHandler = (id) => {
    const exists = cart.find((i) => i._id === id);
    if (exists) {
      toast.error("Item already in cart!");
    } else if (data.stock < count) {
      toast.error("Product stock limited!");
    } else {
      dispatch(addTocart({ ...data, qty: count }));
      toast.success("Item added to cart!");
    }
  };

  useEffect(() => {
    setClick(wishlist.some((i) => i._id === data._id));
  }, [wishlist]);

  return data ? (
    <div className="fixed inset-0 bg-[#00000040] z-40 flex items-center justify-center">
      <div className="w-[90%] md:w-[70%] xl:w-[60%] bg-white rounded shadow-lg relative p-6 max-h-[90vh] overflow-y-auto">
        <RxCross1
          className="absolute top-4 right-4 cursor-pointer"
          size={25}
           onClick={(e) => {
    e.stopPropagation(); 
    setOpen(false);
  }}
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Image */}
          <div className="md:w-[48%]">
            <img
              src={data.images?.[0]?.url}
              alt={data.name}
              className="w-full rounded-md object-contain"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] bg-gray-300"></div>

          {/* Right Info */}
          <div className="md:w-[48%]">
            <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
            <div className="flex items-center gap-2 mb-3">
              {[...Array(4)].map((_, i) => (
                <AiFillStar key={i} className="text-yellow-500" />
              ))}
              <AiOutlineStar className="text-yellow-500" />
              <span className="text-sm text-gray-600 ml-2">(11 reviews)</span>
            </div>

            <p className="text-gray-700 mb-3">{data.description}</p>

            <div className="text-lg font-bold text-gray-800 mb-3">
              Rs. {data.discountPrice}
            </div>

            {/* Color Selector */}
            <div className="mb-4">
              <p className="font-semibold mb-1">Color: {selectedColor}</p>
              <div className="flex gap-3">
                {["Grey", "Pink", "Black"].map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 border-2 rounded-full cursor-pointer ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-4">
              <p className="font-semibold mb-1">Size: {selectedSize}</p>
              <div className="flex gap-3">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    className={`border px-3 py-1 rounded-full ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-3 mt-6">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={decrementCount}
                  className="px-4 py-2 text-lg font-medium hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-2">{count}</span>
                <button
                  onClick={incrementCount}
                  className="px-4 py-2 text-lg font-medium hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCartHandler(data._id)}
                className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded-full"
              >
                ADD TO CART
              </button>

              {/* Wishlist Icon */}
              {click ? (
                <button
                  onClick={() => {
                    setClick(false);
                    dispatch(removeFromWishlist(data));
                  }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center"
                >
                  <AiFillHeart className="text-red-500 text-xl" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setClick(true);
                    dispatch(addToWishlist(data));
                  }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center"
                >
                  <AiOutlineHeart className="text-xl" />
                </button>
              )}

              {/* Expand Icon */}
              <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z" />
                </svg>
              </button>
            </div>

            {/* Buy It Now */}
            <button
  onClick={() => {
    const exists = cart.find((i) => i._id === data._id);
    if (!exists) {
      dispatch(addTocart({ ...data, qty: count }));
    }
    navigate("/checkout");
  }}
  className="w-full bg-black text-white font-semibold py-3 rounded-full mt-4"
>
  BUY IT NOW
</button>

            {/* Footer Info */}
            <div className="flex justify-between mt-5 text-sm text-gray-500 border-t pt-3">
              <span>Size Guide</span>
              <span>Delivery & Return</span>
              <span>Ask a Question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductDetailsCard;

