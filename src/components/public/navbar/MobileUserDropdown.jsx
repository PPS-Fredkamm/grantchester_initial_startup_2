import { useState, useEffect } from "react";
import { FiChevronDown, FiPlusCircle } from "react-icons/fi";
import { Image, Accordion } from "react-bootstrap";

import ProfilePlaceholder from "../../../assets/Images/profilePlaceholder.jpg";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import * as ACM from "../../../managers/ApiClientMethods";

export default function MobileUserDropdown({ onClose }) {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileCDO = useSelector((state) => state.auth.profileCDO);
  const imageFile = useSelector((state) => state.auth.profileCDO.imageFile);
  const roles = useSelector((state) => state.auth.roles);

  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);

  // Mock org data for now (replace with Redux/API later)
  const companies = [
    { name: "Proactive USA", role: "Member", link: "/company/1" },
    { name: "TechCorp Ltd", role: "Owner", link: "/company/2" },
  ];
  const universities = [
    { name: "Rowan University", role: "Owner", link: "/university/1" },
  ];

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
      {/* Trigger */}
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
          <span className="user-email">{profileCDO?.email || "No email"}</span>
          <span className="user-role">
            {roles && roles.length > 0 ? roles.join(", ") : "No roles"}
          </span>
        </div>
        <FiChevronDown className={`chevron ${isOpen ? "open" : ""}`} />
      </div>

      {/* Expanded menu */}
      {isOpen && (
        <div className="mobile-user-menu">
          {/* Profile Links */}
          <a href="/profile" className="dropdown-item" onClick={onClose}>
            Profile
          </a>
          <a href="/donor" className="dropdown-item" onClick={onClose}>
            Donor Dashboard
          </a>

          {/* Accordion Sections */}
          <Accordion alwaysOpen flush className="usericon-accordion">
            {/* Companies */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Companies</Accordion.Header>
              <Accordion.Body>
                {companies.length > 0 ? (
                  companies.map((c, i) => (
                    <a
                      key={i}
                      href={c.link}
                      className="dropdown-item ps-3"
                      onClick={onClose}
                    >
                      {c.name}{" "}
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        ({c.role})
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="text-muted px-3">No companies yet</div>
                )}
                <a
                  href="/register/company"
                  className="org-action"
                  onClick={onClose}
                >
                  <FiPlusCircle className="org-action-icon" />
                  <span>Join or Create Company</span>
                </a>
              </Accordion.Body>
            </Accordion.Item>

            {/* Universities */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Universities</Accordion.Header>
              <Accordion.Body>
                {universities.length > 0 ? (
                  universities.map((u, i) => (
                    <a
                      key={i}
                      href={u.link}
                      className="dropdown-item ps-3"
                      onClick={onClose}
                    >
                      {u.name}{" "}
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        ({u.role})
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="text-muted px-3">No universities yet</div>
                )}
                <a
                  href="/register/university"
                  className="org-action"
                  onClick={onClose}
                >
                  <FiPlusCircle className="org-action-icon" />
                  <span>Register University</span>
                </a>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Footer */}
          <div
            className="dropdown-item mt-2"
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
