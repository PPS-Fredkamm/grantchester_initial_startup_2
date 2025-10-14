import { Accordion, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { FiUser } from "react-icons/fi";

export default function ContactInfo({ formData, editMode, handleChange }) {
  return (
    <Accordion.Item eventKey="0" className="mb-3">
      <Accordion.Header className="custom-accordion-header">
        <div className="d-flex align-items-center">
          <FiUser className="me-3 text-primary" size={20} />
          <div>
            <h6 className="mb-0">Contact Information</h6>
            <small className="text-muted">Your personal details</small>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body className="pt-4">
        <Row>
          <Col md={6}>
            <FloatingLabel
              controlId="firstName"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter first name"
                className={!editMode ? "form-control-disabled" : ""}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel
              controlId="middleName"
              label="Middle Name (Optional)"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter middle name"
                className={!editMode ? "form-control-disabled" : ""}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FloatingLabel
              controlId="lastName"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter last name"
                className={!editMode ? "form-control-disabled" : ""}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel
              controlId="phoneNumber"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter phone number"
                className={!editMode ? "form-control-disabled" : ""}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <FloatingLabel controlId="email" label="Email Address" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Enter email address"
            className={!editMode ? "form-control-disabled" : ""}
          />
        </FloatingLabel>
      </Accordion.Body>
    </Accordion.Item>
  );
}
