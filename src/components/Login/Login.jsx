import { useUser } from '../../Data/UserContext';
import { useNavigate, Link } from 'react-router-dom';

import { Form, Button, Container, Card } from 'react-bootstrap';
import './Login.css';

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(); // sets isAuthenticated to true
    navigate('/'); // navigate to protected page
  };

  return (
    <Container className="login-container">
      <div className="login-wrapper">
        <Card className="login-card shadow">
          <Card.Body>
            <h3 className="text-center mb-4">Sign In</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
              </Form.Group>

              <Form.Text className="text-center d-block m-3">
                <Link to="/forgot-password" className="auth-link me-3">
                  Forgot password?
                </Link>
              </Form.Text>

              <Button variant="primary" type="submit" className="login-button w-100">
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
  );
}
