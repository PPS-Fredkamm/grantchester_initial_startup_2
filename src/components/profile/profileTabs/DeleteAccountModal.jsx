import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function DeleteAccountModal({ show, onClose }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const [confirmStep, setConfirmStep] = useState(false);

  function handleFirstSubmit() {
    setConfirmStep(true);
  }

  function handleConfirmDelete() {
    alert("Account deletion process started."); // replace with real API call later
    setFeedback("");
    setRating(0);
    setConfirmStep(false);
    onClose();
  }

  function handleCancel() {
    if (confirmStep) {
      setConfirmStep(false);
    } else {
      setFeedback("");
      setRating(0);
      onClose();
    }
  }

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className="delete-account-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {confirmStep
            ? "Confirm Account Deletion"
            : "We're Sorry to See You Go"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!confirmStep ? (
          <>
            <p>
              Before you leave, please share your experience. Your feedback
              helps us improve.
            </p>

            {/* Star Rating */}
            <div className="mb-3">
              <Form.Label>Rate Your Experience</Form.Label>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={`star ${
                        starValue <= (hover || rating) ? "active" : ""
                      }`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Feedback Textarea */}
            <Form>
              <Form.Group controlId="deleteFeedback">
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                />
              </Form.Group>
            </Form>
          </>
        ) : (
          <p className="text-danger fw-bold">
            Warning: This action is permanent and cannot be undone. Are you sure
            you want to delete your account?
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          {confirmStep ? "Back" : "Cancel"}
        </Button>
        {!confirmStep ? (
          <Button
            variant="danger"
            onClick={handleFirstSubmit}
            disabled={!feedback.trim() || rating === 0}
          >
            Submit & Continue
          </Button>
        ) : (
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
