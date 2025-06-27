import { useState } from 'react';

import { FiChevronDown } from 'react-icons/fi';
import { Image } from 'react-bootstrap';

import ProfilePlaceholder from '../../assets/Images/profilePlaceholder.jpg';

import { useAuthContext } from '../../context/AuthProvider';

function MobileUserDropdown({ onClose }) {
  const authCtx = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!authCtx.ctx.isAuthenticated) return null;

  const handleLogout = () => {
    authCtx.logout();
    if (onClose) onClose();
  };

  return (
    <div className="mobile-user-dropdown">
      <div className="mobile-user-trigger" onClick={() => setIsOpen(!isOpen)}>
        <Image
          src={ProfilePlaceholder}
          roundedCircle
          width={36}
          height={36}
          alt="Profile"
        />
        <span className="mobile-user-name">
          {authCtx.ctx.identityName}@example.com
        </span>
        <FiChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="mobile-user-menu">
          <a
            href="/profile"
            className="dropdown-item"
            onClick={onClose}
          >
            Profile
          </a>
          <div
            className="dropdown-item"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileUserDropdown;
