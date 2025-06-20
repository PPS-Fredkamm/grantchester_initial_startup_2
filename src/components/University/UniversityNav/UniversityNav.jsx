import Nav from 'react-bootstrap/Nav';
import './UniversityNav.css';

function UniversityNav() {
  return (
    <>
      <div className="university-navbar-wrapper">
        <Nav className="university-navbar">
          <Nav.Link href="/link">Dashboard</Nav.Link>
          <Nav.Link href="/link">My Donations</Nav.Link>
          <Nav.Link href="/link">Documents</Nav.Link>
          <Nav.Link href="/link">Mailing</Nav.Link>
          <Nav.Link href="/link">Settings</Nav.Link>
        </Nav>
      </div>
      <div className="dashboard-divider" />
    </>
  );
}

export default UniversityNav;
