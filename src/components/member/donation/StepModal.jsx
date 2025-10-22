/**
 * STEP MODAL - REUSABLE MODAL WRAPPER
 * 
 * This is a reusable modal component that wraps each step of the donation process.
 * It provides consistent styling, navigation controls, and progress indication.
 * 
 * Features:
 * - Responsive design (full-screen on mobile)
 * - Progress indicator showing current step
 * - Navigation controls (Next/Previous buttons)
 * - Consistent header with title and subtitle
 * - Close button in header
 */

import { Modal, Button } from "react-bootstrap";
import ProgressIndicator from "./ProgressIndicator";

export default function StepModal({
  show, // Whether modal is visible
  onHide, // Function to close modal
  title, // Step title
  subtitle, // Step subtitle
  children, // Step content (the actual step component)
  currentStep, // Current step number (1-8)
  totalSteps, // Total number of steps (8)
  onNext, // Function called when "Next" is clicked
  onPrevious, // Function called when "Previous" is clicked
  nextDisabled = false, // Whether Next button is disabled
  previousDisabled = false, // Whether Previous button is disabled
  nextText = "Next", // Text for Next button
  previousText = "Previous", // Text for Previous button
  showNavigation = true, // Whether to show navigation buttons
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered // Center modal on screen
      backdrop="static" // Prevent closing by clicking backdrop
      keyboard={false} // Prevent closing with Escape key
      className="step-modal"
    >
      {/* ==========================================================================
           MODAL HEADER - Title, subtitle, and close button
           ========================================================================== */}
      <Modal.Header closeButton className="step-modal-header">
        <div className="step-modal-header-content">
          <div className="step-modal-title-section">
            <h4 className="step-modal-title">{title}</h4>
            {subtitle && <p className="step-modal-subtitle">{subtitle}</p>}
          </div>
        </div>
      </Modal.Header>

      {/* ==========================================================================
           MODAL BODY - Progress indicator and step content
           ========================================================================== */}
      <Modal.Body className="step-modal-body">
        <div className="step-modal-content">
          {/* Progress bar showing current step */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          {/* The actual step component content */}
          {children}
        </div>
      </Modal.Body>

      {/* ==========================================================================
           MODAL FOOTER - Navigation buttons (Next/Previous)
           ========================================================================== */}
      {showNavigation && (
        <Modal.Footer className="step-modal-footer">
          <div className="step-modal-navigation">
            {/* Previous/Cancel button */}
            <Button
              variant="outline-secondary"
              className="step-nav-btn"
              onClick={onPrevious}
              disabled={previousDisabled}
            >
              {previousText}
            </Button>
            {/* Next/Submit button */}
            <Button
              variant="primary"
              className="step-nav-btn"
              onClick={onNext}
              disabled={nextDisabled}
            >
              {nextText}
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}
