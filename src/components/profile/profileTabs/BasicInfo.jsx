import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useAuthContext } from '../../../context/AuthProvider';

import './ProfileTabs.css';

export default function BasicInfo() {
  const authCtx = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  console.log(authCtx.ctx);
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditMode(false);
  };

  const handleSave = () => {
    // TODO: backend logic
    setOriginalData(formData);
    setEditMode(false);
  };

  return (
    <div className="px-2">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h5 className="mb-0">Basic Information</h5>
        {!editMode ? (
          <Button variant="outline-primary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        ) : (
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline-secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
