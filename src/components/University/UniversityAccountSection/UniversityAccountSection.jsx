import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';


const UniversityAccountSection = () => {
  // Original saved data
  const [originalData, setOriginalData] = useState({
    fullName: 'Drew Senour',
    email: 'drew@example.com',
    address: '123 University Blvd, Boston, MA',
  });

  // Editable form state
  const [formData, setFormData] = useState({ ...originalData });
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const handleSave = () => {
    setOriginalData({ ...formData });
    setIsEditing(false);
    // You can also make an API call here to persist changes
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">Account Details</h5>
        {!isEditing && (
          <FaPencilAlt style={{ cursor: 'pointer' }} onClick={handleEditClick} />
        )}
      </div>

      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Full Name</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleFieldChange}
              readOnly={!isEditing}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Email Address</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              readOnly={!isEditing}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3}>Primary Address</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFieldChange}
              readOnly={!isEditing}
            />
          </Col>
        </Form.Group>

        {isEditing && (
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default UniversityAccountSection;
