import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

/* CSS moved to: src/styles/components/navigation/donor-navigation.css */

export default function DonorNav() {
  return (
    <Navbar expand="sm" className="donor-navbar" collapseOnSelect>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="donor-navbar">
          <Nav.Link as={NavLink} to="/donor" end>
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/company">
            My Donations
          </Nav.Link>
          <Nav.Link as={NavLink} to="/donor/documents">
            Documents
          </Nav.Link>
          <Nav.Link as={NavLink} to="/donor/mailing">
            Mailing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/donor/settings">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
