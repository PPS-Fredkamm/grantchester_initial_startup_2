import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  InputGroup,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
} from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

import { useSelector } from "react-redux";

import ConfirmDonationModal from "./ConfirmDonation";
import ThankYouModal from "./ThankYouModal";

import * as ACEDonation from "../../managers/ApiClient-Donation";
import * as ACM from "../../managers/ApiClientMethods";
import * as ACO from "../../managers/ApiClientObjects";
import * as BLM from "../../managers/BusinessLayerMethods";

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

  const email = useSelector((state) => state.auth.profile?.email);
  const phone = useSelector((state) => state.auth.profile?.phoneNumber);

  const universities = [
    "Penn State",
    "MIT",
    "Temple",
    "Drexel",
    "Lincoln University",
    "Other",
  ];

  useEffect(() => {
    const total = shares && valuation ? shares * valuation : 0;
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

    if (!email || !phone) {
      alert(
        "Please ensure your profile has both an email and phone number before proceeding."
      );
      return;
    }

    setRecipient(finalRecipient);
    setShowConfirmModal(true);
  }

  function handleSubmitDonation() {
    resetForm();
    setShowConfirmModal(false);
    setShowThankYouModal(true);
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

  async function processForm() {
    let apiResult;
    let id, donation;

    apiResult = await ACEDonation.CreateDonationAsync();
    id = ACM.getApiResultData(apiResult);
    apiResult = await ACEDonation.GetDonationAsync(id);
    donation = ACM.getApiResultData(apiResult);
    donation.donationStatus = ACO.DonationStatusCode.CREATED;
  }

  return (
    <>
      <Card className="shadow my-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Send a Private Stock Donation</h3>
        <Form onSubmit={handleContinue}>
          {/* Company Name */}
          <Form.Group className="mb-3">
            <Form.Label>
              Company or Organization{" "}
              <span className="required-asterisk">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the company or organization name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onBlur={(e) => setCompanyName(e.target.value.trim())}
              required
              autoComplete="organization"
              inputMode="text"
              title="Please enter a valid company/organization name."
            />
          </Form.Group>

          {/* Recipient */}
          <Form.Group className="mb-3">
            <Form.Label>
              Recipient (University){" "}
              <span className="required-asterisk">*</span>
            </Form.Label>
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
                title="Please enter a valid university name."
              />
            )}
          </Form.Group>

          {/* Shares */}
          <Form.Group className="mb-3">
            <Form.Label>
              Number of Private Shares (Units){" "}
              <span className="required-asterisk">*</span>
            </Form.Label>
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
            <Form.Label>
              Valuation Per Share (USD){" "}
              <span className="required-asterisk">*</span>
            </Form.Label>
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
            <Form.Label>
              Total Donation Value (as of today){" "}
              <span className="required-asterisk">*</span>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              value={`$${Number(totalValue).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              readOnly
            />
          </Form.Group>

          {/* Date */}
          <Form.Group className="mb-3">
            <Form.Label>Donation Date </Form.Label>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-affected">
                  You may choose today's date or a future date for tax purposes.
                </Tooltip>
              }
            >
              <FaCircleInfo className="info-icon" />
            </OverlayTrigger>
            <Form.Control
              type="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
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
            <Form.Label>Upload Document (Optional)</Form.Label>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-affected">
                  Upload supporting documents for your donation. <br />
                  <br />
                  Examples: <br /> Valuation statement, bill of sale, legal
                  note.
                </Tooltip>
              }
            >
              <FaCircleInfo className="info-icon" />
            </OverlayTrigger>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.doc,.docx"
            />
          </Form.Group>

          {/* Contact Info */}
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>
                Contact Email
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-email">
                      This email will be used for all communications. <br /><br />
                      You can update it in your profile settings.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon ms-2" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                readOnly
                className="readonly-input"
                required
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>
                Contact Phone
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-phone">
                      This number will be used for all communications. <br /><br />
                      You can update it in your profile settings.
                    </Tooltip>
                  }
                >
                  <FaCircleInfo className="info-icon ms-2" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                value={phone}
                readOnly
                className="readonly-input"
                required
              />
            </Form.Group>
          </Row>

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
