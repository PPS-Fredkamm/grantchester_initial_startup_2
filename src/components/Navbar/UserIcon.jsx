import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

import ProfilePlaceholder from '../../assets/Images/profilePlaceholder.jpg';

import { useAuthContext } from '../../context/AuthProvider';
// import { useNavigate } from 'react-router-dom';

function UserIcon() {
  const authCtx = useAuthContext();
  // const navigate = useNavigate();

  const handleLogout = () => {
    authCtx.logout();
    // navigate('/login');
  };

  return (
    <div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {authCtx.ctx.isAuthenticated && (
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex flex-column text-end">
                <span className="user-email">{authCtx.ctx.identityName}@example.com</span>
                <span className="user-role">Member</span>
              </div>
              <NavDropdown
                align="end"
                title={
                  <Image
                    src={ProfilePlaceholder}
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
                    src={ProfilePlaceholder}
                    className="profile-card-img"
                    alt="Profile"
                  />
                  <div className="profile-card-info">
                    <strong>{authCtx.ctx.identityName}</strong>
                    <div className="text-muted">{authCtx.ctx.identityName}@example.com</div>
                  </div>
                </div>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/donor">Donor Dashboard</NavDropdown.Item>
                <NavDropdown.Item href="/company">Company Dashboard</NavDropdown.Item>
                <NavDropdown.Item href="/university">University Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </div>
  );
}

export default UserIcon;
