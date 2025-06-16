import { Card, Form } from 'react-bootstrap';
import { FiUser, FiMail, FiMoreHorizontal } from 'react-icons/fi';
import { PiPulse } from 'react-icons/pi';
import { MdSmartphone } from 'react-icons/md';
import { LuBuilding } from 'react-icons/lu';

import './CompanyInfoCard.css';

// Placeholder object for now — replace this with actual data (e.g., from fetch or context)
const company = {
  companyName: 'Alumbiz Inc.',
  name: 'Joe Doe',
  location: 'Wellington',
  email: 'contact@gmail.org',
  phone: '(555)-123-4567',
};

function CompanyInfoCard() {
  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="company-title">
          <Card.Title className="fs-4">Company Information</Card.Title>
          <FiMoreHorizontal className="company-menu-icon" />
        </div>
        <Form>
          <div className="company-field-row">
            <span>
              <PiPulse />
            </span>
            <Form.Control type="text" value={company.companyName} readOnly />
          </div>
          <div className="company-field-row">
            <span>
              <FiUser />
            </span>
            <Form.Control type="text" value={company.name} readOnly />
          </div>
          <div className="company-field-row">
            <span>
              <LuBuilding />
            </span>
            <Form.Control type="text" value={company.location} readOnly />
          </div>
          <div className="company-field-row">
            <span>
              <FiMail />
            </span>
            <Form.Control type="email" value={company.email} readOnly />
          </div>
          <div className="company-field-row mb-4">
            <span>
              <MdSmartphone />
            </span>
            <Form.Control type="text" value={company.phone} readOnly />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CompanyInfoCard;
