// import React, { useState } from "react";
// import styles from "../../styles/styles";
// import { Country, State } from "country-state-city";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";

// const Checkout = () => {
//   const { user } = useSelector((state) => state.user);
//   const { cart } = useSelector((state) => state.cart);
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [userInfo, setUserInfo] = useState(false);
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [zipCode, setZipCode] = useState(null);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponCodeData, setCouponCodeData] = useState(null);
//   const [discountPrice, setDiscountPrice] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

  // const paymentSubmit = () => {
  //  if(address1 === "" || address2 === "" || zipCode === null || country === "" || city === ""){
  //     toast.error("Please choose your delivery address!")
  //  } else{
  //   const shippingAddress = {
  //     address1,
  //     address2,
  //     zipCode,
  //     country,
  //     city,
  //   };

  //   const orderData = {
  //     cart,
  //     totalPrice,
  //     subTotalPrice,
  //     shipping,
  //     discountPrice,
  //     shippingAddress,
  //     user,
  //   }

  //   // update local storage with the updated orders array
  //   localStorage.setItem("latestOrder", JSON.stringify(orderData));
  //   navigate("/payment");
  //  }
  // };

//   const subTotalPrice = cart.reduce(
//     (acc, item) => acc + item.qty * item.discountPrice,
//     0
//   );

//   // this is shipping cost variable
//   const shipping = subTotalPrice * 0.1;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = couponCode;

//     await axios.get(`http://localhost:9000/api/v2/coupon/get-coupon-value/${name}`).then((res) => {
//       const shopId = res.data.couponCode?.shopId;
//       const couponCodeValue = res.data.couponCode?.value;
//       if (res.data.couponCode !== null) {
//         const isCouponValid =
//           cart && cart.filter((item) => item.shopId === shopId);

//         if (isCouponValid.length === 0) {
//           toast.error("Coupon code is not valid for this shop");
//           setCouponCode("");
//         } else {
//           const eligiblePrice = isCouponValid.reduce(
//             (acc, item) => acc + item.qty * item.discountPrice,
//             0
//           );
//           const discountPrice = (eligiblePrice * couponCodeValue) / 100;
//           setDiscountPrice(discountPrice);
//           setCouponCodeData(res.data.couponCode);
//           setCouponCode("");
//         }
//       }
//       if (res.data.couponCode === null) {
//         toast.error("Coupon code doesn't exists!");
//         setCouponCode("");
//       }
//     });
//   };

//   const discountPercentenge = couponCodeData ? discountPrice : "";

//   const totalPrice = couponCodeData
//     ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
//     : (subTotalPrice + shipping).toFixed(2);

//   console.log(discountPercentenge);

//   return (
//     <div className="w-full flex flex-col items-center py-8">
//       <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
//         <div className="w-full 800px:w-[65%]">
//           <ShippingInfo
//             user={user}
//             country={country}
//             setCountry={setCountry}
//             city={city}
//             setCity={setCity}
//             userInfo={userInfo}
//             setUserInfo={setUserInfo}
//             address1={address1}
//             setAddress1={setAddress1}
//             address2={address2}
//             setAddress2={setAddress2}
//             zipCode={zipCode}
//             setZipCode={setZipCode}
//           />
//         </div>
//         <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
//           <CartData
//             handleSubmit={handleSubmit}
//             totalPrice={totalPrice}
//             shipping={shipping}
//             subTotalPrice={subTotalPrice}
//             couponCode={couponCode}
//             setCouponCode={setCouponCode}
//             discountPercentenge={discountPercentenge}
//           />
//         </div>
//       </div>
//       <div
//         className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
//         onClick={paymentSubmit}
//       >
//         <h5 className="text-white">Go to Payment</h5>
//       </div>
//     </div>
//   );
// };

// const ShippingInfo = ({
//   user,
//   country,
//   setCountry,
//   city,
//   setCity,
//   userInfo,
//   setUserInfo,
//   address1,
//   setAddress1,
//   address2,
//   setAddress2,
//   zipCode,
//   setZipCode,
// }) => {
//   return (
//     <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
//       <h5 className="text-[18px] font-[500]">Shipping Address</h5>
//       <br />
//       <form>
//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">Full Name</label>
//             <input
//               type="text"
//               value={user && user.name}
//               required
//               className={`${styles.input} !w-[95%]`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">Email Address</label>
//             <input
//               type="email"
//               value={user && user.email}
//               required
//               className={`${styles.input}`}
//             />
//           </div>
//         </div>

//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">Phone Number</label>
//             <input
//               type="number"
//               required
//               value={user && user.phoneNumber}
//               className={`${styles.input} !w-[95%]`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">Zip Code</label>
//             <input
//               type="number"
//               value={zipCode}
//               onChange={(e) => setZipCode(e.target.value)}
//               required
//               className={`${styles.input}`}
//             />
//           </div>
//         </div>

//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">Country</label>
//             <select
//               className="w-[95%] border h-[40px] rounded-[5px]"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//             >
//               <option className="block pb-2" value="">
//                 Choose your country
//               </option>
//               {Country &&
//                 Country.getAllCountries().map((item) => (
//                   <option key={item.isoCode} value={item.isoCode}>
//                     {item.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">City</label>
//             <select
//               className="w-[95%] border h-[40px] rounded-[5px]"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             >
//               <option className="block pb-2" value="">
//                 Choose your City
//               </option>
//               {State &&
//                 State.getStatesOfCountry(country).map((item) => (
//                   <option key={item.isoCode} value={item.isoCode}>
//                     {item.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         <div className="w-full flex pb-3">
//           <div className="w-[50%]">
//             <label className="block pb-2">Address1</label>
//             <input
//               type="address"
//               required
//               value={address1}
//               onChange={(e) => setAddress1(e.target.value)}
//               className={`${styles.input} !w-[95%]`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className="block pb-2">Address2</label>
//             <input
//               type="address"
//               value={address2}
//               onChange={(e) => setAddress2(e.target.value)}
//               required
//               className={`${styles.input}`}
//             />
//           </div>
//         </div>

//         <div></div>
//       </form>
//       <h5
//         className="text-[18px] cursor-pointer inline-block"
//         onClick={() => setUserInfo(!userInfo)}
//       >
//         Choose From saved address
//       </h5>
//       {userInfo && (
//         <div>
//           {user &&
//             user.addresses.map((item, index) => (
//               <div className="w-full flex mt-1">
//                 <input
//                   type="checkbox"
//                   className="mr-3"
//                   value={item.addressType}
//                   onClick={() =>
//                     setAddress1(item.address1) ||
//                     setAddress2(item.address2) ||
//                     setZipCode(item.zipCode) ||
//                     setCountry(item.country) ||
//                     setCity(item.city)
//                   }
//                 />
//                 <h2>{item.addressType}</h2>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const CartData = ({
//   handleSubmit,
//   totalPrice,
//   shipping,
//   subTotalPrice,
//   couponCode,
//   setCouponCode,
//   discountPercentenge,
// }) => {
//   return (
//     <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
//         <h5 className="text-[18px] font-[600]">Rs.{subTotalPrice}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
//         <h5 className="text-[18px] font-[600]">Rs.{shipping.toFixed(2)}</h5>
//       </div>
//       <br />
//       <div className="flex justify-between border-b pb-3">
//         <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
//         <h5 className="text-[18px] font-[600]">
//           - {discountPercentenge ? "Rs." + discountPercentenge.toString() : null}
//         </h5>
//       </div>
//       <h5 className="text-[18px] font-[600] text-end pt-3">Rs.{totalPrice}</h5>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className={`${styles.input} h-[40px] pl-2`}
//           placeholder="Coupoun code"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           required
//         />
//         <input
//           className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
//           required
//           value="Apply code"
//           type="submit"
//         />
//       </form>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [shipping] = useState(0); // Free shipping

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const tax = Number((subTotalPrice * 0.18).toFixed(2));
  const totalPrice = (subTotalPrice - discount + tax).toFixed(2);

  const applyCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${server}/coupon/get-coupon-value/${coupon}`);
      if (res.data?.couponCode?.value) {
        const couponValue = res.data.couponCode.value;
        const eligiblePrice = cart.reduce(
          (acc, item) => acc + item.qty * item.discountPrice,
          0
        );
        const discountAmount = (eligiblePrice * couponValue) / 100;
        setDiscount(discountAmount.toFixed(2));
        toast.success("Coupon applied");
      } else {
        toast.error("Invalid coupon");
        setDiscount(0);
      }
    } catch {
      toast.error("Error applying coupon");
    }
  };

  const paymentSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !address ||
      !zip ||
      !country ||
      !region ||
      !city ||
      !email ||
      !phone
    ) {
      toast.error("Please complete all required billing fields!");
      return;
    }

    const shippingAddress = {
      firstName,
      lastName,
      company,
      address,
      zip,
      country,
      region,
      city,
      email,
      phone,
    };

    const orderData = {
      cart,
      user,
      shipping,
      shippingAddress,
      discountPrice: discount,
      subTotalPrice,
      totalPrice,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Billing Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm mb-1 block">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1 block">
              Company Name <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1 block">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm mb-1 block">Country</label>
              <select
                className="w-full border rounded px-2 py-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Select...</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm mb-1 block">Region/State</label>
              <select
                className="w-full border rounded px-2 py-2"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option>Select...</option>
                {State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm mb-1 block">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Zip Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm">Ship into different address</span>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-14 h-14 object-contain border"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.qty} × ${item.discountPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sub-total</span>
              <span>${subTotalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-500">- ${discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          <form onSubmit={applyCoupon} className="mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
            >
              Apply Coupon
            </button>
          </form>

          <button
            onClick={paymentSubmit}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-medium"
          >
            PLACE ORDER →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
