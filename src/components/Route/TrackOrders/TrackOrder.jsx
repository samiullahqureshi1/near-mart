import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterWithNewsletter from '../../Layout/Footer';
import Header from '../../Layout/Header';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      alert('Please enter a valid Order ID');
      return;
    }

    // Redirect to /order/:orderId
    navigate(`/order-details/${orderId}`);
  };

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Track Order</h2>
        <p className="text-sm text-gray-600 mb-8">
          To track your order please enter your order ID in the input field below and press the "Track Order"
          button. This was given to you on your receipt and in the confirmation email you should have received.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order ID Field */}
            <div className="flex flex-col">
              <label htmlFor="orderId" className="text-sm font-medium text-gray-700 mb-1">Order ID</label>
              <input
                id="orderId"
                type="text"
                placeholder="ID..."
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <span className="text-xs text-gray-500 mt-1">Order ID that we sent to your email address.</span>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Billing Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition duration-200"
          >
            TRACK ORDER →
          </button>
        </form>
      </div>

      <FooterWithNewsletter />
    </>
  );
};

export default TrackOrder;
