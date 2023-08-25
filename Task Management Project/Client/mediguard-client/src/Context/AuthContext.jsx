import React, {createContext} from 'react';
import { apiPost } from './Api/axios';
import {toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line react-refresh/only-export-components
export const dataContext = createContext();

// eslint-disable-next-line react/prop-types
const DataProvider = ({children}) => {


  /**=================Registration =================================== */

  const registerConfig = async(formData) => {
    try {
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        employeeId: formData.employeeId,
        confirm_password: formData.confirm_password
      }

     const response = await apiPost('/user/register', registerData)
     const data = await response.data
     toast.success(data.message)

     setTimeout(() => {
      window.location.href = "/otpVerify";
     }, 2000)
 
 
    } catch (error) {
      toast.error(error.response.data.Error)
    }
  }


  /** ==================================== Verify Email with OTP ================================================*/
  const OTPConfig = async (formData) => {
    try {
      const OTPData = {
        otp: formData.otp
      }
      const response =  await apiPost("/users/verify", OTPData)
      const data = await response.data
      toast.success(data.Message)
 
      setTimeout(() => {
       window.location.href = "/login";
      }, 2000)
    } catch (error) {
      toast.error(error.response.data.Error)
    }
  }

    return (
        <dataContext.Provider
        value={{registerConfig, OTPConfig}}
        >
            {children}
        </dataContext.Provider>
    )

}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(dataContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a DataProvider')
  }
  return context;
}

export default DataProvider;