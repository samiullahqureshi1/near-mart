import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import { addTocart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckReturn } from "react-icons/tb";
import {
  FaBatteryHalf,
  FaBolt,
  FaCamera,
  FaCheckCircle,
  FaDatabase,
  FaExpandArrowsAlt,
  FaGem,
  FaMicrochip,
  FaMobileAlt,
} from "react-icons/fa";
const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Fair");
  const [showMore, setShowMore] = useState(false);
  
  const handleBuyNow = () => {
    // Clone original product data, aur quantity + selected image add karo
    const productData = {
      ...data, // pura product object jisme saare fields hain
      qty: count,
      image: data.images[select]?.url, // ya apni preferred image
    };

    dispatch(addTocart(productData)); // poora product Redux cart mein save hoga

    navigate("/checkout", {
      state: {
        isBuyNow: true,
        productId: productData._id,
      },
    });
  };

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
    console.log(data);
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`https://near-backend.vercel.app//conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  const [selectedColor, setSelectedColor] = useState(null);
const specifications = [
  { icon: <FaMobileAlt />, label: "Model", value: data?.name },
  { icon: <FaMicrochip />, label: "Processor", value: "Snapdragon 8 Gen 1" },
  { icon: <FaCamera />, label: "Camera", value: "Triple 50MP" },
  { icon: <FaExpandArrowsAlt />, label: "Screen", value: data?.screenSize },
  { icon: <FaBolt />, label: "Charging", value: "Fast charging supported" },
  { icon: <FaDatabase />, label: "Storage", value: data?.storage },
  { icon: "🎨", label: "Color", value: data?.color },
  { icon: "📶", label: "Network", value: data?.network },
  { icon: "🔓", label: "Carrier Compatibility", value: "Unlocked" },
  { icon: "🧠", label: "Memory", value: data?.memory },
  { icon: "🖥️", label: "Resolution", value: data?.resolution },
  { icon: "📱", label: "Display Type", value: data?.displayType },
  { icon: "⚙️", label: "OS", value: data?.os },
  { icon: "🆔", label: "MPN", value: data?.manufacturerPartNo },
];

  return (
    <div className="bg-white">
      {data ? (
        <div className="w-[90%] 800px:w-[80%] mx-auto py-10">
          <div className="block 800px:flex gap-8">
            {/* IMAGE SECTION (Left) */}
            <div className="w-full 800px:w-[50%] flex flex-col items-center">
              {/* Thumbnails for the images */}

              {/* Main Image */}
              <div className="w-full rounded-lg p-6 flex justify-center items-center">
                <img
                  src={data.images[select]?.url}
                  alt="Main Product Image"
                  className="w-[300px] max-h-[400px] object-contain"
                />
              </div>
              <div className="flex gap-4 mb-4">
                {data.images.map((i, index) => (
                  <img
                    key={index}
                    src={i.url}
                    alt="Product Thumbnail"
                    onClick={() => setSelect(index)}
                    className={`w-[50px] h-[50px] object-cover p-1 border rounded-md cursor-pointer ${
                      select === index ? "border-black" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS SECTION (Right) */}
            <div className="w-full 800px:w-[50%] pt-4">
              {/* Product Title */}
              <h1 className="text-2xl font-semibold text-[#333] mb-2">
                {data.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-3">
                <Ratings rating={data.ratings} />
                <p className="text-sm text-gray-600">
                  ({totalReviewsLength} reviews)
                </p>
              </div>

              {/* Price Section */}
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="font-semibold text-lg text-gray-600">
                    ${data.discountPrice}
                  </p>

                  {data.originalPrice && (
                    <div className="flex items-center gap-3 ">
                      <h3 className="line-through text-gray-500 text-sm font-semibold">
                        ${data.originalPrice}
                      </h3>
                      <p className="text-green-800 bg-green-300 px-2 py-1 border rounded-md font-medium text-xs">
                        Save ${data.originalPrice - data.discountPrice}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button onClick={addToCartHandler} className="bg-black text-white px-12 py-3 text-lg font-semibold border rounded-lg hover:bg-gray-800">
                    Add to Cart
                  </button>

                  {/* Wishlist Button */}
                  <div className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer">
                    {click ? (
                      <AiFillHeart
                        size={24}
                        className="text-red-500"
                        onClick={() => removeFromWishlistHandler(data)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={24}
                        className="text-gray-700"
                        onClick={() => addToWishlistHandler(data)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 p-2">
                <img
                  src="https://front-office.statics.backmarket.com/4c0e9d9b15f341bd9f72a93cf94fe65a56bf7197/img/payment/methods-v5/affirm.svg"
                  alt="Affirm"
                  className="w-10 h-auto"
                />
                <p className="text-sm">Buy Now, pay later</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-4  border-b-2">
                {/* Trade-in Option */}
                <div className="mb-2 flex items-center border border-black rounded-full px-4 py-1.5 cursor-pointer hover:bg-gray-100 transition">
                  {/* Icon (custom trade icon as SVG) */}
                  <svg
                    className="w-4 h-4 text-purple-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6v4M14 18h4v-4M6 10l4-4m8 8l-4 4"
                    />
                  </svg>
                  <p className="text-sm text-black">
                    Get this for even less with Trade-in
                  </p>
                  <svg
                    className="w-4 h-4 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Save Big Option */}
                <div className="mb-2 flex items-center bg-[#f5f5f5] rounded-full px-4 py-1.5 cursor-pointer hover:bg-gray-200 transition">
                  {/* Smile Icon */}
                  <svg
                    className="w-4 h-4 text-purple-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-4 8a1 1 0 110-2 1 1 0 010 2zm8 0a1 1 0 110-2 1 1 0 010 2zm-4 8a5 5 0 01-4.546-2.914l1.832-.774A3 3 0 0012 16a3 3 0 002.714-1.688l1.832.774A5 5 0 0112 18z" />
                  </svg>
                  <p className="text-sm text-black">
                    Save big: $20/month unlimited
                  </p>
                  <svg
                    className="w-4 h-4 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Additional Info Section below buttons */}
              <div className="mt-6">
                {/* <div className="flex gap-4">
    <p className="text-sm text-gray-600 flex items-center">
      <span className="mr-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9V5a1 1 0 011-1h14a1 1 0 011 1v4M4 9l8 6 8-6M4 9l8 6 8-6"></path>
        </svg>
      </span>
      Free delivery by Jun 26 - Jun 27
    </p>
    <p className="text-sm text-gray-600 flex items-center">
      <span className="mr-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9V5a1 1 0 011-1h14a1 1 0 011 1v4M4 9l8 6 8-6M4 9l8 6 8-6"></path>
        </svg>
      </span>
      Express delivery by Jun 26 - Jun 27 from $15.00
    </p>
  </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Free Delivery */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      {/* Truck Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 16v-1a2 2 0 012-2h3V9a2 2 0 012-2h6l3 5v5h-1m-6 4a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Free delivery by Jun 26 - Jun 27
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      {/* Lock Open Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c1.105 0 2 .672 2 1.5S13.105 14 12 14s-2-.672-2-1.5S10.895 11 12 11zM5 12v4a2 2 0 002 2h10a2 2 0 002-2v-4M7 10V7a5 5 0 0110 0v3"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Works with all carriers
                      </p>
                    </div>
                  </div>
                  {/* Free Returns + Warranty */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      {/* Shield Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V7l8-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Free 30-day returns
                      </p>
                      <p className="text-sm text-gray-600">1-year warranty</p>
                    </div>
                  </div>

                  {/* Works with all carriers */}

                  {/* Verified Refurbished */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      {/* Badge Check Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Verified Refurbished
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full bg-white py-10">
        {/* Heading */}
        <h2 className="text-center text-lg md:text-xl font-semibold text-gray-900 mb-8">
          All devices are restored professionally based on a 25-point inspection
        </h2>

        {/* Icons row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6 justify-items-center text-center text-sm text-gray-400">
          {/* Buttons */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H9m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </div>
            <p>Buttons</p>
          </div>

          {/* SIM/memory card reader */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"
                />
              </svg>
            </div>
            <p>SIM/memory card reader</p>
          </div>

          {/* Data deletion */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h4l3 10h8l3-10h4M5 6h14"
                />
              </svg>
            </div>
            <p>Data deletion</p>
          </div>

          {/* Chargers/cables */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16v-4m10 4v-4M5 12h14"
                />
              </svg>
            </div>
            <p>Chargers/cables</p>
          </div>

          {/* Unlocked by previous owner */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.105 0 2 .672 2 1.5S13.105 14 12 14s-2-.672-2-1.5S10.895 11 12 11zM5 12v4a2 2 0 002 2h10a2 2 0 002-2v-4M7 10V7a5 5 0 0110 0v3"
                />
              </svg>
            </div>
            <p>Unlocked by previous owner</p>
          </div>

          {/* GPS/positioning system */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 9v3m0 0h.01"
                />
              </svg>
            </div>
            <p>GPS/positioning system</p>
          </div>

          {/* Cameras */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h4l3-3h4l3 3h4v13H3V7z"
                />
              </svg>
            </div>
            <p>Cameras</p>
          </div>

          {/* External sensors */}
          <div>
            <div className="mb-2">
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H9m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </div>
            <p>External sensors</p>
          </div>
        </div>
      </div>
      {data ? (
        <div className="min-h-screen  flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-5xl  rounded-2xl overflow-hidden">
            {/* IMAGE & DESCRIPTION SECTION */}
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2  p-8 flex flex-col justify-end relative">
                <img
                  src={data.images[select]?.url}
                  alt="Phone"
                  className="w-[300px] max-h-[400px] object-contain"
                />
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm bg-gray-100 rounded-full flex items-center gap-1">
                    ✨ Visible signs of use
                  </span>
                  <span className="px-3 py-1 text-sm bg-gray-100 rounded-full flex items-center gap-1">
                    <FaCheckCircle /> Verified parts
                  </span>
                  <span className="px-3 py-1 text-sm bg-gray-100 rounded-full flex items-center gap-1">
                    <FaBatteryHalf /> Battery for daily use
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="md:w-1/2 p-10 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {data?.name} - Refurbished
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {/* This refurbished Samsung Galaxy S21 has been tested and
                  verified by certified technicians. It comes with verified
                  parts, a reliable battery, and only minor signs of use. Great
                  performance for daily tasks, camera use, and multitasking at
                  an unbeatable price. */}
                  {data?.description}
                </p>
                <div className="bg-blue-50 p-4 rounded-xl text-sm text-gray-600 shadow-sm">
                  Refurbishers have restored devices to high quality based on a
                  25-point inspection.
                  <span className="ml-2 text-blue-600 underline cursor-pointer">
                    Compare conditions
                  </span>
                </div>
              </div>
            </div>

            {/* SPECIFICATIONS SECTION */}
            <div className="px-6 py-8 border-t mt-6 bg-gradient-to-b from-white via-gray-50 to-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                📋 Product Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
                {specifications.slice(0, 6).map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow border hover:shadow-md transition"
                  >
                    <div className="text-purple-600 text-lg bg-purple-100 p-2 rounded-full">
                      {typeof spec.icon === "string" ? (
                        spec.icon
                      ) : (
                        <span>{spec.icon}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{spec.label}</p>
                      <p className="font-semibold text-gray-800">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {!showMore && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowMore(true)}
                    className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                  >
                    See more
                  </button>
                </div>
              )}

              {showMore && (
                <div className="mt-10 space-y-10 animate-fade-in-down">
                  {/* Product Description */}
                  <div className="text-gray-700 text-sm leading-relaxed">
                    <h4 className="font-semibold text-lg mb-2">
                      Key Features:
                    </h4>
                    <p>
                      {/* The <strong>Galaxy S22 5G</strong> is a flagship-level
                      smartphone that offers reliable performance and a sleek
                      design. This model is part of Samsung’s 2022 lineup and
                      features 5G connectivity, making it ideal for streaming,
                      browsing, or gaming. As a pre-owned device, it has been
                      refurbished to meet quality standards, offering great
                      performance and affordability. */}
                      {data?.description}
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1">
                      <li>
                        <strong>Model:</strong> {data?.model}
                      </li>
                      <li>
                        <strong>Storage capacity:</strong> {data?.memory}
                      </li>
                      <li>
                        <strong>Display:</strong> {data?.resolution}
                      </li>
                      <li>
                        <strong>Processor:</strong> Snapdragon 8 Gen 1 or Exynos
                        2200 (region-dependent)
                      </li>
                      <li>
                        <strong>Camera:</strong> Triple rear cameras with 50MP
                        main sensor
                      </li>
                      <li>
                        <strong>Connectivity:</strong> {data?.network}
                      </li>
                    </ul>
                  </div>

                  {/* Pros & Cons */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Pros & Cons:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-300 text-sm text-gray-800">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-300 p-2 font-medium">
                              Pros
                            </th>
                            <th className="border border-gray-300 p-2 font-medium">
                              Cons
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              High-quality AMOLED display with vibrant colors.
                            </td>
                            <td className="border border-gray-300 p-2">
                              Limited storage options beyond 128GB in this
                              model.
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              Powerful Snapdragon 8 Gen 1 processor for smooth
                              multitasking.
                            </td>
                            <td className="border border-gray-300 p-2">
                              No headphone jack available.
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              5G connectivity for fast internet speeds.
                            </td>
                            <td className="border border-gray-300 p-2">
                              Refurbished condition may have minor cosmetic
                              imperfections.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Technical Specs Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[15px] text-gray-800 border border-gray-200 rounded-md overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Manufacturing Part No:
                        </strong>{" "}
                        <span className="ml-1">{data?.manufacturerPartNo}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Model:
                        </strong>{" "}
                        <span className="ml-1">{data?.model}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Carrier Compatibility:
                        </strong>{" "}
                        <span className="ml-1">Unlocked</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Screen Type:
                        </strong>{" "}
                        <span className="ml-1">Dynamic AMOLED 2X</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Network:
                        </strong>{" "}
                        <span className="ml-1">{data?.network}</span>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Color:
                        </strong>{" "}
                        <span className="ml-1">{data?.color}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          OS:
                        </strong>{" "}
                        <span className="ml-1">{data?.os}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Storage:
                        </strong>{" "}
                        <span className="ml-1">{data?.memory}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Memory:
                        </strong>{" "}
                        <span className="ml-1">{data?.resolution}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Resolution:
                        </strong>{" "}
                        <span className="ml-1">{data?.resolution}</span>
                      </div>
                      <div className="p-3">
                        <strong className="text-gray-600 font-medium">
                          Screen Size:
                        </strong>{" "}
                        <span className="ml-1">{data?.screenSize}"</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setShowMore(!showMore);
                        if (!showMore) {
                          setTimeout(() => {
                            document
                              .getElementById("specs-section")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                      className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition"
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data && data.reviews && data.reviews.length > 0 ? (
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2" key={index}>
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <h5>No Reviews for this product!</h5>
          )}
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
