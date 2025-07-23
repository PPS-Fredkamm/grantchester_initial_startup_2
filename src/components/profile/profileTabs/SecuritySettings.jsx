import { Button, Alert } from "react-bootstrap";
import { useState } from "react";

import ChangePasswordModal from "./ChangePasswordModal";

export default function SecuritySettings() {
  const [showAlert, setShowAlert] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleResetPassword = () => {
    alert("Reset password flow triggered.");
  };

  const handleDeleteAccount = () => {
    setShowAlert(true);
  };

  const confirmDelete = () => {
    alert("Account deletion process started.");
    setShowAlert(false);
  };

  return (
    <div className="px-2">
      <h5 className="mb-3">Security Settings</h5>

      <div>
        <Button
          className="security-button reset mb-3"
          onClick={handleResetPassword}
        >
          Reset My Password
        </Button>
      </div>

      <div>
        <Button
          className="security-button reset mb-3"
          onClick={() => setShowChangePasswordModal(true)}
        >
          Change My Password
        </Button>
      </div>

      <div>
        <Button
          className="security-button delete mb-3"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </div>

      {showAlert && (
        <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
          <strong>Warning:</strong> This action is permanent.{" "}
          <Button
            variant="danger"
            size="sm"
            onClick={confirmDelete}
            className="ms-2"
          >
            Confirm Delete
          </Button>
        </Alert>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        show={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </div>
  );
}
