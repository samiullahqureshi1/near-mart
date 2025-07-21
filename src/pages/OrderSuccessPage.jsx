import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/107043-success.json";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-[500px]">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle size={60} className="text-green-500" />
          {/* Replace with Lottie here if needed */}
        </div>

        {/* Heading */}
        <h2 className="text-[22px] md:text-[26px] font-semibold text-gray-800 mb-2">
          Your order is successfully place
        </h2>

        {/* Subheading */}
        <p className="text-gray-500 text-sm mb-6 leading-6">
          Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus.
          Donec volutpat mollis nulla non facilisis.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            className="border border-orange-500 text-orange-500 px-6 py-2 rounded-md hover:bg-orange-50 transition text-sm"
            onClick={() => navigate("/profile")}
          >
            🧾 GO TO DASHBOARD
          </button>

          {/* <button
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition text-sm flex items-center justify-center gap-2"
            onClick={() => navigate("/user/orders")}
          >
            VIEW ORDER →
          </button> */}
        </div>
      </div>
    </div>
  );
};


export default OrderSuccessPage;
