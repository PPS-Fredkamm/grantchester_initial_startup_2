import Nav from 'react-bootstrap/Nav';

function ProfileNav() {
  return (
    <Nav className="profile-navbar">
      <Nav.Link href="/link">Dashboard</Nav.Link>
      <Nav.Link href="/link">My Donations</Nav.Link>
      <Nav.Link href="/link">Documents</Nav.Link>
      <Nav.Link href="/link">Mailing</Nav.Link>
      <Nav.Link href="/link">Settings</Nav.Link>
    </Nav>
  );
}

export default ProfileNav;
