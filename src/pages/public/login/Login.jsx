import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

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
          <Card className="login-card">
            <Card.Header className="login-header">
              <h3 className="login-title">
                <div className="icon">
                  <FaSignInAlt />
                </div>
                Welcome Back
              </h3>
              <p className="login-subtitle">Sign in to your account to continue</p>
            </Card.Header>
            <Card.Body className="login-body">
              <Form onSubmit={handleLogin}>
                <Form.Group className="form-group">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="modern-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="modern-input"
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

                <div className="forgot-password-section">
                  <span
                    role="button"
                    className="forgot-password-link"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot your password?
                  </span>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="login-button"
                >
                  Sign In
                </Button>
              </Form>

              <div className="signup-link-section">
                <p className="signup-text">
                  Don't have an account?{" "}
                  <Link to="/signup" className="auth-link">
                    Create one now
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
