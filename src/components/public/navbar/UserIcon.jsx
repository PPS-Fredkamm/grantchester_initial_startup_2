import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import { FiPlusCircle } from "react-icons/fi";

import ProfilePlaceholder from "../../../assets/images/placeholder/profilePlaceholder.jpg";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import * as ACM from "../../../managers/ApiClientMethods.js";

export default function UserIcon() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDTO = useSelector((state) => state.auth.userDTO);
  const profileCDO = useSelector((state) => state.auth.profileCDO);
  const roles = useSelector((state) => state.auth.roles);
  const imageFile = useSelector((state) => state.auth.profileCDO?.imageFile);

  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);

  // Mock data (replace with Redux/API later)
  const companies = [
    // { name: "Proactive USA", role: "Member", link: "/company/1" },
    // { name: "TechCorp Ltd", role: "Owner", link: "/company/2" },
  ];

  const universities = [
    { name: "Rowan University", role: "Owner", link: "/university/1" },
  ];

  useEffect(() => {
    if (imageFile && imageFile.id > 0) {
      const imageUrl = ACM.createImageFileURL(imageFile);
      if (imageUrl) {
        const isBase64 = imageUrl.startsWith("data:image/");
        setProfileImage(isBase64 ? imageUrl : `${imageUrl}?t=${Date.now()}`);
      } else {
        setProfileImage(ProfilePlaceholder);
      }
    } else {
      setProfileImage(ProfilePlaceholder);
    }
  }, [imageFile]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Nav className="align-items-center">
      {isAuthenticated && (
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex flex-column text-end">
            <span className="user-email">
              {profileCDO?.email || "No email"}
            </span>
            <span className="user-role">
              {roles && roles.length > 0 ? roles.join(", ") : "No roles"}
            </span>
          </div>
          <NavDropdown
            align="end"
            title={
              <Image
                src={profileImage}
                roundedCircle
                width={40}
                height={40}
                alt="Profile"
                className="profile-icon"
              />
            }
            id="profile-dropdown"
            className="profile-dropdown"
          >
            {/* Profile Card Header */}
            <div className="user-dropdown-card">
              <Image
                src={profileImage}
                className="profile-card-img"
                alt="Profile"
              />
              <div className="profile-card-info">
                <strong>{userDTO?.username || "Unknown User"}</strong>
                <div className="text-muted">
                  {profileCDO?.email || "No email"}
                </div>
              </div>
            </div>

            {/* User Section */}
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/donor">Donor Dashboard</NavDropdown.Item>

            {/* Accordion for Companies and Universities */}
            <Accordion alwaysOpen flush className="usericon-accordion">
              {/* Companies */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>My Companies</Accordion.Header>
                <Accordion.Body>
                  {companies.length > 0 ? (
                    companies.map((c, i) => (
                      <a key={i} className="dropdown-item" href={c.link}>
                        {c.name} <span className="text-muted">({c.role})</span>
                      </a>
                    ))
                  ) : (
                    <div className="text-muted px-3">No companies yet</div>
                  )}
                  <a className="org-action" href="/register/company">
                    <FiPlusCircle className="org-action-icon" />
                    <span>Join or Create Company</span>
                  </a>
                </Accordion.Body>
              </Accordion.Item>

              {/* Universities */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>My Universities</Accordion.Header>
                <Accordion.Body>
                  {universities.length > 0 ? (
                    universities.map((u, i) => (
                      <a key={i} className="dropdown-item" href={u.link}>
                        {u.name} <span className="text-muted">({u.role})</span>
                      </a>
                    ))
                  ) : (
                    <div className="text-muted px-3">No universities yet</div>
                  )}
                  <a className="org-action" href="/register/university">
                    <FiPlusCircle className="org-action-icon" />
                    <span>Register University</span>
                  </a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Admin link (only for site admins) */}
            {roles && roles.includes("Admin") && (
              <NavDropdown.Item href="/admin/dashboard">
                Admin Dashboard
              </NavDropdown.Item>
            )}
            {/* Footer */}
            <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </Nav>
  );
}
