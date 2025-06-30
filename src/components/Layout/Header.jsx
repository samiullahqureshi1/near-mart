import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
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
      <div className="w-full border-b border-gray-200">
        {/* Top Header Row */}
        <div className="flex items-center justify-between px-6 py-4 max-w-[1600px] mx-auto">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-[120px] object-contain" />
            </Link>
          </div>

          {/* Center - Search Box */}
          {/* <div className="flex-1 mx-6 max-w-[700px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="What are you looking for ?"
          value={searchTerm}
          onChange={handleSearchChange}
          className="placeholder-black w-full pl-10 pr-4 py-2 rounded-full bg-[#f1f2f4] text-sm  focus:outline-none focus:ring-2 focus:ring-[#3bc177]"
        />
        <AiOutlineSearch
          size={22}
          className="absolute left-3 top-[10px] cursor-pointer text-gray-500"
        />
        {searchData && searchData.length !== 0 && (
          <div className="absolute min-h-[30vh] bg-white shadow-lg z-30 p-4 max-h-[40vh] overflow-auto border-2 border-[#f0f0f0] rounded-md">
            {searchData.map((i, index) => (
              <Link to={`/product/${i._id}`} key={index}>
                <div className="w-full flex items-start py-3 hover:bg-[#f1f1f1] rounded-md">
                  <img
                    src={`${i.images[0]?.url}`}
                    alt={i.name}
                    className="w-[40px] h-[40px] mr-[10px]"
                  />
                  <h1 className="text-sm text-gray-800">{i.name}</h1>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div> */}
          <div className="flex-1 mx-6 max-w-[700px]" ref={wrapperRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for ?"
                value={searchTerm}
                onChange={handleSearchChange}
                className="placeholder-black w-full pl-10 pr-4 py-2 rounded-full bg-[#f1f2f4] text-sm focus:outline-none focus:ring-2 focus:ring-[#3bc177]"
              />
              <AiOutlineSearch
                size={22}
                className="absolute left-3 top-[10px] cursor-pointer text-gray-500"
              />

              {searchData && searchData.length !== 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg z-30 p-4 max-h-[40vh] overflow-auto border border-gray-200 rounded-md">
                  {searchData.map((i, index) => (
                    <Link to={`/product/${i._id}`} key={index}>
                      <div className="flex items-start gap-3 py-2 px-2 hover:bg-[#f1f1f1] rounded-md">
                        <img
                          src={i.images[0]?.url}
                          alt={i.name}
                          className="w-[40px] h-[40px] object-cover"
                        />
                        <h1 className="text-sm text-gray-800">{i.name}</h1>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Right - Icons */}
          <div className="flex items-center gap-6">
            {/* Trade-in Button (reuse or remove as needed) */}
            {/* <button className="flex items-center border px-4 py-2 rounded-md text-sm font-medium hover:shadow">
              <span className="mr-2">⇄</span> Trade-in
            </button> */}

            {/* Wishlist */}
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenWishlist(true)}
            >
              <CiHeart size={30} color="black" />
              <span className="absolute right-0 top-0 rounded-full bg-[#ff6f61] w-4 h-4 text-white text-[12px] leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <CiShoppingCart size={30} color="black" />
              <span className="absolute right-0 top-0 rounded-full bg-[#ff6f61] w-4 h-4 text-white text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>

            {/* Profile */}
            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <CiUser className="w-[25px] h-[25px]" />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="black" />
                </Link>
              )}
            </div>

            {/* Side Panels */}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>

        {/* Bottom Nav Row */}
        {/* <div className="flex justify-center items-center space-x-6 text-sm font-medium px-6 py-3 max-w-[1600px] mx-auto overflow-x-auto">
          <span className="text-[#aa336a] flex items-center gap-1">
            ✨ Good deals
          </span>
          <div
            onClick={() => setDropDown(!dropDown)}
            className="relative cursor-pointer"
          >
            <button className="text-black hover:text-[#3bc177]">
              Categories
            </button>
            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>
          <Link to="/" className="text-black hover:text-[#3bc177]">
            Home
          </Link>
          <Link to="/best-selling" className="text-black hover:text-[#3bc177]">
            Best Selling
          </Link>
          <Link to="/faq" className="text-black hover:text-[#3bc177]">
            FAQ
          </Link>
        </div> */}
        <div className="hidden sm:flex justify-center items-center space-x-6 text-sm font-medium px-6 py-3 max-w-[1600px] mx-auto overflow-x-auto">
  <span className="text-[#aa336a] flex items-center gap-1">
    ✨ Good deals
  </span>
  <div
    onClick={() => setDropDown(!dropDown)}
    className="relative cursor-pointer"
  >
    <button className="text-black hover:text-[#3bc177]">
      Categories
    </button>
    {dropDown && (
      <DropDown
        categoriesData={categoriesData}
        setDropDown={setDropDown}
      />
    )}
  </div>
  <Link to="/" className="text-black hover:text-[#3bc177]">
    Home
  </Link>
  <Link to="/best-selling" className="text-black hover:text-[#3bc177]">
    Best Selling
  </Link>
  <Link to="/faq" className="text-black hover:text-[#3bc177]">
    FAQ
  </Link>
</div>

      </div>

      {/* <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#1c1d22] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div> */}

      {/* mobile header */}
      {/* <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-[80px] 400px:w-[100px] 600px:w-[120px] mt-3 cursor-pointer" 
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#6397d7]  w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#6397d7]  w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div> */}
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
