// import React, { useState } from "react";
// import {
//   AiOutlineArrowRight,
//   AiOutlineCamera,
//   AiOutlineDelete,
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { server } from "../../server";
// import styles from "../../styles/styles";
// import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { MdTrackChanges } from "react-icons/md";
// import { RxCross1 } from "react-icons/rx";
// import {
//   deleteUserAddress,
//   loadUser,
//   updatUserAddress,
//   updateUserInformation,
// } from "../../redux/actions/user";
// import { Country, State } from "country-state-city";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { getAllOrdersOfUser } from "../../redux/actions/order";

// const ProfileContent = ({ active }) => {
//   const { user, error, successMessage } = useSelector((state) => state.user);
//   const [name, setName] = useState(user && user.name);
//   const [email, setEmail] = useState(user && user.email);
//   const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
//   const [password, setPassword] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch({ type: "clearErrors" });
//     }
//     if (successMessage) {
//       toast.success(successMessage);
//       dispatch({ type: "clearMessages" });
//     }
//   }, [error, successMessage]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUserInformation(name, email, phoneNumber, password));
//   };

//   const handleImage = async (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatar(reader.result);
//         axios
//           .put(
//             `https://near-backend.vercel.app/api/v2/user/update-avatar`,
//             { avatar: reader.result },
//             {
//               withCredentials: true,
//             }
//           )
//           .then((response) => {
//             dispatch(loadUser());
//             toast.success("avatar updated successfully!");
//           })
//           .catch((error) => {
//             toast.error(error);
//           });
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   return (
//     <div className="w-full">
//       {/* profile */}
//       {active === 1 && (
//         <>
//           <div className="flex justify-center w-full">
//             <div className="relative">
//               <img
//                 src={`${user?.avatar?.url}`}
//                 className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
//                 alt=""
//               />
//               <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
//                 <input
//                   type="file"
//                   id="image"
//                   className="hidden"
//                   onChange={handleImage}
//                 />
//                 <label htmlFor="image">
//                   <AiOutlineCamera />
//                 </label>
//               </div>
//             </div>
//           </div>
//           <br />
//           <br />
//           <div className="w-full px-5">
//             <form onSubmit={handleSubmit} aria-required={true}>
//               <div className="w-full 800px:flex block pb-3">
//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Full Name</label>
//                   <input
//                     type="text"
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Email Address</label>
//                   <input
//                     type="text"
//                     className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="w-full 800px:flex block pb-3">
//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Phone Number</label>
//                   <input
//                     type="number"
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                     required
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>

//                 <div className=" w-[100%] 800px:w-[50%]">
//                   <label className="block pb-2">Enter your password</label>
//                   <input
//                     type="password"
//                     className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <input
//                 className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
//                 required
//                 value="Update"
//                 type="submit"
//               />
//             </form>
//           </div>
//         </>
//       )}

//       {/* order */}
//       {active === 2 && (
//         <div>
//           <AllOrders />
//         </div>
//       )}

//       {/* Refund */}
//       {active === 3 && (
//         <div>
//           <AllRefundOrders />
//         </div>
//       )}

//       {/* Track order */}
//       {active === 5 && (
//         <div>
//           <TrackOrder />
//         </div>
//       )}

//       {/* Change Password */}
//       {active === 6 && (
//         <div>
//           <ChangePassword />
//         </div>
//       )}

//       {/*  user Address */}
//       {active === 7 && (
//         <div>
//           <Address />
//         </div>
//       )}
//     </div>
//   );
// };

// const AllOrders = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user?._id));
//   }, []);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8,
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/user/order/${params.id}`}>
//               <Button>
//                 <AiOutlineArrowRight size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   orders &&
//     orders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item.cart.length,
//         total: "Rs." + item.totalPrice,
//         status: item.status,
//       });
//     });

//   return (
//     <div className="pl-8 pt-1">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         disableSelectionOnClick
//         autoHeight
//       />
//     </div>
//   );
// };

// const AllRefundOrders = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user?._id));
//   }, []);

//   const eligibleOrders =
//     orders && orders.filter((item) => item.status === "Processing refund");

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8,
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/user/order/${params.id}`}>
//               <Button>
//                 <AiOutlineArrowRight size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   eligibleOrders &&
//     eligibleOrders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item.cart.length,
//         total: "Rs." + item.totalPrice,
//         status: item.status,
//       });
//     });

//   return (
//     <div className="pl-8 pt-1">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         autoHeight
//         disableSelectionOnClick
//       />
//     </div>
//   );
// };

// const TrackOrder = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user?._id));
//   }, []);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8,
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/user/track/order/${params.id}`}>
//               <Button>
//                 <MdTrackChanges size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   orders &&
//     orders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item.cart.length,
//         total: "Rs." + item.totalPrice,
//         status: item.status,
//       });
//     });

//   return (
//     <div className="pl-8 pt-1">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         disableSelectionOnClick
//         autoHeight
//       />
//     </div>
//   );
// };

// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const passwordChangeHandler = async (e) => {
//     e.preventDefault();

//     await axios
//       .put(
//         `https://near-backend.vercel.app/api/v2/user/update-user-password`,
//         { oldPassword, newPassword, confirmPassword },
//         { withCredentials: true }
//       )
//       .then((res) => {
//         toast.success(res.data.success);
//         setOldPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };
//   return (
//     <div className="w-full px-5">
//       <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
//         Change Password
//       </h1>
//       <div className="w-full">
//         <form
//           aria-required
//           onSubmit={passwordChangeHandler}
//           className="flex flex-col items-center"
//         >
//           <div className=" w-[100%] 800px:w-[50%] mt-5">
//             <label className="block pb-2">Enter your old password</label>
//             <input
//               type="password"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />
//           </div>
//           <div className=" w-[100%] 800px:w-[50%] mt-2">
//             <label className="block pb-2">Enter your new password</label>
//             <input
//               type="password"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//           </div>
//           <div className=" w-[100%] 800px:w-[50%] mt-2">
//             <label className="block pb-2">Enter your confirm password</label>
//             <input
//               type="password"
//               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <input
//               className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
//               required
//               value="Update"
//               type="submit"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const Address = () => {
//   const [open, setOpen] = useState(false);
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [zipCode, setZipCode] = useState();
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [addressType, setAddressType] = useState("");
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const addressTypeData = [
//     {
//       name: "Default",
//     },
//     {
//       name: "Home",
//     },
//     {
//       name: "Office",
//     },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (addressType === "" || country === "" || city === "") {
//       toast.error("Please fill all the fields!");
//     } else {
//       dispatch(
//         updatUserAddress(
//           country,
//           city,
//           address1,
//           address2,
//           zipCode,
//           addressType
//         )
//       );
//       setOpen(false);
//       setCountry("");
//       setCity("");
//       setAddress1("");
//       setAddress2("");
//       setZipCode(null);
//       setAddressType("");
//     }
//   };

//   const handleDelete = (item) => {
//     const id = item._id;
//     dispatch(deleteUserAddress(id));
//   };

//   return (
//     <div className="w-full px-5">
//       {open && (
//         <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
//           <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
//             <div className="w-full flex justify-end p-3">
//               <RxCross1
//                 size={30}
//                 className="cursor-pointer"
//                 onClick={() => setOpen(false)}
//               />
//             </div>
//             <h1 className="text-center text-[25px] font-Poppins">
//               Add New Address
//             </h1>
//             <div className="w-full">
//               <form aria-required onSubmit={handleSubmit} className="w-full">
//                 <div className="w-full block p-4">
//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Country</label>
//                     <select
//                       name=""
//                       id=""
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         choose your country
//                       </option>
//                       {Country &&
//                         Country.getAllCountries().map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.isoCode}
//                             value={item.isoCode}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Choose your City</label>
//                     <select
//                       name=""
//                       id=""
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         choose your city
//                       </option>
//                       {State &&
//                         State.getStatesOfCountry(country).map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.isoCode}
//                             value={item.isoCode}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address 1</label>
//                     <input
//                       type="address"
//                       className={`${styles.input}`}
//                       required
//                       value={address1}
//                       onChange={(e) => setAddress1(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address 2</label>
//                     <input
//                       type="address"
//                       className={`${styles.input}`}
//                       required
//                       value={address2}
//                       onChange={(e) => setAddress2(e.target.value)}
//                     />
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Zip Code</label>
//                     <input
//                       type="number"
//                       className={`${styles.input}`}
//                       required
//                       value={zipCode}
//                       onChange={(e) => setZipCode(e.target.value)}
//                     />
//                   </div>

//                   <div className="w-full pb-2">
//                     <label className="block pb-2">Address Type</label>
//                     <select
//                       name=""
//                       id=""
//                       value={addressType}
//                       onChange={(e) => setAddressType(e.target.value)}
//                       className="w-[95%] border h-[40px] rounded-[5px]"
//                     >
//                       <option value="" className="block border pb-2">
//                         Choose your Address Type
//                       </option>
//                       {addressTypeData &&
//                         addressTypeData.map((item) => (
//                           <option
//                             className="block pb-2"
//                             key={item.name}
//                             value={item.name}
//                           >
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className=" w-full pb-2">
//                     <input
//                       type="submit"
//                       className={`${styles.input} mt-5 cursor-pointer`}
//                       required
//                       readOnly
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex w-full items-center justify-between">
//         <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
//           My Addresses
//         </h1>
//         <div
//           className={`${styles.button} !rounded-md`}
//           onClick={() => setOpen(true)}
//         >
//           <span className="text-[#fff]">Add New</span>
//         </div>
//       </div>
//       <br />
//       {user &&
//         user.addresses.map((item, index) => (
//           <div
//             className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
//             key={index}
//           >
//             <div className="flex items-center">
//               <h5 className="pl-5 font-[600]">{item.addressType}</h5>
//             </div>
//             <div className="pl-8 flex items-center">
//               <h6 className="text-[12px] 800px:text-[unset]">
//                 {item.address1} {item.address2}
//               </h6>
//             </div>
//             <div className="pl-8 flex items-center">
//               <h6 className="text-[12px] 800px:text-[unset]">
//                 {user && user.phoneNumber}
//               </h6>
//             </div>
//             <div className="min-w-[10%] flex items-center justify-between pl-8">
//               <AiOutlineDelete
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => handleDelete(item)}
//               />
//             </div>
//           </div>
//         ))}

//       {user && user.addresses.length === 0 && (
//         <h5 className="text-center pt-8 text-[18px]">
//           You not have any saved address!
//         </h5>
//       )}
//     </div>
//   );
// };
// export default ProfileContent;
import React, { useState } from "react";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { removeFromWishlist } from "../../redux/actions/wishlist";

import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateFullUserInfo,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import FooterWithNewsletter from "../Layout/Footer";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);

  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `https://near-backend.vercel.app/api/v2/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
console.log(user)
  return (
    <div className="w-full">
      {/* profile */}
     {active === 1 && (
        <div className="w-full px-10 py-4">
          {/* Welcome */}
          <h2 className="text-[22px] font-semibold mb-2">
            Hello, {user?.name}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            From your account dashboard, you can easily check & view your{" "}
            <span className="text-blue-500 cursor-pointer underline">
              Recent Orders
            </span>
            , manage your{" "}
            <span className="text-blue-500 cursor-pointer underline">
              Shipping and Billing Addresses
            </span>{" "}
            and edit your{" "}
            <span className="text-blue-500 cursor-pointer underline">
              Password
            </span>{" "}
            and{" "}
            <span className="text-blue-500 cursor-pointer underline">
              Account Details
            </span>
            .
          </p>

          {/* Dashboard Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Account Info */}
            <div className="border rounded-md p-5 shadow-sm">
              <h4 className="font-semibold mb-3">ACCOUNT INFO</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={user?.avatar?.url}
                    alt="User"
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                  />
                  <label
                    htmlFor="image"
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer text-sm"
                  >
                    <AiOutlineCamera />
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-600">
                    {user?.address || "No address provided"}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-1">Email: {user?.email}</p>
              <p className="text-sm mb-1">
                Sec Email: {user?.secondaryEmail || "N/A"}
              </p>
              <p className="text-sm mb-3">Phone: {user?.phoneNumber}</p>
            </div>

            {/* Billing Address */}
            <div className="border rounded-md p-5 shadow-sm">
              <h4 className="font-semibold mb-3">BILLING ADDRESS</h4>
              <p className="text-sm font-medium mb-1">{user?.name}</p>
              <p className="text-sm text-gray-600 mb-1">
                {user?.billing_address || "No billing address saved"}
              </p>
              <p className="text-sm mb-1">Phone: {user?.phoneNumber}</p>
              <p className="text-sm mb-3">Email: {user?.email}</p>
            </div>

            {/* Order Stats */}
            <div className="flex flex-col justify-between gap-4">
              <div className="bg-blue-100 rounded-md p-4">
                <p className="text-center text-sm">Total Orders</p>
              </div>
              <div className="bg-orange-100 rounded-md p-4">
                <p className="text-center text-sm">Pending Orders</p>
              </div>
              <div className="bg-green-100 rounded-md p-4">
                <p className="text-center text-sm">Completed Orders</p>
              </div>
            </div>
          </div>

          {/* Payment Option */}
          {/* <div className="border rounded-md shadow-sm p-4 mb-6 mt-3">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">PAYMENT OPTION</h4>
              <button className="text-sm text-orange-500 font-medium">
                Add Card →
              </button>
            </div>
            <div className="flex gap-4 flex-wrap">
              {[user?.card1, user?.card2].map(
                (card, i) =>
                  card && (
                    <div
                      key={i}
                      className={`w-[300px] p-4 rounded-lg text-white relative ${
                        i === 0 ? "bg-blue-700" : "bg-green-600"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm">
                            ${card.amount.toLocaleString()} USD
                          </p>
                          <p className="text-xs mt-1">CARD NUMBER</p>
                          <p className="text-sm font-bold tracking-widest mt-1">
                            **** **** **** {card.last4}
                          </p>
                          <p className="text-xs mt-2">Visa / {user?.name}</p>
                        </div>
                        <div className="absolute top-2 right-3 cursor-pointer">
                          ⋮
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div> */}

          {/* Recent Order Table */}
          {/* <div className="border rounded-md shadow-sm">
            <AllOrders />
          </div> */}
        </div>
      )}

      {/* order */}
      {active === 2 && (
        <div className="w-full px-6 ">
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div className="px-6">
          <AllRefundOrders />
        </div>
      )}

      {active === 4 && (
        <div>
          <CartPage />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <WishlistTable />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {/* {active === 7 && (
        <div>
          <Address />
        </div>
      )} */}
      {active === 9 && (
        <div className="px-8">
          <Settings />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user]);

  return (
    <div className="mt-2 bg-white rounded-md shadow-md overflow-hidden">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">ORDER HISTORY</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">ORDER ID</th>
              <th className="px-6 py-3">STATUS</th>
              <th className="px-6 py-3">DATE</th>
              <th className="px-6 py-3">TOTAL</th>
              <th className="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-[#333] font-medium">
                    #{order._id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold uppercase ${
                        order.status === "COMPLETED"
                          ? "text-green-600"
                          : order.status === "CANCELED"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    Rs.{order.totalPrice} ({order.cart.length} Products)
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/order-details/${order._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center gap-2 py-4">
        {[1, 2, 3, 4, 5, 6].map((pg) => (
          <button
            key={pg}
            className={`w-8 h-8 rounded-full text-sm border ${
              pg === 1
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {pg < 10 ? `0${pg}` : pg}
          </button>
        ))}
      </div>
    </div>
  );
};

const Settings = () => {
  const dispatch = useDispatch();
  const { user, successMessage, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    username: "",
    secondaryEmail: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    zipCode: "",

    billingAddress: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
    },

    shippingAddress: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
    },
  });

  // Populate data from user state
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        displayName: user.displayName || "",
        username: user.username || "",
        secondaryEmail: user.secondaryEmail || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
        state: user.state || "",
        zipCode: user.zipCode || "",

        billingAddress: {
          firstName: user.billing_firstName || "",
          lastName: user.billing_lastName || "",
          company: user.billing_companyName || "",
          address: user.billing_address || "",
          country: user.billing_country || "",
          city: user.billing_city || "",
          state: user.billing_state || "",
          zipCode: user.billing_zipCode || "",
          email: user.billing_email || "",
          phone: user.billing_phoneNumber || "",
        },

        shippingAddress: {
          firstName: user.shipping_firstName || "",
          lastName: user.shipping_lastName || "",
          company: user.shipping_companyName || "",
          address: user.shipping_address || "",
          country: user.shipping_country || "",
          city: user.shipping_city || "",
          state: user.shipping_state || "",
          zipCode: user.shipping_zipCode || "",
          email: user.shipping_email || "",
          phone: user.shipping_phoneNumber || "",
        },
      }));
    }
  }, [user]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [successMessage, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const flatPayload = {
      ...formData,

      billing_firstName: formData.billingAddress.firstName,
      billing_lastName: formData.billingAddress.lastName,
      billing_companyName: formData.billingAddress.company,
      billing_address: formData.billingAddress.address,
      billing_country: formData.billingAddress.country,
      billing_city: formData.billingAddress.city,
      billing_state: formData.billingAddress.state,
      billing_zipCode: formData.billingAddress.zipCode,
      billing_email: formData.billingAddress.email,
      billing_phoneNumber: formData.billingAddress.phone,

      shipping_firstName: formData.shippingAddress.firstName,
      shipping_lastName: formData.shippingAddress.lastName,
      shipping_companyName: formData.shippingAddress.company,
      shipping_address: formData.shippingAddress.address,
      shipping_country: formData.shippingAddress.country,
      shipping_city: formData.shippingAddress.city,
      shipping_state: formData.shippingAddress.state,
      shipping_zipCode: formData.shippingAddress.zipCode,
      shipping_email: formData.shippingAddress.email,
      shipping_phoneNumber: formData.shippingAddress.phone,
    };

    dispatch(updateFullUserInfo(user._id, flatPayload));
  };

  return (
    <form onSubmit={handleSave}>
      {/* Account Info */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-gray-800 border-b pb-3 mb-6">
          ACCOUNT SETTING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <img
              src={user?.avatar?.url || "https://i.ibb.co/ZVPFz5p/avatar.png"}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>

          <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input" />
            <input type="text" name="displayName" placeholder="Display Name" value={formData.displayName} onChange={handleChange} className="input" />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" />
            <input type="email" name="secondaryEmail" placeholder="Secondary Email" value={formData.secondaryEmail} onChange={handleChange} className="input" />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="input" />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="input" />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="input" />
            <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} className="input" />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-gray-800 border-b pb-3 mb-6">BILLING ADDRESS</h2>
        <div className="grid grid-cols-2 gap-4">
          {["firstName", "lastName", "company", "address", "country", "city", "state", "zipCode", "email", "phone"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData.billingAddress[field]}
              onChange={(e) => handleNestedChange("billingAddress", field, e.target.value)}
              className={`input ${field === "company" || field === "address" || field === "email" || field === "phone" ? "col-span-2" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-md shadow-md p-6 mb-6">
        <h2 className="text-[15px] font-semibold text-gray-800 border-b pb-3 mb-6">SHIPPING ADDRESS</h2>
        <div className="grid grid-cols-2 gap-4">
          {["firstName", "lastName", "company", "address", "country", "city", "state", "zipCode", "email", "phone"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData.shippingAddress[field]}
              onChange={(e) => handleNestedChange("shippingAddress", field, e.target.value)}
              className={`input ${field === "company" || field === "address" || field === "email" || field === "phone" ? "col-span-2" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="text-right mt-4">
        <button type="submit" className="bg-orange-500 text-white px-5 py-2 rounded text-sm font-medium hover:bg-orange-600 transition">
          SAVE CHANGES
        </button>
      </div>
    </form>
  );
};

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (data, qty) => {
    dispatch(addTocart({ ...data, qty }));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateTotal = (price, qty) => (price * qty).toFixed(2);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const shippingThreshold = 100;
  const remaining = Math.max(shippingThreshold - totalPrice, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 lg:px-12 mb-20">
        {/* Cart Table Left */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-md overflow-x-auto self-start">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
                <th className="p-4">Products</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-t text-gray-800">
                  <td className="p-4">
                    <div className="flex gap-4 items-center">
                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCartHandler(item)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        <RxCross1 />
                      </button>

                      {/* Product image */}
                      <img
                        src={item.images[0]?.url}
                        alt={item.name}
                        className="w-[60px] h-[60px] object-contain"
                      />

                      {/* Product name */}
                      <div className="text-sm font-medium text-gray-800">
                        {item.name}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4 text-sm font-medium text-gray-700">
                    {item.originalPrice &&
                    item.originalPrice > item.discountPrice ? (
                      <div className="space-x-2">
                        <span className="line-through text-gray-400">
                          ${item.originalPrice}
                        </span>
                        <span>${item.discountPrice.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>${item.discountPrice.toFixed(2)}</span>
                    )}
                  </td>

                  {/* Quantity Controls */}
                  <td className="p-4">
                    <div className="flex items-center justify-center border border-gray-300 rounded-md w-[110px]">
                      <button
                        className="px-3 py-1 text-gray-700"
                        onClick={() =>
                          handleQuantityChange(
                            item,
                            item.qty > 1 ? item.qty - 1 : 1
                          )
                        }
                      >
                        <HiOutlineMinus />
                      </button>
                      <span className="px-4 text-sm">
                        {item.qty.toString().padStart(2, "0")}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-700"
                        onClick={() => handleQuantityChange(item, item.qty + 1)}
                      >
                        <HiPlus />
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td className="p-4 font-semibold text-sm">
                    ${calculateTotal(item.discountPrice, item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Action Buttons */}
          {/* <div className="flex justify-between items-center p-5 border-t bg-white">
            <Link to="/products">
              <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition">
                <span className="text-lg">←</span> RETURN TO SHOP
              </button>
            </Link>

            <button className="text-sm font-semibold border border-blue-500 text-blue-600 px-5 py-2 rounded hover:bg-blue-50 transition">
              UPDATE CART
            </button>
          </div> */}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Totals Card */}
          <div className="border border-gray-200 rounded-md p-6">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm">
              Card Totals
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sub-total:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="font-medium">$24</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-medium">$61.99</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${(totalPrice + 61.99 - 24).toFixed(2)} USD</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 rounded transition flex items-center justify-center gap-2">
                PROCEED TO CHECKOUT →
              </button>
            </Link>
          </div>

          {/* Coupon Code */}
          <div className="border border-gray-200 rounded-md p-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">
              Coupon Code
            </h3>
            <input
              type="text"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded transition">
              APPLY COUPON
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user]);

  return (
    <div className=" bg-white rounded-md shadow-md overflow-hidden">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">TRACK ORDER</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">ORDER ID</th>
              <th className="px-6 py-3">STATUS</th>
              <th className="px-6 py-3">DATE</th>
              <th className="px-6 py-3">TOTAL</th>
              <th className="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-[#333] font-medium">
                    #{order._id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold uppercase ${
                        order.status === "COMPLETED"
                          ? "text-green-600"
                          : order.status === "CANCELED"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    Rs.{order.totalPrice} ({order.cart.length} Products)
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/order-details/${order._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center gap-2 py-4">
        {[1, 2, 3, 4, 5, 6].map((pg) => (
          <button
            key={pg}
            className={`w-8 h-8 rounded-full text-sm border ${
              pg === 1
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {pg < 10 ? `0${pg}` : pg}
          </button>
        ))}
      </div>
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "Rs." + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API logic goes here
    console.log({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded p-5 bg-white">
      <h2 className="text-sm font-semibold text-gray-800 border-b pb-3 mb-5">
        CHANGE PASSWORD
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type={showOld ? "text" : "password"}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          >
            {showOld ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-1">
            New Password
          </label>
          <input
            type={showNew ? "text" : "password"}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span className="text-xs text-gray-400 absolute left-3 top-[65px]">
            8+ characters
          </span>
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          >
            {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          >
            {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-fit bg-orange-500 text-white text-sm font-medium px-4 py-2 mt-2 rounded hover:bg-orange-600 transition"
        >
          CHANGE PASSWORD
        </button>
      </form>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

const WishlistTable = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const addToCartHandler = (item) => {
    const newItem = { ...item, qty: 1 };
    dispatch(addTocart(newItem));
  };

  const removeFromWishlistHandler = (item) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <>
      <div className="px-4">
        <div className="max-w-[880px] mx-auto border rounded-lg overflow-hidden bg-white shadow-sm">
          {/* Heading */}
          <div className="bg-white px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Wishlist</h2>
          </div>

          {/* Conditional content */}
          <div className="p-6">
            {wishlist.length === 0 ? (
              <div className="text-center text-gray-600 text-base py-12">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Products</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item, idx) => {
                      const price = item.discountPrice || item.price;
                      const original = item.originalPrice || "";
                      const inStock = item.stock > 0;

                      return (
                        <tr
                          key={idx}
                          className="border-t hover:bg-gray-50 transition-all"
                        >
                          <td className="px-4 py-4 flex items-center gap-4">
                            <img
                              src={item.images[0]?.url}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded"
                            />
                            <span className="text-sm font-medium text-gray-800 max-w-xs line-clamp-2">
                              {item.name}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-sm">
                            {original && (
                              <span className="line-through text-gray-400 mr-2">
                                ${original}
                              </span>
                            )}
                            <span className="text-[#d02222] font-semibold">
                              ${price}
                            </span>
                          </td>

                          <td className="px-4 py-4 font-medium">
                            <span
                              className={
                                inStock ? "text-green-600" : "text-red-500"
                              }
                            >
                              {inStock ? "IN STOCK" : "OUT OF STOCK"}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center justify-between gap-3 w-full">
                              {inStock ? (
                                <button
                                  className="text-sm px-4 py-2 rounded font-semibold transition bg-[#ff6600] text-white hover:bg-[#e65c00] flex items-center gap-2"
                                  onClick={() => addToCartHandler(item)}
                                >
                                  ADD TO CART <BsCartPlus size={16} />
                                </button>
                              ) : (
                                <button
                                  className="text-sm px-4 py-2 rounded font-semibold bg-gray-300 text-gray-600 cursor-not-allowed flex items-center gap-2"
                                  disabled
                                >
                                  ADD TO CART <BsCartPlus size={16} />
                                </button>
                              )}

                              <button
                                onClick={() => removeFromWishlistHandler(item)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-400 transition"
                                title="Remove"
                              >
                                <RxCross1 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
