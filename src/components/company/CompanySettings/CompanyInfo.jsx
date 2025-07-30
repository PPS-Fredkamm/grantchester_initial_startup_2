import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

export default function CompanyInfo() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    contactEmail: "",
    phoneNumber: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCancel() {
    setFormData(originalData);
    setEditMode(false);
  }

  function handleSave() {
    setOriginalData(formData);
    setEditMode(false);
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        {!editMode ? (
          <FaPencilAlt
            style={{ cursor: "pointer" }}
            onClick={() => setEditMode(true)}
            title="Edit"
          />
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
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>
      </Form>
    </>
  );
}
