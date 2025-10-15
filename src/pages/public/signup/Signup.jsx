import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Card,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { register } from "../../../redux/slices/authSlice";

import AlertToast from "../../../components/userInterface/alerts/AlertToast";
import ProfileInfoForm from "./ProfileInfoForm";

import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setShowToast(true);
      return;
    }

    const resultAction = await dispatch(register({ username, password }));

    if (!register.fulfilled.match(resultAction)) {
      setError("Signup failed");
      setShowToast(true);
      return;
    }

    setShowProfileModal(true);
  }

  return (
    <>
      {/* Toast Container */}
      <AlertToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={error}
      />

      <Container className="register-container">
        <div className="register-wrapper">
          <Card className="register-card">
            <Card.Header className="register-header">
              <h3 className="register-title">
                <div className="icon">
                  <FaUserPlus />
                </div>
                Join Us Today
              </h3>
              <p className="register-subtitle">Create your account to get started</p>
            </Card.Header>
            <Card.Body className="register-body">
              <Form onSubmit={handleSignup}>
                <Form.Group className="form-group">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={usernameRef}
                    placeholder="Choose a username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="modern-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="modern-input"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="password-toggle-button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="modern-input"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      className="password-toggle-button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" className="signup-button">
                  Create Account
                </Button>
              </Form>

              <div className="login-link-section">
                <p className="login-text">
                  Already have an account?{" "}
                  <Link to="/login" className="auth-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Profile Info Modal */}
      <Modal
        show={showProfileModal}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
        contentClassName="custom-modal-content"
      >
        <ProfileInfoForm
          username={username}
          onSuccess={() => {
            setShowProfileModal(false);
            navigate("/donor");
          }}
        />
      </Modal>
    </>
  );
}
