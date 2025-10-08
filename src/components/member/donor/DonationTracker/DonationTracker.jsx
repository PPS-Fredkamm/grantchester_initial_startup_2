import { Modal, Button, Badge } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";

import { formatDate } from "../../../../utils/formatDate";
import { formatNumber, formatCurrency } from "../../../../utils/formatNumber";

import "./DonationTracker.css";

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
        {/* === 1. Donation Overview === */}
        <div className="donation-section">
          <h6 className="text-muted mb-2">Overview</h6>
          <p>
            <strong>Donation ID:</strong> #{id}
          </p>
          <p>
            <strong>University:</strong> {university}
          </p>
          <p>
            <strong>Company:</strong> {company}
          </p>
          <p>
            <strong>Date Submitted:</strong> {dateSubmitted}
          </p>
          <p className="mt-2">
            <strong>Status:</strong>{" "}
            <Badge
              bg={getVariant(currentStage)}
              text={currentStage === "Waiting approval" ? "dark" : "light"}
            >
              {currentStage}
            </Badge>
          </p>
          {/* === Stepper === */}
          <div className="status-section">
            <Stepper
              steps={stages.map((stage) => ({ title: stage }))}
              activeStep={currentIdx}
              activeColor="#0d6efd"
              completeColor="#198754"
              defaultColor="#dee2e6"
              activeTitleColor="#0d6efd"
              completeTitleColor="#198754"
              defaultTitleColor="#6c757d"
              size={36}
              circleFontSize={18}
              barStyle="solid"
            />
          </div>
        </div>

        {/* === 2. Donation Details === */}
        <hr />
        <div className="donation-section">
          <h6 className="text-muted mb-2">Donation Details</h6>
          <p>
            <strong>Units Donated:</strong> {formatNumber(units)}
          </p>
          <p>
            <strong>Initial Valuation (per share):</strong>{" "}
            {formatCurrency(initialValuation)}
          </p>
          <p>
            <strong>Total Estimated Value:</strong> {formatCurrency(totalValue)}
          </p>
          <p>
            <strong>Valuation Date:</strong> {valuationDate}
          </p>
          {note && (
            <p>
              <strong>Note:</strong> {note}
            </p>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
