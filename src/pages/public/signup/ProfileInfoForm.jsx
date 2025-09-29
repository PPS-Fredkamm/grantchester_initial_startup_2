import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Card, Col, Row } from "react-bootstrap";

import * as ACELocation from "../../../managers/ApiClient-Location";
import * as ACM from "../../../managers/ApiClientMethods";
import * as BLM from "../../../managers/BusinessLayerMethods";

export default function ProfileInfoForm({ onSuccess }) {
  const profileCDO = useSelector((state) => state.auth.profileCDO);

  const [states, setStates] = useState([]);
  const [statesDDL, setStatesDDL] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesDDL, setCountriesDDL] = useState([]);

  const [formData, setFormData] = useState({
    firstName: profileCDO?.firstName || "",
    middleName: profileCDO?.middleName || "",
    lastName: profileCDO?.lastName || "",
    phoneNumber: profileCDO?.phoneNumber || "",
    email: profileCDO?.email || "",

    address1: profileCDO?.addressCDO?.addressLine1 || "",
    address2: profileCDO?.addressCDO?.addressLine2 || "",
    address3: profileCDO?.addressCDO?.addressLine3 || "",
    cityName: profileCDO?.addressCDO?.cityName || "",
    stateListItem:
      profileCDO?.addressCDO?.state.abbreviation +
      " ( " +
      profileCDO?.addressCDO.state.name +
      " )",
    postalCode: profileCDO?.addressCDO?.postalCode || "",
    countryListItem:
      profileCDO?.addressCDO?.country.name +
      " [ " +
      profileCDO?.addressCDO?.country.abbreviation +
      " ]",
  });

  const [validated, setValidated] = useState(false);

  // Load dropdowns for states and countries
  useEffect(() => {
    async function fetchDDLData() {
      try {
        let apiResult;
        let statesRes, countriesRes, list;

        apiResult = await ACELocation.GetStatesAsync();
        statesRes = ACM.getApiResultData(apiResult);
        setStates(statesRes);
        list = statesRes.map((o) => o.abbreviation + " ( " + o.name + " )");
        setStatesDDL(list);

        apiResult = await ACELocation.GetCountriesAsync();
        countriesRes = ACM.getApiResultData(apiResult);
        setCountries(countriesRes);
        list = countriesRes.map((o) => o.name + " [ " + o.abbreviation + " ]");
        setCountriesDDL(list);
      } catch (error) {
        console.error("Error fetching DDL data:", error);
      }
    }
    fetchDDLData();
  }, []);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(event) {
    var flag;
    var index;
    var tmpProfileCDO;

    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      tmpProfileCDO = JSON.parse(JSON.stringify(profileCDO));

      tmpProfileCDO.firstName = formData.firstName;
      tmpProfileCDO.middleName = formData.middleName;
      tmpProfileCDO.lastName = formData.lastName;
      tmpProfileCDO.phoneNumber = formData.phoneNumber;
      tmpProfileCDO.email = formData.email;

      tmpProfileCDO.addressCDO.addressLine1 = formData.address1;
      tmpProfileCDO.addressCDO.addressLine2 = formData.address2;
      tmpProfileCDO.addressCDO.addressLine3 = "";
      tmpProfileCDO.addressCDO.cityName = formData.cityName;
      tmpProfileCDO.addressCDO.postalCode = formData.postalCode;

      index = statesDDL.findIndex((o) => o === formData.stateListItem);
      tmpProfileCDO.addressCDO.stateID = index;
      tmpProfileCDO.addressCDO.state = states[index];

      index = countriesDDL.findIndex((o) => o === formData.countryListItem);
      tmpProfileCDO.addressCDO.countryID = index;
      tmpProfileCDO.addressCDO.country = countries[index];

      flag = await BLM.UpdateProfileCDO(tmpProfileCDO);
      if (flag) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }

    setValidated(true);
  }

  return (
    <div className="profile-info-wrapper">
      <Card className="profile-card shadow">
        <Card.Body>
          <h4 className="text-center mb-4">Profile Information</h4>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="firstName">
                <Form.Label>
                  First Name <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  This field must be filled.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="middleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="lastName">
                <Form.Label>
                  Last Name <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                This field must be filled.
              </Form.Control.Feedback>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>
                  Email <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="phoneNumber">
                <Form.Label>
                  Phone Number <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="^[0-9]{7,15}$"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="address1">
                <Form.Label>
                  Address 1 <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field must be filled.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="cityName">
                <Form.Label>
                  City <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field must be filled.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="stateListItem">
                <Form.Label>
                  State <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Select
                  name="stateListItem"
                  value={formData.stateListItem}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a state</option>
                  {statesDDL.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a state.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="postalCode">
                <Form.Label>
                  Postal Code <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field must be filled.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="countryListItem">
                <Form.Label>
                  Country <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Select
                  name="countryListItem"
                  value={formData.countryListItem}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a country</option>
                  {countriesDDL.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a country.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="terms">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            <Button type="submit" className="signup-button w-100 mb-2">
              Save & Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
