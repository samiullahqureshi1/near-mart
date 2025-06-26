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
        .post(`http://localhost:9000/conversation/create-new-conversation`, {
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
                  <button className="bg-black text-white px-12 py-3 text-lg font-semibold border rounded-lg hover:bg-gray-800">
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
