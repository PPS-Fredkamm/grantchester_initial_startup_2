import { Modal, Button, Badge } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";
import "./DonationTracker.css";

const DonationTracker = ({ show, onHide, donation }) => {
  if (!donation) return null;

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

  const currentStage = normalizeStatus(donation?.status);
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
        <Modal.Title>Donation Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="donation-meta">
          <strong>Donation ID:</strong> {donation?.donationId || "N/A"}
        </div>

        <div className="donation-meta">
          <p>
            <strong>Recipient:</strong> {donation?.university || "N/A"}
          </p>
          <p>
            <strong>Submitted:</strong> {donation?.date || "N/A"}
          </p>
        </div>

        <div className="status-section">
          <div className="status-label">
            <strong>Current Status: </strong>
            <Badge
              bg={getVariant(currentStage)}
              text={currentStage === "Waiting approval" ? "dark" : "light"}
            >
              {currentStage}
            </Badge>
          </div>

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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationTracker;
