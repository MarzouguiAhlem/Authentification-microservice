import React, { useState } from "react"; // Import necessary dependencies
import "./../login_signup/LoginSignup.css"; // Import the CSS styles for ResetPassword component
import ResetPasswordForm from "../../components/resetPasswordForm/ResetPasswordForm"; // Import ResetPasswordForm component
import { useDispatch } from "react-redux"; // Import useDispatch hook for Redux

const ResetPassword = () => {
  const [mode, setMode] = useState("signup"); // Initialize state for controlling signup mode
  const dispatch = useDispatch(); // Initialize useDispatch hook for dispatching actions

  return (
    <div className={`app app--is-${mode}`}> {/* Apply dynamic class based on mode */}
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
        style={{ backgroundColor: "#272442" }} // Set background color style
      ></div>
      <section className={`form-block margin-verify form-block--is-${mode}`}>
        {/* Render ResetPasswordForm component */}
        <ResetPasswordForm />
      </section>
    </div>
  );
};

export default ResetPassword; // Export the ResetPassword component

