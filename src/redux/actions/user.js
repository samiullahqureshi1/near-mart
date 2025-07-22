import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    console.log("[loadUser] Dispatching LoadUserRequest");
    dispatch({
      type: "LoadUserRequest",
    });

    console.log("[loadUser] Making API call to getuser...");
    const { data } = await axios.get(`https://near-backend.vercel.app/api/v2/user/getuser`, {
      withCredentials: true,
    });

    console.log("[loadUser] API call successful, data received:", data);

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });

    console.log("[loadUser] Dispatching LoadUserSuccess with user:", data.user);
  } catch (error) {
  const errMsg = error?.response?.data?.message || error.message || "Something went wrong";

  console.error("[loadUser] API call failed:", errMsg);
  console.log("[loadUser] Full error object:", error); // Optional for deeper debug

  dispatch({
    type: "LoadUserFail",
    payload: errMsg,
  });

  console.error("[loadUser] Dispatching LoadUserFail");
}
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`https://near-backend.vercel.app/api/v2/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `https://near-backend.vercel.app/api/v2/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `https://near-backend.vercel.app/api/v2/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `https://near-backend.vercel.app/api/v2/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`https://near-backend.vercel.app/api/v2/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};

// update full user info (includes billing & shipping)
export const updateFullUserInfo = (userId, updatedUserData) => async (dispatch) => {
  try {
    dispatch({ type: "updateFullUserRequest" });

    const { data } = await axios.put(
      `https://near-backend.vercel.app/api/v2/user/update-user/${userId}`,
      updatedUserData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateFullUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateFullUserFailed",
      payload: error.response?.data?.message || "Update failed",
    });
  }
};
