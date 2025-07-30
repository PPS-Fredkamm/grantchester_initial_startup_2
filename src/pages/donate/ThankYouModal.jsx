import { Modal, Button } from "react-bootstrap";

export default function ThankYouModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thank You for Your Donation!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Your donation has been submitted and is now pending. Please allow
          <strong> 3-5 business days</strong> for processing.  
        </p>
        <p>
          A representative will contact you if additional documentation is
          required.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
