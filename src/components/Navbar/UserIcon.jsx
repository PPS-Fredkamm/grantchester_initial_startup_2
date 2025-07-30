import { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import ProfilePlaceholder from "../../assets/Images/profilePlaceholder.jpg";

import { useAuthContext } from "../../context/AuthProvider";

import * as ACM from "../../managers/ApiClientMethods.js";

import Globals from "../../global/globals.js";

function UserIcon() {
  const authCtx = useAuthContext();

  const [profileImage, setProfileImage] = useState(ProfilePlaceholder);

  useEffect(() => {
    const imageFile = Globals.member.imageFile;

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
  }, []);

  function handleLogout() {
    authCtx.logout();
  }

  return (
    <Nav className="align-items-center">
      {authCtx.ctx.isAuthenticated && (
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex flex-column text-end">
            <span className="user-email">{Globals.member.profile.email}</span>
            <span className="user-role">{Globals.member.roles.join(", ")}</span>
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
                <strong>{Globals.member.user.username}</strong>
                <div className="text-muted">{Globals.member.profile.email}</div>
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
