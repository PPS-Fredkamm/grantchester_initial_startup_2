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

import "./Company.css";

export default function CompanyRegistration() {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [ein, setEin] = useState("");
  const [address, setAddress] = useState("");
  const email = useSelector((state) => state.auth.profileCDO?.email);
  const phone = useSelector((state) => state.auth.profileCDO?.phoneNumber);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting company registration:", {
      companyName,
      website,
      ein,
      address,
      email,
      phone,
    });
  }

  return (
    <Container className="register-container">
      <div className="register-wrapper">
        <Card className="register-card shadow">
          <Card.Body>
            <h3 className="text-center mb-4">Company Registration</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter full company name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Official Website</Form.Label>
                <Form.Control
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.example.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Federal EIN</Form.Label>
                <Form.Control
                  type="text"
                  value={ein}
                  onChange={(e) => setEin(e.target.value)}
                  placeholder="XX-XXXXXXX"
                  required
                />
                <Form.Text muted>
                  Issued by IRS to identify your business.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Business Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State, Zip"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <span>Contact Email</span>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-email">
                          This email will be used for all communications. <br />
                          You can update it in your profile settings.
                        </Tooltip>
                      }
                    >
                      <FaCircleInfo className="info-icon" />
                    </OverlayTrigger>
                  </div>
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
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
                          This phone number is pulled from your profile. <br />
                          You can update it in your profile settings.
                        </Tooltip>
                      }
                    >
                      <FaCircleInfo className="info-icon" />
                    </OverlayTrigger>
                  </div>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  readOnly
                  className="readonly-input"
                />
              </Form.Group>

              <Button type="submit" className="w-100 register-button">
                Submit Registration
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
