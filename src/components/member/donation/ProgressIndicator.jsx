
/**
 * PROGRESS INDICATOR - Visual progress bar for donation steps
 * 
 * This component shows the user's progress through the donation process.
 * It displays the current step number, total steps, percentage complete,
 * and a visual progress bar.
 * 
 * Features:
 * - Shows "Step X of Y" text
 * - Displays percentage complete
 * - Animated progress bar
 * - Responsive design
 */

export default function ProgressIndicator ({ 
  currentStep, // Current step number (1-8)
  totalSteps, // Total number of steps (8)
}) {
  // Calculate progress percentage (0-100%)
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-indicator mb-4">
      {/* Header with step info and percentage */}
      <div className="progress-indicator-header">
        <span className="progress-step-label">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
      </div>
      
      {/* Visual progress bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }} // Animate to current progress
        />
      </div>
    </div>
  );
};
