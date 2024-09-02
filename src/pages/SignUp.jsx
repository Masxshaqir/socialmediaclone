import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { register, login } from "../services/API/authServices";
import signupPage from "../assets/sign_up.svg";

import { AppContext } from "../App";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUserEmailInLogin, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const formData = new FormData(form);
    const first_name = formData.get("firstName");
    const last_name = formData.get("lastName");
    const email = formData.get("email");

    if (email && password && last_name && first_name) {
      try {
        const response = await register({
          email,
          password,
          first_name,
          last_name,
        });

        if (response && response.result) {
          const loginResponse = await login({ email, password });

          if (
            loginResponse &&
            loginResponse.result &&
            loginResponse.result.token
          ) {
            const token = loginResponse.result.token;
            const email = loginResponse.result.email;
            setToken(token);
            setUserEmailInLogin(email);
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userEmail", email);
            navigate("/");
          } else {
            throw new Error("Login failed");
          }
        } else {
          throw new Error("User with this email already exists.");
        }
      } catch (error) {
        setErrorMessage(
          error.message || "Failed to sign up. Please try again."
        );
        console.error("Failed to sign up:", error);
      }
    }

    setValidated(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 md:pt-0 pt-4 bg-light">
      <div className="row w-100">
        {/* Left Side */}
        <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-center text-center mb-4 mb-md-0">
          <div className="mb-3">
            <img
              src={signupPage}
              alt="signup_image"
              className="img-fluid"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          </div>
          <div className="w-100">
            <h1 className="h4">New Here?</h1>
            <p className="text-muted">
              Sign up to connect and engage with our community.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
          <div className="p-4 bg-white rounded shadow w-100">
            {errorMessage && (
              <Alert
                variant="danger"
                onClose={() => setErrorMessage("")}
                dismissible
              >
                {errorMessage}
              </Alert>
            )}
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="w-100"
            >
              <FloatingLabel
                controlId="floatingFirstName"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingLastName"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
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
              <Button variant="success" className="mt-3 w-100" type="submit">
                Sign Up
              </Button>
            </Form>
            <div className="d-flex justify-content-center align-items-center mt-4 pt-3 border-top">
              <Link to="/login">
                <Button className="mt-3" variant="primary">
                  Already have an account
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
