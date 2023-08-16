import "./Contact.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import * as formik from "formik";
import EmailIcon from "@mui/icons-material/Email";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { sendMessage } from "../../features/redux/adminDashboardSlice";

const Contact = () => {
  const { Formik, Field } = formik;
    const dispatch = useDispatch()
  const schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup.string().required().email().max(50),
    subject: yup.string().required(),
    message: yup.string().required(),
  });

  return (
    <>
    <h3 className="styleContactus" id="contact"> CONTACT US </h3>
    <div className="container mt-5">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="styleForm"
      >
        <h6 className="styleTextContact">
          {" "}
          <EmailIcon sx={{ width: "30px" }} /> You have additional questions
          about our product ? Don’t hesitate to contact us trough our contact
          form.
        </h6>

        <Formik
          validationSchema={schema}
          onSubmit={(values, actions) => {
            console.log(values);
            dispatch(sendMessage(values))
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                name: "",
                email: "",
                subject: "",
                message: "",
              },
            });
          }}
          initialValues={{
            name: "",
            email: "",
            subject: "",
            message: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            handleReset,
          }) => (
            <Form noValidate onSubmit={handleSubmit} className="styleForm">
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="validationFormik01">
                    <FloatingLabel
                      controlId="validationFormik01"
                      label="Name"
                      className="mb-3"
                    >
                      <Form.Control
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
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
                    label="Subject"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.subject && !errors.subject}
                      isInvalid={touched.subject && !!errors.subject}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="validationFormik06"
                    label="Message"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      style={{ height: '120px' }}
                      placeholder="Message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.message && !errors.message}
                      isInvalid={touched.message && !!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button className="btn-styling" variant="contained" endIcon={<SendIcon sx={{marginLeft:"10px"}} />} type="submit">
                      Send
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
};

export default Contact;
