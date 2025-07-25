import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineLogin } from "react-icons/ai";

const menuItems = [
  { id: 1, label: "Dashboard", to: "/dashboard", Icon: RxDashboard },
  { id: 2, label: "Orders", to: "/dashboard-orders", Icon: FiShoppingBag },
  { id: 3, label: "Products", to: "/dashboard-products", Icon: FiPackage },
  { id: 4, label: "Create product", to: "/dashboard-create-product", Icon: AiOutlineFolderAdd },
  { id: 5, label: "Logout", to: null, Icon: AiOutlineLogin, isLogout: true },
];

const DashboardSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  // ✅ Set active tab based on current route
  useEffect(() => {
    const matched = menuItems.find(({ to }) => to && pathname === to);
    setActive(matched?.id || 1);
  }, [pathname]);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token"); // clear frontend token
      await axios.get("https://near-backend.vercel.app/api/v2/user/logout"); // backend logout
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  const baseItemCls = "px-4 py-3 cursor-pointer transition-all duration-150";

  return (
    <aside className="w-full sm:w-72 h-[90vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10">
      <div className="w-full bg-white rounded overflow-hidden">
        {/* Desktop Menu */}
        <div className="hidden sm:block">
          {menuItems.map(({ id, label, to, Icon, isLogout }) => {
            const isActive = active === id;
            const classes = `flex items-center gap-3 ${baseItemCls} ${
              isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-50"
            }`;

            return isLogout ? (
              <button key={id} onClick={handleLogout} className={classes}>
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ) : (
              <Link to={to} key={id} className={classes}>
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Icons Only */}
        <div className="sm:hidden">
          {menuItems.map(({ id, to, Icon, isLogout }) => {
            const isActive = active === id;
            const iconClass = `flex items-center justify-center ${baseItemCls} ${
              isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-50"
            }`;

            return isLogout ? (
              <button key={id} onClick={handleLogout} className={iconClass}>
                <Icon size={20} />
              </button>
            ) : (
              <Link to={to} key={id} className={iconClass}>
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
