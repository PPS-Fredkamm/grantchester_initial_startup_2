import { NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

// CSS for this file is located in the AdminLayout.css file

import { useState } from "react";

export default function AdminNav() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navConfig = {
    admin: [
      { path: "dashboard", label: "Dashboard" },

      {
        label: "Donations",
        children: [
          { path: "pending-donations", label: "Pending Donations" },
          { path: "view-donations", label: "View All Donations" },
        ],
      },
      {
        label: "Users",
        children: [{ path: "users", label: "View All Users" }],
      },
      {
        label: "Company",
        children: [
          { path: "company-registrations", label: "Pending Registrations" },
          { path: "view-companies", label: "View all Companies" },
        ],
      },
      {
        label: "University",
        children: [
          { path: "university-registrations", label: "Pending Registrations" },
          { path: "view-universities", label: "View all Universities" },
        ],
      },
    ],
  };

  const { pathname } = useLocation();
  const basePath = pathname.split("/")[1]?.toLowerCase();
  const links = navConfig[basePath];

  if (!links) return null;

  return (
    <Navbar expand="md" className="admin-nav" collapseOnSelect>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          {links.map(({ path, label, children }) => {
            if (children) {
              return (
                <NavDropdown
                  key={label}
                  title={label}
                  show={openDropdown === label}
                  onMouseEnter={() => setOpenDropdown(label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {children.map((child) => {
                    const fullPath = `/${basePath}/${child.path}`;
                    return (
                      <NavDropdown.Item
                        key={child.label}
                        as={NavLink}
                        to={fullPath}
                      >
                        {child.label}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              );
            }

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
  );
}
