import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";

import { useAuthContext } from "../../context/AuthProvider";

import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useAuthContext();
  const navigate = useNavigate();

async function handleLogin(e) {
  e.preventDefault();

  const success = await authCtx.login(username, password);

  if (success) {
    navigate("/university");
  } else {
    console.error("Login failed");
  }
}

  // ========================================
  // ========================================

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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Form.Text className="text-center d-block m-3">
                <Link to="/forgot-password" className="auth-link me-3">
                  Forgot password?
                </Link>
              </Form.Text>

              <Button variant="primary" type="submit" className="w-100">
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
