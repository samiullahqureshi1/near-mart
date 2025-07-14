import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="absolute top-[16px] right-0 w-[350px] bg-white shadow-xl rounded-md z-50 border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold text-[16px] text-black">
          Shopping Cart ({cart.length})
        </h2>
        <RxCross1
          className="cursor-pointer text-gray-600"
          size={20}
          onClick={() => setOpenCart(false)}
        />
      </div>

      {/* Cart Items */}
      <div className="max-h-[400px] overflow-y-auto">
        {cart.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Cart is empty</div>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-3 gap-3 border-b border-gray-100"
            >
              {/* Product Image */}
              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="w-[52px] h-[52px] object-contain rounded-md"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold leading-5 mb-1 truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {item.qty} × ${item.discountPrice.toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="text-gray-400 hover:text-red-500"
                title="Remove"
              >
                <RxCross1 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Subtotal & Buttons */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Sub-Total:</span>
          <span className="font-semibold text-sm">
            ${totalPrice.toFixed(2)} USD
          </span>
        </div>

        <Link to="/checkout">
          <button className="w-full mb-2 h-[42px] bg-[#ff6600] hover:bg-[#e65c00] text-white rounded text-sm font-bold">
            CHECKOUT NOW
          </button>
        </Link>
        <Link to="/view-cart">
          <button className="w-full h-[40px] border border-gray-300 text-gray-800 rounded text-sm font-medium">
            VIEW CART
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
