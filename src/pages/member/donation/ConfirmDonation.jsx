import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { FaCheckCircle, FaBuilding, FaUniversity, FaChartLine, FaCalendarAlt, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
/* CSS moved to: src/styles/components/modals/confirm-donation-modal.css */

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
              <div className="summary-item">
                <FaBuilding className="summary-icon company-icon" />
                <div className="summary-content">
                  <h6 className="summary-label">Company/Organization</h6>
                  <p className="summary-value">{formData.companyName}</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="summary-item">
                <FaUniversity className="summary-icon recipient-icon" />
                <div className="summary-content">
                  <h6 className="summary-label">Recipient University</h6>
                  <p className="summary-value">{formData.recipient}</p>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="g-3 mt-2">
            <Col md={4}>
              <div className="summary-item">
                <FaChartLine className="summary-icon shares-icon" />
                <div className="summary-content">
                  <h6 className="summary-label">Number of Units</h6>
                  <p className="summary-value">{formData.units}</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="summary-item">
                <FaDollarSign className="summary-icon valuation-icon" />
                <div className="summary-content">
                  <h6 className="summary-label">Valuation Per Unit</h6>
                  <p className="summary-value">
                    ${Number(formData.valuation).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="summary-item total-item">
                <FaDollarSign className="summary-icon total-icon" />
                <div className="summary-content">
                  <h6 className="summary-label">Total Value</h6>
                  <p className="summary-value total-value">
                    ${Number(formData.totalValue).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="g-3 mt-2">
            <Col md={12}>
              <div className="summary-item">
                <FaCalendarAlt className="summary-icon date-icon" />
                <div className="summary-content">
                  <h6 className="summary-label">Donation Date</h6>
                  <p className="summary-value">{formData.donationDate}</p>
                </div>
              </div>
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
