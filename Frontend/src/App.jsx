import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import LoginSignup from "./pages/login_signup/LoginSignup";
import ProtectedRouteLoggedIn from "./pages/protectedRoutes/ProtectedRouteLoggedIn";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSessionInfo } from "./features/redux/userSlice";
import ProtectedRouteLoggedOut from "./pages/protectedRoutes/ProtectedRouteLoggedOut";
import { setAccessTokenFromSessionStorage } from "./features/redux/userSlice";
import { setRefreshTokenFromSessionStorage } from "./features/redux/userSlice";
import ProtectedRouteAdmin from "./pages/protectedRoutes/ProtectedRouteAdmin";

import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { absolutePaths , relativePaths } from "./navigation";


const App = () => {
  const dispatch = useDispatch();
  dispatch(setAccessTokenFromSessionStorage());
  dispatch(setRefreshTokenFromSessionStorage());
  console.log(relativePaths);
  useEffect(() => {
    (async () => {
      try {
        // dispatch(getCurrentPathBack())
        dispatch(getSessionInfo());
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={relativePaths.LoginSignup} >
          <Route
            index
            element={
               <ProtectedRouteLoggedOut>
              <LoginSignup />
               </ProtectedRouteLoggedOut>
            }
          />
         
          <Route
            path={relativePaths.resetPassword}
            element={<ResetPassword />}
          />
          <Route path={relativePaths.verifyEmail} element={<VerifyEmail />} />
          
            
          </Route>
          
          
        
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   {/* {user ? <Logout/> : <Login/>} */}
    //   {/* <SignupForm/> */}
    //   <Test/>
    // </div>
  );
};

export default App;
