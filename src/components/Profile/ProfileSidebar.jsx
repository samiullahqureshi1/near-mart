// import React from "react";
// import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
// import {
//   MdOutlineAdminPanelSettings,
//   MdOutlinePassword,
//   MdOutlineTrackChanges,
// } from "react-icons/md";
// import { TbAddressBook } from "react-icons/tb";
// import { RxPerson } from "react-icons/rx";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

// const ProfileSidebar = ({ setActive, active }) => {
//   const navigate = useNavigate();
//  const {user} = useSelector((state) => state.user);
//   const logoutHandler = () => {
//     axios
//       .get(`http://localhost:9000/api/v2/user/logout`, { withCredentials: true })
//       .then((res) => {
//         toast.success(res.data.message);
//         window.location.reload(true);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error.response.data.message);
//       });
//   };
//   return (
//     <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(1)}
//       >
//         <RxPerson size={20} color={active === 1 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 1 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Profile
//         </span>
//       </div>
//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(2)}
//       >
//         <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 2 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Orders
//         </span>
//       </div>
//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(3)}
//       >
//         <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 3 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Refunds
//         </span>
//       </div>

//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(4) || navigate("/inbox")}
//       >
//         <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 4 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Inbox
//         </span>
//       </div>

//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(5)}
//       >
//         <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 5 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Track Order
//         </span>
//       </div>

//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(6)}
//       >
//         <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 6 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Change Password
//         </span>
//       </div>

//       <div
//         className="flex items-center cursor-pointer w-full mb-8"
//         onClick={() => setActive(7)}
//       >
//         <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 7 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Address
//         </span>
//       </div>

//       {user && user?.role === "Admin" && (
//         <Link to="/admin/dashboard">
//           <div
//             className="flex items-center cursor-pointer w-full mb-8"
//             onClick={() => setActive(8)}
//           >
//             <MdOutlineAdminPanelSettings
//               size={20}
//               color={active === 7 ? "red" : ""}
//             />
//             <span
//               className={`pl-3 ${
//                 active === 8 ? "text-[red]" : ""
//               } 800px:block hidden`}
//             >
//               Admin Dashboard
//             </span>
//           </div>
//         </Link>
//       )}
//       <div
//         className="single_item flex items-center cursor-pointer w-full mb-8"
//         onClick={logoutHandler}
//       >
//         <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
//         <span
//           className={`pl-3 ${
//             active === 8 ? "text-[red]" : ""
//           } 800px:block hidden`}
//         >
//           Log out
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ProfileSidebar;
import React from "react";
import {
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  HiOutlineReceiptRefund,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get("http://localhost:9000/api/v2/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const menuItems = [
    { id: 1, label: "Dashboard", icon: <RxPerson size={20} /> },
    { id: 2, label: "Order History", icon: <HiOutlineShoppingBag size={20} /> },
    { id: 3, label: "Track Order", icon: <MdOutlineTrackChanges size={20} /> },
    { id: 4, label: "Shopping Cart", icon: <HiOutlineReceiptRefund size={20} /> },
    { id: 5, label: "Wishlist", icon: <AiOutlineMessage size={20} /> },
    // { id: 6, label: "Change Password", icon: <RiLockPasswordLine size={20} /> },
    // { id: 7, label: "Cards & Address", icon: <TbAddressBook size={20} /> },
    // { id: 8, label: "Browsing History", icon: <MdOutlineAdminPanelSettings size={20} /> },
    { id: 9, label: "Setting", icon: <RiLockPasswordLine size={20} /> },
  ];

  return (
    <div className="w-full bg-white rounded shadow-md overflow-hidden">
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 ${
            active === item.id
              ? "bg-orange-500 text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="min-w-[20px]">{item.icon}</div>
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}

      {/* Logout */}
      <div
        onClick={logoutHandler}
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-50`}
      >
        <AiOutlineLogin size={20} />
        <span className="text-sm font-medium">Log-out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
