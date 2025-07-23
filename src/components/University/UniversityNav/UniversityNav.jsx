import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./UniversityNav.css";

export default function UniversityNav() {
  return (
    <>
      <Navbar expand="sm" className="university-nav" collapseOnSelect>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="university-navbar">
            <Nav.Link as={NavLink} to="/university" end>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/donor">
              Certificates
            </Nav.Link>
            <Nav.Link as={NavLink} to="/company">
              Donations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile">
              Public Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/university/settings">
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="dashboard-divider" />
    </>
  );
}
