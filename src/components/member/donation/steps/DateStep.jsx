/**
 * DATE STEP - Step 4 of the donation process
 * 
 * This step allows users to select the donation date. Users can choose
 * today's date or a future date for tax purposes.
 * 
 * Features:
 * - Date picker with today as default
 * - Minimum date validation (today or later)
 * - Helpful tooltip with guidance
 * - Simple, focused interface
 */

import { Form, Row, Col, Container } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function DateStep({ 
  formData, // Current form data from parent
  updateForm, // Function to update form data
  errors = {} // Validation errors for this step
}) {
  return (
    <div className="step-content">
      <div className="step-header">
        <h5 className="step-title">
          <FaCalendarAlt className="me-2" />
          Donation Date
        </h5>
        <p className="step-description">
          Select the date for your donation. You may choose today's date or a
          future date for tax purposes.
        </p>
      </div>

      <Container fluid className="step-form">
        <Row>
          <Col>
            <Form.Group className="form-field">
              <Form.Label className="field-label">
                Donation Date
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-date">
                      You may choose today's date or a future date for tax
                      purposes.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              <div className="input-group-modern">
                <span className="input-icon-wrapper">
                  <FaCalendarAlt className="input-icon" />
                </span>
                <Form.Control
                  type="date"
                  value={formData.donationDate}
                  onChange={(e) => updateForm("donationDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className={`form-input ${
                    errors.donationDate ? "is-invalid" : ""
                  }`}
                />
                {errors.donationDate && (
                  <div className="invalid-feedback">{errors.donationDate}</div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
