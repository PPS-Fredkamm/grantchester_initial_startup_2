import { Card, Form, Button } from "react-bootstrap";
import { FiUser, FiMail, FiMoreHorizontal, FiArrowRight } from "react-icons/fi";
import { PiPulse } from "react-icons/pi";
import { MdSmartphone } from "react-icons/md";

import { useSelector } from "react-redux";

import "./DonorInfoCard.css";

// Placeholder user object — replace this with data from context or fetch
// const user = {
//   name: 'John Doe',
//   role: 'Donor',
//   email: 'johndoe@gmail.com',
//   phone: '(908)-000-0111',
// };

export default function DonorInfoCard() {
  const roles = useSelector((state) => state.auth.roles);
  const profileCDO = useSelector((state) => state.auth.profileCDO);

  function formatPhone(num) {
    if (!num) return "";
    const cleaned = num.replace(/\D/g, ""); // strip non-digits
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return num; // fallback if not 10 digits
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="donor-title">
          <Card.Title className="fs-4">Donor Information</Card.Title>
          <FiMoreHorizontal className="donor-menu-icon" />
        </div>
        <Form>
          {/* Full name from profile OR username fallback */}
          <div className="field-row">
            <span>
              <FiUser />
            </span>
            <Form.Control
              type="text"
              value={
                profileCDO?.firstName || profileCDO?.lastName
                  ? `${profileCDO?.firstName || ""} ${
                      profileCDO?.lastName || ""
                    }`.trim()
                  : profileCDO?.username || ""
              }
              readOnly
            />
          </div>

          {/* Role from roles array */}
          <div className="field-row">
            <span>
              <PiPulse />
            </span>
            <Form.Control
              type="text"
              value={roles && roles.length > 0 ? roles.join(", ") : "Donor"}
              readOnly
            />
          </div>

          {/* Email from profile OR user fallback */}
          <div className="field-row">
            <span>
              <FiMail />
            </span>
            <Form.Control type="email" value={profileCDO?.email} readOnly />
          </div>

          {/* Phone from profile */}
          <div className="field-row mb-4">
            <span>
              <MdSmartphone />
            </span>
            <Form.Control
              type="text"
              value={formatPhone(profileCDO?.phoneNumber)}
              readOnly
            />
          </div>

          <Button href="/donate" className="donor-donate-button">
            <span>Donate Now</span>
            <FiArrowRight />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
