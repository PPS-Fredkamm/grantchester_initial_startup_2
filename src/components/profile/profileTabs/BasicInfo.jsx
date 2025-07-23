import { useState } from "react";
import { Form, Button } from "react-bootstrap";

// import { useAuthContext } from "../../../context/AuthProvider";

import Globals from "../../../global/globals";
import * as AM from "../../../managers/AuthManager";
import * as ACO from "../../../managers/ApiClientObjects";

import "./ProfileTabs.css";

export default function BasicInfo() {
  // const authCtx = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: Globals.profileInfo.firstName,
    middleName: Globals.profileInfo.middleName,
    lastName: Globals.profileInfo.lastName,
    phoneNumber: Globals.profileInfo.phoneNumber,
    email: Globals.profileInfo.email,
    address1: Globals.profileInfo.address1,
    address2: Globals.profileInfo.address2,
    city: Globals.profileInfo.city,
    state: Globals.profileInfo.state,
    zip: Globals.profileInfo.zip,
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

  async function handleSave() {
    var flag;
    var tmpProfile;

    tmpProfile = new ACO.Profile();
    tmpProfile.firstName = formData.firstName;
    tmpProfile.middleName = formData.middleName;
    tmpProfile.lastName = formData.lastName;
    tmpProfile.phoneNumber = formData.phoneNumber;
    tmpProfile.email = formData.email;
    flag = await AM.UpdateProfile(tmpProfile);
    if (flag) {
      setOriginalData(formData);
    }
    setEditMode(false);
  }

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
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            name="middleName"
            value={formData.middleName}
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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

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
          <Form.Control
            type="state"
            name="lastName"
            value={formData.state}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="zip"
            name="lastName"
            value={formData.zip}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PO Box</Form.Label>
          <Form.Control
            type="pobox"
            name="lastName"
            value={formData.pobox}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
