// import React from "react";
// import {
//   AiFillFacebook,
//   AiFillInstagram,
//   AiFillYoutube,
//   AiOutlineTwitter,
// } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import {
//   footercompanyLinks,
//   footerProductLinks,
//   footerSupportLinks,
// } from "../../static/data";
// import logo from '../../Assests/artify.png'

// const Footer = () => {
//   return (
//     <div className="bg-[#000] text-white">
//       <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#201f2a] py-7">
//         <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
//           <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
//           <br />
//           events and offers
//         </h1>
//         <div>
//           <input
//             type="text"
//             required
//             placeholder="Enter your email..."
//             className="text-gray-800
//                 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
//           />
//           <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
//             Submit
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
//         <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
//           <img
//             src={logo}
//             alt=""
//             className="w-[100px] 800px:w-[113px]"
//             style={{ filter: "brightness(0) invert(1)" }}
//           />
//           <br />
//           <p>The home and elements needeed to create beatiful products.</p>
//           <div className="flex items-center mt-[15px]">
//             <AiFillFacebook size={25} className="cursor-pointer" />
//             <AiOutlineTwitter
//               size={25}
//               style={{ marginLeft: "15px", cursor: "pointer" }}
//             />
//             <AiFillInstagram
//               size={25}
//               style={{ marginLeft: "15px", cursor: "pointer" }}
//             />
//             <AiFillYoutube
//               size={25}
//               style={{ marginLeft: "15px", cursor: "pointer" }}
//             />
//           </div>
//         </ul>

//         <ul className="text-center sm:text-start">
//           <h1 className="mb-1 font-semibold">Company</h1>
//           {footerProductLinks.map((link,index) => (
//             <li key={index}>
//               <Link
//                 className="text-gray-400 hover:text-teal-400 duration-300
//                    text-sm cursor-pointer leading-6"
//                 to={link.link}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <ul className="text-center sm:text-start">
//           <h1 className="mb-1 font-semibold">Shop</h1>
//           {footercompanyLinks.map((link,index) => (
//             <li key={index}>
//               <Link
//                 className="text-gray-400 hover:text-teal-400 duration-300
//                    text-sm cursor-pointer leading-6"
//                 to={link.link}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <ul className="text-center sm:text-start">
//           <h1 className="mb-1 font-semibold">Support</h1>
//           {footerSupportLinks.map((link,index) => (
//             <li key={index}>
//               <Link
//                 className="text-gray-400 hover:text-teal-400 duration-300
//                    text-sm cursor-pointer leading-6"
//                 to={link.link}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
//          text-center pt-2 text-gray-400 text-sm pb-8"
//       >
//         <span>© 2024 Artify. All rights reserved.</span>
//         <span>Terms · Privacy Policy</span>
//         <div className="sm:block flex items-center justify-center w-full">
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router-dom";
import { AiFillTwitterCircle, AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { FaCcVisa, FaCcPaypal, FaCcApplePay, FaCcAmex, FaCcMastercard } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black px-4 md:px-12 lg:px-24 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-sm">
        {/* About */}
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="#">About us</Link></li>
            <li><Link to="#">Press</Link></li>
            <li><Link to="#">Our impact</Link></li>
            <li><Link to="#">Accessibility</Link></li>
            <li><Link to="#">We're hiring!</Link></li>
            <li><Link to="#">Trustpilot</Link></li>
            <li className="flex gap-3 mt-2 text-xl">
              <AiFillTwitterCircle />
              <AiFillLinkedin />
              <AiOutlineInstagram />
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-2">Help</h3>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="#">Contact us</Link></li>
            <li><Link to="#">Help Center</Link></li>
            <li><Link to="#">Shipping</Link></li>
            <li><Link to="#">Returns and refunds</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-2">Services</h3>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="#">1-year warranty</Link></li>
            <li><Link to="#">Protection plan</Link></li>
            <li><Link to="#">Trade-in</Link></li>
            <li><Link to="#">Student offer</Link></li>
            <li><Link to="#">Military program</Link></li>
            <li><Link to="#">Sellers: Register</Link></li>
            <li><Link to="#">Back Market for Business</Link></li>
            <li className="mt-2 text-[13px] font-medium text-gray-800">Payments 100% secured</li>
            <div className="flex gap-2 mt-1 text-2xl">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcPaypal />
              <FaCcApplePay />
              <FaCcAmex />
            </div>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="#">Tech Journal</Link></li>
            <li><Link to="#">Compare devices</Link></li>
            <li><Link to="#">Gift ideas</Link></li>
          </ul>
        </div>

        {/* Law and Order */}
        <div>
          <h3 className="font-semibold mb-2">Law and order</h3>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="#">Terms of service</Link></li>
            <li><Link to="#">Trade-in Terms</Link></li>
            <li><Link to="#">Cookies</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Don’t sell personal info</Link></li>
            <li><Link to="#">Report illicit content</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 text-sm text-gray-500">
        <span>© 2025 Near Market</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          {/* <img src="/icons/google-play.png" alt="Google Play" className="h-10" />
          <img src="/icons/app-store.png" alt="App Store" className="h-10" /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
