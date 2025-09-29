import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

export default function CompanyAddress() {
  const US_STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
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
          <Form.Label>Address 1</Form.Label>
          <Form.Control
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option value="">Select a state</option>
            {US_STATES.map((abbr) => (
              <option key={abbr} value={abbr}>
                {abbr}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>
      </Form>
    </>
  );
}
