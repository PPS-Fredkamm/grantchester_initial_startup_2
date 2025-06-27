import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiMenu } from 'react-icons/fi';

import NavMenu from './NavMenu';
import UserIcon from './UserIcon';
import MobileUserDropdown from './MobileUserDropdown';

import GrantchesterImage from '../../assets/images/grantchester.png';

import './Navbar.css';

function CustomNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Navbar fixed="top" expand="lg" className="navbar-container px-3">
      <Container fluid>
        <div className="nav-content">
          {/* Brand */}
          <Navbar.Brand href="/">
            <Image
              src={GrantchesterImage}
              alt="Grantchester Logo"
              height="75"
              className="nav-image"
            />
          </Navbar.Brand>

          {/* Centered Nav Menu - Desktop Only */}
          <div className="d-none d-xl-flex justify-content-center flex-grow-1">
            <NavMenu />
          </div>

          {/* User Icon - Desktop Only */}
          <div className="d-none d-xl-flex align-items-center">
            <UserIcon />
          </div>

          {/* Mobile Toggle - Mobile Only */}
          <Button
            className="d-xl-none mobile-toggle-button"
            variant="outline-secondary"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <FiMenu size={20} />
          </Button>
        </div>

        {/* Mobile Dropdown - Mobile Only */}
        <Offcanvas
          show={isMobileOpen}
          onHide={() => setIsMobileOpen(false)}
          placement="end"
          className="mobile-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>{' '}
            {/* Optional: or leave blank */}
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NavMenu />
            <MobileUserDropdown onClose={() => setIsMobileOpen(false)} />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
