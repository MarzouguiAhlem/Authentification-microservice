import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./../signupform/Signup.css";
import * as yup from "yup";
import * as formik from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setMsg } from "../../features/redux/appSlice";
import { resetPasswordStep1, resetPasswordStep2, resetPasswordStep3, verifyCode } from "../../features/redux/userSlice";
import ButtonLoading from "../ButtonLoading/ButtonLoading";
import { resendConfirmationCode } from "../../features/redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { setResetPasswordStep } from "../../features/redux/appSlice";
import { useState } from "react";
import { relativePaths } from '../../navigation';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendButtonIsLoading, setSendButtonIsLoading] = useState(false);
  const { msg, msgType, isLoading } = useSelector((state) => state.app);
  const { resetPasswordStep } = useSelector((state) => state.app);
  const { Formik } = formik;
  const schema1 = yup.object().shape({
    email: yup.string().required().email().max(50),
  });
  const schema2 = yup.object().shape({
    code: yup.string().required().length(6),
  });

  const schema3 = yup.object().shape({
    password: yup.string().required().min(4).max(50),
    confirmPassword: yup
      .string()
      .required()
      .min(4)
      .max(50)
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  useEffect(() => {
    if (msg) {
      if (msgType === "success") {
        toast.success(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (msgType === "error") {
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (msgType === "info") {
        toast.info(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      dispatch(setMsg(""));
    }
  }, [msg]);

  const handleClickCreateAccount = () => {
    navigate(relativePaths.authentification);
  };

  const handlesendCodeButtonClick = () => {
    console.log("click");
  };

  return (
    <div className="container mt-2">
      {resetPasswordStep === 1 && (
        <>
          <header className="form-block__header">
            <h1>Forgot your password ?</h1>
            <p style={{ marginLeft: "35px", marginRight: "30px" }}>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </header>
          <Formik
            validationSchema={schema1}
            onSubmit={(values, actions) => {
              setSendButtonIsLoading(true);
              dispatch(resetPasswordStep1(values))
              .then(()=>setSendButtonIsLoading(false))
              //   let code = { verificationCode: values.verificationCode };
              //   dispatch(verifyCode(code));
              //   actions.setSubmitting(false);
              //   actions.resetForm({ values: { email: ""} });
            }}
            initialValues={{ email: "" }}
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
                  e.preventDefault();
                }}
              >
                <Row className="mb-3">
                  <Col md={{ span: 10, offset: 1 }}>
                    <Form.Group controlId="validationFormik03">
                      <FloatingLabel
                        controlId="validationFormik03"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          aria-describedby="inputGroupPrepend"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && !!errors.email}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <div className="btn-submit">
                      {/* <ButtonLoading onClick={handlesendCodeButtonClick}/> */}

                      <Button
                        variant="danger"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled={sendButtonIsLoading}
                      >
                        Send Reset Code
                        {sendButtonIsLoading && (
                          <CircularProgress
                            size={15}
                            sx={{ marginLeft: "15px" }}
                          />
                        )}
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginTop: "30px",
                      }}
                    >
                      Don't have an account ?
                      <Button
                        variant="light"
                        type="button"
                        onClick={handleClickCreateAccount}
                      >
                        Create an Account
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      )}

      {resetPasswordStep === 2 && (
        <>
          <header className="form-block__header">
            <h1>Verify Code</h1>
            <p style={{ marginLeft: "35px", marginRight: "30px" }}>
              Please check your email. A unique code has been sent to you.
            </p>
          </header>
          <Formik
            validationSchema={schema2}
            onSubmit={(values, actions) => {
              setSendButtonIsLoading(true);
              dispatch(resetPasswordStep2(values))
              .then(()=>setSendButtonIsLoading(false))
              //   let code = { verificationCode: values.verificationCode };
              //   dispatch(verifyCode(code));
              //   actions.setSubmitting(false);
              //   actions.resetForm({ values: { email: ""} });
              console.log("submit");
            }}
            initialValues={{ email: "" }}
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
                  e.preventDefault();
                }}
              >
                <Row className="mb-3">
                  <Col md={{ span: 10, offset: 1 }}>
                    <Form.Group controlId="validationFormik03">
                      <FloatingLabel
                        controlId="validationFormik03"
                        label="Code"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Code"
                          aria-describedby="inputGroupPrepend"
                          name="code"
                          value={values.code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.code && !errors.code}
                          isInvalid={touched.code && !!errors.code}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <div className="btn-submit">
                      {/* <ButtonLoading onClick={handlesendCodeButtonClick}/> */}

                      <Button
                        variant="danger"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled={sendButtonIsLoading}
                      >
                        Confirm code
                        {sendButtonIsLoading && (
                          <CircularProgress
                            size={15}
                            sx={{ marginLeft: "15px" }}
                          />
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      )}

      {resetPasswordStep === 3 && (
        <>
          <header className="form-block__header">
            <h1>Reset Password</h1>
            <p style={{ marginLeft: "35px", marginRight: "30px" }}>
              You've successfully verified your account. Enter your new password below.
            </p>
          </header>
          <Formik
            validationSchema={schema3}
            onSubmit={(values, actions) => {
              setSendButtonIsLoading(true);
              dispatch(resetPasswordStep3({"password":values.password}))
              .then(()=>{
                setSendButtonIsLoading(false)
                navigate(relativePaths.landingPage)
              })
              console.log(sendButtonIsLoading);
              //   let code = { verificationCode: values.verificationCode };
              //   dispatch(verifyCode(code));
              //   actions.setSubmitting(false);
              //   actions.resetForm({ values: { email: ""} });
              console.log("submit");
            }}
            initialValues={{ password: "", confirmPassword: "" }}
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
                  e.preventDefault();
                }}
              >
                <Row className="mb-3">
                  <Col md={{ span: 10, offset: 1 }}>
                    <FloatingLabel
                      controlId="validationFormik04"
                      label="Password"
                      className="mb-3"
                    >
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
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="validationFormik05"
                      label="Confirm Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <div className="btn-submit">
                      {/* <ButtonLoading onClick={handlesendCodeButtonClick}/> */}

                      <Button
                        variant="danger"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled={sendButtonIsLoading}
                      >
                        Change Password
                        {sendButtonIsLoading && (
                          <CircularProgress
                            size={15}
                            sx={{ marginLeft: "15px" }}
                          />
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default ResetPasswordForm;
