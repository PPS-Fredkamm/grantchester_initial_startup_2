/**
 * CONFIRMATION STEP - Step 7 of the donation process
 * 
 * This is the final review step where users can see all their donation details
 * and make final edits before submitting. It shows a summary of all information
 * with edit buttons to jump back to specific steps.
 * 
 * Features:
 * - Summary of all donation details
 * - Edit buttons to jump to specific steps
 * - Legal confirmation warning
 * - Submit button with loading state
 * - No navigation buttons (uses its own submit button)
 */

import { Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const ConfirmationStep = ({ 
  formData, // All form data to display
  onEdit, // Function to jump to specific step for editing
  onSubmit, // Function to submit the donation
  isSubmitting // Loading state for submit button
}) => {
  // Helper function to get the final recipient name
  const getRecipientName = () => {
    return formData.recipient === "other"
      ? formData.otherUniversity
      : formData.recipient;
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h5 className="step-title">
          <FaCheckCircle className="me-2" />
          Confirm Your Donation
        </h5>
        <p className="step-description">
          Please review the final details and confirm your donation submission.
        </p>
      </div>

      <div className="step-form">
        <div className="donation-summary">
          <div className="summary-item">
            <div className="summary-icon">
              <FaCheckCircle className="company-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Company/Organization</div>
              <div className="summary-value">{formData.companyName}</div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(1)}
            >
              Edit
            </Button>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <FaCheckCircle className="recipient-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Recipient University</div>
              <div className="summary-value">{getRecipientName()}</div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(2)}
            >
              Edit
            </Button>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <FaCheckCircle className="shares-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Number of Units</div>
              <div className="summary-value">{formData.units}</div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(3)}
            >
              Edit
            </Button>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <FaCheckCircle className="valuation-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Valuation per Unit</div>
              <div className="summary-value">
                $
                {Number(formData.valuation).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(3)}
            >
              Edit
            </Button>
          </div>

          <div className="summary-item total-item">
            <div className="summary-icon">
              <FaCheckCircle className="total-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Total Donation Value</div>
              <div className="summary-value total-value">
                $
                {Number(formData.totalValue).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <FaCheckCircle className="date-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Donation Date</div>
              <div className="summary-value">
                {new Date(formData.donationDate + 'T00:00:00').toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(4)}
            >
              Edit
            </Button>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <FaCheckCircle className="date-icon" />
            </div>
            <div className="summary-content">
              <div className="summary-label">Supporting Document</div>
              <div className="summary-value">
                {formData.file ? formData.file.name : "No document uploaded"}
              </div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(5)}
            >
              Edit
            </Button>
          </div>

          {formData.note && (
            <div className="summary-item">
              <div className="summary-icon">
                <FaCheckCircle className="date-icon" />
              </div>
              <div className="summary-content">
                <div className="summary-label">Message</div>
                <div className="summary-value">{formData.note}</div>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onEdit(5)}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        <div className="legal-warning">
          <div className="warning-content">
            <FaExclamationTriangle className="warning-icon" />
            <div className="warning-text">
              <div className="warning-title">Legal Confirmation Required</div>
              <div className="warning-description">
                By clicking "Submit Donation", you confirm that you are
                authorized to make this private stock donation on behalf of the
                company/organization listed above and understand this action is
                legally binding.
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Button
            variant="primary"
            size="lg"
            className="w-100"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Submitting Donation...
              </>
            ) : (
              <>
                <FaCheckCircle className="me-2" />
                Submit Donation
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
