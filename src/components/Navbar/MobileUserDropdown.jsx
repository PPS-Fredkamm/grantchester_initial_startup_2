import { useState, useEffect } from "react";

import { FiChevronDown } from "react-icons/fi";
import { Image } from "react-bootstrap";

import ProfilePlaceholder from "../../assets/Images/profilePlaceholder.jpg";

import { useAuthContext } from "../../context/AuthProvider";
import * as ACM from "../../managers/ApiClientMethods";
import Globals from "../../global/globals";

function MobileUserDropdown({ onClose }) {
  const authCtx = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);

  useEffect(() => {
    if (Globals.member.imageFile?.id > 0) {
      const imageUrl = ACM.createImageFileURL(Globals.member.imageFile);
      setProfileImage(imageUrl);
    }
  }, []);

  if (!authCtx.ctx.isAuthenticated) return null;

  async function handleLogout() {
    await authCtx.logout();
    if (onClose) onClose();
  }

  return (
    <div className="mobile-user-dropdown">
      <div
        className="mobile-user-trigger d-flex align-items-center justify-content-between gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={profileImage}
          roundedCircle
          width={36}
          height={36}
          alt="Profile"
        />
        <div className="d-flex flex-column text-end flex-grow-1 px-2">
          <span className="user-email">{Globals.member.profile.email}</span>
          <span className="user-role">{Globals.member.roles.join(", ")}</span>
        </div>
        <FiChevronDown className={`chevron ${isOpen ? "open" : ""}`} />
      </div>

      {isOpen && (
        <div className="mobile-user-menu">
          <a href="/profile" className="dropdown-item" onClick={onClose}>
            Profile
          </a>
          <div
            className="dropdown-item"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileUserDropdown;
