import React from "react";
import { ToastContainer } from "react-toastify";
import {  Outlet } from 'react-router-dom';

const SharedToast = () => {
  
  return (
    <>
 
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Outlet/>
    </>
  );
};

export default SharedToast;
