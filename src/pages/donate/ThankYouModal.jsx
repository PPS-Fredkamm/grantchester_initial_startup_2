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
          A representative will contact you soon to finish the required
          paperwork and if any additional documentation is needed.
        </p>
        <hr />
        <p>
          If you have any questions or concerns about your donation, please
          contact:
        </p>
        <p className="mb-1">
          <strong>Steve Siddal</strong>
        </p>
        <p className="mb-1">
          <strong>Phone:</strong> <a href="tel:555-123-4567">(555) 123-4567</a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:steve.sitle@grantchester.com">
            ssiddal@grantchestergroup.com
          </a>
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
