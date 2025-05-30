import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import UserIcon from './UserIcon';
import NavMenu from './NavMenu';

import './Navbar.css';

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3">
      <Container fluid>
        <div className="d-flex w-100 justify-content-between align-items-center">
          {/* Left-aligned brand */}
          <Navbar.Brand href="/">Alumbiz</Navbar.Brand>

          {/* Center-aligned menu */}
          <NavMenu />

          {/* Right-aligned user profile */}
          <div className="d-flex align-items-center">
            <UserIcon />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
