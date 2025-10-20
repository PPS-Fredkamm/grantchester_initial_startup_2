import { Modal, Button, Badge } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";

import { formatDate } from "../../../../utils/formatDate";
import { formatNumber, formatCurrency } from "../../../../utils/formatNumber";

/* CSS moved to: src/styles/components/modals/donor-tracker-modal.css */

export default function DonationTracker({ show, onHide, donation }) {
  if (!donation) return null;

  // ===========================
  // Normalize fields from Redux data
  // ===========================
  const id = donation.donationID || donation.id || "N/A";
  const university = donation.universityCDO?.name || "N/A";
  const company =
    donation.companyCDO?.name || `ID: ${donation.companyID || "N/A"}`;
  const status = donation.donationStatus?.name || "Unknown";
  const units = donation.units || 0;
  const initialValuation = donation.initialValuation || 0;
  const totalValue = units * initialValuation;
  const valuationDate = donation.valuationDate
    ? formatDate(donation.valuationDate)
    : "N/A";
  const dateSubmitted = donation.donationDate
    ? formatDate(donation.donationDate)
    : "N/A";
  const note = donation.note || "";

  const stages = [
    "Submitted",
    "Donation verification by university",
    "Waiting approval",
    "Completed",
  ];

  // Normalize the incoming status to one of our stage labels
  const normalizeStatus = (statusText = "") => {
    const lowerCaseStatus = statusText.toLowerCase();

    if (lowerCaseStatus.includes("verification")) {
      return stages[1]; // "Donation verification by university"
    }
    if (lowerCaseStatus.includes("waiting")) {
      return stages[2]; // "Waiting approval"
    }
    if (lowerCaseStatus.includes("completed")) {
      return stages[3]; // "Completed"
    }

    return stages[0]; // Default to "Submitted"
  };

  const currentStage = normalizeStatus(status);
  const currentIdx = stages.indexOf(currentStage);

  const getVariant = (stage) => {
    switch (stage) {
      case "Submitted":
        return "secondary"; // gray
      case "Donation verification by university":
        return "primary"; // blue
      case "Waiting approval":
        return "warning"; // yellow
      case "Completed":
        return "success"; // green
      default:
        return "secondary"; // fallback gray
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="tracker-modal">
      <Modal.Header closeButton>
        <Modal.Title>Donation Tracker</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* === Top Row: Progress Tracker === */}
        <div className="progress-section">
          <div className="progress-header">
            <h6>Progress Tracker</h6>
            <Badge
              className="status-badge"
              bg={getVariant(currentStage)}
              text={currentStage === "Waiting approval" ? "dark" : "light"}
            >
              {currentStage}
            </Badge>
          </div>
          <Stepper
            steps={stages.map((stage) => ({ title: stage }))}
            activeStep={currentIdx}
            activeColor="#4b9be7"
            completeColor="#198754"
            defaultColor="#dee2e6"
            activeTitleColor="#4b9be7"
            completeTitleColor="#198754"
            defaultTitleColor="#6c757d"
            size={28}
            circleFontSize={12}
            barStyle="solid"
          />
        </div>

        {/* === Bottom Row: Two Column Layout === */}
        <div className="details-section">
          {/* === Left Column: Donation Information === */}
          <div className="donation-section info-column">
            <h6>Donation Information</h6>
            <div className="info-grid">
              <div className="info-item">
                <strong>Donation ID</strong>
                <span>#{id}</span>
              </div>
              <div className="info-item">
                <strong>University</strong>
                <span>{university}</span>
              </div>
              <div className="info-item">
                <strong>Company</strong>
                <span>{company}</span>
              </div>
              <div className="info-item">
                <strong>Date Submitted</strong>
                <span>{dateSubmitted}</span>
              </div>
            </div>
            {note && (
              <div className="note-section">
                <strong>Additional Note</strong>
                <p>{note}</p>
              </div>
            )}
          </div>

          {/* === Right Column: Financial Details === */}
          <div className="donation-section financial-column">
            <h6>Financial Details</h6>
            <div className="financial-grid">
              <div className="financial-item">
                <strong>Units Donated</strong>
                <div className="value">{formatNumber(units)}</div>
              </div>
              <div className="financial-item">
                <strong>Valuation per Share</strong>
                <div className="currency">
                  {formatCurrency(initialValuation)}
                </div>
              </div>
              <div className="financial-item">
                <strong>Total Value</strong>
                <div className="currency">{formatCurrency(totalValue)}</div>
              </div>
              <div className="financial-item">
                <strong>Valuation Date</strong>
                <div className="value">{valuationDate}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
