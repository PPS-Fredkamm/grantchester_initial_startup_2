import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './ProfileNav.css';

function ProfileNav() {
  return (
    <Navbar expand="sm" className="profile-navbar" collapseOnSelect>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="profile-navbar">
          <Nav.Link as={NavLink} to="/profile" end>
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile/donations">
            My Donations
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile/documents">
            Documents
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile/mailing">
            Mailing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/profile/settings">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default ProfileNav;
