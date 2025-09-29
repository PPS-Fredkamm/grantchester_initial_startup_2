import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import AlertToast from "../../../components/userInterface/alerts/AlertToast";
import ForgotPasswordModal from "./ForgotPassword";

import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    const resultAction = await dispatch(login({ username, password }));

    if (login.fulfilled.match(resultAction)) {
      navigate("/profile");
    } else {
      setError("Username or password is invalid.");
      setShowToast(true);
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }
  }

  return (
    <>
      {/* Toast Container */}
      <AlertToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={error}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        show={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

      <Container className="login-container">
        <div className="login-wrapper">
          <Card className="login-card shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Sign In</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="password-toggle-button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={0}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Text className="text-center d-block m-3">
                  <span
                    role="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </span>
                </Form.Text>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 login-button"
                >
                  Sign In
                </Button>
              </Form>

              <Form.Text className="text-center d-block mt-3">
                <Link to="/signup" className="auth-link">
                  Create an account
                </Link>
              </Form.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
