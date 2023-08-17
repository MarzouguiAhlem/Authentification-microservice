import { Navigate } from 'react-router-dom'; // Import Navigate component for redirection
import { useSelector } from 'react-redux'; // Import useSelector from Redux for accessing state
import Loader from '../../components/Loader/Loader'; // Import Loader component for loading state
import { relativePaths } from '../../navigation'; // Import relativePaths for navigation routes

const ProtectedRouteLoggedIn = ({ children }) => {
  const { sessionLoading } = useSelector((state) => state.user); // Get sessionLoading from Redux state
  const { user } = useSelector((state) => state.user); // Get user object from Redux state

  if (sessionLoading) { // If session is loading, show Loader component
    return <Loader />;
  }

  if (user.isLoggedIn) { // If user is logged in, allow rendering of the protected children components
    return children;
  }

  // If user is not logged in, redirect to landing page using the Navigate component
  return <Navigate to={relativePaths.landingPage} />;
};

export default ProtectedRouteLoggedIn; // Export the ProtectedRouteLoggedIn component
