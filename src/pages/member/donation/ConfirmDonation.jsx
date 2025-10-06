import { Modal, Button } from "react-bootstrap";

export default function ConfirmDonationModal({ show, onClose, onSubmit, formData }) {
  function handleConfirm() {
    if (onSubmit) onSubmit();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Donation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please review your donation details before confirming:</p>
        <ul>
          <li>
            <strong>Company/Organization:</strong> {formData.companyName}
          </li>
          <li>
            <strong>Recipient:</strong> {formData.recipient}
          </li>
          <li>
            <strong>Shares:</strong> {formData.units}
          </li>
          <li>
            <strong>Valuation Per Share:</strong> $
            {Number(formData.valuation).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </li>
          <li>
            <strong>Total Value:</strong> ${Number(formData.totalValue).toLocaleString("en-US")}
          </li>
          <li>
            <strong>Date:</strong> {formData.donationDate}
          </li>
        </ul>
        <p className="text-danger mt-3">
          By confirming, you acknowledge this is a legally binding donation commitment.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirm Donation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
