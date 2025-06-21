// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { RxCross1 } from "react-icons/rx";

// const Payment = () => {
//   const [orderData, setOrderData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const orderData = JSON.parse(localStorage.getItem("latestOrder"));
//     setOrderData(orderData);
//   }, []);

//   const order = {
//     cart: orderData?.cart,
//     shippingAddress: orderData?.shippingAddress,
//     user: user && user,
//     totalPrice: orderData?.totalPrice,
//   };

//   const cashOnDeliveryHandler = async (e) => {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     order.paymentInfo = {
//       type: "Cash On Delivery",
//     };

//     await axios
//       .post(`https://near-backend.vercel.app/api/v2/order/create-order`, order, config)
//       .then((res) => {
//         setOpen(false);
//         navigate("/order/success");
//         toast.success("Order successful!");
//         localStorage.setItem("cartItems", JSON.stringify([]));
//         localStorage.setItem("latestOrder", JSON.stringify([]));
//         window.location.reload();
//       });
//   };

//   return (
//     <div className="w-full flex flex-col items-center py-8">
//       <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
//         <div className="w-full 800px:w-[65%]">
//           <PaymentInfo
//             user={user}
//             open={open}
//             setOpen={setOpen}
//             cashOnDeliveryHandler={cashOnDeliveryHandler}
//           />
//         </div>
//         <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
//           <CartData orderData={orderData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentInfo = ({ user, open, setOpen, cashOnDeliveryHandler }) => {
//   const [select, setSelect] = useState(3); // Start with Cash on Delivery selected

//   return (
//     <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
//       {/* cash on delivery */}
//       <div>
//         <div className="flex w-full pb-5 border-b mb-2">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(3)}
//           >
//             {select === 3 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
//             Cash on Delivery
//           </h4>
//         </div>

//         {/* cash on delivery */}
//         {select === 3 ? (
//           <div className="w-full flex">
//             <form className="w-full" onSubmit={cashOnDeliveryHandler}>
//               <input
//                 type="submit"
//                 value="Confirm"
//                 className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               />
//             </form>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// const CartData = ({ orderData }) => {
//   const shipping = orderData?.shipping?.toFixed(2);
//   return (
//     <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
//         <h5 className="text-[18px] font-[600]">Rs.{orderData?.subTotalPrice}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
//         <h5 className="text-[18px] font-[600]">Rs.{shipping}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between border-b pb-3">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
//         <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "Rs" + orderData.discountPrice : "-"}</h5>
//       </div>
//       <h5 className="text-[18px] font-[600] text-end pt-3">
//         Rs.{orderData?.totalPrice}
//       </h5>
//       <br />
//     </div>
//   );
// };

// export default Payment;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user,
    totalPrice: orderData?.totalPrice,
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Order from Artify",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => orderID);
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      if (payer) {
        paypalPaymentHandler(payer);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`https://near-backend.vercel.app/api/v2/order/create-order`, order, config)
      .then(() => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount: Math.round(orderData?.totalPrice * 100),
    };

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `https://near-backend.vercel.app/api/v2/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          type: "Credit Card",
        };

        await axios
          .post(`https://near-backend.vercel.app/api/v2/order/create-order`, order, config)
          .then(() => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order successful!");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            window.location.reload();
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`https://near-backend.vercel.app/api/v2/order/create-order`, order, config)
      .then(() => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* Card Payment */}
      <div className="flex w-full pb-5 border-b mb-2">
        <div
          className="w-[25px] h-[25px] rounded-full border-[3px] border-[#1d1a1ab4] flex items-center justify-center cursor-pointer"
          onClick={() => setSelect(1)}
        >
          {select === 1 && (
            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Pay with Debit/Credit Card
        </h4>
      </div>

      {select === 1 && (
        <form className="w-full" onSubmit={paymentHandler}>
          <div className="w-full flex pb-3 gap-2">
            <div className="w-[50%]">
              <label className="block pb-2">Name on Card</label>
              <input
                required
                value={user?.name}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Exp Date</label>
              <CardExpiryElement className={`${styles.input}`} />
            </div>
          </div>

          <div className="w-full flex pb-3 gap-2">
            <div className="w-[50%]">
              <label className="block pb-2">Card Number</label>
              <CardNumberElement
                className={`${styles.input} !h-[35px] !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">CVV</label>
              <CardCvcElement className={`${styles.input} !h-[35px]`} />
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] text-[18px] font-[600] cursor-pointer`}
          />
        </form>
      )}

      {/* PayPal */}
      <div className="flex w-full pb-5 border-b mb-2 mt-6">
        <div
          className="w-[25px] h-[25px] rounded-full border-[3px] border-[#1d1a1ab4] flex items-center justify-center cursor-pointer"
          onClick={() => setSelect(2)}
        >
          {select === 2 && (
            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Pay with PayPal
        </h4>
      </div>

      {select === 2 && (
        <div className="w-full">
          <div
            className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            onClick={() => setOpen(true)}
          >
            Pay Now
          </div>

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000039] flex items-center justify-center z-[99999]">
              <div className="bg-white rounded-[5px] p-8 w-[90%] 800px:w-[40%] shadow relative overflow-y-scroll max-h-[80vh]">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <PayPalScriptProvider
                  options={{
                    "client-id": "AXRhO4eNGo3L8MUFazEFnW9hNwBP2rTwUWNqMMRcFtjpbCrDVt6vS8HoWa7hyLlfO0fxG3OU_9zit7KN",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cash on Delivery */}
      <div className="flex w-full pb-5 border-b mb-2 mt-6">
        <div
          className="w-[25px] h-[25px] rounded-full border-[3px] border-[#1d1a1ab4] flex items-center justify-center cursor-pointer"
          onClick={() => setSelect(3)}
        >
          {select === 3 && (
            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Cash on Delivery
        </h4>
      </div>

      {select === 3 && (
        <form className="w-full" onSubmit={cashOnDeliveryHandler}>
          <input
            type="submit"
            value="Confirm"
            className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] text-[18px] font-[600] cursor-pointer`}
          />
        </form>
      )}
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <div className="flex justify-between mt-2">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <div className="flex justify-between mt-2 border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? `$${orderData.discountPrice}` : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
    </div>
  );
};

export default Payment;
