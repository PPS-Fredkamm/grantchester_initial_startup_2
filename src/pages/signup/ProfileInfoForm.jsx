import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

export default function ProfileInfoForm({ onSuccess }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // TODO: handle save logic
      onSuccess();
    }

    setValidated(true);
  };

  return (
    <div className="profile-info-wrapper">
      <Card className="profile-card shadow">
        <Card.Body>
          <h4 className="text-center mb-4">Profile Information</h4>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="First name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Last name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="zip">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" placeholder="Zip" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="terms">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            <Button type="submit" className="signup-button w-100 mb-2">
              Save & Continue
            </Button>

            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => navigate('/donor')}
            >
              Skip for Now
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
