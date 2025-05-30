import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

import ProfilePlaceholder from '../../assets/Images/profilePlaceholder.jpg';

import { useUser } from '../../Data/UserContext';

function UserIcon() {
  const { isAuthenticated, logout } = useUser();

  // Placeholder data — eventually pulled from real user object
  const user = {
    name: 'username',
    email: 'username@example.com',
    profileImg: ProfilePlaceholder,
    role: 'Admin',
  };

  return (
    <div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {isAuthenticated && (
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex flex-column text-end">
                <span className="user-email">{user.email}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <NavDropdown
                align="end"
                title={
                  <Image
                    src={user.profileImg}
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
                    src={user.profileImg}
                    className="profile-card-img"
                    alt="Profile"
                  />
                  <div className="profile-card-info">
                    <strong>{user.name}</strong>
                    <div className="text-muted">{user.email}</div>
                  </div>
                </div>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </div>
  );
}

export default UserIcon;
