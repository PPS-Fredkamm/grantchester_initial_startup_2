import { useState, useEffect } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";
import AlertToast from "../../components/userInterface/AlertToast";
import ConfirmDonationModal from "./ConfirmDonation";
import ThankYouModal from "./ThankYouModal";

import "./Donate.css";

export default function DonationPage() {
  const [companyName, setCompanyName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [shares, setShares] = useState("");
  const [valuation, setValuation] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [donationDate, setDonationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  const organizations = [
    "Example Organization A",
    "Sample Company B",
    "Test Corp C",
  ];

  const universities = [
    "Penn State",
    "MIT",
    "Temple",
    "Drexel",
    "Lincoln University",
  ];

  useEffect(() => {
    const total =
      shares && valuation
        ? (shares * valuation).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0.00";
    setTotalValue(total);
  }, [shares, valuation]);

  function handleContinue(e) {
    e.preventDefault();

    if (
      !companyName ||
      !recipient ||
      !shares ||
      !valuation ||
      !agreementChecked
    ) {
      setToast({
        show: true,
        message: "Please complete all required fields and agree to the terms.",
        variant: "danger",
      });
      return;
    }

    setShowConfirmModal(true);
  }

  function resetForm() {
    setCompanyName("");
    setRecipient("");
    setShares("");
    setValuation("");
    setTotalValue(0);
    setNote("");
    setDonationDate(new Date().toISOString().split("T")[0]);
    setAgreementChecked(false);
  }

  return (
    <>
      <AlertToast
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        message={toast.message}
        variant={toast.variant}
      />

      <Card className="shadow my-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Send a Private Stock Donation</h3>
        <Form onSubmit={handleContinue}>
          {/* Company/Organization Name */}
          <Form.Group className="mb-3">
            <Form.Label>Company or Organization</Form.Label>
            <Form.Select
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            >
              <option value="">Select your organization...</option>
              {organizations.map((org, index) => (
                <option key={index} value={org}>
                  {org}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

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

          {/* Number of Private Shares */}
          <Form.Group className="mb-3">
            <Form.Label>Number of Private Shares (Units)</Form.Label>
            <Form.Control
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="Enter number of shares"
              required
              min="1"
            />
          </Form.Group>

          {/* Valuation Per Share */}
          <Form.Group className="mb-3">
            <Form.Label>Valuation Per Share (USD)</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaDollarSign />
              </InputGroup.Text>
              <Form.Control
                type="number"
                value={valuation}
                onChange={(e) => setValuation(e.target.value)}
                placeholder="0.00"
                required
                min="10.00"
                step=".01"
              />
            </InputGroup>
          </Form.Group>

          {/* Total Donation Value */}
          <Form.Group className="mb-3">
            <Form.Label>Total Donation Value (as of today)</Form.Label>
            <Form.Control type="text" value={`$${totalValue}`} readOnly />
          </Form.Group>

          {/* Donation Date */}
          <Form.Group className="mb-3">
            <Form.Label>Donation Date</Form.Label>
            <Form.Control
              type="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              required
            />
          </Form.Group>

          {/* Optional Note */}
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

          {/* Legal Agreement */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I confirm that I am authorized to make this private stock donation on behalf of the company/organization listed above and understand this action is legally binding."
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              required
            />
          </Form.Group>

          {/* Continue Button */}
          <Button
            type="submit"
            variant="primary"
            className="donate-button w-100"
            disabled={!agreementChecked}
          >
            Continue
          </Button>
        </Form>
      </Card>

      <ConfirmDonationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        recipient={recipient}
        shares={shares}
        valuation={valuation}
        totalValue={totalValue}
        donationDate={donationDate}
        note={note}
        companyName={companyName}
        onSuccessReset={resetForm}
        onShowThankYou={() => setShowThankYouModal(true)}
      />

      <ThankYouModal
        show={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}
