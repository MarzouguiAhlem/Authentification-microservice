import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import './Signup.css'
import * as yup from "yup";
import { Field } from "formik";
import * as formik from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMsg } from "../../features/redux/appSlice";
import { setSignupEmail, userSignup } from "../../features/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { relativePaths } from '../../navigation';
import { lowercaseRegex, uppercaseRegex, digitRegex, specialCharRegex } from "./passwordRegex";


const SignupForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required().min(3).max(20).matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup.string().required().min(2).max(20).matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup.string().required().email().max(50),
    password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password can't be longer than 50 characters")
    .matches(lowercaseRegex, "Password must include at least one lowercase letter")
    .matches(uppercaseRegex, "Password must include at least one uppercase letter")
    .matches(digitRegex, "Password must include at least one digit")
    .matches(specialCharRegex, "Password must include at least one special character"),
    confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .min(8, "Confirm password must be at least 8 characters")
    .max(50, "Confirm password can't be longer than 50 characters"),
    address: yup.string().required().max(200),
    countryCode: yup
    .string()
    .required("Country Code is required")
    .matches(/^\d+$/, "Country Code must be a number"),

    phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{8,}$/, "Phone number must have at least 8 digits"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { msg, msgType, isLoading } = useSelector((state) => state.app);

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
      if (msgType === "error") {
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
          const { confirmPassword, terms, countryCode, ...user } = values;
          const phoneNumberWithCode = `+${countryCode} ${user.phone}`;
          
          dispatch(userSignup({ user: { ...user, phone: phoneNumberWithCode }, navigate }));
          actions.setSubmitting(true);
          actions.resetForm({
            values: {
              firstName: "",
              lastName: "",
              email: "",
              password:"",
              confirmPassword:"",
              address: "",
              phone: "",
              countryCode: "",
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
          address: "",
          phone: "",
          countryCode: "",
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
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.address && !errors.address}
                    isInvalid={touched.address && !!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="validationFormik09"
                  label="Country Code"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Country Code"
                    name="countryCode"
                    value={values.countryCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.countryCode && !errors.countryCode}
                    isInvalid={touched.countryCode && !!errors.countryCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.countryCode}
                  </Form.Control.Feedback>
                </FloatingLabel>


                <Form.Group controlId="validationFormik08">
                  <FloatingLabel
                    controlId="validationFormik08"
                    label="Phone Number"
                    className="mb-3"
                  >

                  <Field
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    as={Form.Control}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={touched.phone && !!errors.phone}
                  />

                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>


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
