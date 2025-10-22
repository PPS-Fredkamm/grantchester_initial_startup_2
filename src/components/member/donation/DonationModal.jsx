/**
 * DONATION MODAL - MAIN ORCHESTRATOR
 * 
 * This is the main component that orchestrates the entire donation process.
 * It manages the step-by-step flow, form data, validation, and submission.
 * 
 * How it works:
 * 1. Manages 8 steps of the donation process
 * 2. Tracks current step and form data
 * 3. Handles navigation between steps
 * 4. Validates each step before proceeding
 * 5. Submits final form data to Redux store
 */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitDonationForm } from "../../../redux/slices/donationSlice";

// Import the reusable modal wrapper
import StepModal from "./StepModal";

// Import all individual step components
import CompanyStep from "./steps/CompanyStep";
import RecipientStep from "./steps/RecipientStep";
import UnitsStep from "./steps/UnitsStep";
import DateStep from "./steps/DateStep";
import DocumentsStep from "./steps/DocumentsStep";
import ContactStep from "./steps/ContactStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import ThankYouStep from "./steps/ThankYouStep";

export default function DonationModal({ show, onClose }) {
  const dispatch = useDispatch();

  // ==========================================================================
  // REDUX STATE - Get user data from Redux store
  // ==========================================================================
  const userDTO = useSelector((state) => state.auth.userDTO);
  const email = useSelector((state) => state.auth.profileCDO?.email);
  const phone = useSelector((state) => state.auth.profileCDO?.phoneNumber);

  // ==========================================================================
  // MODAL STATE - Track modal behavior
  // ==========================================================================
  const [currentStep, setCurrentStep] = useState(1); // Current step (1-8)
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submission

  // ==========================================================================
  // FORM DATA STATE - All form fields for the donation
  // ==========================================================================
  const [formData, setFormData] = useState({
    companyName: "", // Company/organization name
    recipient: "", // Selected university
    otherUniversity: "", // Custom university name if "Other" selected
    units: "", // Number of shares/units
    valuation: "", // Price per unit
    totalValue: "0.00", // Auto-calculated total (units × valuation)
    donationDate: new Date().toISOString().split("T")[0], // Donation date (today by default)
    note: "", // Optional message
    agreementChecked: false, // Terms agreement checkbox
    file: null, // Optional file upload
  });

  // ==========================================================================
  // ERROR STATE - Track validation errors for each field
  // ==========================================================================
  const [errors, setErrors] = useState({});

  // ==========================================================================
  // AUTO-CALCULATION - Automatically calculate total value
  // ==========================================================================
  // When units or valuation changes, automatically calculate the total
  useEffect(() => {
    const total =
      formData.units && formData.valuation
        ? formData.units * formData.valuation
        : 0;
    setFormData((prev) => ({ ...prev, totalValue: total }));
  }, [formData.units, formData.valuation]);

  // ==========================================================================
  // FORM UPDATE HELPER - Update form fields and clear errors
  // ==========================================================================
  // This function is passed to all step components to update form data
  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ==========================================================================
  // VALIDATION FUNCTIONS - Validate each step before proceeding
  // ==========================================================================
  // This function validates the current step and returns any errors
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Company Information
        if (!formData.companyName.trim()) {
          newErrors.companyName = "Company name is required";
        }
        break;

      case 2: // Recipient University
        if (!formData.recipient) {
          newErrors.recipient = "Please select a university";
        }
        // If "Other" is selected, require university name
        if (
          formData.recipient === "other" &&
          !formData.otherUniversity.trim()
        ) {
          newErrors.otherUniversity = "University name is required";
        }
        break;

      case 3: // Units & Valuation
        if (!formData.units || formData.units <= 0) {
          newErrors.units = "Number of units must be greater than 0";
        }
        if (!formData.valuation || formData.valuation < 10) {
          newErrors.valuation = "Valuation must be at least $10.00";
        }
        break;

      case 4: // Donation Date
        if (!formData.donationDate) {
          newErrors.donationDate = "Donation date is required";
        }
        break;

      case 5: // Supporting Documents (optional step)
        // No validation required - this step is optional
        break;

      case 6: // Contact Information
        // Check if user has email and phone in their profile
        if (!email || !phone) {
          newErrors.contact =
            "Please ensure your profile has both email and phone number";
        }
        if (!formData.agreementChecked) {
          newErrors.agreementChecked =
            "You must agree to the terms and conditions";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================================================
  // NAVIGATION FUNCTIONS - Handle step navigation
  // ==========================================================================
  
  // Handle "Next" button - validate current step before proceeding
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 8) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  // Handle "Previous" button - go back one step or close modal
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      // If we're on step 1, close the modal (cancel)
      handleClose();
    }
  };

  // Handle "Edit" button from confirmation step - jump to specific step
  const handleEdit = (step) => {
    setCurrentStep(step);
  };

  // ==========================================================================
  // SUBMISSION FUNCTION - Submit the final donation form
  // ==========================================================================
  // This function is called from the confirmation step to submit the donation
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Determine the final recipient name (handle "Other" selection)
      const finalRecipient =
        formData.recipient === "other"
          ? formData.otherUniversity.trim()
          : formData.recipient.trim();

      // Prepare submission data with final recipient
      const submissionData = {
        ...formData,
        recipient: finalRecipient,
      };

      // Submit to Redux store (which handles API call)
      await dispatch(
        submitDonationForm({ formData: submissionData, userDTO })
      ).unwrap();

      // Move to thank you step (step 8)
      setCurrentStep(8);
    } catch (err) {
      alert("Donation failed: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form and close
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
    setCurrentStep(1);
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  // ==========================================================================
  // STEP CONFIGURATION - Define all 8 steps of the donation process
  // ==========================================================================
  // This function returns the configuration for the current step
  const getStepConfig = () => {
    const steps = [
      {
        // STEP 1: Company Information
        title: "Company Information",
        subtitle: "Tell us about the company or organization",
        component: (
          <CompanyStep
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        ),
        showNavigation: true,
        nextText: "Next",
        previousText: "Cancel", // First step shows "Cancel" instead of "Previous"
        previousDisabled: false,
      },
      {
        // STEP 2: Recipient University
        title: "Recipient University",
        subtitle: "Choose the university for your donation",
        component: (
          <RecipientStep
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        ),
        showNavigation: true,
        nextText: "Next",
        previousText: "Previous",
        previousDisabled: false,
      },
      {
        // STEP 3: Units & Valuation
        title: "Units & Valuation",
        subtitle: "Enter the details of your donation",
        component: (
          <UnitsStep
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        ),
        showNavigation: true,
        nextText: "Next",
        previousText: "Previous",
        previousDisabled: false,
      },
      {
        // STEP 4: Donation Date
        title: "Donation Date",
        subtitle: "Select when you want to make this donation",
        component: (
          <DateStep
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        ),
        showNavigation: true,
        nextText: "Next",
        previousText: "Previous",
        previousDisabled: false,
      },
      {
        // STEP 5: Supporting Documents (Optional)
        title: "Supporting Documents",
        subtitle: "Upload any supporting documents (optional)",
        component: (
          <DocumentsStep
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        ),
        showNavigation: true,
        nextText: "Next",
        previousText: "Previous",
        previousDisabled: false,
      },
      {
        // STEP 6: Contact Information
        title: "Contact Information",
        subtitle: "Review your contact details and agree to terms",
        component: (
          <ContactStep
            formData={formData}
            updateForm={updateForm}
            email={email}
            phone={phone}
            errors={errors}
          />
        ),
        showNavigation: true,
        nextText: "Review & Confirm", // Special text for this step
        previousText: "Previous",
        previousDisabled: false,
      },
      {
        // STEP 7: Confirmation Step (No navigation - has its own submit button)
        title: "Confirm Donation",
        subtitle: "Final confirmation before submission",
        component: (
          <ConfirmationStep
            formData={formData}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        ),
        showNavigation: false, // No navigation - uses its own submit button
      },
      {
        // STEP 8: Thank You Step (Final step)
        title: "Thank You!",
        subtitle: "Your donation has been submitted successfully",
        component: <ThankYouStep onClose={handleClose} />,
        showNavigation: false,
      },
    ];

    return steps[currentStep - 1]; // Return current step configuration
  };

  // ==========================================================================
  // RENDER - Get current step configuration and render the modal
  // ==========================================================================
  const stepConfig = getStepConfig(); // Get configuration for current step
  const totalSteps = 8; // Total number of steps

  return (
    <StepModal
      show={show}
      onHide={handleClose}
      title={stepConfig.title}
      subtitle={stepConfig.subtitle}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
      nextDisabled={isSubmitting}
      previousDisabled={isSubmitting}
      nextText={stepConfig.nextText}
      previousText={stepConfig.previousText}
      showNavigation={stepConfig.showNavigation}
    >
      {stepConfig.component} {/* Render the current step component */}
    </StepModal>
  );
}
