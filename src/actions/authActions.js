import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("http://18.116.70.71/api/Account/Register", newUser)
    .then(res => history.push("/check-email")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Forgot Password
export const forgotPassword = (userData, history) => dispatch => {
  axios
    .post("http://18.116.70.71/api/Account/ForgotPassword", userData)
    .then(res => history.push("/reset-code")) // re-direct to reset password on successful email deployment
};

// Reset Password
export const resetPassword = (userData, history) => dispatch => {
  axios
    .post("http://18.116.70.71/api/Account/ResetPassword", userData)
    .then(res => history.push("/sign-in")) // re-direct to login on successful register
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://18.116.70.71/api/Account/Login", userData)
    .then(res => {
      // Save to localStorage
      // Set jwtTokento localStorage
      const { jwtToken} = res.data;
      localStorage.setItem("jwtToken", jwtToken);
      // Set jwtTokento Auth header
      setAuthToken(jwtToken);
      
      const { role } = res.data;
      localStorage.setItem("role", role);

      const { id } = res.data;
      localStorage.setItem("id", id);
      // Decode jwtToken to get user data
      const decoded = jwt_decode(jwtToken);
      // Set current user
      dispatch(setCurrentUser(decoded)); 
    })
    .catch(function (error) {
      alert("Email or password is incorrect");
    })
};

// OTP - get user OTP
export const sendUserOTP = id => dispatch => {
  localStorage.getItem("id")
  axios
    .get("http://18.116.70.71/api/Account/SendUserOtp",{
      params: {
        id
      }
    })
  }

// OTP - authenticate user OTP
export const AuthenticateUserOTP = (id, OTP, history) => dispatch => {
  axios
    .get("http://18.116.70.71/api/Account/AuthenticateUserOTP",{
      params: {
        id,
        OTP
      }
    })
    .then(res => history.push("/dashboard/overview"))
  }

// Update - Update user
export const UpdateUser = (userData, history) => dispatch => {
  localStorage.getItem("id")
  axios
    .put("http://18.116.70.71/api/Account/Update?id=id", userData)
    .then(res => history.push("/dashboard/overview"))
  }

// Password - authenticate user password reset code
export const AuthenticateUserpasswordResetCode = (resetToken, history) => dispatch => {
  axios
    .get("http://18.116.70.71/api/Account/ValidateResetToken",{
      params: {
        resetToken
      }
    })
    .then(res => history.push("/reset-password"))
  }


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove jwtTokenfrom local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Get Payments
export const getPayments = (data, history) => dispatch => {
  axios
    .get("http://18.116.70.71/api/Stripe", data)
    .then(res => {
      // Save to localStorage
      // Set jwtTokento localStorage
      const { payments } = res.data;
      console.log(payments);
    })
};