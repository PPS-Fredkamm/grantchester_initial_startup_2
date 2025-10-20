import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaDollarSign,
  FaBuilding,
  FaUniversity,
  FaChartLine,
  FaCalendarAlt,
  FaFileAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

import { useSelector, useDispatch } from "react-redux";
import { submitDonationForm } from "../../../redux/slices/donationSlice";

import ConfirmDonationModal from "./ConfirmDonation";
import ThankYouModal from "./ThankYouModal";

/* CSS moved to: src/styles/pages/donation.css, src/styles/components/forms/donation-forms.css, src/styles/components/cards/donation-cards.css, src/styles/components/buttons/donation-buttons.css */

export default function DonationPage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: "",
    recipient: "",
    otherUniversity: "",
    units: "",
    valuation: "",
    totalValue: "0.00",
    donationDate: new Date().toISOString().split("T")[0],
    note: "",
    agreementChecked: false,
    file: null,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const userDTO = useSelector((state) => state.auth.userDTO);
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

  // helper to update formData
  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const total =
      formData.units && formData.valuation
        ? formData.units * formData.valuation
        : 0;
    updateForm("totalValue", total);
  }, [formData.units, formData.valuation]);

  function handleContinue(e) {
    e.preventDefault();
    const form = e.currentTarget;

    const finalRecipient =
      formData.recipient === "other"
        ? formData.otherUniversity.trim()
        : formData.recipient.trim();

    if (formData.recipient === "other" && !finalRecipient) {
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

  async function handleSubmitDonation() {
    setShowConfirmModal(false);

    await dispatch(submitDonationForm({ formData, userDTO }))
      .unwrap()
      .then(() => {
        resetForm();
        setShowThankYouModal(true);
      })
      .catch((err) => {
        alert("Donation failed: " + err);
      });
  }

  function resetForm() {
    setFormData({
      companyName: "",
      recipient: "",
      otherUniversity: "",
      units: "",
      valuation: "",
      totalValue: "0.00",
      donationDate: new Date().toISOString().split("T")[0],
      note: "",
      agreementChecked: false,
      file: null,
    });
  }

  return (
    <>
      <div className="donation-page-container">
        <Card className="donation-card shadow-lg">
          <Card.Header className="donation-header">
            <div className="donation-header-content">
              <h2 className="donation-title">
                <FaChartLine className="me-2" />
                Send a Private Stock Donation
              </h2>
              <p className="donation-subtitle">
                Complete the form below to initiate your private stock donation
                to a university
              </p>
            </div>
          </Card.Header>
          <Card.Body className="donation-body">
            <Form onSubmit={handleContinue} className="donation-form">
              {/* Company Name and Recipient Row */}
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-field">
                    <Form.Label className="field-label">
                      Company or Organization{" "}
                      <span className="required-asterisk">*</span>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-company">
                            Enter the full legal name of the company or
                            organization
                            <br />
                            owning the private stock being donated.
                          </Tooltip>
                        }
                      >
                        <FaCircleInfo className="info-icon" />
                      </OverlayTrigger>
                    </Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon-wrapper">
                        <FaBuilding className="input-icon" />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Enter the company or organization name"
                        value={formData.companyName}
                        onChange={(e) =>
                          updateForm("companyName", e.target.value)
                        }
                        onBlur={(e) =>
                          updateForm("companyName", e.target.value.trim())
                        }
                        required
                        autoComplete="organization"
                        inputMode="text"
                        title="Please enter a valid company/organization name."
                        className="form-input"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-field">
                    <Form.Label className="field-label">
                      Recipient (University){" "}
                      <span className="required-asterisk">*</span>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-recipient">
                            Select the university that will receive your
                            donation.
                            <br />
                            <br />
                            Choose from our partner universities or select
                            "Other"
                            <br />
                            for institutions not listed.
                          </Tooltip>
                        }
                      >
                        <FaCircleInfo className="info-icon" />
                      </OverlayTrigger>
                    </Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon-wrapper">
                        <FaUniversity className="input-icon" />
                      </span>
                      <Form.Select
                        value={formData.recipient}
                        onChange={(e) =>
                          updateForm("recipient", e.target.value)
                        }
                        required={formData.recipient !== "other"}
                        className="form-input"
                      >
                        <option value="">Select a university...</option>
                        {universities.map((uni, index) => (
                          <option
                            key={index}
                            value={
                              uni.toLowerCase() === "other" ? "other" : uni
                            }
                          >
                            {uni}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    {formData.recipient === "other" && (
                      <div className="form-field mt-2">
                        <Form.Label className="field-label">
                          University Name{" "}
                          <span className="required-asterisk">*</span>
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-other-university">
                                Enter the complete legal name of the university
                                <br />
                                that will receive your donation.
                              </Tooltip>
                            }
                          >
                            <FaCircleInfo className="info-icon" />
                          </OverlayTrigger>
                        </Form.Label>
                        <div className="input-group-modern">
                          <span className="input-icon-wrapper">
                            <FaUniversity className="input-icon" />
                          </span>
                          <Form.Control
                            type="text"
                            placeholder="Enter the university name"
                            value={formData.otherUniversity}
                            onChange={(e) =>
                              updateForm("otherUniversity", e.target.value)
                            }
                            required
                            title="Please enter a valid university name."
                            className="form-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {/* Units and Valuation Row */}
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-field">
                    <Form.Label className="field-label">
                      Number of Units{" "}
                      <span className="required-asterisk">*</span>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-units">
                            Enter the total number of units/shares you are
                            donating.
                            <br />
                            <br />
                            This should be a whole number (no decimals).
                          </Tooltip>
                        }
                      >
                        <FaCircleInfo className="info-icon" />
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.units}
                      onChange={(e) => updateForm("units", e.target.value)}
                      placeholder="Enter number of units"
                      required
                      min="1"
                      className="form-input"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-field">
                    <Form.Label className="field-label">
                      Valuation Per Unit (USD){" "}
                      <span className="required-asterisk">*</span>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-valuation">
                            Enter the fair market value per unit/share in USD.
                            <br />
                            <br />
                            This should reflect the current market price or
                            valuation.
                          </Tooltip>
                        }
                      >
                        <FaCircleInfo className="info-icon" />
                      </OverlayTrigger>
                    </Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon-wrapper">
                        <FaDollarSign className="input-icon" />
                      </span>
                      <Form.Control
                        type="number"
                        value={formData.valuation}
                        onChange={(e) =>
                          updateForm("valuation", e.target.value)
                        }
                        placeholder="0.00"
                        required
                        min="10.00"
                        step=".01"
                        className="form-input"
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Total Value Display */}
              <div className="total-value-display mb-3">
                <div className="total-value-card">
                  <div className="total-value-content">
                    <div className="total-value-label">
                      <FaChartLine className="me-2" />
                      Total Donation Value
                    </div>
                    <div className="total-value-amount">
                      $
                      {Number(formData.totalValue).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Date and File Upload Row */}
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-field">
                    <Form.Label className="field-label">
                      Donation Date
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-date">
                            You may choose today's date or a future date for tax
                            purposes.
                          </Tooltip>
                        }
                      >
                        <FaCircleInfo className="info-icon" />
                      </OverlayTrigger>
                    </Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon-wrapper">
                        <FaCalendarAlt className="input-icon" />
                      </span>
                      <Form.Control
                        type="date"
                        value={formData.donationDate}
                        onChange={(e) =>
                          updateForm("donationDate", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-field">
                    <Form.Label className="field-label">
                      Upload Document (Optional)
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-file">
                            Upload supporting documents for your donation.
                            <br />
                            <br />
                            Examples: Valuation statement, bill of sale, legal
                            note.
                          </Tooltip>
                        }
                      >
                        <FaCircleInfo className="info-icon" />
                      </OverlayTrigger>
                    </Form.Label>
                    <div className="input-group-modern">
                      <span className="input-icon-wrapper">
                        <FaFileAlt className="input-icon" />
                      </span>
                      <Form.Control
                        type="file"
                        onChange={(e) => updateForm("file", e.target.files[0])}
                        accept=".pdf,.doc,.docx"
                        className="form-input file-input"
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Note */}
              <div className="form-field mb-3">
                <Form.Label className="field-label">
                  Message (Optional)
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-message">
                        Add any additional notes or instructions for the
                        university
                        <br />
                        regarding your donation.
                      </Tooltip>
                    }
                  >
                    <FaCircleInfo className="info-icon" />
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.note}
                  onChange={(e) => updateForm("note", e.target.value)}
                  placeholder="Add a note for the university"
                  className="form-input textarea-input"
                />
              </div>

              {/* Contact Info */}
              <div className="contact-info-section mb-3">
                <h6 className="contact-info-title">
                  <FaEnvelope className="me-2" />
                  Contact Information
                </h6>
                <Row>
                  <Col md={6}>
                    <div className="form-field">
                      <Form.Label className="field-label">
                        Contact Email
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-email">
                              This email will be used for all communications.
                              <br />
                              <br />
                              You can update it in your profile settings.
                            </Tooltip>
                          }
                        >
                          <FaCircleInfo className="info-icon" />
                        </OverlayTrigger>
                      </Form.Label>
                      <div className="input-group-modern">
                        <span className="input-icon-wrapper">
                          <FaEnvelope className="input-icon" />
                        </span>
                        <Form.Control
                          type="email"
                          value={email}
                          readOnly
                          className="form-input readonly-input"
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-field">
                      <Form.Label className="field-label">
                        Contact Phone
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-phone">
                              This number will be used for all communications.
                              <br />
                              <br />
                              You can update it in your profile settings.
                            </Tooltip>
                          }
                        >
                          <FaCircleInfo className="info-icon" />
                        </OverlayTrigger>
                      </Form.Label>
                      <div className="input-group-modern">
                        <span className="input-icon-wrapper">
                          <FaPhone className="input-icon" />
                        </span>
                        <Form.Control
                          type="text"
                          value={phone}
                          readOnly
                          className="form-input readonly-input"
                          required
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Agreement */}
              <div className="agreement-section mb-3">
                <Form.Check id="agreementCheck" className="modern-checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    checked={formData.agreementChecked}
                    onChange={(e) =>
                      updateForm("agreementChecked", e.target.checked)
                    }
                    required
                    className="agreement-checkbox"
                  />
                  <Form.Check.Label className="agreement-label">
                    I confirm that I am authorized to make this private stock
                    donation on behalf of the company/organization listed above
                    and understand this action is legally binding.
                  </Form.Check.Label>
                </Form.Check>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="donate-submit-btn w-100"
                disabled={!formData.agreementChecked}
                size="lg"
              >
                <FaChartLine className="me-2" />
                Continue to Review
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <ConfirmDonationModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={handleSubmitDonation}
        formData={formData}
      />

      <ThankYouModal
        show={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />
    </>
  );
}
