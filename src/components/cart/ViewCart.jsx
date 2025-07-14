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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 lg:px-12 mb-20">
        {/* Cart Table Left */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-md overflow-x-auto self-start">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
                <th className="p-4">Products</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-t text-gray-800">
                  <td className="p-4">
                    <div className="flex gap-4 items-center">
                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCartHandler(item)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        <RxCross1 />
                      </button>

                      {/* Product image */}
                      <img
                        src={item.images[0]?.url}
                        alt={item.name}
                        className="w-[60px] h-[60px] object-contain"
                      />

                      {/* Product name */}
                      <div className="text-sm font-medium text-gray-800">
                        {item.name}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4 text-sm font-medium text-gray-700">
                    {item.originalPrice &&
                    item.originalPrice > item.discountPrice ? (
                      <div className="space-x-2">
                        <span className="line-through text-gray-400">
                          ${item.originalPrice}
                        </span>
                        <span>${item.discountPrice.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>${item.discountPrice.toFixed(2)}</span>
                    )}
                  </td>

                  {/* Quantity Controls */}
                  <td className="p-4">
                    <div className="flex items-center justify-center border border-gray-300 rounded-md w-[110px]">
                      <button
                        className="px-3 py-1 text-gray-700"
                        onClick={() =>
                          handleQuantityChange(
                            item,
                            item.qty > 1 ? item.qty - 1 : 1
                          )
                        }
                      >
                        <HiOutlineMinus />
                      </button>
                      <span className="px-4 text-sm">
                        {item.qty.toString().padStart(2, "0")}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-700"
                        onClick={() => handleQuantityChange(item, item.qty + 1)}
                      >
                        <HiPlus />
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td className="p-4 font-semibold text-sm">
                    ${calculateTotal(item.discountPrice, item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Action Buttons */}
          <div className="flex justify-between items-center p-5 border-t bg-white">
            <Link to="/products">
              <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition">
                <span className="text-lg">←</span> RETURN TO SHOP
              </button>
            </Link>

            <button className="text-sm font-semibold border border-blue-500 text-blue-600 px-5 py-2 rounded hover:bg-blue-50 transition">
              UPDATE CART
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Totals Card */}
          <div className="border border-gray-200 rounded-md p-6">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm">
              Card Totals
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sub-total:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="font-medium">$24</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-medium">$61.99</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${(totalPrice + 61.99 - 24).toFixed(2)} USD</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 rounded transition flex items-center justify-center gap-2">
                PROCEED TO CHECKOUT →
              </button>
            </Link>
          </div>

          {/* Coupon Code */}
          <div className="border border-gray-200 rounded-md p-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">
              Coupon Code
            </h3>
            <input
              type="text"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded transition">
              APPLY COUPON
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
