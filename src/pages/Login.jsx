import React,{ useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/API/authServices";
import loginPage from "../assets/login.svg";

import { AppContext } from "../App";

const Login =React.memo( () => {
  const [validated, setValidated] = useState(false);
  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { setUserEmailInLogin, setToken } = useContext(AppContext);

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

          if (response && response.result && response.result.token) {
            const token = response.result.token;
            const email = response.result.email;
            setToken(token);
            setUserEmailInLogin(email);
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userEmail", email);
            navigate("/");
          } else {
            throw new Error("Invalid response from server");
          }
        } catch (error) {
          // Handle the error and display a message
          setErrorMessage("Invalid email or password. Please try again.");
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
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <div className="mb-2">
            <img
              src={loginPage}
              alt="login_image"
              className="img-fluid"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="w-100">
            <h1>Ready to connect?</h1>
            <p>Log in to your social hub.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="p-4 bg-white rounded shadow w-100">
            {errorMessage && (
              <Alert variant="danger" className="text-center">
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
});

export default Login;
