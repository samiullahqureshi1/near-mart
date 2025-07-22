import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaHandshake,
} from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import Header from "../../Layout/Header";
import FooterWithNewsletter from "../../Layout/Footer";

const steps = [
  { title: "Processing", icon: <FaBoxOpen size={18} /> },
  { title: "Shipping", icon: <FaTruck size={18} /> },
  { title: "On The Way", icon: <BsTruck size={18} /> },
  { title: "Delivered", icon: <FaHandshake size={18} /> },
];

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

const getStepIndex = (status) => {
  switch (status?.toLowerCase()) {
    case "processing":
      return 0;
    case "shipping":
      return 1;
    case "on the way":
      return 2;
    case "delivered":
      return 3;
    default:
      return 0;
  }
};

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://near-backend.vercel.app/api/v2/order/get-order/${id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data.success) throw new Error("Order not found");
        setOrder(data.order);
      } catch (err) {
        setError("Order not found or something went wrong.");
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  const statusIndex = getStepIndex(order.status);

  const timeline = [
    {
      icon: <FaCheckCircle className="text-green-500" />,
      message: "Your order has been delivered. Thank you for shopping!",
      time: order.paidAt
        ? new Date(order.paidAt).toLocaleString()
        : "Pending",
    },
    {
      icon: <BsTruck className="text-blue-500" />,
      message: "Courier has picked up your order.",
      time: order.status || "Pending",
    },
    {
      icon: <BiMap className="text-blue-500" />,
      message: "Your order reached last mile hub.",
      time: order.status || "Pending",
    },
    {
      icon: <BsTruck className="text-blue-500" />,
      message: "Your order is on the way.",
      time: order.paidAt || "Pending",
    },
    {
      icon: <MdVerifiedUser className="text-green-500" />,
      message: "Your order is successfully verified.",
      time: order.paidAt ? new Date(order.paidAt).toLocaleString() : "Pending",
    },
    {
      icon: <FaBoxOpen className="text-blue-500" />,
      message: "Your order has been confirmed.",
      time: new Date(order.createdAt).toLocaleString(),
    },
  ];

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Top summary */}
        <div className="border rounded shadow bg-white p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-sm text-gray-700">
                #{order._id.slice(0, 8)}
              </h2>
              <p className="text-xs text-gray-500">
                {order.cart.length} Products • Order Placed on{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-blue-500 text-xl font-bold">
              Rs. {order.totalPrice}
            </div>
          </div>

          {/* Expected arrival */}
          <p className="text-sm text-gray-700 mt-6">
            Order expected arrival{" "}
            <span className="font-semibold">23 Jan, 2021</span>
          </p>

          {/* Stepper */}
         <div className="relative mt-4 flex justify-between items-center">
  {/* Background gray line */}
  <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300 z-0 rounded-full" />

  {/* Orange progress line */}
  <div
    className="absolute top-3 left-0 h-1 bg-orange-500 z-10 rounded-full transition-all duration-300"
    style={{
      width: `${(statusIndex / (steps.length - 1)) * 100}%`,
    }}
  />

  {/* Step Circles */}
  {steps.map((step, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center w-1/4 z-20"
    >
      <div
        className={`rounded-full w-7 h-7 flex items-center justify-center border-2 transition-all duration-300 ease-in-out ${
          index <= statusIndex
            ? "bg-orange-500 border-orange-500 text-white"
            : "border-gray-300 text-gray-400"
        }`}
      >
        {step.icon}
      </div>
      <p className="text-xs mt-2 text-center text-gray-700">
        {step.title}
      </p>
    </div>
  ))}
</div>

        </div>

        {/* Order Activity */}
        <div className="bg-white border rounded shadow p-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Order Activity
          </h3>
          <ul className="space-y-4">
            {timeline.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 text-lg">{item.icon}</div>
                <div>
                  <p className="text-sm text-gray-800">{item.message}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FooterWithNewsletter />
    </>
  );
};

export default OrderDetails;
