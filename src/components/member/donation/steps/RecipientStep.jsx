/**
 * RECIPIENT STEP - Step 2 of the donation process
 * 
 * This step allows users to select the university that will receive their donation.
 * Users can choose from partner universities or select "Other" for custom institutions.
 * 
 * Features:
 * - Dropdown with partner universities
 * - "Other" option for custom universities
 * - Conditional custom university name field
 * - Helpful tooltips with guidance
 */

import { Form, Row, Col, Container } from "react-bootstrap";
import { FaUniversity } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function RecipientStep({ 
  formData, // Current form data from parent
  updateForm, // Function to update form data
  errors = {} // Validation errors for this step
}) {
  // List of partner universities
  const universities = [
    "Penn State",
    "MIT",
    "Temple",
    "Drexel",
    "Lincoln University",
    "Other",
  ];

  return (
    <div className="step-content">
      {/* ==========================================================================
           STEP HEADER - Title and description
           ========================================================================== */}
      <div className="step-header">
        <h5 className="step-title">
          <FaUniversity className="me-2" />
          Recipient University
        </h5>
        <p className="step-description">
          Select the university that will receive your donation.
        </p>
      </div>

      {/* ==========================================================================
           STEP FORM - University selection dropdown
           ========================================================================== */}
      <Container fluid className="step-form">
        <Row>
          <Col>
            <Form.Group className="form-field">
              {/* Field label with required asterisk and help tooltip */}
              <Form.Label className="field-label">
                Recipient (University){" "}
                <span className="required-asterisk">*</span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-recipient">
                      Select the university that will receive your donation.
                      <br />
                      <br />
                      Choose from our partner universities or select "Other"
                      <br />
                      for institutions not listed.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              
              {/* University selection dropdown */}
              <div className="input-group-modern">
                <span className="input-icon-wrapper">
                  <FaUniversity className="input-icon" />
                </span>
                <Form.Select
                  value={formData.recipient}
                  onChange={(e) => updateForm("recipient", e.target.value)}
                  required={formData.recipient !== "other"}
                  className={`form-input ${
                    errors.recipient ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select a university...</option>
                  {universities.map((uni, index) => (
                    <option
                      key={index}
                      value={uni.toLowerCase() === "other" ? "other" : uni}
                    >
                      {uni}
                    </option>
                  ))}
                </Form.Select>
                {errors.recipient && (
                  <div className="invalid-feedback">{errors.recipient}</div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>

        {formData.recipient === "other" && (
          <Row>
            <Col>
              <Form.Group className="form-field mt-3">
                <Form.Label className="field-label">
                  University Name <span className="required-asterisk">*</span>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-other-university">
                        Enter the complete legal name of the university
                        <br />
                        that will receive your donation.
                      </Tooltip>
                    }
                  >
                    <FaCircleInfo className="info-icon" />
                  </OverlayTrigger>
                </Form.Label>
                <div className="input-group-modern">
                  <span className="input-icon-wrapper">
                    <FaUniversity className="input-icon" />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Enter the university name"
                    value={formData.otherUniversity}
                    onChange={(e) =>
                      updateForm("otherUniversity", e.target.value)
                    }
                    required
                    title="Please enter a valid university name."
                    className={`form-input ${
                      errors.otherUniversity ? "is-invalid" : ""
                    }`}
                  />
                  {errors.otherUniversity && (
                    <div className="invalid-feedback">
                      {errors.otherUniversity}
                    </div>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
