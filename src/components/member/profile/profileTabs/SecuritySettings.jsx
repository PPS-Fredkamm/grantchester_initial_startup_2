import { Button } from "react-bootstrap";
import { useState } from "react";

import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function SecuritySettings() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const handleResetPassword = () => {
  //   alert("Reset password flow triggered.");
  // };

  return (
    <div className="px-2">
      <h5 className="mb-3">Security Settings</h5>

      {/* <div>
        <Button
          className="security-button reset mb-3"
          onClick={handleResetPassword}
        >
          Reset My Password
        </Button>
      </div> */}

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
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </Button>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        show={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
