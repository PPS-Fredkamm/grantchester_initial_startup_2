import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FaHeart } from 'react-icons/fa';

import { useUser } from '../../Data/UserContext';

function NavMenu() {
  const { isAuthenticated } = useUser();

  return (
    <Nav className="nav-menu">
      <Nav.Link href="/link">Why Donate Stock</Nav.Link>
      <Nav.Link href="/link">For Donors</Nav.Link>
      <Nav.Link href="/link">For Universities</Nav.Link>
      <Nav.Link href="/link">Partners</Nav.Link>
      <Nav.Link href="/link">Resources</Nav.Link>

      {!isAuthenticated && (
        <>
          <Nav.Link href="/login">Sign In</Nav.Link>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="donate-tooltip">Donate</Tooltip>}
          >
            <Button href="/donate" className="donate-button">
              <FaHeart className="donate-heart-icon" />
              Donate Shares
            </Button>
          </OverlayTrigger>
        </>
      )}
    </Nav>
  );
}

export default NavMenu;
