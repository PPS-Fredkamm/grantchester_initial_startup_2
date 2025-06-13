import { Card, Form, Button } from 'react-bootstrap';
import { FiUser, FiMail, FiMoreHorizontal, FiArrowRight } from 'react-icons/fi';
import { PiPulse } from 'react-icons/pi';
import { MdSmartphone } from 'react-icons/md';

import './ProfileInfoCard.css';

// Placeholder user object — replace this with data from context or fetch
const user = {
  name: 'John Doe',
  role: 'Donor',
  email: 'johndoe@gmail.com',
  phone: '(908)-000-0111',
};

function ProfileInfoCard() {
  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="profile-title">
          <Card.Title className="fs-4">Profile Information</Card.Title>
          <FiMoreHorizontal className="profile-menu-icon" />
        </div>
        <Form>
          <div className="field-row">
            <span>
              <FiUser />
            </span>
            <Form.Control type="text" value={user.name} readOnly />
          </div>
          <div className="field-row">
            <span>
              <PiPulse />
            </span>
            <Form.Control type="text" value={user.role} readOnly />
          </div>
          <div className="field-row">
            <span>
              <FiMail />
            </span>
            <Form.Control type="email" value={user.email} readOnly />
          </div>
          <div className="field-row mb-4">
            <span>
              <MdSmartphone />
            </span>
            <Form.Control type="text" value={user.phone} readOnly />
          </div>
          <Button className="profile-donate-button">
            <span>Donate Now</span>
            <FiArrowRight />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileInfoCard;
