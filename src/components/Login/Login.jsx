import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../Layout/Header";
import FooterWithNewsletter from "../Layout/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  // Shared states
  const [visible, setVisible] = useState(false);

  // Login states
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // Sign Up states
  const [nameSignup, setNameSignup] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "https://near-backend.vercel.app/api/v2/user/login-user",
      {
        email: emailLogin,
        password: passwordLogin,
      }
    );

    // ✅ Save token to localStorage
    localStorage.setItem("token", res.data.token);

    toast.success("Login Success!");

    const role = res.data.user?.role;
    if (role === "Seller") navigate("/dashboard");
    else navigate("/");

    // Optional: refresh if needed
    window.location.reload(true);
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
  }
};


  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://near-backend.vercel.app/api/v2/user/create-user", {
      name: nameSignup,
      email: emailSignup,
      password: passwordSignup,
    });

    toast.success("Account created successfully!");

    // ✅ Automatically switch to login tab
    setActiveTab("login");

    // ✅ Pre-fill login email
    setEmailLogin(emailSignup);
    setPasswordLogin(passwordSignup);

    // ✅ Clear signup fields
    setNameSignup("");
    setEmailSignup("");
    setPasswordSignup("");
  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <div className="bg-white w-full max-w-md border border-gray-200 shadow-xl rounded-md">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`w-1/2 text-center py-3 text-sm font-semibold ${
                activeTab === "login"
                  ? "text-black border-b-2 border-orange-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              className={`w-1/2 text-center py-3 text-sm font-semibold ${
                activeTab === "signup"
                  ? "text-black border-b-2 border-orange-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="px-6 pt-6 pb-4">
              <div className="mb-4">
                <label className="text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    required
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:outline-none"
                  />
                  <div
                    className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                  </div>
                  <a
                    href="/forgot-password"
                    className="absolute right-0  -bottom-5 text-xs text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-semibold transition"
              >
                SIGN IN →
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="px-6 pt-6 pb-4">
              <div className="mb-4">
                <label className="text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  value={nameSignup}
                  onChange={(e) => setNameSignup(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={emailSignup}
                  onChange={(e) => setEmailSignup(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-700">Password</label>
                <input
                  type={visible ? "text" : "password"}
                  value={passwordSignup}
                  onChange={(e) => setPasswordSignup(e.target.value)}
                  required
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-semibold transition"
              >
                SIGN UP →
              </button>
            </form>
          )}

          {/* Divider */}
          {/* <div className="flex items-center my-4 px-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div> */}

          {/* Social Logins */}
          {/* <div className="px-6 pb-6">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 mb-2 text-sm font-medium hover:bg-gray-100 transition">
              <FcGoogle className="mr-2" size={20} />
              Login with Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 text-sm font-medium hover:bg-gray-100 transition">
              <FaApple className="mr-2" size={20} />
              Login with Apple
            </button>
          </div> */}
        </div>
      </div>
      <FooterWithNewsletter />
    </>
  );
};

export default Auth;
