import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

import { useAuthContext } from '../../context/AuthProvider';

import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useAuthContext();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    const success = await authCtx.login(username, password);

    if (success) {
      navigate('/member/dashboard');
    } else {
      console.error('Login failed');
    }
  }

  return (
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
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  required
                />
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
  );
}
