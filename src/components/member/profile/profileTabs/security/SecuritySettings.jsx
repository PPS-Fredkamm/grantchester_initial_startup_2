import { Button } from "react-bootstrap";
import { useState } from "react";
import { FiShield, FiLock, FiTrash2 } from "react-icons/fi";

import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

// CSS now imported via styles/index.css

export default function SecuritySettings() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const handleResetPassword = () => {
  //   alert("Reset password flow triggered.");
  // };

  return (
    <div className="security-settings-container">
      {/* Header Section */}
      <div className="security-header">
        <h4>
          <FiShield className="me-2" />
          Security Settings
        </h4>
        <p>Manage your account security and privacy preferences</p>
      </div>

      {/* Security Actions Grid */}
      <div className="security-cards-grid">
        {/* Password Management Card */}
        <div className="security-card">
          <div className="security-card-header">
            <div className="security-card-icon password">
              <FiLock />
            </div>
            <div>
              <h6 className="security-card-title">Password Security</h6>
            </div>
          </div>
          <p className="security-card-description">
            Keep your account secure by regularly updating your password with a
            strong, unique combination.
          </p>
          <Button
            className="security-button password"
            onClick={() => setShowChangePasswordModal(true)}
          >
            Change Password
          </Button>
        </div>

        {/* Account Management Card */}
        <div className="security-card">
          <div className="security-card-header">
            <div className="security-card-icon delete">
              <FiTrash2 />
            </div>
            <div>
              <h6 className="security-card-title">Account Management</h6>
            </div>
          </div>
          <p className="security-card-description">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button
            className="security-button delete"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        show={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />

      <DeleteAccountModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
