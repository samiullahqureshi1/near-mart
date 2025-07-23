import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import Header from "../Layout/Header";
import FooterWithNewsletter from "../Layout/Footer";

const WishlistTable = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const addToCartHandler = (item) => {
    const newItem = { ...item, qty: 1 };
    dispatch(addTocart(newItem));
  };

  const removeFromWishlistHandler = (item) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <>
      <Header />
      <div className="px-4 py-10">
        <div className="max-w-[880px] mx-auto border rounded-lg overflow-hidden bg-white shadow-sm">
          {/* Heading */}
          <div className="bg-white px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Wishlist</h2>
          </div>

          {/* Conditional content */}
          <div className="p-6">
            {wishlist.length === 0 ? (
              <div className="text-center text-gray-600 text-base py-12">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm hidden md:block">
                  <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Products</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item, idx) => {
                      const price = item.discountPrice || item.price;
                      const original = item.originalPrice || "";
                      const inStock = item.stock > 0;

                      return (
                        <tr
                          key={idx}
                          className="border-t hover:bg-gray-50 transition-all"
                        >
                          <td className="px-4 py-4 flex items-center gap-4">
                            <img
                              src={item.images[0]?.url}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded"
                            />
                            <span className="text-sm font-medium text-gray-800 max-w-xs line-clamp-2">
                              {item.name}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-sm">
                            {original && (
                              <span className="line-through text-gray-400 mr-2">
                                GH₵{original}
                              </span>
                            )}
                            <span className="text-[#d02222] font-semibold">
                              GH₵{price}
                            </span>
                          </td>

                          <td className="px-4 py-4 font-medium">
                            <span
                              className={inStock ? "text-green-600" : "text-red-500"}
                            >
                              {inStock ? "IN STOCK" : "OUT OF STOCK"}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center justify-between gap-3 w-full">
                              {inStock ? (
                                <button
                                  className="text-sm px-4 py-2 rounded font-semibold transition bg-[#ff6600] text-white hover:bg-[#e65c00] flex items-center gap-2"
                                  onClick={() => addToCartHandler(item)}
                                >
                                  ADD TO CART <BsCartPlus size={16} />
                                </button>
                              ) : (
                                <button
                                  className="text-sm px-4 py-2 rounded font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex items-center gap-2"
                                  disabled
                                >
                                  ADD TO CART <BsCartPlus size={16} />
                                </button>
                              )}

                              <button
                                onClick={() => removeFromWishlistHandler(item)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-400 transition"
                                title="Remove"
                              >
                                <RxCross1 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Mobile Layout - Card Style */}
                <div className="md:hidden">
                  {wishlist.map((item, idx) => {
                    const price = item.discountPrice || item.price;
                    const original = item.originalPrice || "";
                    const inStock = item.stock > 0;

                    return (
                      <div
                        key={idx}
                        className="border-b pb-4 mb-4 flex flex-col gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.images[0]?.url}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-800 block">
                              {item.name}
                            </span>
                            <span className="text-[#d02222] font-semibold block">
                              GH₵{price}
                            </span>
                            {original && (
                              <span className="line-through text-gray-400 text-xs">
                                GH₵{original}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-2">
                          <span
                            className={`text-sm font-semibold ${
                              inStock ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {inStock ? "IN STOCK" : "OUT OF STOCK"}
                          </span>

                          {inStock ? (
                            <button
                              className="text-sm px-4 py-2 rounded font-semibold transition bg-[#ff6600] text-white hover:bg-[#e65c00] flex items-center gap-2"
                              onClick={() => addToCartHandler(item)}
                            >
                              ADD TO CART <BsCartPlus size={16} />
                            </button>
                          ) : (
                            <button
                              className="text-sm px-4 py-2 rounded font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex items-center gap-2"
                              disabled
                            >
                              ADD TO CART <BsCartPlus size={16} />
                            </button>
                          )}

                          <button
                            onClick={() => removeFromWishlistHandler(item)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-400 transition"
                            title="Remove"
                          >
                            <RxCross1 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterWithNewsletter />
    </>
  );
};

export default WishlistTable;
