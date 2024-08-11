import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");

  // State to validate if the password matches the confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    // check if the password matches the confirm password
    if (form.checkValidity() === false || !passwordMatch) {
      setValidated(true);
      return;
    }
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    setValidated(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="row w-100">
        {/* Left Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="text-center w-100">
            <h1>Join Us!</h1>
            <p>Create an account to get started.</p>
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
                controlId="floatingName"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingEmail"
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
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  isInvalid={!passwordMatch}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button variant="success" className="mt-3 w-100" type="submit">
                Sign Up
              </Button>
            </Form>
            <div className="d-flex justify-content-center align-items-center mt-4 pt-3 border-top">
              <Link to="/login">
                <Button className="mt-3" variant="primary">
                  Already have account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
