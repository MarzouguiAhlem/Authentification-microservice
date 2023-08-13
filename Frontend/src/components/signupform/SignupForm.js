import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import './Signup.css'
import * as yup from "yup";
import * as formik from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMsg } from "../../features/redux/appSlice";
import { setSignupEmail, userSignup } from "../../features/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { relativePaths } from '../../navigation';


const SignupForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required().min(3).max(20).matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup.string().required().min(2).max(20).matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup.string().required().email().max(50),
    password: yup.string().required().min(4).max(50),
    confirmPassword: yup.string().required().min(4).max(50).oneOf([yup.ref('password'), null], 'Passwords must match'),
    adress: yup.string().required().max(200),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { msg, msgType, isLoading } = useSelector((state) => state.app);

  useEffect(() => {
    if (msg) {
      if (msgType == "success") {
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
      if (msgType == "error") {
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
      dispatch(setMsg(""))
    }
  }, [msg]);

  return (
    <div className="container mt-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          let {confirmPassword,terms,...user} = values
          console.log(user)
          dispatch(userSignup({user:user, navigate:navigate}))
          // dispatch(userSignup(user))
          // .then(()=>navigate(relativePaths.verifyEmail))
          actions.setSubmitting(true);
          actions.resetForm({
            values: {
              firstName: "",
              lastName: "",
              email: "",
              password:"",
              confirmPassword:"",
              adress: "",
              terms: false,
            },
          });
        }}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password:"",
          confirmPassword:"",
          adress: "",
          terms: false,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          handleReset,
        }) => (
          <Form noValidate onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit(e)
            e.preventDefault()
            }}>
            <Row className="mb-3">
              <Col md={{ span: 10, offset: 1 }}>
                <Form.Group controlId="validationFormik01">
                  {/* <Form.Label>First name</Form.Label> */}
                  <FloatingLabel
                    controlId="validationFormik01"
                    label="First Name"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="validationFormik02">
                  <FloatingLabel
                    controlId="validationFormik02"
                    label="Last Name"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lastName && !errors.lastName}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

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
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>


                <FloatingLabel
                  controlId="validationFormik06"
                  label="Adress"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Adress"
                    name="adress"
                    value={values.adress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.adress && !errors.adress}
                    isInvalid={touched.adress && !!errors.adress}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.adress}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.terms && touched.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    id="validationFormik07"
                  />
                </Form.Group>
                <div className="btn-submit">
                    <Button variant="danger" type="submit">Sign Up</Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
