// import React from "react";
// import { AiOutlineGift } from "react-icons/ai";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import logo from '../../../Assests/nearmart.png'
// const DashboardHeader = () => {
//   const { seller } = useSelector((state) => state.seller);
//   return (
//     <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
//       <div>
//         <Link to="/dashboard">
//         <img
//          src={logo}
//          alt=""
//          className="w-[100px] 800px:w-[113px]"
//               />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center mr-4">
//           {/* <Link to="/dashboard/cupouns" className="800px:block hidden">
//             <AiOutlineGift
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-events" className="800px:block hidden">
//             <MdOutlineLocalOffer
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link> */}
//           <Link to="/dashboard-products" className="800px:block hidden">
//             <FiShoppingBag
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-orders" className="800px:block hidden">
//             <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           {/* <Link to="/dashboard-messages" className="800px:block hidden">
//             <BiMessageSquareDetail
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link> */}
//           <Link to={`/shop/${seller._id}`}>
//             <img
//               src={`${seller.avatar?.url}`}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;
import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../Assests/nearmart.png";
import { FaReact } from "react-icons/fa";

const DashboardHeader = () => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  return (
        <div className="bg-[#175f89] py-4 px-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 relative">
     <Link to="/dashboard" className="flex items-center gap-2 shrink-0 text-white">
                <div className="bg-white rounded-full p-1">
                  <FaReact size={28} color="#175f89" />
                </div>
                <span className="text-2xl font-bold tracking-wide">NEARTMAT</span>
              </Link>
      {/* <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          {user && (
            <Link to={`/shop/${user._id}`}>
              <img
                src={user.avatar?.url}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default DashboardHeader;
