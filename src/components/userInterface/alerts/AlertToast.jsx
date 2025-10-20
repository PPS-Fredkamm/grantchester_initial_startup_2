import { Toast, ToastContainer } from "react-bootstrap";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

/* CSS for this file is located in the alerts.css file */

export default function AlertToast({
  show,
  onClose,
  message,
  variant = "danger",
}) {
  // Get appropriate icon based on variant
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <FiCheckCircle className="toast-icon" />;
      case "danger":
        return <FiXCircle className="toast-icon" />;
      case "warning":
        return <FiAlertTriangle className="toast-icon" />;
      case "info":
        return <FiInfo className="toast-icon" />;
      default:
        return <FiXCircle className="toast-icon" />;
    }
  };

  return (
    <ToastContainer position="top-end" className="alert-toast-container">
      <Toast
        bg={variant}
        onClose={onClose}
        show={show}
        delay={4000}
        autohide
        className="alert-toast"
      >
        <Toast.Body className="text-white">
          <div className="toast-content">
            {getIcon()}
            <span className="toast-message">{message}</span>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
