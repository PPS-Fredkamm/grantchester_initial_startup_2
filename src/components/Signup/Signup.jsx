import { useUser } from '../../Data/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

import './Signup.css';

export default function Signup() {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSignup = () => {
    login(); // sets isAuthenticated to true
    navigate('/'); // navigate to protected page
  };

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

              <Button variant="primary" type="submit" className="w-100">
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
