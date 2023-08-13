import React, { useState } from "react";
import "./../login_signup/LoginSignup.css";
import VerifyCodeForm from "../../components/verifyCodeForm/VerifyCodeForm";
// import { useDispatch } from "react-redux";
import "./verifyEmail.css"

const VerifyEmail = () => {
  const [mode, setMode] = useState("signup");
  // const dispatch = useDispatch()

  return (
    
    <div className={`app app--is-${mode}`}>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
        style={{backgroundColor:"#452b46"}}
      ></div>
      <section className={`form-block margin-verify form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>Confirm Email</h1>
        </header>
        <VerifyCodeForm />
      </section>
    </div>
  );
};

export default VerifyEmail;
