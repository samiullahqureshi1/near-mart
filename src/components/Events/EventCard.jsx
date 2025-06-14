import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-1/2 flex justify-center items-center"> {/* Adjusted width and added flex properties */}
        <img src={`${data.images[0]?.url}`} alt="" className="max-h-full max-w-full" /> {/* Adjusted max height and width */}
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center pl-4"> {/* Adjusted width and added padding */}
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-semibold text-base text-red-500 pr-3 line-through">
              Rs.{data.originalPrice}
            </h5>
            <h5 className="font-bold text-lg text-gray-800 font-Roboto">
              Rs.{data.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-normal text-base text-green-600">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`} className={`${styles.button} text-white`}>
            See Details
          </Link>
          <div className={`${styles.button} text-white ml-5`} onClick={() => addToCartHandler(data)}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
