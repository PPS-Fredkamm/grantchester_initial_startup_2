import { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";

import AlertToast from "../../../components/userInterface/alerts/AlertToast";

export default function ForgotPassword({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  async function handleReset(e) {
    e.preventDefault();

    if (!email) {
      setToast({
        show: true,
        message: "Please enter your email address.",
        variant: "danger",
      });
      return;
    }

    setToast({
      show: true,
      message: `If an account exists for ${email}, reset instructions have been sent.`,
      variant: "success",
    });

    setTimeout(() => {
      setEmail("");
      onClose();
    }, 1000);
  }

  return (
    <>
      <AlertToast
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        message={toast.message}
        variant={toast.variant}
      />

      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleReset}>
            <Form.Group className="form-group">
              <Form.Label>Email Address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="modern-input"
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="form-button">
              Send Reset Instructions
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
