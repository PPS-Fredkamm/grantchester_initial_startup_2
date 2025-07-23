import { useState } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";

import AlertToast from "../../components/userInterface/AlertToast";

import "./Donate.css";

export default function DonationPage() {
  // ========================================
  // States
  // ========================================
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [donationType, setDonationType] = useState("General Fund");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const universities = [
    "Penn State",
    "MIT",
    "Temple",
    "Drexel",
    "Lincoln University",
  ];
  const donationTypes = ["General Fund", "Scholarship", "Research", "Sports"];

  // ========================================
  // Handlers
  // ========================================
  function handleDonate(e) {
    e.preventDefault();
    if (!recipient || !amount) {
      setToast({
        show: true,
        message: "Please select a recipient and enter an amount.",
        variant: "danger",
      });
      return;
    }

    // Simulate success for now
    setToast({
      show: true,
      message: `Your donation to ${recipient} has been submitted.`,
      variant: "success",
    });

    // Reset form
    setRecipient("");
    setAmount("");
    setNote("");
    setDonationType("General Fund");
  }

  return (
    <>
      <AlertToast
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        message={toast.message}
        variant={toast.variant}
      />

      <Card className="shadow mt-4 p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="mb-4 text-center">Send a Donation</h3>
        <Form onSubmit={handleDonate}>
          {/* Recipient */}
          <Form.Group className="mb-3">
            <Form.Label>Recipient (University)</Form.Label>
            <Form.Select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            >
              <option value="">Select a university...</option>
              {universities.map((uni, index) => (
                <option key={index} value={uni}>
                  {uni}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Amount */}
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaDollarSign />
              </InputGroup.Text>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                min="1"
                step="0.01"
              />
            </InputGroup>
          </Form.Group>

          {/* Donation Type */}
          <Form.Group className="mb-3">
            <Form.Label>Donation Type</Form.Label>
            <Form.Select
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
            >
              {donationTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Note */}
          <Form.Group className="mb-3">
            <Form.Label>Message (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for the university"
            />
          </Form.Group>

          {/* Donate Button */}
          <Button
            type="submit"
            variant="primary"
            className="donate-button w-100"
          >
            Donate Now
          </Button>
        </Form>
      </Card>
    </>
  );
}
