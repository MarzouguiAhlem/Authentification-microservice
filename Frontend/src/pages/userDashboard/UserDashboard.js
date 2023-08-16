import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMsg } from '../../features/redux/appSlice';
// import { getSessionInfo, logout } from '../../features/redux/userSlice';
import { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDashboardLayout from "../../components/userDashboard/UserDashboardLayout"
import "./userDashboard.css";
// import { relativePaths } from '../../navigation';

const UserDashboard = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate();

  const { msg, msgType } = useSelector((state) => state.app);



  // const handleClick = (e) => {
  //   e.preventDefault()
  //   dispatch(getSessionInfo())
  // }
  // const handleLogout = (e) => {
  //   e.preventDefault()
  //   dispatch(logout())
  //   .then(()=>navigate(relativePaths.authentification))
  // }


  useEffect(() => {
    if (msg) {
      if (msgType === "success") {
        toast.success(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (msgType === "error") {
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      dispatch(setMsg(""))
    }
  }, [msg]);


  return (
    <>
    <UserDashboardLayout/>
    
    {/* <div>Home</div>

    <button onClick={handleClick}>get Session</button>
    <button onClick={handleLogout}>log out</button> */}
    </>
  )
}

export default UserDashboard