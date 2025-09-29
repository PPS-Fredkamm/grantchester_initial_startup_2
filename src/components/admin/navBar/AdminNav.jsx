import { NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function AdminNav() {
  const navConfig = {
    admin: [
      { path: "", label: "Dashboard" },
      { path: "donations", label: "View All Donations" },
      { path: "documents", label: "View All Documents" },
      { path: "mailing", label: "View All Mailing" },
    ],
  };

  const { pathname } = useLocation();
  const basePath = pathname.split("/")[1]?.toLowerCase();
  const links = navConfig[basePath];

  if (!links) return null;
  return (
    <>
      <Navbar expand="md" className="admin-nav" collapseOnSelect>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            {links.map(({ path, label }) => {
              const isAbsolute = path.startsWith("/");
              const fullPath = isAbsolute
                ? path
                : `/${basePath}${path ? `/${path}` : ""}`;
              return (
                <Nav.Link
                  key={label}
                  as={NavLink}
                  to={fullPath}
                  end={path === "" || isAbsolute}
                >
                  {label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
