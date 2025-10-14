import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { FaCheckCircle, FaBuilding, FaUniversity, FaChartLine, FaCalendarAlt, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
import "./ConfirmDonation.css";

export default function ConfirmDonationModal({ show, onClose, onSubmit, formData }) {
  function handleConfirm() {
    if (onSubmit) onSubmit();
  }

  return (
    <Modal show={show} onHide={onClose} centered size="lg" className="confirm-donation-modal">
      <Modal.Header className="confirm-modal-header">
        <div className="confirm-header-content">
          <FaCheckCircle className="confirm-icon" />
          <div>
            <Modal.Title className="confirm-title">Confirm Your Donation</Modal.Title>
            <p className="confirm-subtitle">Please review your donation details before confirming</p>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body className="confirm-modal-body">
        <div className="donation-summary">
          <Row className="g-3">
            <Col md={6}>
              <Card className="summary-card">
                <Card.Body className="text-center">
                  <FaBuilding className="summary-icon company-icon" />
                  <h6 className="summary-label">Company/Organization</h6>
                  <p className="summary-value">{formData.companyName}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="summary-card">
                <Card.Body className="text-center">
                  <FaUniversity className="summary-icon recipient-icon" />
                  <h6 className="summary-label">Recipient University</h6>
                  <p className="summary-value">{formData.recipient}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="g-3 mt-2">
            <Col md={4}>
              <Card className="summary-card">
                <Card.Body className="text-center">
                  <FaChartLine className="summary-icon shares-icon" />
                  <h6 className="summary-label">Number of Shares</h6>
                  <p className="summary-value">{formData.units}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="summary-card">
                <Card.Body className="text-center">
                  <FaDollarSign className="summary-icon valuation-icon" />
                  <h6 className="summary-label">Valuation Per Share</h6>
                  <p className="summary-value">
                    ${Number(formData.valuation).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="summary-card total-card">
                <Card.Body className="text-center">
                  <FaDollarSign className="summary-icon total-icon" />
                  <h6 className="summary-label">Total Value</h6>
                  <p className="summary-value total-value">
                    ${Number(formData.totalValue).toLocaleString("en-US")}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="g-3 mt-2">
            <Col md={12}>
              <Card className="summary-card">
                <Card.Body className="text-center">
                  <FaCalendarAlt className="summary-icon date-icon" />
                  <h6 className="summary-label">Donation Date</h6>
                  <p className="summary-value">{formData.donationDate}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        
        <div className="legal-warning">
          <div className="warning-content">
            <FaExclamationTriangle className="warning-icon" />
            <div>
              <h6 className="warning-title">Legal Notice</h6>
              <p className="warning-text">
                By confirming, you acknowledge this is a legally binding donation commitment. 
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="confirm-modal-footer">
        <Button variant="outline-secondary" onClick={onClose} className="cancel-btn">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm} className="confirm-btn">
          <FaCheckCircle className="me-2" />
          Confirm Donation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
