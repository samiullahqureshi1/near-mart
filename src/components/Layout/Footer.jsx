import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const FooterWithNewsletter = () => {
  return (
    <footer className="text-white">
      {/* Newsletter Section */}
      <div className="bg-[#21669a] py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Subscribe to our newsletter</h2>
        <p className="max-w-xl mx-auto text-sm text-gray-200">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. 
          Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="flex w-full max-w-md rounded overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 text-black outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6">
              SUBSCRIBE →
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-8 opacity-80 flex-wrap">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Philips_logo_new.svg" alt="Philips" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Toshiba_logo.svg" alt="Toshiba" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" className="h-5" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-[#1a1a1a] py-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm text-gray-300">
          {/* Logo & Info */}
          <div>
            <div className="text-orange-500 font-extrabold text-lg mb-3">NEARTMAT</div>
            <p className="text-gray-400 text-[13px] mb-1">Customer Supports:</p>
            <p className="text-white font-semibold mb-2">(629) 555-0129</p>
            <p className="text-gray-400 text-[13px] mb-1">4517 Washington Ave.</p>
            <p className="text-gray-400 text-[13px] mb-2">Manchester, Kentucky 39495</p>
            <p className="text-white text-sm">info@kinbo.com</p>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="font-semibold text-white mb-3">TOP CATEGORY</h4>
            <ul className="space-y-1 text-[13px]">
              <li>Computer & Laptop</li>
              <li>SmartPhone</li>
              <li>Headphone</li>
              <li>Accessories</li>
              <li>Camera & Photo</li>
              <li>TV & Homes</li>
              <li className="text-yellow-500 font-medium">Browse All Product →</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">QUICK LINKS</h4>
            <ul className="space-y-1 text-[13px]">
              <li>Shop Product</li>
              <li>Shopping Cart</li>
              <li>Wishlist</li>
              <li>Compare</li>
              <li>Track Order</li>
              <li>Customer Help</li>
              <li>About Us</li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold text-white mb-3">DOWNLOAD APP</h4>
            <div className="space-y-3">
              <div className="bg-[#2f2f2f] px-3 py-2 rounded flex items-center gap-2 w-max">
                <FaGooglePlay className="text-white text-xl" />
                <div className="text-[12px]">
                  <p className="text-gray-300">Get it now</p>
                  <p className="text-white font-semibold">Google Play</p>
                </div>
              </div>
              <div className="bg-[#2f2f2f] px-3 py-2 rounded flex items-center gap-2 w-max">
                <FaApple className="text-white text-xl" />
                <div className="text-[12px]">
                  <p className="text-gray-300">Get it now</p>
                  <p className="text-white font-semibold">App Store</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div>
            <h4 className="font-semibold text-white mb-3">POPULAR TAG</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Game", "iPhone", "TV", "Asus Laptops", "Macbook", "SSD",
                "Graphics Card", "Power Bank", "Smart TV", "Speaker",
                "Tablet", "Microwave", "Samsung"
              ].map((tag, index) => (
                <span key={index} className="bg-[#2f2f2f] text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-[13px] text-gray-500">
          Nearmat online store © 2025. Design by Samiullah Qureshi
        </div>
      </div>
    </footer>
  );
};

export default FooterWithNewsletter;
