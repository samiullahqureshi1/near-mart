import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineChat } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Header from "../../Layout/Header";
import FooterWithNewsletter from "../../Layout/Footer";

const categories = [
  "Track Order",
  "Reset Password",
  "Payment Option",
  "User & Account",
  "Website & Company",
  "Shipping & Refund",
  "Shopping Cart & Wallet",
  "Sell on EStore",
];

const popularTopics = [
  "How do I return my item?",
  "How do I track my order?",
  "How do I change my email or password?",
  "What are the Delivery Timelines?",
  "What is Your Return/Cancellation Policy?",
  "How do You Handle CoD Orders in My Campaign?",
  "How to cancel a Cancel Order",
  "How to report a Bug or Issue",
  "How do I get added to the Vendor Community?"
];
const helpOptions = [
  { title: "Track Order", icon: <FiPhoneCall /> },
  { title: "Reset Password", icon: <MdOutlineChat /> },
  { title: "Payment Option", icon: <FaArrowRight /> },
  { title: "User & Account", icon: <FaArrowRight /> },
  { title: "Wishlist & Compare", icon: <FaArrowRight /> },
  { title: "Shipping & Billing", icon: <FaArrowRight /> },
  { title: "Shopping Cart & Wallet", icon: <FaArrowRight /> },
  { title: "Sell on EStore", icon: <FaArrowRight /> },
];


const SupportPage = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <>
    <Header/>
    <div className="bg-white">
      {/* Hero Section */}
<div className="bg-white py-14 px-6 border-b border-[#e5e5e5]">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
    
    {/* LEFT TEXT + SEARCH BOX */}
    <div className="space-y-4">
      <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
        HELP CENTER
      </span>
      <h1 className="text-3xl font-bold text-gray-800 leading-snug">
        How we can help you!
      </h1>

       <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your question or keyword"
          className="w-full border border-gray-300 rounded px-4 py-2 pr-24 text-sm"
        />
        <button className="absolute right-1 top-1 bottom-1 bg-orange-500 text-white px-4 rounded text-sm font-semibold">
          SEARCH
        </button>
      </div>
    </div>

    {/* RIGHT AGENT IMAGE */}
    <div className="flex justify-center items-center relative">
      <div className="w-full max-w-xs bg-orange-50 rounded-xl overflow-hidden p-4 shadow-md">
        <img
          src="/OIP.jpeg" // use proper path if dynamic
          alt="Support Agent"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
    </div>
  </div>
</div>



      {/* Category Cards */}
<div className="max-w-6xl mx-auto py-12 px-4 text-center border-b border-[#e5e5e5]">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        What can we assist you with today?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-700">
        {helpOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded border transition cursor-pointer
              ${
                activeIndex === index
                  ? "border-orange-500 bg-orange-50"
                  : "border-orange-200"
              } hover:border-orange-500`}
          >
            <div className="text-orange-500 text-xl">{item.icon}</div>
            <div className="text-[13px] font-medium">{item.title}</div>
          </div>
        ))}
      </div>
    </div>

      {/* Popular Topics */}
   {/* Popular Topics Section */}
<div className="bg-white py-10 px-4 border-b border-[#e5e5e5]">
  <div className="max-w-6xl mx-auto">
    <h3 className="text-center text-lg md:text-xl font-semibold mb-6">
      Popular Topics
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-5 md:gap-x-10 text-sm text-gray-900">
      {popularTopics.map((topic, index) => (
        <p key={index} className="flex items-start gap-2">
          <span className="text-orange-500 text-lg leading-[1] pt-1">•</span>
          <span className="hover:text-orange-500 cursor-pointer">{topic}</span>
        </p>
      ))}
    </div>
  </div>
</div>

{/* Contact Us CTA Section */}
<div className="bg-[#f2f4f7] py-14 px-4 border-b border-[#e5e5e5]">
  <div className="max-w-6xl mx-auto text-center">
    <button className="text-xs bg-blue-500 text-white font-semibold px-4 py-1 rounded mb-2">
      CONTACT US
    </button>
    <h2 className="text-xl md:text-2xl font-semibold mb-6">
      Don’t find your answer. Contact with us
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Call Card */}
      <div className="bg-white shadow-sm border rounded-lg p-6 text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <FiPhoneCall size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">Call us now</p>
            <p className="text-xs text-gray-500">Available 9:00 AM – 5:00 PM (GMT+5:45)</p>
          </div>
        </div>
        <p className="text-lg font-semibold text-black mb-4">
          +1-202-555-0128
        </p>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
          CALL NOW <FaArrowRight size={12} />
        </button>
      </div>

      {/* Chat Card */}
      <div className="bg-white shadow-sm border rounded-lg p-6 text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <MdOutlineChat size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">Chat with us</p>
            <p className="text-xs text-gray-500">Available 9:00 AM – 5:00 PM (GMT+5:45)</p>
          </div>
        </div>
        <p className="text-lg font-semibold text-black mb-4">
          Support@clicon.com
        </p>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">
          CONTACT US <FaArrowRight size={12} />
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
    <FooterWithNewsletter/>
    </>
  );
};

export default SupportPage;
