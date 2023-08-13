import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { relativePaths } from '../../navigation';
const ProtectedRouteLoggedIn = ({ children }) => {
  const { sessionLoading } = useSelector((state)=>state.user)
  const {user} = useSelector((state)=>state.user)
  if(sessionLoading){
    return <Loader/>
  }
  if (user.isLoggedIn) {
    return children;
  }
  // else if (!user.isVerified && user.isVerified!=="" && user.isVerified!==undefined && user.email){
  //   return <Navigate to='/verifyEmail' />;
  // }
  return <Navigate to={relativePaths.landingPage} />;
};

export default ProtectedRouteLoggedIn;