import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/API/authServices";

const Login = ({ setToken }) => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("password");

      if (email && password) {
        try {
          const response = await login({ email, password });

          const token = response.result.token;
          setToken(token);
          sessionStorage.setItem("authToken", token);
          // Redirect to home
          navigate("/");
        } catch (error) {
          console.error("Failed to login:", error);
        }
      }
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
              <Link to="/signup">
                <Button variant="success">Create new account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
