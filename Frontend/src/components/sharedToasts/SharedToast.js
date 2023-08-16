import React from "react";
import { ToastContainer } from "react-toastify";
import { Link, Outlet } from 'react-router-dom';
import Navbar from "../NavBar/Navbar";
// import Loader from "../Loader/Loader";
const SharedToast = () => {
  
  return (
    <>
    {/* <Loader/> */}
    {/* <Navbar/> */}
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
