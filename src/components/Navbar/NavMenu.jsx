import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FaHeart } from "react-icons/fa";

import { useAuthContext } from "../../context/AuthProvider";

function NavMenu() {
  const authCtx = useAuthContext();

  return (
    <Nav className="nav-menu">
      <Nav.Link href="/why-donate">Why Donate</Nav.Link>
      <Nav.Link href="/for-donors">For Donors</Nav.Link>
      <Nav.Link href="/for-universities">For Universities</Nav.Link>
      <Nav.Link href="/partners">Partners</Nav.Link>
      <Nav.Link href="/resources">Resources</Nav.Link>
      {!authCtx.ctx.isAuthenticated && (
        <>
          <Nav.Link href="/login">Sign In</Nav.Link>
        </>
      )}
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
