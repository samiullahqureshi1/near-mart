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
        .post(`https://near-backend.vercel.app/conversation/create-new-conversation`, {
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
        <div className="w-[90%] 800px:w-[80%] mx-auto py-8">
          <div className="block w-full 800px:flex gap-10">
            {/* IMAGE SECTION */}
            <div className="w-full 800px:w-[50%]">
              <div className="bg-[#f6f6f6] rounded-lg p-6 flex justify-center items-center">
                <img
                  src={data.images[select]?.url}
                  alt=""
                  className="w-[80%] object-contain"
                />
              </div>

              {/* Thumbnail Selector */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {data.images.map((i, index) => (
                  <img
                    key={index}
                    src={i.url}
                    alt=""
                    onClick={() => setSelect(index)}
                    className={`w-[70px] h-[70px] p-1 border rounded-md cursor-pointer transition-all duration-200 ${
                      select === index ? "border-black" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS SECTION */}
            <div className="w-full 800px:w-[50%] pt-3">
              <h1 className="text-2xl font-semibold mb-2">{data.name}</h1>
              {/* Removed description from here */}
              <Ratings rating={data.ratings} />
              <p className="text-[15px] mt-1 text-green-600">
                ({totalReviewsLength} ratings)
              </p>

              {/* Pricing */}
              <div className="mt-4 flex items-center gap-4">
                <h4 className="text-2xl font-bold text-black">
                  Rs.{data.discountPrice}
                </h4>
                {data.originalPrice && (
                  <h3 className="line-through text-gray-500 text-lg">
                    Rs.{data.originalPrice}
                  </h3>
                )}
              </div>

              {/* Color Selector */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Choose a Color</h4>
                <div className="flex gap-3">{/* Future color options */}</div>
              </div>

              {/* Quantity Selector + Wishlist */}
              <div className="mt-8 flex items-center justify-between max-w-[260px]">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={decrementCount}
                    className="px-3 py-2 text-xl font-semibold border rounded-l-full bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-white text-black">{count}</span>
                  <button
                    onClick={incrementCount}
                    className="px-3 py-2 text-xl font-semibold border rounded-r-full bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {click ? (
                  <AiFillHeart
                    size={30}
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeFromWishlistHandler(data)}
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    className="text-gray-700 cursor-pointer"
                    onClick={() => addToWishlistHandler(data)}
                  />
                )}
              </div>

              {/* Buy/Add to Cart Buttons */}
              <div className="mt-6 flex gap-4">
                <Link
        to={{
          pathname: "/checkout",  // Navigate to checkout page
          state: { 
            cart: [
              {
                _id: data._id,
                name: data.name,
                discountPrice: data.discountPrice,
                qty: count, // The quantity selected
                image: data.images[select]?.url,
              },
            ]
          }
        }}
      >
        <button
          onClick={handleBuyNow}
          className="bg-green-700 hover:bg-green-800 text-white px-10 py-3 rounded-full font-semibold"
        >
          Buy Now (Rs.{data.discountPrice * count})
        </button>
      </Link>
                <button
                  onClick={() => addToCartHandler(data._id)}
                  className="border border-gray-400 hover:bg-gray-100 px-10 py-3 rounded-full font-semibold"
                >
                  Add to Cart
                </button>
              </div>

              {/* Delivery Info */}
              <div className="mt-8 space-y-4">
                {/* Free Delivery Section */}
                <div className="border p-4 rounded-md flex items-start gap-3 bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
                  <CiDeliveryTruck className="w-6 h-6 text-[#3bc177]" />{" "}
                  {/* Icon styled with color */}
                  <div>
                    <p className="font-semibold text-lg text-[#333]">
                      Free Delivery
                    </p>
                    <p className="text-sm text-gray-600">
                      Enter your Postal code for Delivery Availability
                    </p>
                  </div>
                </div>

                {/* Return Delivery Section */}
                <div className="border p-4 rounded-md flex items-start gap-3 bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
                  <TbTruckReturn className="w-6 h-6 text-[#ff6f61]" />{" "}
                  {/* Icon styled with color */}
                  <div>
                    <p className="font-semibold text-lg text-[#333]">
                      Return Delivery
                    </p>
                    <p className="text-sm text-gray-600">
                      Free 30-day Returns.{" "}
                      <span className="underline text-[#3bc177]">Details</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Tabs */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
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
