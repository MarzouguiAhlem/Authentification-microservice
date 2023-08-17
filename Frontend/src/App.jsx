import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import LoginSignup from "./pages/login_signup/LoginSignup";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import ProtectedRouteLoggedIn from "./pages/protectedRoutes/ProtectedRouteLoggedIn";
import SharedToast from "./components/sharedToasts/SharedToast";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Landing from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSessionInfo } from "./features/redux/userSlice";
import ProtectedRouteLoggedOut from "./pages/protectedRoutes/ProtectedRouteLoggedOut";
import { setAccessTokenFromSessionStorage } from "./features/redux/userSlice";
import { setRefreshTokenFromSessionStorage } from "./features/redux/userSlice";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Table from "./components/dashboard/table/Table";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AddUserForm from "./components/dashboard/AddUserForm/AddUserForm";
import ProtectedRouteAdmin from "./pages/protectedRoutes/ProtectedRouteAdmin";
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { absolutePaths , relativePaths } from "./navigation";
//import UserDashboardContent from "./components/userDashboard/UserDashboardContent";
import GatewayList from "./components/gatewayList";
import AddGateway from "./components/addGateway";
import GovernorateList from "./components/governorateList";
import EditGovernorate from "./components/editGovernorate";
import AddGovernorate from "./components/addGovernorate";
import LocalityList from "./components/localityList";
import EditLocality from "./components/editLocality";
import Dashboard from "./components/SensorCharts";
import EditGateway from "./components/editGateway";
import SensorValue from "./components/SensorValue"
import Weather from "./components/Weather/Weather";
import Charts from "./components/Charts";

const App = () => {
  const dispatch = useDispatch();
  dispatch(setAccessTokenFromSessionStorage());
  dispatch(setRefreshTokenFromSessionStorage());
  console.log(relativePaths);
  useEffect(() => {
    (async () => {
      try {
        dispatch(getSessionInfo());
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={relativePaths.landingPage} element={<SharedToast />}>
          <Route
            index
            element={
              <Landing />
            }
          />
          <Route
            path={relativePaths.authentification}
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
          <Route
            path={relativePaths.userDashboard}
            element={
              <ProtectedRouteLoggedIn>
                <UserDashboard />
              </ProtectedRouteLoggedIn>
            }
          >
            <Route path = {relativePaths.gatewayList} index element={<GatewayList />} />
            <Route path = {relativePaths.sensorValue} index element={<SensorValue/>} />
            <Route path = {relativePaths.charts} index element={<Charts/>} />
            <Route path = {relativePaths.weather} index element={<Weather />} />
            <Route path= {relativePaths.editGateway} element={<EditGateway />} />
            <Route path= {relativePaths.addGateway} element={<AddGateway />} />
            <Route path= {relativePaths.governorateList} element={<GovernorateList />} />
            <Route path= {relativePaths.editGovernorate} element={<EditGovernorate />} />
            <Route path= {relativePaths.addGovernorate} element={<AddGovernorate />} />
            <Route path= {relativePaths.localityList} element={<LocalityList />} />
            <Route path= {relativePaths.editGateway} element={<EditLocality />} />
            <Route path={relativePaths.settings} element={<Settings />} />
            <Route path={relativePaths.profile} element={<Profile />} />
          </Route>
          <Route
            path={relativePaths.adminDashboard}
            element={
              <ProtectedRouteAdmin>
                <DashboardPage />
              </ProtectedRouteAdmin>
            }
          >
            <Route
              index
              element={
                <>
                  <Table />
                  <AddUserForm />
                </>
              }
            />
            <Route path={relativePaths.allUsers} element={<Table />} />
            <Route path={relativePaths.addUser} element={<AddUserForm />} />
            <Route path={relativePaths.settings} element={<Settings />} />
            <Route path={relativePaths.profile} element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
};

export default App;
