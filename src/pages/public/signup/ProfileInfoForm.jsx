import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Card, Col, Row, FloatingLabel } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

import * as ACELocation from "../../../managers/ApiClient-Location";
import * as ACM from "../../../managers/ApiClientMethods";
import * as BLM from "../../../managers/BusinessLayerMethods";

import "./ProfileInfoForm.css";

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
      <Card className="profile-info-card">
        <Card.Header className="profile-info-header">
          <h3 className="profile-info-title">
            <div className="icon">
              <FaUser />
            </div>
            Complete Your Profile
          </h3>
          <p className="profile-info-subtitle">Please provide your personal information to continue</p>
        </Card.Header>
        <Card.Body className="profile-info-body">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="form-section">
              <h6 className="section-title">
                <FaUser className="me-2" />
                Personal Information
              </h6>
              
              <Row className="mb-4">
                <Col md={4}>
                  <FloatingLabel controlId="firstName" label="First Name *" className="mb-3">
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      This field must be filled.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={4}>
                  <FloatingLabel controlId="middleName" label="Middle Name (Optional)" className="mb-3">
                    <Form.Control
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="Enter middle name"
                      className="modern-input"
                    />
                  </FloatingLabel>
                </Col>

                <Col md={4}>
                  <FloatingLabel controlId="lastName" label="Last Name *" className="mb-3">
                    <Form.Control
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      This field must be filled.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            {/* Contact Information Section */}
            <div className="form-section">
              <h6 className="section-title">
                <FaEnvelope className="me-2" />
                Contact Information
              </h6>
              
              <Row className="mb-4">
                <Col md={6}>
                  <FloatingLabel controlId="email" label="Email Address *" className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter email address"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel controlId="phoneNumber" label="Phone Number *" className="mb-3">
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      pattern="^[0-9]{7,15}$"
                      placeholder="Enter phone number"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid phone number.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            {/* Address Information Section */}
            <div className="form-section">
              <h6 className="section-title">
                <FaMapMarkerAlt className="me-2" />
                Address Information
              </h6>
              
              <Row className="mb-4">
                <Col md={6}>
                  <FloatingLabel controlId="address1" label="Address Line 1 *" className="mb-3">
                    <Form.Control
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      required
                      placeholder="Enter address line 1"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      This field must be filled.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel controlId="address2" label="Address Line 2 (Optional)" className="mb-3">
                    <Form.Control
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      placeholder="Enter address line 2"
                      className="modern-input"
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={4}>
                  <FloatingLabel controlId="cityName" label="City *" className="mb-3">
                    <Form.Control
                      type="text"
                      name="cityName"
                      value={formData.cityName}
                      onChange={handleChange}
                      required
                      placeholder="Enter city"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      This field must be filled.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={4}>
                  <FloatingLabel controlId="stateListItem" label="State *" className="mb-3">
                    <Form.Select
                      name="stateListItem"
                      value={formData.stateListItem}
                      onChange={handleChange}
                      required
                      className="modern-select"
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
                  </FloatingLabel>
                </Col>

                <Col md={4}>
                  <FloatingLabel controlId="postalCode" label="Postal Code *" className="mb-3">
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="Enter postal code"
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      This field must be filled.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <FloatingLabel controlId="countryListItem" label="Country *" className="mb-3">
                    <Form.Select
                      name="countryListItem"
                      value={formData.countryListItem}
                      onChange={handleChange}
                      required
                      className="modern-select"
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
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            {/* Terms Agreement */}
            <div className="agreement-section">
              <Form.Check
                required
                id="terms"
                label="I agree to the terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
                className="modern-checkbox"
              />
            </div>

            <Button type="submit" className="profile-submit-btn">
              Save & Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
