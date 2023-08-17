import { Navigate } from 'react-router-dom'; // Import Navigate component for redirection
import { useSelector } from 'react-redux'; // Import useSelector from Redux for accessing state
import Loader from '../../components/Loader/Loader'; // Import Loader component for loading state
import { relativePaths } from '../../navigation'; // Import relativePaths for navigation routes

const ProtectedRouteLoggedOut = ({ children }) => {
  const { sessionLoading } = useSelector((state) => state.user); // Get sessionLoading from Redux state
  const { user } = useSelector((state) => state.user); // Get user object from Redux state

  if (sessionLoading) { // If session is loading, show Loader component
    return <Loader />;
  }

  if (!user.isLoggedIn) { // If user is not logged in, allow rendering of the protected children components
    return children;
  }

  if (user.role === "admin") { // If user is an admin, redirect to admin dashboard
    return <Navigate to={relativePaths.adminDashboard} />;
  }

  if (user.role === "user") { // If user is a regular user, redirect to user dashboard
    return <Navigate to={relativePaths.userDashboard} />;
  }
};

export default ProtectedRouteLoggedOut; // Export the ProtectedRouteLoggedOut component
