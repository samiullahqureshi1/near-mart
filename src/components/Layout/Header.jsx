import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FiPhoneCall, FiUser } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaReact,
} from "react-icons/fa";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { TbArrowsShuffle } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft, BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import logo from "../../Assests/nearmart.png";
import axios from "axios";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔵 Login Submit Clicked");

    try {
      console.log("🔵 Sending login API request with data:", {
        email,
        password,
      });

      const res = await axios.post(
        "https://near-backend.vercel.app/api/v2/user/login-user",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("✅ Login API Response:", res);

      toast.success("Login Success!");

      const role = res.data.user?.role;
      console.log("✅ User Role:", role);

      if (role === "Seller") {
        console.log("✅ Redirecting to Dashboard");
        navigate("/dashboard");
      } else {
        console.log("✅ Redirecting to Homepage");
        navigate("/");
      }

      console.log("🔄 Reloading window...");
      window.location.reload(true);
    } catch (err) {
      console.error("❌ Login API Error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const modalRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCategoryClick = (categoryTitle) => {
    navigate(`/products?category=${encodeURIComponent(categoryTitle)}`);
    setDropDown(false);
  };
  const dropdownRef = useRef(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.openCart) {
      setOpenCart(true);
      // Clear the flag to prevent reopening on reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchData([]); // Hide the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchData]);
  const handleCartClick = () => {
    navigate("/view-cart");
  };

  return (
    <>
      <div className="w-full font-sans">
        {/* Top Info Bar */}
        <div className="bg-[#144e75] text-white text-xs py-1 px-4 flex justify-between items-center">
          <span>Welcome to Neartmat online store.</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Follow us:</span>
            <div className="flex gap-2 text-base">
              <FaTwitter />
              <FaFacebookF />
              <FaPinterestP />
              <FaYoutube />
              <FaInstagram />
            </div>
            <div className="ml-4 flex items-center gap-2 cursor-pointer">
              Eng <BsChevronDown size={12} />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              USD <BsChevronDown size={12} />
            </div>
          </div>
        </div>

        {/* Middle Header */}
        <div className="bg-[#175f89] py-4 px-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 relative">
          {/* Logo (React Icon + Text) */}
          <Link to="/" className="flex items-center gap-2 shrink-0 text-white">
            <div className="bg-white rounded-full p-1">
              <FaReact size={28} color="#175f89" />
            </div>
            <span className="text-2xl font-bold tracking-wide">NEARTMAT</span>
          </Link>

          {/* Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6 text-white text-xl">
            {/* Wishlist */}
            <div
              className="relative cursor-pointer flex items-center justify-center"
              onClick={() => navigate("/wishlist")}
            >
              <CiHeart size={26} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[11px] rounded-full flex items-center justify-center leading-none px-[6px]">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <div
                className="cursor-pointer flex items-center justify-center"
                onClick={handleCartClick}
              >
                <CiShoppingCart size={26} />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[11px] rounded-full flex items-center justify-center leading-none px-[6px]">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>

            {/* Profile */}
            <div className="relative">
              {isAuthenticated ? (
                <Link to="/profile">
                  <CiUser size={22} />
                </Link>
              ) : (
                  <Link to="/login">
                  <CgProfile size={22} />
                </Link>
              )}

              {/* Login Modal */}
              {!isAuthenticated && showLogin && (
                <div
                  ref={modalRef}
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg p-6 z-50"
                >
                  <h3 className="text-center text-black text-lg font-semibold mb-6">
                    Sign in to your account
                  </h3>

                  {/* Form */}
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium">Password</label>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          Forget Password
                        </Link>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <span
                          className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible size={18} />
                          ) : (
                            <AiOutlineEye size={18} />
                          )}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#ff6600] hover:bg-[#e65c00] text-white font-semibold py-2 rounded text-sm flex items-center justify-center gap-2"
                    >
                      LOGIN <span className="text-base">→</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu (only on mobile) */}
          <button
            className="md:hidden absolute top-4 right-4 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <BsChevronDown size={20} />
          </button>

          {/* Mobile Menu (Column Layout) */}
         {isMenuOpen && (
        <div className="fixed top-0 right-0 w-[250px] bg-white h-full shadow-lg z-50 md:hidden transition-transform transform ease-in-out">
          <div className="p-6 flex flex-col gap-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-xl text-gray-600"
            >
              <AiOutlineClose />
            </button>

            {/* Links */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Wishlist
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Profile
            </Link>
            <Link
              to="/view-cart"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Cart
            </Link>
            <Link
              to="/track-order"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Track Order
            </Link>
            <Link
              to="/customer-support"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Customer Support
            </Link>
            <Link
              to="/help-center"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Need Help
            </Link>

            {/* Login Button in Hamburger */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-[#ff6600] text-white py-2 rounded mt-4"
            >
              Login
            </button>

            <div className="border-t-2 pt-4"></div>
          </div>
        </div>
      )}

        </div>

        {/* Bottom Utility Nav (Hidden on Mobile) */}
        <div className="bg-white mb-2 border-b-2 py-3 px-6 max-w-[1600px] mx-auto flex flex-wrap justify-between items-center text-sm font-medium gap-4 md:flex hidden">
          <div className="flex flex-wrap items-center gap-5 text-gray-700">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropDown((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <MdOutlineCategory size={16} />
                <span>All Categories</span>
                <BsChevronDown size={12} />
              </button>
              {dropDown && (
                <div className="absolute z-50 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-sm">
                  <ul className="py-1">
                    {categoriesData.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryClick(category.title)}
                        className="group relative px-4 py-2 text-sm text-[#333] hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      >
                        <span>{category.title}</span>
                        {category.subcategories && (
                          <BsChevronRight size={12} className="ml-2" />
                        )}
                        {category.subcategories && (
                          <ul className="absolute top-0 left-full w-56 bg-white border border-l-0 border-gray-200 shadow-lg rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                            {category.subcategories.map((sub, idx) => (
                              <li
                                key={idx}
                                className="px-4 py-2 text-sm text-[#333] hover:bg-gray-100"
                              >
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link to="/track-order">
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                <FaMapMarkerAlt size={16} />
                <span>Track Order</span>
              </div>
            </Link>

            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
              <TbArrowsShuffle size={16} />
              <span>Compare</span>
            </div>

            <Link to="/customer-support">
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                <BiSupport size={16} />
                <span>Customer Support</span>
              </div>
            </Link>

            <Link to="/help-center">
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                <TbArrowsShuffle size={16} />
                <span>Need Help</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm whitespace-nowrap">
            <FiPhoneCall size={16} className="text-blue-600" />
            +1-202-555-0104
          </div>
        </div>
      </div>

      {/* Mobile Header */}
    </>
  );
};

export default Header;
