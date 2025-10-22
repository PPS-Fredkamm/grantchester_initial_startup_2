/**
 * DOCUMENTS STEP - Step 5 of the donation process (Optional)
 * 
 * This step allows users to upload supporting documents for their donation.
 * This step is completely optional and has no validation requirements.
 * 
 * Features:
 * - File upload field (PDF, DOC, DOCX)
 * - Optional message/notes field
 * - No validation required (optional step)
 * - Helpful tooltips with guidance
 */

import { Form, Row, Col, Container } from "react-bootstrap";
import { FaFileAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function DocumentsStep({ 
  formData, // Current form data from parent
  updateForm, // Function to update form data
  errors = {} // Validation errors for this step (none required)
}) {
  return (
    <div className="step-content">
      <div className="step-header">
        <h5 className="step-title">
          <FaFileAlt className="me-2" />
          Supporting Documents
        </h5>
        <p className="step-description">
          Upload any supporting documents for your donation (optional).
        </p>
      </div>

      <Container fluid className="step-form">
        <Row>
          <Col>
            <Form.Group className="form-field">
              <Form.Label className="field-label">
                Upload Document (Optional)
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-file">
                      Upload supporting documents for your donation.
                      <br />
                      <br />
                      Examples: Valuation statement, bill of sale, legal note.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              <div className="input-group-modern">
                <span className="input-icon-wrapper">
                  <FaFileAlt className="input-icon" />
                </span>
                <Form.Control
                  type="file"
                  onChange={(e) => updateForm("file", e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className={`form-input file-input ${
                    errors.file ? "is-invalid" : ""
                  }`}
                />
                {errors.file && (
                  <div className="invalid-feedback">{errors.file}</div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="form-field mt-3">
              <Form.Label className="field-label">
                Message (Optional)
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-message">
                      Add any additional notes or instructions for the
                      university
                      <br />
                      regarding your donation.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.note}
                onChange={(e) => updateForm("note", e.target.value)}
                placeholder="Add a note for the university"
                className={`form-input textarea-input ${
                  errors.note ? "is-invalid" : ""
                }`}
              />
              {errors.note && (
                <div className="invalid-feedback">{errors.note}</div>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
