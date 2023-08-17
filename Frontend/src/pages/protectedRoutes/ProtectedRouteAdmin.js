import { Navigate } from "react-router-dom"; // Import Navigate component for redirecting
import { useSelector } from 'react-redux'; // Import useSelector from Redux for accessing state
import Loader from '../../components/Loader/Loader'; // Import Loader component for loading state
import { relativePaths } from "../../navigation"; // Import relativePaths for navigation routes

const ProtectedRouteAdmin = ({ children }) => {

  const { user } = useSelector((state) => state.user); // Get user object from Redux state
  const { sessionLoading } = useSelector((state) => state.user); // Get sessionLoading from Redux state

  if (sessionLoading) { // If session is loading, show Loader component
    return <Loader />;
  }
  else if (!sessionLoading && user.isLoggedIn && user.role === "admin") {
    // If session is not loading, and user is logged in and has "admin" role
    console.log("go to dashboard")
    return children; // Allow rendering of the protected children components
  }
  else if (!sessionLoading && !user.isLoggedIn) {
    // If session is not loading and user is not logged in
    console.log("return <Navigate />;")
    return <Navigate to={relativePaths.landingPage} />;
    // Redirect to landing page using the Navigate component
  }
};

export default ProtectedRouteAdmin; // Export the ProtectedRouteAdmin component

