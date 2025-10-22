/**
 * UNITS STEP - Step 3 of the donation process
 * 
 * This step collects the donation details including number of units/shares
 * and their valuation. The total value is automatically calculated.
 * 
 * Features:
 * - Number of units input field
 * - Valuation per unit input field
 * - Auto-calculated total value display
 * - Real-time validation
 * - Helpful tooltips with guidance
 */

import { Form, Row, Col, Container } from "react-bootstrap";
import { FaHashtag, FaDollarSign, FaChartLine } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function UnitsStep({ 
  formData, // Current form data from parent
  updateForm, // Function to update form data
  errors = {} // Validation errors for this step
}) {
  return (
    <div className="step-content">
      <div className="step-header">
        <h5 className="step-title">
          <FaChartLine className="me-2" />
          Units & Valuation
        </h5>
        <p className="step-description">
          Enter the number of units and their valuation to calculate the total
          donation value.
        </p>
      </div>

      <Container fluid className="step-form">
        <Row>
          <Col md={6}>
            <Form.Group className="form-field">
              <Form.Label className="field-label">
                Number of Units <span className="required-asterisk">*</span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-units">
                      Enter the total number of units/shares you are donating.
                      <br />
                      <br />
                      This should be a whole number (no decimals).
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              <div className="input-group-modern">
                <span className="input-icon-wrapper">
                  <FaHashtag className="input-icon" />
                </span>
                <Form.Control
                  type="number"
                  value={formData.units}
                  onChange={(e) => updateForm("units", e.target.value)}
                  placeholder="Enter number of units"
                  required
                  min="1"
                  className={`form-input ${errors.units ? "is-invalid" : ""}`}
                />
                {errors.units && (
                  <div className="invalid-feedback">{errors.units}</div>
                )}
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="form-field">
              <Form.Label className="field-label">
                Valuation Per Unit (USD){" "}
                <span className="required-asterisk">*</span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-valuation">
                      Enter the fair market value per unit/share in USD.
                      <br />
                      <br />
                      This should reflect the current market price or valuation.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon" />
                </OverlayTrigger>
              </Form.Label>
              <div className="input-group-modern">
                <span className="input-icon-wrapper">
                  <FaDollarSign className="input-icon" />
                </span>
                <Form.Control
                  type="number"
                  value={formData.valuation}
                  onChange={(e) => updateForm("valuation", e.target.value)}
                  placeholder="0.00"
                  required
                  min="10.00"
                  step=".01"
                  className={`form-input ${
                    errors.valuation ? "is-invalid" : ""
                  }`}
                />
                {errors.valuation && (
                  <div className="invalid-feedback">{errors.valuation}</div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Total Value Display */}
        <Row>
          <Col>
            <div className="total-value-display mt-4">
              <div className="total-value-card">
                <div className="total-value-content">
                  <div className="total-value-label">
                    <FaChartLine className="me-2" />
                    Total Donation Value
                  </div>
                  <div className="total-value-amount">
                    $
                    {Number(formData.totalValue).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
