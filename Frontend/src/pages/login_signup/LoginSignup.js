import React, { useState, useEffect } from "react"; // Import necessary dependencies
import LoginForm from "../../components/loginform/LoginForm"; // Import LoginForm component
import SignupForm from "../../components/signupform/SignupForm"; // Import SignupForm component
import "./LoginSignup.css"; // Import the CSS styles 
import { Row, Col } from "react-bootstrap"; // Import component from react-bootstrap 
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook for Redux
import { setCurrentPathFront } from "../../features/redux/appSlice"; // Import action from appSlice

const LoginSignup = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook for dispatching actions
  const { currentPath } = useSelector((state) => state.app); // Access currentPath from Redux store

  // Set the current path in Redux store when the component mounts
  useEffect(() => {
    if (currentPath !== "/authentification") {
      dispatch(setCurrentPathFront("/authentification")); // Dispatch action to set current path
    }
  }, []);

  const [mode, setMode] = useState("login"); // Initialize state for controlling login/signup mode
  // Toggle between login and signup modes
  const toggleMode = () => {
    var newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
  };

  return (
    <div className={`app app--is-${mode}`}> {/* Apply dynamic class based on mode */}
      <div className={`form-block-wrapper form-block-wrapper--is-${mode}`}></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Login" : "Sign up"}</h1> {/* Display header based on mode */}
          <Row className="form-block__toggle-block">
            <Col xs={12} md={10}>
              <span>
                {mode === "login" ? "Don't" : "Already"} have an account? Click
                here &#8594;
              </span>
            </Col>
            <Col xs={6} md={2}>
              <input
                id="form-toggler"
                type="checkbox"
                onClick={toggleMode.bind(this)} // Bind toggleMode function to checkbox click
              />
              <label htmlFor="form-toggler" className="toggle__form"></label>
            </Col>
          </Row>
        </header>
        {mode === "signup" ? <SignupForm /> : <LoginForm />} {/* Render corresponding form based on mode */}
      </section>
    </div>
  );
};

export default LoginSignup; // Export the LoginSignup component

