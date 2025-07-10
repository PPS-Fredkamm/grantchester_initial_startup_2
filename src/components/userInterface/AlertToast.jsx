import { Toast, ToastContainer } from 'react-bootstrap';

export default function AlertToast({ show, onClose, message, variant = 'danger' }) {
  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast
        bg={variant}
        onClose={onClose}
        show={show}
        delay={4000}
        autohide
      >
        <Toast.Body className="text-white text-center">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
