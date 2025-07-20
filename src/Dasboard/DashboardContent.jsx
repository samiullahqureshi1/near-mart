import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";

const DashboardContent = ({ user, orders }) => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "Delivered").length;
  const pendingOrders = orders.filter((o) => o.status === "Processing").length;

  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-[22px] font-semibold mb-3">Hello, {user?.name}</h2>
      <p className="text-sm text-gray-500 mb-6">
        From your account dashboard, you can easily check & view your{" "}
        <Link to="/profile" className="text-blue-500 underline">Recent Orders</Link>, manage your{" "}
        <Link to="/profile" className="text-blue-500 underline">Shipping and Billing Addresses</Link>{" "}
        and edit your <Link to="/profile" className="text-blue-500 underline">Password</Link> and{" "}
        <Link to="/profile" className="text-blue-500 underline">Account Details</Link>.
      </p>

      {/* Account Info & Billing Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-md p-4 shadow-sm">
          <h4 className="font-semibold mb-3">ACCOUNT INFO</h4>
          <div className="flex items-center gap-4 mb-2">
            <img src={user?.avatar?.url} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm">{user?.address || "No address added"}</p>
            </div>
          </div>
          <p className="text-sm">Email: {user?.email}</p>
          <p className="text-sm">Phone: {user?.phoneNumber}</p>
          <button className="mt-3 px-4 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-100">
            EDIT ACCOUNT
          </button>
        </div>

        <div className="border rounded-md p-4 shadow-sm">
          <h4 className="font-semibold mb-3">BILLING ADDRESS</h4>
          <p className="text-sm mb-1">{user?.billingAddress || "No billing address set"}</p>
          <p className="text-sm">Email: {user?.email}</p>
          <button className="mt-3 px-4 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-100">
            EDIT ADDRESS
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 text-center p-4 rounded-md">
          <p className="text-2xl font-bold">{totalOrders}</p>
          <p className="text-sm">Total Orders</p>
        </div>
        <div className="bg-orange-100 text-center p-4 rounded-md">
          <p className="text-2xl font-bold">{pendingOrders}</p>
          <p className="text-sm">Pending Orders</p>
        </div>
        <div className="bg-green-100 text-center p-4 rounded-md">
          <p className="text-2xl font-bold">{completedOrders}</p>
          <p className="text-sm">Completed Orders</p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="border rounded-md p-4 shadow-sm mb-6">
        <div className="flex justify-between mb-4">
          <h4 className="font-semibold">PAYMENT OPTION</h4>
          <button className="text-sm text-orange-500 font-medium">Add Card →</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {[user?.card1, user?.card2].map((card, index) =>
            card ? (
              <div key={index} className={`w-[300px] p-4 rounded-lg text-white relative ${index === 0 ? "bg-blue-700" : "bg-green-600"}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm">${card.amount.toLocaleString()} USD</p>
                    <p className="text-xs mt-1">CARD NUMBER</p>
                    <p className="text-sm font-bold tracking-widest mt-1">**** **** **** {card.last4}</p>
                    <p className="text-xs mt-2">Visa / {user?.name}</p>
                  </div>
                  <div className="absolute top-2 right-3 cursor-pointer">
                    <FiMoreVertical />
                    {/* Add dropdown on hover later if needed */}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="border rounded-md shadow-sm">
        <div className="flex justify-between p-4 border-b">
          <h4 className="font-semibold">RECENT ORDER</h4>
          <Link to="/profile" className="text-orange-500 text-sm font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">ORDER ID</th>
                <th className="text-left py-3 px-4">STATUS</th>
                <th className="text-left py-3 px-4">DATE</th>
                <th className="text-left py-3 px-4">TOTAL</th>
                <th className="text-left py-3 px-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-red-500">{order.status}</td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">${order.totalPrice} ({order.cart.length} Products)</td>
                  <td className="py-3 px-4">
                    <Link to={`/user/order/${order._id}`} className="text-blue-500 hover:underline">
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-gray-500 py-6">No recent orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
