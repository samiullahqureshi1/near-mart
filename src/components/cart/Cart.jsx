import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { BsTruck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => dispatch(removeFromCart(data));
  const quantityChangeHandler = (data) => dispatch(addTocart(data));

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const shippingThreshold = 100;
  const amountRemaining = shippingThreshold - totalPrice;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[85%] sm:w-[360px] bg-white flex flex-col overflow-y-auto shadow-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">SHOPPING CART</h2>
          <RxCross1
            size={24}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Progress bar + message */}
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium text-gray-600">
            Almost there, add{" "}
            <span className="text-yellow-500 font-semibold">
              ${amountRemaining > 0 ? amountRemaining.toFixed(2) : "0.00"}
            </span>{" "}
            more to get <span className="font-semibold">FREE SHIPPING!</span>
          </p>
          <div className="relative h-[8px] bg-gray-200 rounded-full mt-3">
            <div
              className="absolute h-full bg-yellow-500 rounded-full"
              style={{
                width: `${Math.min(
                  (totalPrice / shippingThreshold) * 100,
                  100
                )}%`,
              }}
            ></div>
            <div className="absolute -top-4 left-[45%] text-xl text-yellow-700">
              <BsTruck />
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="divide-y">
          {cart.length === 0 ? (
            <div className="flex justify-center py-10 text-gray-500">
              Cart is empty
            </div>
          ) : (
            cart.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                quantityChangeHandler={quantityChangeHandler}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        {/* Bottom Summary & CTA */}
        <div className="p-4 mt-auto border-t">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-medium">Subtotal:</h3>
            <h3 className="text-base font-semibold">
              ${totalPrice.toFixed(2)} USD
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Taxes and shipping calculated at checkout
          </p>

          <Link to="/view-cart">
            <button className="w-full h-[40px] bg-gray-200 text-gray-600 text-sm rounded-full font-medium">
              VIEW CART
            </button>
          </Link>

          <Link to="/checkout">
            <button className="mt-3 w-full h-[40px] bg-[#37ade0] text-white text-sm rounded-full font-semibold">
              CHECK OUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);

  const increment = () => {
    if (data.stock <= value) {
      toast.error("Product stock limited!");
      return;
    }
    const qty = value + 1;
    setValue(qty);
    quantityChangeHandler({ ...data, qty });
  };

  const decrement = () => {
    const qty = value === 1 ? 1 : value - 1;
    setValue(qty);
    quantityChangeHandler({ ...data, qty });
  };

  return (
    <div className="flex gap-4 p-4 items-start border-b">
      {/* Product Image */}
      <img
        src={data?.images[0]?.url}
        alt={data.name}
        className="w-[100px] h-[100px] object-cover rounded-md"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h4 className="text-base font-semibold">{data.name}</h4>
          <p className="text-sm text-gray-700 font-medium">
            ${data.discountPrice.toFixed(2)}
          </p>
        </div>

        {/* Quantity Control Box */}
        <div className="mt-4 border border-black rounded-full px-3 py-1 flex items-center gap-4 w-fit">
          <button onClick={decrement}>
            <FiTrash2 className="text-[16px] text-gray-600" />
          </button>
          <span className="text-sm font-medium">{value}</span>
          <button onClick={increment}>
            <HiPlus className="text-[16px] text-gray-600" />
          </button>
        </div>

        {/* Separate Delete Button Below */}
        <button
          onClick={() => removeFromCartHandler(data)}
          className="mt-4 text-gray-600 text-[18px]"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default Cart;
