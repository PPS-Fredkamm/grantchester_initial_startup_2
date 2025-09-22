import { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import ProfilePlaceholder from "../../assets/Images/profilePlaceholder.jpg";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import * as ACM from "../../managers/ApiClientMethods.js";

function UserIcon() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);
  const roles = useSelector((state) => state.auth.roles);
  const imageFile = useSelector((state) => state.auth.imageFile);

  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);

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
            <span className="user-email">{profile?.email || "No email"}</span>
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
            <div className="profile-card">
              <Image
                src={profileImage}
                className="profile-card-img"
                alt="Profile"
              />
              <div className="profile-card-info">
                <strong>{user?.username || "Unknown User"}</strong>
                <div className="text-muted">{profile?.email || "No email"}</div>
              </div>
            </div>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/donor">Donor Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="/register/company">
              Company Registration
            </NavDropdown.Item>
            <NavDropdown.Item href="/register/university">
              University Registration
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </Nav>
  );
}

export default UserIcon;
