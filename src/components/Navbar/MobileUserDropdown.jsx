import { useState, useEffect } from "react";

import { FiChevronDown } from "react-icons/fi";
import { Image } from "react-bootstrap";

import ProfilePlaceholder from "../../assets/Images/profilePlaceholder.jpg";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import * as ACM from "../../managers/ApiClientMethods";

function MobileUserDropdown({ onClose }) {
  const dispatch = useDispatch();

  // Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profile = useSelector((state) => state.auth.profile);
  const roles = useSelector((state) => state.auth.roles);
  const imageFile = useSelector((state) => state.auth.imageFile);

  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);

  useEffect(() => {
    if (imageFile?.id > 0) {
      const imageUrl = ACM.createImageFileURL(imageFile);
      setProfileImage(imageUrl);
    } else {
      setProfileImage(ProfilePlaceholder);
    }
  }, [imageFile]);

  if (!isAuthenticated) return null;

  async function handleLogout() {
    await dispatch(logout());
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
          <span className="user-email">{profile?.email || "No email"}</span>
          <span className="user-role">
            {roles && roles.length > 0 ? roles.join(", ") : "No roles"}
          </span>
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
