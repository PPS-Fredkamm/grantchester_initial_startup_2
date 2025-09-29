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

import * as ACEDonation from "../../../managers/ApiClient-Donation";
import * as ACM from "../../../managers/ApiClientMethods";
import * as ACO from "../../../managers/ApiClientObjects";
import * as BLM from "../../../managers/BusinessLayerMethods";

import "./Donate.css";

export default function DonationPage() {
  const [formState, setFormState] = useState({
    companyName: "",
    recipient: "",
    otherUniversity: "",
    shares: "",
    valuation: "",
    totalValue: "0.00",
    donationDate: new Date().toISOString().split("T")[0],
    note: "",
    agreementChecked: false,
    file: null,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const email = useSelector((state) => state.auth.profileCDO?.email);
  const phone = useSelector((state) => state.auth.profileCDO?.phoneNumber);

  const universities = [
    "Penn State",
    "MIT",
    "Temple",
    "Drexel",
    "Lincoln University",
    "Other",
  ];

  // helper to update formState
  const updateForm = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const total =
      formState.shares && formState.valuation
        ? formState.shares * formState.valuation
        : 0;
    updateForm("totalValue", total);
  }, [formState.shares, formState.valuation]);

  function handleContinue(e) {
    e.preventDefault();
    const form = e.currentTarget;

    const finalRecipient =
      formState.recipient === "other"
        ? formState.otherUniversity.trim()
        : formState.recipient.trim();

    if (formState.recipient === "other" && !finalRecipient) {
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

    updateForm("recipient", finalRecipient);
    setShowConfirmModal(true);
  }

  function handleSubmitDonation() {
    resetForm();
    setShowConfirmModal(false);
    setShowThankYouModal(true);
  }

  function resetForm() {
    setFormState({
      companyName: "",
      recipient: "",
      otherUniversity: "",
      shares: "",
      valuation: "",
      totalValue: "0.00",
      donationDate: new Date().toISOString().split("T")[0],
      note: "",
      agreementChecked: false,
      file: null,
    });
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
              value={formState.companyName}
              onChange={(e) => updateForm("companyName", e.target.value)}
              onBlur={(e) => updateForm("companyName", e.target.value.trim())}
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
              value={formState.recipient}
              onChange={(e) => updateForm("recipient", e.target.value)}
              required={formState.recipient !== "other"}
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
            {formState.recipient === "other" && (
              <Form.Control
                type="text"
                placeholder="Enter the university name"
                className="mt-2"
                value={formState.otherUniversity}
                onChange={(e) => updateForm("otherUniversity", e.target.value)}
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
              value={formState.shares}
              onChange={(e) => updateForm("shares", e.target.value)}
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
                value={formState.valuation}
                onChange={(e) => updateForm("valuation", e.target.value)}
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
              value={`$${Number(formState.totalValue).toLocaleString("en-US", {
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
              value={formState.donationDate}
              onChange={(e) => updateForm("donationDate", e.target.value)}
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
              value={formState.note}
              onChange={(e) => updateForm("note", e.target.value)}
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
              onChange={(e) => updateForm("file", e.target.files[0])}
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
                      This email will be used for all communications. <br />
                      <br />
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
                      This number will be used for all communications. <br />
                      <br />
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
                checked={formState.agreementChecked}
                onChange={(e) =>
                  updateForm("agreementChecked", e.target.checked)
                }
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
            disabled={!formState.agreementChecked}
          >
            Continue
          </Button>
        </Form>
      </Card>

      <ConfirmDonationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        recipient={formState.recipient}
        shares={formState.shares}
        valuation={formState.valuation}
        totalValue={formState.totalValue}
        donationDate={formState.donationDate}
        note={formState.note}
        companyName={formState.companyName}
        file={formState.file}
        onSubmit={handleSubmitDonation}
      />

      <ThankYouModal
        show={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}
