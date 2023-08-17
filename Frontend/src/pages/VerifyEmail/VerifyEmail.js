import React, { useState } from "react"; // Import necessary dependencies
import "./../login_signup/LoginSignup.css"; // Import CSS styles for VerifyEmail component
import VerifyCodeForm from "../../components/verifyCodeForm/VerifyCodeForm"; // Import VerifyCodeForm component
import "./verifyEmail.css"; // Import additional CSS styles for VerifyEmail

const VerifyEmail = () => {
  const [mode, setMode] = useState("signup"); // Initialize state for controlling signup mode

  return (
    <div className={`app app--is-${mode}`}> {/* Apply dynamic class based on mode */}
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
        style={{ backgroundColor: "#452b46" }} // Set background color style
      ></div>
      <section className={`form-block margin-verify form-block--is-${mode}`}>
        {/* Render header with "Confirm Email" title */}
        <header className="form-block__header">
          <h1>Confirm Email</h1>
        </header>
        {/* Render VerifyCodeForm component */}
        <VerifyCodeForm />
      </section>
    </div>
  );
};

export default VerifyEmail; // Export the VerifyEmail component

