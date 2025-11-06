import { useState, useRef, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FaHeart } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

import { useSelector } from "react-redux";

function NavMenu() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dropdown items
  const dropdownItems = [
    {
      id: "how-it-works",
      href: "/how-it-works",
      title: "How It Works",
      description: "Overview of our platform",
      isPrimary: true,
    },
    {
      id: "for-universities",
      href: "/for-universities",
      title: "For Universities",
      description: "Partner with us",
      isPrimary: false,
    },
    {
      id: "for-donors",
      href: "/for-donors",
      title: "For Donors",
      description: "Make an impact",
      isPrimary: false,
    },
  ];

  // Close dropdown when clicking outside (but not on hover events)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Nav className="nav-menu">
      {/* How It Works Dropdown */}
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className="dropdown-trigger"
          onClick={toggleDropdown}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          How It Works
          <IoChevronDown
            className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
            size={14}
          />
        </button>

        <div
          className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="dropdown-content">
            {dropdownItems.map((item, index) => (
              <div key={item.id}>
                <a
                  href={item.href}
                  className={`dropdown-item ${item.isPrimary ? "primary" : ""}`}
                  onClick={closeDropdown}
                >
                  <div className="item-content">
                    <span className="item-title">{item.title}</span>
                    <span className="item-description">{item.description}</span>
                  </div>
                </a>

                {index === 0 && <div className="dropdown-divider"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Nav.Link href="/partners">Partners</Nav.Link>
      <Nav.Link href="/faq">FAQs</Nav.Link>

      {!isAuthenticated && <Nav.Link href="/login">Sign In</Nav.Link>}

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
