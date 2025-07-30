import { Accordion } from "react-bootstrap";
import CompanyInfo from "./CompanyInfo";
import CompanyAddress from "./CompanyAddress";

export default function CompanySettings() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Company Settings</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Company Information</Accordion.Header>
          <Accordion.Body>
            <CompanyInfo />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Company Address</Accordion.Header>
          <Accordion.Body>
            <CompanyAddress />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
