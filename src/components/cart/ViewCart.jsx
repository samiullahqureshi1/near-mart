import React from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { BsGift, BsTruck, BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (data, qty) => {
    dispatch(addTocart({ ...data, qty }));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateTotal = (price, qty) => (price * qty).toFixed(2);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const shippingThreshold = 100;
  const remaining = Math.max(shippingThreshold - totalPrice, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <div
        className="w-full h-[100px] flex items-center justify-center bg-cover bg-center mb-8"
        style={{
          backgroundImage:
            "url('https://demo-kalles-4-1.myshopify.com/cdn/shop/files/shopping-cart-head.jpg?v=1652080767')",
        }}
      >
        <h1 className="text-white text-[26px] font-semibold tracking-wide">
          SHOPPING CART
        </h1>
      </div>

      {cart.length === 0 ? (
        // -------------------- EMPTY CART UI --------------------
        <div className="flex flex-col items-center justify-center mt-16 mb-20 px-4">
          <BsCartX className="text-[90px] text-gray-500 mb-6" />
          <h2 className="text-[22px] font-bold text-gray-800 mb-2">
            YOUR CART IS EMPTY.
          </h2>
          <p className="text-gray-500 text-center mb-4 max-w-md">
            Before proceed to checkout you must add some products to your
            shopping cart. <br />
            You will find a lot of interesting products on our "Shop" page.
          </p>
          <Link to="/products">
            <button className="bg-[#37cfee] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#2fb8d7] transition">
              RETURN TO SHOP
            </button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Free Shipping for all orders over{" "}
            <span className="text-red-600 font-semibold">$100.00</span>
          </p>
        </div>
      ) : (
        // -------------------- CART ITEMS UI --------------------
        <>
          {/* Cart Table */}
          <div className="w-full px-10 mb-10 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="text-left text-gray-600 text-[13px] uppercase border-b">
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-6">
                      <div className="flex items-center gap-5">
                        <img
                          src={item.images[0]?.url}
                          alt={item.name}
                          className="w-[150px] rounded-md object-cover"
                        />
                        <div>
                          <h2 className="font-semibold text-[15px] text-gray-800">
                            {item.name}
                          </h2>
                          <button
                            onClick={() => removeFromCartHandler(item)}
                            className="text-gray-500 mt-2 hover:text-black transition"
                          >
                            <RxCross1 />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-[14px] text-gray-700 font-medium">
                      ${item.discountPrice.toFixed(2)}
                    </td>
                    <td>
                      <div className="flex items-center border border-black rounded-full px-4 py-1 w-fit">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.qty > 1 ? item.qty - 1 : 1
                            )
                          }
                          className="text-[15px] text-gray-700"
                        >
                          <HiOutlineMinus />
                        </button>
                        <span className="mx-4 text-[14px]">{item.qty}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item, item.qty + 1)
                          }
                          className="text-[15px] text-gray-700"
                        >
                          <HiPlus />
                        </button>
                      </div>
                    </td>
                    <td className="text-[15px] text-gray-900 font-semibold">
                      ${calculateTotal(item.discountPrice, item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Extra Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-10 mb-20">
            {/* Left */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BsGift className="text-xl text-black" />
                  <p className="text-sm text-black">
                    Do you want a gift wrap?{" "}
                    <span className="font-semibold">$5.00</span>
                  </p>
                </div>
                <button className="border border-black px-5 py-2 rounded-full font-medium text-sm hover:bg-black hover:text-white transition">
                  Add A Gift Wrap
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Add Order Note
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                  rows="4"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Coupon:
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Coupon code will work on checkout page
                </p>
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-700 text-right">
                  Almost there, add{" "}
                  <span className="text-yellow-500 font-semibold">
                    ${remaining}
                  </span>{" "}
                  more to get <span className="font-bold">FREE SHIPPING!</span>
                </p>
                <div className="relative mt-2 h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-400"
                    style={{
                      width: `${Math.min(
                        (totalPrice / shippingThreshold) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                  <BsTruck className="absolute top-[-20px] left-[50%] text-yellow-600 text-lg" />
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold text-black">
                <p>SUBTOTAL:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>

              <p className="text-sm text-gray-500">
                Taxes and shipping calculated at checkout
              </p>

              

              <Link to="/checkout">
                <button className="mt-6 w-full bg-[#37cfee] hover:bg-[#2fb8d7] text-white text-sm font-semibold py-3 rounded-full transition">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
