import { useState } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import * as BLM from "../../managers/BusinessLayerMethods";
import * as ACO from "../../managers/ApiClientObjects";

export default function ProfileInfoForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    cityName: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [validated, setValidated] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      // build DTOs
      const tmpProfile = new ACO.ProfileDTO();
      tmpProfile.firstName = formData.firstName;
      tmpProfile.lastName = formData.lastName;
      tmpProfile.phoneNumber = formData.phoneNumber;
      tmpProfile.email = formData.email;

      const tmpAddress = new ACO.AddressCDO();
      tmpAddress.addressLine1 = formData.address1;
      tmpAddress.cityName = formData.cityName;
      tmpAddress.postalCode = formData.postalCode;
      tmpAddress.state = { name: formData.state };
      tmpAddress.country = { name: formData.country };

      // call business layer
      let flag = await BLM.UpdateProfile(tmpProfile);
      if (flag) {
        flag = await BLM.UpdateAddressCDO(tmpAddress);
      }

      if (flag) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }

    setValidated(true);
  }

  return (
    <div className="profile-info-wrapper">
      <Card className="profile-card shadow">
        <Card.Body>
          <h4 className="text-center mb-4">Profile Information</h4>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="firstName">
                <Form.Label>
                  First Name <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="lastName">
                <Form.Label>
                  Last Name <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="phone">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  required
                  pattern="^[0-9\\-\\+\\s\\(\\)]{7,15}$"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="address1">
                <Form.Label>Address 1 *</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="1234 Main St"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="cityName">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="state">
                <Form.Label>State *</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="postalCode">
                <Form.Label>Postal Code *</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="country">
                <Form.Label>Country *</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
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
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
