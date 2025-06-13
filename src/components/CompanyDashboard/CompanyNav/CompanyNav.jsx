import Nav from 'react-bootstrap/Nav';

export default function CompanyNav() {
  return (
    <Nav className="profile-navbar">
      <Nav.Link href="/link">Dashboard</Nav.Link>
      <Nav.Link href="/link">Company Requests</Nav.Link>
      <Nav.Link href="/link">Users</Nav.Link>
      <Nav.Link href="/link">Settings</Nav.Link>
    </Nav>
  );
}
