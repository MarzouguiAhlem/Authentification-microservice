import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import * as formik from "formik";
import { useDispatch } from "react-redux";
import { changeName } from "../../features/redux/adminDashboardSlice";


const ChangeNameForm = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required().min(3).max(20).matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup.string().required().min(2).max(20).matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  });
  const dispatch = useDispatch()



  return (
    <div className="container mt-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          const user = values
          dispatch(changeName(user))
          actions.setSubmitting(false);
          actions.resetForm({
            values: {
              firstName: "",
              lastName: ""
            },
          });
        }}
        initialValues={{
          firstName: "",
          lastName: "",
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

               
                <div className="btn-submit">
                    <Button variant="danger" type="submit">Change Name</Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeNameForm;
