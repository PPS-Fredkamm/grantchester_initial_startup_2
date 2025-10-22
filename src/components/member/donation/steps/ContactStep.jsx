/**
 * CONTACT STEP - Step 6 of the donation process
 * 
 * This step displays the user's contact information (read-only) and requires
 * them to agree to the terms and conditions. Contact info comes from user profile.
 * 
 * Features:
 * - Read-only email and phone display
 * - Terms and conditions agreement checkbox
 * - Contact info from user profile (Redux)
 * - Validation for agreement checkbox
 */

import { Form, Row, Col, Container } from "react-bootstrap";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ContactStep({
  formData, // Current form data from parent
  updateForm, // Function to update form data
  email, // User's email from Redux store
  phone, // User's phone from Redux store
  errors = {}, // Validation errors for this step
}) {
  return (
    <div className="step-content">
      <div className="step-header">
        <h5 className="step-title">
          <FaEnvelope className="me-2" />
          Contact Information
        </h5>
        <p className="step-description">
          Review your contact information for donation communications.
        </p>
      </div>

      <Container fluid className="step-form">
        <div className="contact-info-section">
          <h6 className="contact-info-title">
            <FaEnvelope className="me-2" />
            Contact Information
          </h6>
          <Row>
            <Col md={6}>
              <Form.Group className="form-field">
                <Form.Label className="field-label">
                  Contact Email
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-email">
                        This email will be used for all communications.
                        <br />
                        <br />
                        You can update it in your profile settings.
                      </Tooltip>
                    }
                  >
                    <FaCircleInfo className="info-icon" />
                  </OverlayTrigger>
                </Form.Label>
                <div className="input-group-modern">
                  <span className="input-icon-wrapper">
                    <FaEnvelope className="input-icon" />
                  </span>
                  <Form.Control
                    type="email"
                    value={email}
                    readOnly
                    className="form-input readonly-input"
                    required
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-field">
                <Form.Label className="field-label">
                  Contact Phone
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-phone">
                        This number will be used for all communications.
                        <br />
                        <br />
                        You can update it in your profile settings.
                      </Tooltip>
                    }
                  >
                    <FaCircleInfo className="info-icon" />
                  </OverlayTrigger>
                </Form.Label>
                <div className="input-group-modern">
                  <span className="input-icon-wrapper">
                    <FaPhone className="input-icon" />
                  </span>
                  <Form.Control
                    type="text"
                    value={phone}
                    readOnly
                    className="form-input readonly-input"
                    required
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>

        <Row>
          <Col>
            <Form.Group className="agreement-section mt-4">
              <Form.Check id="agreementCheck" className="modern-checkbox">
                <Form.Check.Input
                  type="checkbox"
                  checked={formData.agreementChecked}
                  onChange={(e) =>
                    updateForm("agreementChecked", e.target.checked)
                  }
                  required
                  className="agreement-checkbox"
                />
                <Form.Check.Label className="agreement-label">
                  I confirm that I am authorized to make this private stock
                  donation on behalf of the company/organization listed above
                  and understand this action is legally binding.
                </Form.Check.Label>
              </Form.Check>
              {errors.agreementChecked && (
                <div className="invalid-feedback d-block">
                  {errors.agreementChecked}
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
