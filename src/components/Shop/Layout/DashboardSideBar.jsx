import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineLogin,
} from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { id: 1, label: "Dashboard", to: "/dashboard", Icon: RxDashboard },
  { id: 2, label: "Orders", to: "/dashboard-orders", Icon: FiShoppingBag },
  { id: 3, label: "Products", to: "/dashboard-products", Icon: FiPackage },
  { id: 4, label: "Create product", to: "/dashboard-create-product", Icon: AiOutlineFolderAdd },
  { id: 5, label: "Settings", to: "/settings", Icon: CiSettings },
];

const DashboardSideBar = ({ onLogout }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(1);

  useEffect(() => {
    const current =
      menuItems.find((m) =>
        pathname === "/"
          ? m.to === "/"
          : pathname.startsWith(m.to)
      )?.id ?? 1;
    setActive(current);
  }, [pathname]);

  const baseItemCls =
    "px-4 py-3 cursor-pointer transition-all duration-150";

  return (
    <aside className="w-full sm:w-72 h-[90vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10">
      <div className="w-full bg-white rounded overflow-hidden">
        {/* Full menu for larger screens */}
        <div className="hidden sm:block">
          {menuItems.map(({ id, label, to, Icon }) => (
          <Link
            to={to}
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-3 ${baseItemCls} ${
              active === id
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium">{label}</span>
          </Link>
          ))}
        </div>

        {/* Only icons for smaller screens */}
        <div className="sm:hidden">
          {menuItems.map(({ id, to, Icon }) => (
            <Link
              to={to}
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center justify-center ${baseItemCls} ${
                active === id
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>

        {/* Logout (mobile) */}
        {/* <button
          onClick={onLogout}
          className="sm:hidden flex items-center justify-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-50 w-full"
        >
          <AiOutlineLogin size={20} />
        </button> */}

        {/* Logout (desktop) */}
        {/* <button
          onClick={onLogout}
          className="hidden sm:flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-50 w-full"
        >
          <AiOutlineLogin size={20} />
          <span className="text-sm font-medium">Log-out</span>
        </button> */}
      </div>
    </aside>
  );
};

export default DashboardSideBar;
