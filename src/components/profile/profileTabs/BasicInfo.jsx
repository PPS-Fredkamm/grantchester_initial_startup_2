import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Accordion } from "react-bootstrap";

import * as ACELocation from "../../../managers/ApiClient-Location";
import * as ACM from "../../../managers/ApiClientMethods";
import * as ACO from "../../../managers/ApiClientObjects";
import * as BLM from "../../../managers/BusinessLayerMethods";

import "./ProfileTabs.css";

export default function BasicInfo() {
  const [states, setStates] = useState([]);
  const [statesDDL, setStatesDDL] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesDDL, setCountriesDDL] = useState([]);

  // Redux state
  const profile = useSelector((state) => state.auth.profile);
  const addressCDO = useSelector((state) => state.auth.addressCDO);

  useEffect(() => {
    async function fetchDDLData() {
      try {
        let apiResult;
        let states, countries;
        let list;

        apiResult = await ACELocation.GetStatesAsync();
        states = ACM.getApiResultData(apiResult);
        setStates(states);
        list = states.map((o) => o.abbreviation + ' ( ' + o.name + ' )');
        setStatesDDL(list);

        apiResult = await ACELocation.GetCountriesAsync();
        countries = ACM.getApiResultData(apiResult);
        setCountries(countries);
        list = countries.map((o) => o.name + ' [ ' + o.abbreviation + ' ]');
        setCountriesDDL(list);
      } catch (error) {
        console.error("Error fetching DDL data:", error);
      }
    }
    fetchDDLData();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    middleName: profile?.middleName || "",
    lastName: profile?.lastName || "",
    phoneNumber: profile?.phoneNumber || "",
    email: profile?.email || "",

    address1: addressCDO?.addressLine1 || "",
    address2: addressCDO?.addressLine2 || "",
    address3: addressCDO?.addressLine3 || "",
    cityName: addressCDO?.cityName || "",
    stateListItem: addressCDO?.state.abbreviation + ' ( ' + addressCDO.state.name + ' )',
    postalCode: addressCDO?.postalCode || "",
    countryListItem: addressCDO?.country.name + ' [ ' + addressCDO?.country.abbreviation + ' ]',
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
    var index;
    var tmpProfile, tmpAddressCDO;

    try {
      tmpAddressCDO = new ACO.AddressCDO();
      tmpAddressCDO.addressLine1 = formData.address1;
      tmpAddressCDO.addressLine2 = formData.address2;
      tmpAddressCDO.addressLine3 = "";
      tmpAddressCDO.cityName = formData.cityName;
      tmpAddressCDO.postalCode = formData.postalCode;

      index = statesDDL.findIndex(o => o === formData.stateListItem);
      tmpAddressCDO.stateID = index;
      tmpAddressCDO.state = states[index];

      index = countriesDDL.findIndex(o => o === formData.countryListItem);
      tmpAddressCDO.countryID = index;
      tmpAddressCDO.country = countries[index];

      flag = await BLM.UpdateAddressCDO(tmpAddressCDO);

      if (flag) {
        tmpProfile = new ACO.ProfileDTO();
        tmpProfile.firstName = formData.firstName;
        tmpProfile.middleName = formData.middleName;
        tmpProfile.lastName = formData.lastName;
        tmpProfile.phoneNumber = formData.phoneNumber;
        tmpProfile.email = formData.email;

        flag = await BLM.UpdateProfile(tmpProfile);
        if (flag) {
          setOriginalData(formData);
        }
      }
    } catch (err) {
      console.error("Error saving profile:", err);
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
                <Form.Select
                  name="stateListItem"
                  value={formData.stateListItem}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="">Select a state</option>
                  {statesDDL.map((stateAbbr) => (
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

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="countryListItem"
                  value={formData.countryListItem}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="">Select a country</option>
                  {countriesDDL.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    </div>
  );
}
