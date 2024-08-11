import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("password");
      console.log("Email:", email);
      console.log("Password:", password);
    }
    setValidated(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="row w-100">
        {/* Left Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="text-center w-100">
            <h1>Welcome Back!</h1>
            <p>Please login to your account.</p>
          </div>
        </div>
        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="p-4 bg-white rounded shadow w-100">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="w-100"
            >
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </FloatingLabel>
              <Button className="mt-3 w-100" type="submit">
                Login
              </Button>
            </Form>
            <div className="d-flex justify-content-center align-items-center mt-4 pt-3 border-top">
              <Button variant="success">
                Create new account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
