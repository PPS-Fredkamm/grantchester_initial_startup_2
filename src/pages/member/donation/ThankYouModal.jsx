import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaUser, FaPhone, FaEnvelope, FaHome } from "react-icons/fa";
import "./ThankYouModal.css";

export default function ThankYouModal({ show, onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose(); 
    navigate("/donor");
  };
  
  return (
    <Modal show={show} onHide={onClose} centered size="lg" className="thank-you-modal">
      <Modal.Header className="thank-you-header">
        <div className="thank-you-header-content">
          <FaCheckCircle className="success-icon" />
          <div>
            <Modal.Title className="thank-you-title">Thank You for Your Donation!</Modal.Title>
            <p className="thank-you-subtitle">Your generous contribution is greatly appreciated</p>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body className="thank-you-body">
        <div className="status-section">
          <div className="status-item">
            <FaClock className="status-icon" />
            <div className="status-content">
              <h6 className="status-title">Donation Submitted</h6>
              <p className="status-text">
                Your donation has been submitted and is now pending. Please allow
                <strong className="highlight-text"> 3-5 business days</strong> for processing.
              </p>
            </div>
          </div>
        </div>
        
        <div className="next-steps">
          <h6 className="next-steps-title">What Happens Next?</h6>
          <Row className="g-2">
            <Col md={6}>
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h6 className="step-title">Review Process</h6>
                  <p className="step-description">
                    Our team will review your donation details and documentation.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h6 className="step-title">Contact & Documentation</h6>
                  <p className="step-description">
                    A representative will contact you to complete required paperwork.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        
        <div className="contact-section">
          <h6 className="contact-title">Need Help? Contact Our Team</h6>
          <div className="contact-grid">
            <div className="contact-person">
              <div className="contact-avatar">
                <FaUser className="contact-avatar-icon" />
              </div>
              <div className="contact-details">
                <h6 className="contact-name">Steve Siddal</h6>
                <p className="contact-role">Donation Coordinator</p>
              </div>
            </div>
            
            <div className="contact-methods">
              <div className="contact-method">
                <FaPhone className="contact-method-icon" />
                <div className="contact-method-content">
                  <span className="contact-method-label">Phone</span>
                  <a href="tel:555-123-4567" className="contact-method-value">
                    (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="contact-method">
                <FaEnvelope className="contact-method-icon" />
                <div className="contact-method-content">
                  <span className="contact-method-label">Email</span>
                  <a href="mailto:ssiddal@grantchestergroup.com" className="contact-method-value email-value">
                    ssiddal@grantchestergroup.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="thank-you-footer">
        <Button variant="primary" onClick={handleClose} className="close-btn">
          <FaHome className="me-2" />
          Return to Dashboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
