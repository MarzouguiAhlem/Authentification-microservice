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
import { setMsg } from "../../../features/redux/appSlice";
import { userSignup } from "../../../features/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AddUser } from "../../../features/redux/adminDashboardSlice";

const AddUserForm = () => {
  const { Formik, Field } = formik;

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup
      .string()
      .required()
      .min(2)
      .max(20)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup.string().required().email().max(50),
    adress: yup.string().required().max(200),
    role: yup.string().required(),
  });
  const dispatch = useDispatch();
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
      dispatch(setMsg(""));
    }
  }, [msg]);

  return (
    <div className="container mt-5">
      <h3>Add User/Admin</h3>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          let user = values;
          console.log(user);
          dispatch(AddUser(user));
          actions.setSubmitting(false);
          actions.resetForm({
            values: {
              firstName: "",
              lastName: "",
              email: "",
              adress: "",
              role: "",
            },
          });
        }}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          adress: "",
          role: "",
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
          <Form noValidate onSubmit={handleSubmit}>
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

                <div role="group" aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="role" value="user" />
                    User
                  </label>
                  <br />
                  <label>
                    <Field type="radio" name="role" value="admin" />
                    Admin
                  </label>
                  <p
                    style={{
                      color: "#ffa4a4",
                      letterSpacing: "0.1em",
                      fontSize: "0.875em",
                    }}
                  >
                    {errors.role}
                  </p>
                </div>
                <div className="btn-submit">
                  <Button variant="danger" type="submit">
                    Add
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

export default AddUserForm;
