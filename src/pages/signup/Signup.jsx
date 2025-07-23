import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Card,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAuthContext } from '../../context/AuthProvider';

import AlertToast from '../../components/userInterface/AlertToast';
import ProfileInfoForm from './ProfileInfoForm';

import './Signup.css';

export default function Signup() {
  const authCtx = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const usernameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowToast(true);
      return;
    }

    var flag = await authCtx.register(username, password);

    if (!flag) {
      setError('Signup failed');
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
          <Card className="register-card shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Create Account</h3>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={usernameRef}
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
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

                <Form.Group controlId="formConfirmPassword" className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

                <Button type="submit" className="signup-button w-100">
                  Register
                </Button>
              </Form>

              <Form.Text className="text-center d-block mt-3">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign In
                </Link>
              </Form.Text>
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
        {/* Form */}
        <ProfileInfoForm
          username={username}
          onSuccess={() => {
            setShowProfileModal(false);
            navigate('/donor');
          }}
        />
      </Modal>
    </>
  );
}
