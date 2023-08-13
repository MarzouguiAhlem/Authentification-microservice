import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { relativePaths } from "../../navigation";
const ProtectedRouteAdmin = ({ children }) => {
  // console.log("**************")
  // console.log(children)
  // console.log("**************")
  const { user } = useSelector((state) => state.user);
  const { sessionLoading } = useSelector((state) => state.user);
  if (sessionLoading) {
    return <Loader />;
  }
  else if (!sessionLoading && user.isLoggedIn && user.role === "admin") {
    console.log("go to dashboard")
    return children;
  }
  else if(!sessionLoading && !user.isLoggedIn){
    console.log("return <Navigate />;")
    return <Navigate to={relativePaths.landingPage} />;
  }
};

export default ProtectedRouteAdmin;
