import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:9000/forgot-password`, { email });
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8">
        <h2 className="text-center text-lg font-semibold text-gray-900 mb-2">
          Forget Password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter the email address or mobile phone number associated with your
          Clicon account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200 flex items-center justify-center gap-1"
          >
            SEND CODE <span className="text-xl">→</span>
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <p className="text-gray-600">
            Already have account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
          <p className="text-gray-600 mt-1">
            Don’t have account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        <hr className="my-6" />

        <p className="text-xs text-center text-gray-500">
          You may contact{" "}
          <a href="/support" className="text-orange-500 hover:underline">
            Customer Service
          </a>{" "}
          for help restoring access to your account.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
