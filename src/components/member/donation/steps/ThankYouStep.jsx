/**
 * THANK YOU STEP - Step 8 of the donation process (Final step)
 *
 * This is the final step shown after successful donation submission.
 * It provides confirmation, next steps, and contact information.
 *
 * Features:
 * - Success confirmation with large checkmark
 * - Status information about processing time
 * - Next steps explanation
 * - Contact information for support
 * - Return to dashboard button
 */

import {
  Row,
  Col,
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

export default function ThankYouStep({
  onClose, // Function to close modal and return to dashboard
}) {
  return (
    <div className="step-content">
      <div className="step-header text-center">
        <div className="success-icon mb-4">
          <FaCheckCircle className="text-success" size={64} />
        </div>
        <h4 className="step-title text-success">
          Thank You for Your Donation!
        </h4>
        <p className="step-description">
          Your generous contribution is greatly appreciated
        </p>
      </div>

      <Container fluid className="thank-you-content">
        <Row>
          <Col>
            <div className="status-section">
              <div className="status-item">
                <FaClock className="status-icon" />
                <div className="status-content">
                  <h6 className="status-title">Donation Submitted</h6>
                  <p className="status-text">
                    Your donation has been submitted and is now pending. Please
                    allow
                    <strong className="highlight-text">
                      {" "}
                      3-5 business days
                    </strong>{" "}
                    for processing.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="next-steps-card">
              <h5 className="next-steps-title">
                <FaArrowRight className="me-2" />
                What Happens Next?
              </h5>
              <div className="next-steps-list">
                <div className="next-step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h6 className="step-title">Review Process</h6>
                    <p className="step-description">
                      Our team will review your donation details and
                      documentation.
                    </p>
                  </div>
                </div>
                <div className="next-step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h6 className="step-title">Contact & Documentation</h6>
                    <p className="step-description">
                      A representative will contact you to complete required
                      paperwork.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="contact-info-card">
              <h6 className="contact-info-title">
                <FaUser className="me-2" />
                Need Help? Contact Our Team
              </h6>
              <div className="contact-person">
                <div className="contact-avatar">
                  <FaUser className="contact-avatar-icon" />
                </div>
                <div className="contact-details">
                  <h6 className="contact-name">Steve Siddal</h6>
                  <p className="contact-role">Donation Coordinator</p>
                </div>
              </div>

              <div className="contact-actions">
                <a
                  href="tel:555-123-4567"
                  className="contact-action-btn phone-btn"
                >
                  <FaPhone className="me-2" />
                  Call (620) 314-3321
                </a>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip
                      id="tooltip-email-steve"
                      className="tooltip-nowrap"
                    >
                      ssiddal@grantchestergroup.com
                    </Tooltip>
                  }
                >
                  <a
                    href="mailto:ssiddal@grantchestergroup.com"
                    className="contact-action-btn email-btn"
                  >
                    <FaEnvelope className="me-2" />
                    Email Steve
                  </a>
                </OverlayTrigger>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="thank-you-actions">
              <Link
                to="/donor"
                className="btn btn-primary btn-lg"
                onClick={onClose}
              >
                <FaHome className="me-2" />
                Return to Dashboard
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
