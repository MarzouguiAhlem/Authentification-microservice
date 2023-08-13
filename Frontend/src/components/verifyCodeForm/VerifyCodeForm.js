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
import { verifyCode } from "../../features/redux/userSlice";
import ButtonLoading from "../ButtonLoading/ButtonLoading";
import { resendConfirmationCode } from "../../features/redux/userSlice";
import { relativePaths } from '../../navigation';

const VerifyCodeForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string(),
    verificationCode: yup.string().required().length(6),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { msg, msgType, isLoading } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.user.user);
  const { email } = useSelector((state) => state.user.user);


  useEffect(() => {
    if (msg) {
      if (msgType === "success") {
        navigate(relativePaths.userDashboard);
        toast.success(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if (msgType === "error") {
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if (msgType === "info") {
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


  const handlesendCodeButtonClick = () => {
    dispatch(resendConfirmationCode())
  }

  return (
    <div className="container mt-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          let code = { verificationCode: values.verificationCode };
          dispatch(verifyCode(code));
          actions.setSubmitting(false);
          actions.resetForm({ values: { email: email, verificationCode: "" } });
        }}
        initialValues={{ email: email, verificationCode: "" }}
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
                      disabled
                      type="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FloatingLabel>
                </Form.Group>

                <FloatingLabel
                  controlId="validationFormik04"
                  label="Verification code"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Verification code"
                    name="verificationCode"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.verificationCode && !errors.verificationCode
                    }
                    isInvalid={
                      touched.verificationCode && !!errors.verificationCode
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.verificationCode}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <div className="btn-submit">
                  <ButtonLoading  onClick={handlesendCodeButtonClick}/>
                  <Button variant="danger" type="submit">
                    Verify Email
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyCodeForm;
