import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import NavMenu from './NavMenu';
import GrantchesterImage from '../../../assets/images/grantchester.png';

import './MarketingNav.css';

export default function MarketingNav() {

  return (
    <Navbar fixed="top" expand="lg" className="marketing-navbar-container px-3">
      <Container fluid>
        <div className="marketing-nav-content">
          {/* Brand */}
          <Navbar.Brand href="/">
            <Image
              src={GrantchesterImage}
              alt="Grantchester Logo"
              height="75"
              className="marketing-nav-image"
            />
          </Navbar.Brand>

          {/* Centered Nav Menu - Desktop Only */}
          <div className="d-none d-xl-flex justify-content-center flex-grow-1">
            <NavMenu />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
