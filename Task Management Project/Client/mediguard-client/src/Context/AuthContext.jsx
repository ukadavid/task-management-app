import React, { createContext } from "react";

import { toast } from "react-toastify";
import { apiPost } from "../Api/Axios";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react-refresh/only-export-components
export const dataContext = createContext();

// eslint-disable-next-line react/prop-types
const DataProvider = ({ children }) => {
  /**=================Registration =================================== */

  const registerConfig = async (formData) => {
    try {
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        employeeId: formData.employeeId,
        confirm_password: formData.confirm_password,
      };

      const response = await apiPost("/user/register", registerData);
      const data = await response.data;
      toast.success(data.message);

      setTimeout(() => {
        window.location.href = "/otpVerify";
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  /**=================Admin Signup=================================== */
  const adminRegisterConfig = async (formData) => {
    try {
      const adminSignupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await apiPost("/admin/register", adminSignupData);
      const data = await response.data;
      toast.success(data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  /**=================Admin Login =================================== */
  const adminLoginConfig = async (formData) => {
    try {
      const adminLoginData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await apiPost("/admin/login", adminLoginData);
      const data = await response.data;
      if (data.message === "Login successful") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", JSON.stringify(data.admin._id));
      }
      console.log(data);
      console.log(data.message);
      toast.success(data.message);

      setTimeout(() => {
        window.location.href = "/adminDashboard";
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  /* ==================================== Verify Email with OTP ================================================*/
  const OTPConfig = async (formData) => {
    try {
      const OTPData = {
        otp: formData.otp,
      };
      const response = await apiPost("/user/otpVerify", OTPData);
      const data = await response.data;
      toast.success(data.Message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <dataContext.Provider
      value={{
        registerConfig,
        OTPConfig,
        adminRegisterConfig,
        adminLoginConfig,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(dataContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;