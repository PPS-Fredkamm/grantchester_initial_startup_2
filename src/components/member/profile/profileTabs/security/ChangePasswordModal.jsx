import { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

import { useDispatch } from "react-redux";
import { changePassword } from "../../../../../redux/slices/authSlice";

import AlertToast from "../../../../userInterface/alerts/AlertToast";

export default function ChangePasswordModal({ show, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  const dispatch = useDispatch();

  async function handleSave(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setToast({
        show: true,
        message: "New passwords do not match.",
        variant: "danger",
      });
      return;
    }

    try {
      const resultAction = await dispatch(
        changePassword({ currentPassword, newPassword, confirmPassword })
      );

      if (
        changePassword.fulfilled.match(resultAction) &&
        resultAction.payload
      ) {
        if (currentPassword === newPassword) {
          setToast({
            show: true,
            message: "New password cannot be the same as the current password.",
            variant: "danger",
          });
          return;
        }

        setToast({
          show: true,
          message: "Password changed successfully!",
          variant: "success",
        });

        setTimeout(() => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          onClose();
        }, 500);
      } else {
        setToast({
          show: true,
          message: "Current password is incorrect or update failed.",
          variant: "danger",
        });
      }
    } catch {
      setToast({
        show: true,
        message: "Unexpected error occurred.",
        variant: "danger",
      });
    }
  }

  return (
    <>
      <AlertToast
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        message={toast.message}
        variant={toast.variant}
      />

      <Modal
        show={show}
        onHide={onClose}
        centered
        className="change-password-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="icon">
              <FiLock />
            </div>
            Change Password
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSave}>
            {/* Current Password */}
            <Form.Group className="form-group">
              <Form.Label>Current Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  className="password-toggle-button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="form-group">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  className="password-toggle-button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Confirm New Password */}
            <Form.Group className="form-group">
              <Form.Label>Confirm New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  className="password-toggle-button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Action Buttons */}
            <div className="modal-actions">
              <Button variant="primary" type="submit" className="flex-fill">
                Update Password
              </Button>
              <Button
                variant="outline-secondary"
                className="flex-fill"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
