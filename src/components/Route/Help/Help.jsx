import React, { useState } from "react";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import Header from "../../Layout/Header";
import FooterWithNewsletter from "../../Layout/Footer";

const faqs = [
  {
    question: "Suspendisse ultrices pharetra libero sed interdum.",
    answer: "Answer for question 1 goes here.",
  },
  {
    question: "Fusce molestie condimentum facilisis.",
    answer:
      "Nulla malesuada iaculis nisi, vitae sagittis lacus laoreet in. Morbi aliquet pulvinar orci non vulputate...",
  },
  {
    question: "Quisque quis nunc quis urna tempor lobortis vel non orci.",
    answer: "Answer for question 3 goes here.",
  },
  {
    question: "Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus.",
    answer: "Answer for question 4 goes here.",
  },
  {
    question: "Nulla sed sapien maximus, faucibus massa vitae.",
    answer: "Answer for question 5 goes here.",
  },
];

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Highlight second FAQ by default

  return (
    <>
    <Header/>
    <div className="bg-white py-14 px-4 md:px-10 border-b border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* FAQs */}
        <div className="md:col-span-2">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border mb-4 rounded overflow-hidden transition-all duration-300 ${
                activeIndex === idx ? "shadow-lg" : ""
              }`}
            >
              <div
                onClick={() => setActiveIndex(idx === activeIndex ? -1 : idx)}
                className={`flex justify-between items-center px-4 py-3 cursor-pointer text-sm font-medium ${
                  activeIndex === idx
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                {faq.question}
                <span>{activeIndex === idx ? <FaMinus /> : <FaPlus />}</span>
              </div>

              {activeIndex === idx && (
                <div className="bg-white text-sm text-gray-700 px-6 py-4 border-t">
                  <p className="mb-3">{faq.answer}</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                    <li>Vivamus sed est non arcu porta aliquet.</li>
                    <li>Integer et lacus vitae justo fermentum rutrum.</li>
                    <li>Proin blandit nunc risus, at semper turpis.</li>
                    <li>Quisque ut dolor erat.</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ask Support Form */}
        <div className="bg-yellow-100 p-6 rounded shadow-sm h-fit">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Don’t find your answer? Ask for support.
          </h4>
          <p className="text-xs text-gray-600 mb-4">
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed molestie accumsan dui...
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <textarea
              rows="3"
              placeholder="Message (Optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded hover:bg-orange-600 w-full"
            >
              SEND MESSAGE <FaArrowRight size={12} />
            </button>
          </form>
        </div>
      </div>
    </div>
    <FooterWithNewsletter/>
    </>
  );
};

export default HelpCenter;
