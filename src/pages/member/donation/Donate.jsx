/**
 * DONATION PAGE - Main donation landing page
 *
 * This is the introductory page for the donation process. It displays
 * information about the donation process and provides a button to start
 * the step-by-step donation modal.
 *
 * Features:
 * - Welcome message and process overview
 * - Feature highlights (Simple, Secure, Quick)
 * - "Start Donation Process" button
 * - Integration with DonationModal component
 */

import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

import DonationModal from "../../../components/member/donation/DonationModal";

/* ==========================================================================
   CSS - Styles moved to modular CSS files
   ========================================================================== */
/* 
   Page Styles:     src/styles/pages/donation.css
   Form Styles:     src/styles/components/forms/donation-forms.css  
   Card Styles:     src/styles/components/cards/donation-cards.css
   Button Styles:   src/styles/components/buttons/donation-buttons.css
*/

export default function DonationPage() {
  // ==========================================================================
  // STATE MANAGEMENT - Modal visibility control
  // ==========================================================================
  const [showDonationModal, setShowDonationModal] = useState(false);

  // ==========================================================================
  // EVENT HANDLERS - Modal control functions
  // ==========================================================================

  // Open the donation modal when user clicks "Start Donation Process"
  const handleStartDonation = () => {
    setShowDonationModal(true);
  };

  // Close the donation modal (called from modal or after completion)
  const handleCloseModal = () => {
    setShowDonationModal(false);
  };

  return (
    <>
      {/* ==========================================================================
           MAIN PAGE CONTAINER - Donation landing page
           ========================================================================== */}
      <div className="donation-page-container">
        <Card className="donation-card shadow-lg">
          {/* ==========================================================================
               PAGE HEADER - Title and subtitle
               ========================================================================== */}
          <Card.Header className="donation-header">
            <div className="donation-header-content">
              <h2 className="donation-title">
                <FaChartLine className="me-2" />
                Send a Donation
              </h2>
              <p className="donation-subtitle">
                Complete the step-by-step process to initiate your donation to a
                university
              </p>
            </div>
          </Card.Header>

          {/* ==========================================================================
               PAGE BODY - Introduction and features
               ========================================================================== */}
          <Card.Body className="donation-body text-center">
            <div className="donation-intro">
              <h4 className="mb-3">Ready to Make a Difference?</h4>
              <p className="mb-4">
                Our guided donation process will walk you through each step to
                ensure your donation is processed correctly and efficiently.
              </p>
              {/* ==========================================================================
                   FEATURE HIGHLIGHTS - Three key benefits
                   ========================================================================== */}
              <div className="donation-features mb-4">
                <div className="row">
                  {/* Simple Process Feature */}
                  <div className="col-md-4 mb-3">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <FaChartLine size={24} />
                      </div>
                      <h6>Simple Process</h6>
                      <p className="small">Step-by-step guidance</p>
                    </div>
                  </div>

                  {/* Security Feature */}
                  <div className="col-md-4 mb-3">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <FaChartLine size={24} />
                      </div>
                      <h6>Secure & Safe</h6>
                      <p className="small">Your data is protected</p>
                    </div>
                  </div>

                  {/* Speed Feature */}
                  <div className="col-md-4 mb-3">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <FaChartLine size={24} />
                      </div>
                      <h6>Quick Review</h6>
                      <p className="small">Fast processing times</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==========================================================================
                   CALL-TO-ACTION BUTTON - Start the donation process
                   ========================================================================== */}
              <Button
                variant="primary"
                size="lg"
                className="donate-submit-btn"
                onClick={handleStartDonation}
              >
                <FaChartLine className="me-2" />
                Start Donation Process
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* ==========================================================================
           DONATION MODAL - Step-by-step donation process
           ========================================================================== */}
      <DonationModal show={showDonationModal} onClose={handleCloseModal} />
    </>
  );
}
