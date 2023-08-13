import React, { useState } from "react";
import "./../login_signup/LoginSignup.css";
import ResetPasswordForm from "../../components/resetPasswordForm/ResetPasswordForm";
import { useDispatch } from "react-redux";
// import "./verifyEmail.css"

const ResetPassword = () => {
  const [mode, setMode] = useState("signup");
  const dispatch = useDispatch()

  return (
    
    <div className={`app app--is-${mode}`}>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
        style={{backgroundColor:"#272442"}}
      ></div>
      <section className={`form-block margin-verify form-block--is-${mode}`}>

        <ResetPasswordForm />
      </section>
    </div>
  );
};

export default ResetPassword;
