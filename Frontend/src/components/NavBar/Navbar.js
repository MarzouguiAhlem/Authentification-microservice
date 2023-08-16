import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  const {user} = useSelector((state)=>state.user)
  return (
    <nav className='navbar'>
      {<NavLink
        to='/'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
        // style={({ isActive }) => (isActive ? {'color' : 'red'} : {'color' : 'blue'})}
      >
        Landing page
      </NavLink>}
      {(!user.isLoggedIn) &&<NavLink
        to='/authentification'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        login
      </NavLink>}
      {(!user.isLoggedIn) &&<NavLink
        to='/authentification'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        signup
      </NavLink>}
      {/* <NavLink
        to='/home'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Login
      </NavLink> */}
      {(user.isVerified && user.isLoggedIn) && <NavLink
        to='/home'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        dashboard
      </NavLink>}
    </nav>
  );
};
export default Navbar;
