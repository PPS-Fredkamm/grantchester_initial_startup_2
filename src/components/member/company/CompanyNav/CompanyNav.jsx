import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './CompanyNav.css';

export default function CompanyNav() {
  return (
    <Navbar expand="sm" className="company-navbar" collapseOnSelect>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="company-navbar">
          <Nav.Link as={NavLink} to="/company" end>
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/donor">
            Company Requests
          </Nav.Link>
          <Nav.Link as={NavLink} to="/university">
            Users
          </Nav.Link>
          <Nav.Link as={NavLink} to="/company/settings">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
