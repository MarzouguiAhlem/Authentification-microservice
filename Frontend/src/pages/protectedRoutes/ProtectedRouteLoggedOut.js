import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { relativePaths } from '../../navigation';
const ProtectedRouteLoggedOut = ({ children }) => {
  const { sessionLoading } = useSelector((state)=>state.user)
  const {user} = useSelector((state)=>state.user)
  
  if(sessionLoading){
    return <Loader/>
  }
  if (!user.isLoggedIn) {
      return children;
  }
  if(user.role === "admin"){
    return <Navigate to={relativePaths.adminDashboard} />
  }
  if(user.role === "user"){
    return <Navigate to={relativePaths.userDashboard} />
  }

};

export default ProtectedRouteLoggedOut;