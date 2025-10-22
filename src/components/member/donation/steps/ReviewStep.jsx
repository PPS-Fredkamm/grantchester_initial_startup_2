/**
 * REVIEW STEP - Legacy review component (may not be used)
 * 
 * This appears to be an older version of the review/confirmation step.
 * The current system uses ConfirmationStep.jsx instead.
 * 
 * Features:
 * - Summary of all donation details
 * - Edit buttons to jump to specific steps
 * - Legal confirmation warning
 * - Submit button with loading state
 */

import { Button } from "react-bootstrap";
import {
  FaBuilding,
  FaUniversity,
  FaCalendarAlt,
  FaFileAlt,
  FaEnvelope,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

const ReviewStep = ({
  formData, // All form data to display
  email, // User's email from Redux store
  phone, // User's phone from Redux store
  onEdit, // Function to jump to specific step for editing
  onSubmit, // Function to submit the donation
  isSubmitting, // Loading state for submit button
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
          <FaChartLine className="me-2" />
          Review & Confirm Your Donation
        </h5>
        <p className="step-description">
          Please review all the information below and confirm your donation
          submission.
        </p>
      </div>

      <div className="review-content">
        <div className="review-section">
          <h6 className="review-section-title">
            <FaBuilding className="me-2" />
            Company Information
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => onEdit(1)}
            >
              Edit
            </Button>
          </h6>
          <div className="review-item">
            <span className="review-label">Company/Organization:</span>
            <span className="review-value">{formData.companyName}</span>
          </div>
        </div>

        <div className="review-section">
          <h6 className="review-section-title">
            <FaUniversity className="me-2" />
            Recipient University
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => onEdit(2)}
            >
              Edit
            </Button>
          </h6>
          <div className="review-item">
            <span className="review-label">University:</span>
            <span className="review-value">{getRecipientName()}</span>
          </div>
        </div>

        <div className="review-section">
          <h6 className="review-section-title">
            <FaChartLine className="me-2" />
            Donation Details
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => onEdit(3)}
            >
              Edit
            </Button>
          </h6>
          <div className="review-item">
            <span className="review-label">Number of Units:</span>
            <span className="review-value">{formData.units}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Valuation per Unit:</span>
            <span className="review-value">
              $
              {Number(formData.valuation).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="review-item total-item">
            <span className="review-label">Total Value:</span>
            <span className="review-value total-value">
              $
              {Number(formData.totalValue).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <div className="review-section">
          <h6 className="review-section-title">
            <FaCalendarAlt className="me-2" />
            Donation Date
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => onEdit(4)}
            >
              Edit
            </Button>
          </h6>
          <div className="review-item">
            <span className="review-label">Date:</span>
            <span className="review-value">
              {new Date(formData.donationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="review-section">
          <h6 className="review-section-title">
            <FaFileAlt className="me-2" />
            Supporting Documents
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => onEdit(5)}
            >
              Edit
            </Button>
          </h6>
          <div className="review-item">
            <span className="review-label">Document:</span>
            <span className="review-value">
              {formData.file ? formData.file.name : "No document uploaded"}
            </span>
          </div>
          {formData.note && (
            <div className="review-item">
              <span className="review-label">Message:</span>
              <span className="review-value">{formData.note}</span>
            </div>
          )}
        </div>

        <div className="review-section">
          <h6 className="review-section-title">
            <FaEnvelope className="me-2" />
            Contact Information
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => onEdit(6)}
            >
              Edit
            </Button>
          </h6>
          <div className="review-item">
            <span className="review-label">Email:</span>
            <span className="review-value">{email}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Phone:</span>
            <span className="review-value">{phone}</span>
          </div>
        </div>

        {/* Legal Warning */}
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

        {/* Submit Button */}
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
                <FaChartLine className="me-2" />
                Submit Donation
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
