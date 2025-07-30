import { NavLink, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function MemberNav() {
  const navConfig = {
    donor: [
      { path: '', label: 'Dashboard' },
      { path: 'donations', label: 'My Donations' },
      { path: 'documents', label: 'Documents' },
      { path: 'mailing', label: 'Mailing' },
      { path: '/profile', label: 'Settings' },
    ],
    company: [
      { path: '', label: 'Dashboard' },
      { path: 'requests', label: 'Company Requests' },
      { path: 'users', label: 'Users' },
      { path: 'settings', label: 'Settings' },
    ],
    university: [
      { path: '', label: 'Dashboard' },
      { path: 'certificates', label: 'Certificates' },
      { path: 'donations', label: 'Donations' },
      { path: 'settings', label: 'Settings' },
    ],
    profile: [
      { path: '', label: 'Profile' },
      { path: '/donor', label: 'Donor Dashboard' },
      { path: '/company', label: 'Company Dashboard' },
      { path: '/university', label: 'University Dashboard' },
    ],
  };

  const { pathname } = useLocation();
  const basePath = pathname.split('/')[1]?.toLowerCase();
  const links = navConfig[basePath];

  if (!links) return null;

  return (
    <>
      <Navbar expand="md" className="member-nav" collapseOnSelect>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            {links.map(({ path, label }) => {
              const isAbsolute = path.startsWith('/');
              const fullPath = isAbsolute
                ? path
                : `/${basePath}${path ? `/${path}` : ''}`;
              return (
                <Nav.Link
                  key={label}
                  as={NavLink}
                  to={fullPath}
                  end={path === '' || isAbsolute}
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
