import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import * as formik from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMsg } from "../../features/redux/appSlice";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../features/redux/adminDashboardSlice";


const ChangePasswordForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    oldPassword: yup.string().required().min(4).max(50),
    password: yup.string().required().min(4).max(50),
    confirmPassword: yup.string().required().min(4).max(50).oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const dispatch = useDispatch()
  const { msg, msgType, isLoading } = useSelector((state) => state.app);

  // useEffect(() => {
  //   if (msg) {
  //     if (msgType == "success") {
  //       toast.success(msg, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //     if (msgType == "error") {
  //       toast.error(msg, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         });
  //     }
  //     dispatch(setMsg(""))
  //   }
  // }, [msg]);

  return (
    <div className="container mt-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          const {confirmPassword, ...passwords} = values
          console.log(passwords)
          dispatch(changePassword(passwords))
          actions.setSubmitting(false);
          actions.resetForm({
            values: {
              oldPassword: "",
              password:"",
              confirmPassword:"",
            },
          });
        }}
        initialValues={{
          oldPassword: "",
          password:"",
          confirmPassword:"",
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
              <Col md={{ span: 5, offset: 3 }}>

              <FloatingLabel
                  controlId="validationFormik03"
                  label="Old Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="OldPassword"
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.oldPassword && !errors.oldPassword}
                    isInvalid={touched.oldPassword && !!errors.oldPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.oldPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
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

                <div className="btn-submit">
                    <Button variant="danger" type="submit">Change Password</Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
