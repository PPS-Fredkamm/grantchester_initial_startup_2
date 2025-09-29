import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FaHeart } from "react-icons/fa";

function NavMenu() {
  return (
    <Nav className="marketing-nav-menu">
      <Nav.Link href="/how-it-works">How It Works</Nav.Link>
      <Nav.Link href="/partners">Partners</Nav.Link>
      <Nav.Link href="/FAQ">FAQs</Nav.Link>

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="donate-tooltip">Donate</Tooltip>}
      >
        <Button href="/donate" className="donate-button">
          <FaHeart className="donate-heart-icon" />
          Donate Now
        </Button>
      </OverlayTrigger>
    </Nav>
  );
}

export default NavMenu;
