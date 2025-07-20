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
  FaHeadset,
  FaLock,
  FaMicrochip,
  FaMobileAlt,
  FaShippingFast,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
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

 const productGroups = [
  {
    title: "FLASH SALE TODAY",
    products: [
      {
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: "GH₵1,500",
        img: "https://discountstore.pk/cdn/shop/files/bose-sport-true-wireless-in-ear-headphones.jpg?v=1750833615",
      },
      {
        name: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: "GH₵1,500",
        img: "https://images-na.ssl-images-amazon.com/images/I/71L1ezoIH9L._AC_UL495_SR435,495_.jpg",
      },
      {
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: "GH₵1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-34.jpg",
      },
    ],
  },
  {
    title: "BEST SELLERS",
    products: [
      {
        name: "Samsung Electronics Samsung Galaxy S21 5G",
        price: "GH₵1,500",
        img: "https://images.samsung.com/is/image/samsung/p6pim/pk/galaxy-s21/gallery/pk-galaxy-s21-5g-g991-366070-sm-g991bzagmea-362622379",
      },
      {
        name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
        price: "GH₵1,500",
        img: "https://s.alicdn.com/@sc04/kf/H93b436371a1844d4858a34e210bf75d24.jpg_300x300.jpg",
      },
      {
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "GH₵1,500",
        img: "https://m.media-amazon.com/images/I/81y6Sj1S91L._UF1000,1000_QL80_.jpg",
      },
    ],
  },
  {
    title: "TOP RATED",
    products: [
      {
        name: "Portable Wishing Machine, 11lbs capacity Model 18NMF...",
        price: "GH₵1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-14.jpg",
      },
      {
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "GH₵1,500",
        img: "https://m.media-amazon.com/images/I/81y6Sj1S91L._UF1000,1000_QL80_.jpg",
      },
      {
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: "GH₵1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-16.jpg",
      },
    ],
  },
  {
    title: "NEW ARRIVAL",
    products: [
      {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones...",
        price: "GH₵1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-11.jpg",
      },
      {
        name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker...",
        price: "GH₵1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-17.jpg",
      },
      {
        name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart...",
        price: "GH₵1,500",
        img: "https://demo.theme-sky.com/gostore/wp-content/uploads/2021/02/electronic-19.jpg",
      },
    ],
  },
];


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
const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="bg-white">
      {data ? (
       <div className="w-full max-w-[1200px] mx-auto py-10">
  <div className="flex flex-col lg:flex-row gap-10">
    {/* LEFT - IMAGE GALLERY */}
    <div className="w-full lg:w-[50%]">
      {/* Main Image */}
      <div className="border p-4 rounded-md mb-4 flex justify-center">
        <img
          src={data.images[select]?.url}
          alt="Main Product"
          className="w-[80%] object-contain max-h-[400px]"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-3 justify-center">
        <button className="border rounded-full p-1 px-2 hover:bg-gray-100">←</button>
        <div className="flex gap-2">
          {data.images.map((i, index) => (
            <img
              key={index}
              src={i.url}
              onClick={() => setSelect(index)}
              className={`w-[60px] h-[60px] object-cover border rounded-md cursor-pointer ${
                select === index ? "border-orange-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>
        <button className="border rounded-full p-1 px-2 hover:bg-gray-100">→</button>
      </div>
    </div>

   <div className="w-full lg:w-[50%] space-y-4 px-2">
  {/* Title & Rating */}
  <h1 className="text-[20px] font-semibold leading-snug">{data.name}</h1>
  <div className="flex items-center gap-1 text-sm text-[#555]">
    <Ratings rating={data.ratings} />
    <span className="ml-1">({totalReviewsLength} User feedback)</span>
  </div>

  {/* SKU / Brand / Category / Availability */}
  <div className="text-[13px] space-y-[2px] text-gray-600">
    <p><b>Sku:</b> {data._id}</p>
    <p><b>Brand:</b> {data.category}</p>
    <p><b>Availability:</b> <span className="text-green-600 font-medium">In Stock</span></p>
    {/* <p><b>Category:</b> Electronics Devices</p> */}
  </div>

  {/* Price Row */}
  <div className="flex items-center gap-3">
    <span className="text-[22px] font-bold text-[#f97316]">GH₵{data.discountPrice}</span>
    <span className="line-through text-gray-400 text-[14px]">GH₵{data.originalPrice}</span>
    <span className="text-xs bg-yellow-300 text-[#000] px-2 py-[2px] font-semibold rounded-sm">
      {Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% OFF
    </span>
  </div>

  {/* Variants: Color, Size, Memory, Storage */}
  <div className="grid grid-cols-2 gap-3 text-[14px]">
    <div>
      <label className="block text-sm mb-1">Color</label>
      <div className="flex items-center gap-2">
        <div className="w-[24px] h-[24px] rounded-full border-2 border-orange-500 bg-[#f2f2f2] cursor-pointer" />
        <div className="w-[24px] h-[24px] rounded-full border border-gray-300 bg-[#999] cursor-pointer" />
      </div>
    </div>

    <div>
      <label className="block text-sm mb-1">Resolution</label>
      <select className="w-full border rounded px-2 py-1 text-sm">
        <option>{data.resolution}</option>
      </select>
    </div>

    <div>
      <label className="block text-sm mb-1">Memory</label>
      <select className="w-full border rounded px-2 py-1 text-sm">
        <option>{data.memory}</option>
      </select>
    </div>

    <div>
      <label className="block text-sm mb-1">Storage</label>
      <select className="w-full border rounded px-2 py-1 text-sm">
        <option>{data.memory}</option>
      </select>
    </div>
  </div>

  {/* Quantity Selector & Action Buttons */}
  <div className="flex items-center gap-3 mt-3">
    <div className="flex items-center border border-gray-300 rounded px-3 py-[6px]">
      <button className="text-[16px] font-bold">-</button>
      <span className="px-3">1</span>
      <button className="text-[16px] font-bold">+</button>
    </div>

    <button
      onClick={addToCartHandler}
      className="bg-[#f97316] text-white font-medium px-6 py-[10px] rounded hover:bg-[#e16510]"
    >
      ADD TO CART
    </button>

    <button className="border border-[#f97316] text-[#f97316] font-medium px-6 py-[10px] rounded hover:bg-orange-50">
      BUY NOW
    </button>
  </div>

  {/* Wishlist, Compare, Share */}
  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
    <div className="flex items-center gap-1 cursor-pointer">
      {click ? (
        <AiFillHeart
          size={20}
          className="text-red-500"
          onClick={() => removeFromWishlistHandler(data)}
        />
      ) : (
        <AiOutlineHeart
          size={20}
          className="text-gray-500"
          onClick={() => addToWishlistHandler(data)}
        />
      )}
      <span>Add to Wishlist</span>
    </div>

    <span className="cursor-pointer hover:underline">Add to Compare</span>
    <span className="cursor-pointer">Share product: <span className="text-[18px]">🔗</span></span>
  </div>

  {/* Trust Image Row */}
  <div className="pt-4">
    <h4 className="text-sm font-medium mb-2">100% Guarantee Safe Checkout</h4>
    <img
      src="/guarantee-site-checkout.png"
      alt="Secure icons"
      className="w-full max-w-[300px]"
    />
  </div>
</div>

  </div>

  {/* TAB SECTION */}
  <div className="mt-12">
    <div className="border-b mb-4">
      <div className="flex gap-8 text-sm font-medium text-gray-600">
      <button
  onClick={() => setActiveTab("description")}
  className={`pb-2 ${
    activeTab === "description" ? "border-b-2 border-[#f97316] text-[#f97316]" : "hover:text-[#f97316]"
  }`}
>
  DESCRIPTION
</button>

<button
  onClick={() => setActiveTab("additional")}
  className={`pb-2 ${
    activeTab === "additional" ? "border-b-2 border-[#f97316] text-[#f97316]" : "hover:text-[#f97316]"
  }`}
>
  ADDITIONAL INFORMATION
</button>

<button
  onClick={() => setActiveTab("specification")}
  className={`pb-2 ${
    activeTab === "specification" ? "border-b-2 border-[#f97316] text-[#f97316]" : "hover:text-[#f97316]"
  }`}
>
  SPECIFICATION
</button>

<button
  onClick={() => setActiveTab("review")}
  className={`pb-2 ${
    activeTab === "review" ? "border-b-2 border-[#f97316] text-[#f97316]" : "hover:text-[#f97316]"
  }`}
>
  REVIEW
</button>

      </div>
    </div>

    {/* DESCRIPTION TAB */}
{activeTab === "description" && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-1">
      <p className="text-sm text-gray-800 leading-6">{data.description}</p>
    </div>
  <div className="space-y-2 text-sm text-gray-800">
  <p className="flex items-center gap-2">
    <MdVerifiedUser className="text-[#f97316]" /> Free 1 Year Warranty
  </p>
  <p className="flex items-center gap-2">
    <FaShippingFast className="text-[#f97316]" /> Free Shipping
  </p>
  <p className="flex items-center gap-2">
    <FaLock className="text-[#f97316]" /> Secure Payment
  </p>
  <p className="flex items-center gap-2">
    <FaHeadset className="text-[#f97316]" /> 24/7 Customer Support
  </p>
</div>

    <div className="space-y-2">
      <p><strong>Courier:</strong> 2–4 days, Free Shipping</p>
      <p><strong>Local Shipping:</strong> GH₵19.00</p>
      <p><strong>UPS Ground:</strong> GH₵29.00</p>
      <p><strong>Global Export:</strong> GH₵39.00</p>
    </div>
  </div>
)}

{/* ADDITIONAL INFORMATION TAB */}
{activeTab === "additional" && (
  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
    {/* <div><strong>SKU:</strong> {data.sku || "N/A"}</div> */}
    <div><strong>Warranty:</strong> {data.warranty || "1 Year Manufacturer Warranty"}</div>
    <div><strong>Shipping:</strong> Ships within 2-4 days</div>
    <div><strong>Return Policy:</strong> 30 Days Easy Returns</div>
    <div><strong>Country of Origin:</strong> {data.origin || "Imported"}</div>
    <div><strong>Included Items:</strong> {data.includedItems || "Box, Charger, Manual"}</div>
  </div>
)}

{/* SPECIFICATION TAB */}
{activeTab === "specification" && (
  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
    <div><strong>Model:</strong> {data.model}</div>
    <div><strong>Part No.:</strong> {data.manufacturerPartNo}</div>
    <div><strong>Screen Size:</strong> {data.screenSize}</div>
    <div><strong>Resolution:</strong> {data.resolution}</div>
    <div><strong>Color:</strong> {data.color}</div>
    <div><strong>Operating System:</strong> {data.os}</div>
    <div><strong>Storage:</strong> {data.storage}</div>
    <div><strong>Memory:</strong> {data.memory}</div>
    <div><strong>Network:</strong> {data.network}</div>
    <div className="col-span-2">
      <strong>Specifications:</strong>
      <p className="mt-1">{data.specifications}</p>
    </div>
  </div>
)}

{/* REVIEW TAB */}
{activeTab === "review" && (
  <div className="text-gray-600 text-sm">
    <p>No reviews yet. Be the first to write a review!</p>
  </div>
)}

  </div>
</div>

      ) : null}
     <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {productGroups.map((group, idx) => (
    <div key={idx}>
      <h3 className="text-sm font-semibold mb-4 text-[#333] uppercase">
        {group.title}
      </h3>
      <div className="flex flex-col gap-4">
        {group.products.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border rounded-md p-3 hover:shadow-sm transition h-[100px]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 object-contain rounded"
            />
            <div className="flex flex-col justify-between h-full py-1">
              <p className="text-sm text-gray-700 leading-tight line-clamp-2">
                {item.name}
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
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
