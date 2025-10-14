import { Accordion, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";

export default function AddressInfo({
  formData,
  editMode,
  handleChange,
  statesDDL,
  countriesDDL,
}) {
  return (
    <Accordion.Item eventKey="1">
      <Accordion.Header className="custom-accordion-header">
        <div className="d-flex align-items-center">
          <FiMapPin className="me-3 text-primary" size={20} />
          <div>
            <h6 className="mb-0">Address Information</h6>
            <small className="text-muted">Your mailing address</small>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body className="pt-4">
        <FloatingLabel
          controlId="address1"
          label="Address Line 1"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Enter street address"
            className={!editMode ? "form-control-disabled" : ""}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="address2"
          label="Address Line 2 (Optional)"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Apartment, suite, etc."
            className={!editMode ? "form-control-disabled" : ""}
          />
        </FloatingLabel>

        <Row>
          <Col md={6}>
            <FloatingLabel controlId="cityName" label="City" className="mb-3">
              <Form.Control
                type="text"
                name="cityName"
                value={formData.cityName}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter city"
                className={!editMode ? "form-control-disabled" : ""}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel
              controlId="postalCode"
              label="Postal Code"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter postal code"
                className={!editMode ? "form-control-disabled" : ""}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FloatingLabel
              controlId="stateListItem"
              label="State"
              className="mb-3"
            >
              <Form.Select
                name="stateListItem"
                value={formData.stateListItem}
                onChange={handleChange}
                disabled={!editMode}
                className={!editMode ? "form-control-disabled" : ""}
              >
                <option value="">Select a state</option>
                {statesDDL.map((stateAbbr) => (
                  <option key={stateAbbr} value={stateAbbr}>
                    {stateAbbr}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel
              controlId="countryListItem"
              label="Country"
              className="mb-3"
            >
              <Form.Select
                name="countryListItem"
                value={formData.countryListItem}
                onChange={handleChange}
                disabled={!editMode}
                className={!editMode ? "form-control-disabled" : ""}
              >
                <option value="">Select a country</option>
                {countriesDDL.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}
