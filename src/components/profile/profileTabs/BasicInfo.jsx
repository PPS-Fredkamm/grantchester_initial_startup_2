import { useEffect, useState } from "react";
import { Form, Button, Accordion } from "react-bootstrap";

import Globals from "../../../global/globals";
import * as AM from "../../../managers/AuthManager";
import * as apiClient from "../../../managers/ApiClient";
import * as ACM from "../../../managers/ApiClientMethods";
import * as ACO from "../../../managers/ApiClientObjects";

import "./ProfileTabs.css";

export default function BasicInfo() {
  const [US_STATES, setUS_STATES] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        var apiResult, states, list;
        apiResult = await apiClient.GetStatesAsync();
        states = ACM.getApiResultData(apiResult);
        list = [];
        for (let i = 0; i < states.length; i++) {
          list.push(states[i].abbreviation);
        }
        setUS_STATES(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: Globals.member.profile.firstName,
    middleName: Globals.member.profile.middleName,
    lastName: Globals.member.profile.lastName,
    phoneNumber: Globals.member.profile.phoneNumber,
    email: Globals.member.profile.email,
    address1: Globals.member.address.addressLine1,
    address2: Globals.member.address.addressLine2,
    address3: Globals.member.address.addressLine3,
    cityName: Globals.member.address.cityName,
    stateAbbreviation: Globals.member.address.stateAbbreviation,
    stateName: Globals.member.address.stateName,
    postalCode: Globals.member.address.postalCode,
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
    var tmpProfile, tmpAddress;

    tmpAddress = new ACO.AddressDTO();
    tmpAddress.addressLine1 = formData.address1;
    tmpAddress.addressLine2 = formData.address2;
    tmpAddress.addressLine3 = "";
    tmpAddress.cityName = formData.cityName;
    tmpAddress.stateAbbreviation = formData.stateAbbreviation;
    tmpAddress.stateName = "";
    tmpAddress.postalCode = formData.postalCode;
    flag = await AM.UpdateAddress(tmpAddress);
    if (flag) {
      tmpProfile = new ACO.ProfileDTO();
      tmpProfile.firstName = formData.firstName;
      tmpProfile.middleName = formData.middleName;
      tmpProfile.lastName = formData.lastName;
      tmpProfile.phoneNumber = formData.phoneNumber;
      tmpProfile.email = formData.email;
      flag = await AM.UpdateProfile(tmpProfile);
      if (flag) {
        setOriginalData(formData);
      }
    }
    setEditMode(false);
  }

  return (
    <div className="px-2">
      <div className="d-flex justify-content-end mb-3">
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
        <Accordion defaultActiveKey="0" className="mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Contact Information</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Address</Accordion.Header>
            <Accordion.Body>
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
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select name="stateAbbreviation" value={formData.stateAbbreviation} onChange={handleChange} disabled={!editMode}>
                  <option value="">Select a state</option>
                  {US_STATES.map((stateAbbr) => (
                    <option key={stateAbbr} value={stateAbbr}>
                      {stateAbbr}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    </div>
  );
}
