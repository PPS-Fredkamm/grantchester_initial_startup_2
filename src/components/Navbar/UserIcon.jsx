import { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import ProfilePlaceholder from "../../assets/Images/profilePlaceholder.jpg";

import { useAuthContext } from "../../context/AuthProvider";

import Globals from "../../global/globals";

function UserIcon() {
  const authCtx = useAuthContext();

  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);
  
  useEffect(() => {
    if (Globals.imageFileInfo.data.length > 0) {
      let dataUrl = Globals.createImageFileURL();
      setProfileImage(dataUrl);
    }
  }, [profileImage]);

  function handleLogout() {
    authCtx.logout();
  }

  return (
    <Nav className="align-items-center">
      {authCtx.ctx.isAuthenticated && (
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex flex-column text-end">
            <span className="user-email">{Globals.profileInfo.email}</span>
            <span className="user-role">{Globals.roleInfo.roles.join(", ")}</span>
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
              <Image src={ProfilePlaceholder} className="profile-card-img" alt="Profile" />
              <div className="profile-card-info">
                <strong>{Globals.userInfo.username}</strong>
                <div className="text-muted">{Globals.profileInfo.email}</div>
              </div>
            </div>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/donor">Donor Dashboard</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </Nav>
  );
}

export default UserIcon;
