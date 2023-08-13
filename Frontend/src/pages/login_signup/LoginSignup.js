import React, { useState } from "react";
import LoginForm from "../../components/loginform/LoginForm";
import SignupForm from "../../components/signupform/SignupForm";
import "./LoginSignup.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 import { useEffect } from "react";
 import { useDispatch } from "react-redux";
 import { useSelector } from "react-redux";
 import { setCurrentPathFront } from "../../features/redux/appSlice";

const LoginSignup = () => {
   const dispatch = useDispatch()
   const {currentPath} = useSelector((state)=>state.app)
  
   useEffect(() => {
    if(currentPath !== "/authentification"){
   dispatch(setCurrentPathFront("/authentification"))
   }
   }, [])


  const [mode, setMode] = useState("login");
  const toggleMode = () => {
    var newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
  };

  return (
    <div className={`app app--is-${mode}`}>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
      ></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Login" : "Sign up"}</h1>
          <Row className="form-block__toggle-block">
            <Col xs={12} md={10} >
              <span>
                {mode === "login" ? "Don't" : "Already"} have an account? Click
                here &#8594;
              </span>
            </Col>
            <Col xs={6} md={2}>
              <input
                id="form-toggler"
                type="checkbox"
                onClick={toggleMode.bind(this)}
              />
              <label htmlFor="form-toggler" className="toggle__form"></label>
            </Col>
          </Row>
        </header>
        {mode === "signup" ? <SignupForm /> : <LoginForm />}
        {/* <LoginForm mode={this.state.mode} onSubmit={this.props.onSubmit} /> */}
      </section>
    </div>
  );
};

export default LoginSignup;
