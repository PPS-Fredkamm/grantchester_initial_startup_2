import { useState, useRef, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import { IoChevronDown } from "react-icons/io5";

function NavMenu() {
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

  // Additional pages (Page 1–3)
  const pageLinks = [
    { id: "page1", href: "/page1", title: "Page 1" },
    { id: "page2", href: "/page2", title: "Page 2" },
    { id: "page3", href: "/page3", title: "Page 3" },
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
    <Nav className="marketing-nav-menu">
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

      {/* Dynamically render page links */}
      {pageLinks.map((page) => (
        <Nav.Link key={page.id} href={page.href}>
          {page.title}
        </Nav.Link>
      ))}
    </Nav>
  );
}

export default NavMenu;
