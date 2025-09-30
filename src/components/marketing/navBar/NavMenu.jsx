import Nav from "react-bootstrap/Nav";

function NavMenu() {
  return (
    <Nav className="marketing-nav-menu">
      <Nav.Link href="/page1">Page 1</Nav.Link>
      <Nav.Link href="/page2">Page 2</Nav.Link>
      <Nav.Link href="/page3">Page 3</Nav.Link>
    </Nav>
  );
}

export default NavMenu;
