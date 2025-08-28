import { useState, useEffect } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";
import ConfirmDonationModal from "./ConfirmDonation";
import ThankYouModal from "./ThankYouModal";

import "./Donate.css";

export default function DonationPage() {
  const [companyName, setCompanyName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [otherUniversity, setOtherUniversity] = useState("");
  const [shares, setShares] = useState("");
  const [valuation, setValuation] = useState("");
  const [totalValue, setTotalValue] = useState("0.00");
  const [donationDate, setDonationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [file, setFile] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const universities = [
    "Penn State",
    "MIT",
    "Temple",
    "Drexel",
    "Lincoln University",
    "Other",
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
    const form = e.currentTarget;

    const finalRecipient =
      recipient === "other" ? otherUniversity.trim() : recipient.trim();

    if (recipient === "other" && !finalRecipient) {
      if (!form.reportValidity()) return;
    } else if (!form.reportValidity()) {
      return;
    }

    setRecipient(finalRecipient);
    setShowConfirmModal(true);
  }

  async function handleSubmitDonation() {
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("recipient", recipient);
    formData.append("shares", shares);
    formData.append("valuation", valuation);
    formData.append("totalValue", totalValue);
    formData.append("donationDate", donationDate);
    formData.append("note", note);
    if (file) {
      formData.append("attachment", file);
    }

    try {
      const response = await fetch("/api/donation/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        resetForm();
        setShowConfirmModal(false);
        setShowThankYouModal(true);
      } else {
        alert("There was an error submitting your donation.");
      }
    } catch (err) {
      console.error("Error submitting donation:", err);
      alert("Something went wrong while submitting your donation.");
    }
  }

  function resetForm() {
    setCompanyName("");
    setRecipient("");
    setOtherUniversity("");
    setShares("");
    setValuation("");
    setTotalValue("0.00");
    setNote("");
    setDonationDate(new Date().toISOString().split("T")[0]);
    setAgreementChecked(false);
    setFile(null);
  }

  return (
    <>
      <Card className="shadow my-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Send a Private Stock Donation</h3>
        <Form onSubmit={handleContinue}>
          {/* Company Name */}
          <Form.Group className="mb-3">
            <Form.Label>Company or Organization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the company or organization name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onBlur={(e) => setCompanyName(e.target.value.trim())}
              required
              autoComplete="organization"
              inputMode="text"
              pattern=".*\\S.*"
              title="Please enter a valid company/organization name."
            />
          </Form.Group>

          {/* Recipient */}
          <Form.Group className="mb-3">
            <Form.Label>Recipient (University)</Form.Label>
            <Form.Select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required={recipient !== "other"}
            >
              <option value="">Select a university...</option>
              {universities.map((uni, index) => (
                <option
                  key={index}
                  value={uni.toLowerCase() === "other" ? "other" : uni}
                >
                  {uni}
                </option>
              ))}
            </Form.Select>
            {recipient === "other" && (
              <Form.Control
                type="text"
                placeholder="Enter the university name"
                className="mt-2"
                value={otherUniversity}
                onChange={(e) => setOtherUniversity(e.target.value)}
                required
                pattern=".*\\S.*"
                title="Please enter a valid university name."
              />
            )}
          </Form.Group>

          {/* Shares */}
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

          {/* Valuation */}
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

          {/* Total */}
          <Form.Group className="mb-3">
            <Form.Label>Total Donation Value (as of today)</Form.Label>
            <Form.Control type="text" value={`$${totalValue}`} readOnly />
          </Form.Group>

          {/* Date */}
          <Form.Group className="mb-3">
            <Form.Label>Donation Date</Form.Label>
            <Form.Control
              type="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              required
            />
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

          {/* File Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Document</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.doc,.docx"
            />
          </Form.Group>

          {/* Agreement */}
          <Form.Group className="mb-3">
            <Form.Check id="agreementCheck" className="m-0">
              <Form.Check.Input
                type="checkbox"
                checked={agreementChecked}
                onChange={(e) => setAgreementChecked(e.target.checked)}
                required
              />
              <Form.Check.Label style={{ cursor: "pointer" }}>
                I confirm that I am authorized to make this private stock
                donation on behalf of the company/organization listed above and
                understand this action is legally binding.
              </Form.Check.Label>
            </Form.Check>
          </Form.Group>

          {/* Continue */}
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
        file={file}
        onSubmit={handleSubmitDonation}
      />

      <ThankYouModal
        show={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}
