import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FiPhoneCall, FiUser } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP, FaReact } from 'react-icons/fa';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import { TbArrowsShuffle } from 'react-icons/tb';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import {
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

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
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


   const [showLogin, setShowLogin] = useState(false);
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
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
      <div className="ml-4 flex items-center gap-2 cursor-pointer">Eng <BsChevronDown size={12} /></div>
      <div className="flex items-center gap-2 cursor-pointer">USD <BsChevronDown size={12} /></div>
    </div>
  </div>

  {/* Middle Header */}
  <div className="bg-[#175f89] py-4 px-6   flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
  {/* Logo (React Icon + Text) */}
  <Link to="/" className="flex items-center gap-2 shrink-0 text-white">
    <div className="bg-white rounded-full p-1">
      <FaReact size={28} color="#175f89" />
    </div>
    <span className="text-2xl font-bold tracking-wide">NEARTMAT</span>
  </Link>

  {/* Search Bar */}
  <div className="flex-1 relative max-w-[700px]" ref={wrapperRef}>
    <input
      type="text"
      placeholder="Search for anything..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-500" size={20} />

    {/* Search Suggestions */}
    {searchData?.length > 0 && (
      <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg z-30 p-4 max-h-[40vh] overflow-auto border border-gray-200 rounded-md">
        {searchData.map((item, index) => (
          <Link to={`/product/${item._id}`} key={index}>
            <div className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-md">
              <img src={item.images[0]?.url} alt={item.name} className="w-10 h-10 object-cover" />
              <span className="text-sm text-gray-800">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>

  {/* Icons */}
  <div className="flex items-center gap-6 text-white text-xl">
  {/* Wishlist */}
  <div
    className="relative cursor-pointer flex items-center justify-center"
    onClick={() => setOpenWishlist(true)}
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
      onClick={() => setOpenCart(!openCart)}
    >
      <CiShoppingCart size={26} />
      {cart?.length > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[11px] rounded-full flex items-center justify-center leading-none px-[6px]">
          {cart.length}
        </span>
      )}
    </div>

    {/* Cart Dropdown */}
    {openCart && (
      <div className="absolute right-0 mt-2 z-50">
        <Cart setOpenCart={setOpenCart} />
      </div>
    )}
  </div>

  {/* Profile */}
  <div className="relative">
    {isAuthenticated ? (
      <Link to="/profile">
        <CiUser size={26} />
      </Link>
    ) : (
      <span
        onClick={() => setShowLogin((prev) => !prev)}
        className="cursor-pointer"
      >
        <CgProfile size={26} />
      </span>
    )}

    {/* Login Modal */}
    {!isAuthenticated && showLogin && (
      <div
        ref={modalRef}
        className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg p-6 z-50"
      >
        {/* --- Existing Login Modal Code --- */}
      </div>
    )}
  </div>
</div>


  {/* Conditional Panels */}
  {/* {openCart && <Cart setOpenCart={setOpenCart} />} */}
  {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
</div>


  {/* Bottom Utility Nav */}
 <div className="bg-white mb-2 border-b-2  py-3 px-6 max-w-[1600px] mx-auto flex flex-wrap justify-between items-center text-sm font-medium gap-4">
  {/* Left Items with Icons */}
  <div className="flex flex-wrap items-center gap-5 text-gray-700">
    {/* All Category */}
      <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setDropDown((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        <MdOutlineCategory size={16} />
        <span>All Category</span>
        <BsChevronDown size={12} />
      </button>

      {/* Dropdown */}
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

                {/* Subcategories */}
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

    {/* Track Order */}
    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
      <FaMapMarkerAlt size={16} />
      <span>Track Order</span>
    </div>

    {/* Compare */}
    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
      <TbArrowsShuffle size={16} />
      <span>Compare</span>
    </div>

    {/* Customer Support */}
    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
      <BiSupport size={16} />
      <span>Customer Support</span>
    </div>

    {/* Need Help */}
    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
      <TbArrowsShuffle size={16} />
      <span>Need Help</span>
    </div>
  </div>

  {/* Right: Phone Number */}
  <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm whitespace-nowrap">
    <FiPhoneCall size={16} className="text-blue-600" />
    +1-202-555-0104
  </div>
</div>
</div>



     
      {/* Mobile Header */}
      <div
        className={`fixed top-0 left-0 z-50 w-full bg-white shadow-sm 800px:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left - Menu Toggle */}
          <BiMenuAltLeft
            size={32}
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />

          {/* Center - Logo */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-[100px] object-contain" />
          </Link>

          {/* Right - Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={28} />
            <span className="absolute -top-1 -right-1 bg-[#6397d7] text-white text-[11px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
              {cart?.length || 0}
            </span>
          </div>
        </div>

        {/* Cart & Wishlist Popups */}
        {openCart && <Cart setOpenCart={setOpenCart} />}
        {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}

        {/* Sidebar Menu */}
        {open && (
          <div className="fixed inset-0 bg-black/40 z-40">
            <div className="w-[75%] bg-white h-full overflow-y-scroll z-50 fixed top-0 left-0">
              {/* Sidebar Top Row */}
              <div className="flex justify-between items-center p-4">
                {/* Wishlist Button */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    setOpenWishlist(true);
                    setOpen(false);
                  }}
                >
                  <AiOutlineHeart size={28} />
                  <span className="absolute -top-1 -right-1 bg-[#6397d7] text-white text-[11px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist?.length || 0}
                  </span>
                </div>
                <RxCross1
                  size={26}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Sidebar Search */}
              <div className="px-4 mb-4">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full border-2 border-[#3957db] rounded-md px-3 py-2 text-sm"
                />
                {searchData?.length > 0 && (
                  <div className="bg-white shadow p-3 mt-2 rounded">
                    {searchData.map((i) => (
                      <Link
                        to={`/product/${i.name.replace(/\s+/g, "-")}`}
                        key={i._id}
                      >
                        <div className="flex items-center gap-2 py-2">
                          <img
                            src={i.image_Url[0]?.url}
                            alt={i.name}
                            className="w-[40px] h-[40px] object-contain"
                          />
                          <p className="text-sm">{i.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Items */}
              <Navbar active={activeHeading} />

              {/* Seller Button */}
              <div className={`${styles.button} ml-4 !rounded-[4px] mt-4`}>
                <Link to="/shop-create">
                  <h1 className="text-white flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

              {/* Auth/Profile */}
              <div className="flex justify-center mt-8 mb-6">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user.avatar?.url}
                      alt="profile"
                      className="w-[60px] h-[60px] rounded-full border-4 border-[#0eae88]"
                    />
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="text-lg pr-2 text-gray-800">
                      Login /
                    </Link>
                    <Link to="/sign-up" className="text-lg text-gray-800">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
