/**
 * COMPANY STEP - Step 1 of the donation process
 * 
 * This step collects the company or organization information.
 * Users enter the name of the company that owns the private stock being donated.
 * 
 * Features:
 * - Company name input field
 * - Helpful tooltip with guidance
 * - Real-time validation
 * - Icon-based visual design
 */

import { Form, Row, Col, Container } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function CompanyStep({ 
  formData, // Current form data from parent
  updateForm, // Function to update form data
  errors = {} // Validation errors for this step
}) {
  return (
    <div className="step-content">
      {/* ==========================================================================
           STEP HEADER - Title and description
           ========================================================================== */}
      <div className="step-header">
        <h5 className="step-title">
          <FaBuilding className="me-2" />
          Company Information
        </h5>
        <p className="step-description">
          Enter the company or organization that owns the private stock being
          donated.
        </p>
      </div>

      {/* ==========================================================================
           STEP FORM - Company name input field
           ========================================================================== */}
      <Container fluid className="step-form">
        <Row>
          <Col>
            <Form.Group className="form-field">
              {/* Field label with required asterisk and help tooltip */}
              <Form.Label className="field-label">
                Company or Organization{" "}
                <span className="required-asterisk">*</span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-company">
                      Enter the full legal name of the company or organization
                      <br />
                      owning the private stock being donated.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              
              {/* Input field with icon and validation */}
              <div className="input-group-modern">
                <span className="input-icon-wrapper">
                  <FaBuilding className="input-icon" />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter the company or organization name"
                  value={formData.companyName}
                  onChange={(e) => updateForm("companyName", e.target.value)}
                  onBlur={(e) =>
                    updateForm("companyName", e.target.value.trim())
                  }
                  required
                  autoComplete="organization"
                  inputMode="text"
                  title="Please enter a valid company/organization name."
                  className={`form-input ${
                    errors.companyName ? "is-invalid" : ""
                  }`}
                />
                {/* Display validation error if present */}
                {errors.companyName && (
                  <div className="invalid-feedback">{errors.companyName}</div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
