// Import necessary components and libraries
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Import necessary Redux actions and slices
import { logout, userLogin } from "../../features/redux/userSlice";
import { setMsg } from "../../features/redux/appSlice";
import { getSessionInfo } from '../../features/redux/userSlice';

// Import CSS file for styling
import "./../signupform/Signup.css";

// Define the LoginForm component
const LoginForm = () => {
  // Initialize Formik validation schema
  const schema = yup.object().shape({
    email: yup.string().required().email().max(50),
    password: yup.string().required().min(2).max(50),
  });

  // Access Redux dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access relevant data from Redux store
  const { msg, msgType } = useSelector((state) => state.app);
  const { isLoggedIn, user } = useSelector((state) => state.user);

  // Handle click event to retrieve session information
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getSessionInfo());
  };

  // Handle click event for user logout
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Display toast messages based on the type of message received
  useEffect(() => {
    if (msg) {
      const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

      if (msgType === "success") {
        toast.success(msg, toastOptions);
      } else if (msgType === "error") {
        toast.error(msg, toastOptions);
      } else if (msgType === "warning") {
        toast.warn(msg, toastOptions);
      }

      // Clear the message in Redux store after displaying
      dispatch(setMsg(""));
    }
  }, [msg, msgType, dispatch]);

  return (
    <div className="container mt-5">
      {/* Formik handles the form validation and submission */}
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          dispatch(userLogin({ user: values, navigate: navigate }));
          actions.setSubmitting(false);
          actions.resetForm({ values: { email: "", password: "" } });
        }}
        initialValues={{ email: "", password: "" }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {/* Input fields for email and password */}
            <Row className="mb-3">
              <Col md={{ span: 10, offset: 1 }}>
                <Form.Group controlId="validationFormik03">
                  <FloatingLabel
                    controlId="validationFormik03"
                    label="Email"
                    className="mb-3"
                  >
                    {/* Email input */}
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    {/* Display error message if email is invalid */}
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <FloatingLabel
                  controlId="validationFormik04"
                  label="Password"
                  className="mb-3"
                >
                  {/* Password input */}
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  {/* Display error message if password is invalid */}
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>

                {/* Submit button */}
                <div className="btn-submit">
                  <Button variant="danger" type="submit">
                    Login
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

      {/* Link to reset password page */}
      <div>
        <span>Forgot your password? </span>
        <Link to="/resetPassword"> Click here</Link>
      </div>
    </div>
  );
};

// Export the LoginForm component as default
export default LoginForm;
