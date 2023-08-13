import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./../signupform/Signup.css";
import * as yup from "yup";
import * as formik from "formik";
import { useDispatch } from "react-redux";
import { logout, userLogin } from "../../features/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setMsg } from "../../features/redux/appSlice";
import { getSessionInfo } from '../../features/redux/userSlice'
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().required().email().max(50),
    password: yup.string().required().min(2).max(50),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { msg, msgType, isLoading } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.user.user);
  const {user} = useSelector((state)=>state.user)

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getSessionInfo())
  }
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())

  }

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
      else if (msgType === "warning") {
        toast.warn(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      dispatch(setMsg(""))
    }
  }, [msg]);

  return (
    <div className="container mt-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          dispatch(userLogin({user:values, navigate:navigate}))
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
      {/* <button onClick={handleClick}>get Session</button>
      <button onClick={handleLogout}>logout</button> */}
      <div>
        <span>Forgot your password ? </span>
        <Link to="/resetPassword"> Click here</Link>
      </div>
    </div>
  );
};

export default LoginForm;
