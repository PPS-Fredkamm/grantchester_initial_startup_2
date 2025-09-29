import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";

import { useSelector } from "react-redux";

import "./University.css";

export default function UniversityRegistration() {
  const email = useSelector((state) => state.auth.profileCDO?.email);
  const phone = useSelector((state) => state.auth.profileCDO?.phoneNumber);

  const [form, setForm] = useState({
    universityName: "",
    website: "",
    ipedsId: "",
    accreditationBody: "",
    email: email,
    phone: phone,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting university registration:", form);
  }

  return (
    <Container className="register-container">
      <div className="register-wrapper">
        <Card className="register-card shadow">
          <Card.Body>
            <h3 className="text-center mb-4">University Registration</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>University Name</Form.Label>
                <Form.Control
                  name="universityName"
                  type="text"
                  value={form.universityName}
                  onChange={handleChange}
                  placeholder="e.g., University of Texas"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Official Website</Form.Label>
                <Form.Control
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="e.g., https://www.utexas.edu"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>IPEDS ID</Form.Label>
                <Form.Control
                  name="ipedsId"
                  type="text"
                  value={form.ipedsId}
                  onChange={handleChange}
                  placeholder="e.g., 123456"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Accreditation Body</Form.Label>
                <Form.Control
                  name="accreditationBody"
                  type="text"
                  value={form.accreditationBody}
                  onChange={handleChange}
                  placeholder="e.g., Southern Association of Colleges and Schools"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <span>Contact Email</span>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-affected">
                          This email is pulled from your profile and can be
                          updated there.
                        </Tooltip>
                      }
                    >
                      <FaCircleInfo className="info-icon" />
                    </OverlayTrigger>
                  </div>
                </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  readOnly
                  className="readonly-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <span>Contact Phone</span>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-phone">
                          This phone number is pulled from your profile and can
                          be updated there.
                        </Tooltip>
                      }
                    >
                      <FaCircleInfo className="info-icon" />
                    </OverlayTrigger>
                  </div>
                </Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                  readOnly
                  className="readonly-input"
                />
              </Form.Group>

              <Button type="submit" className="w-100 register-button">
                Submit for Review
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
