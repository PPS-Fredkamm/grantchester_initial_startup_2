import { useState } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import UniversityAccountSection from "../UniversityAccountSection/UniversityAccountSection";
// import PlansBillingSection from '../../University/PlansBillingSection/PlansBillingSection'
import UniversityUserTeamSection from "../UniversityUserTeamSection/UniversityUserTeamSection";

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    decoratedOnClick();
  };

  return (
    <div
      onClick={handleClick}
      className="d-flex justify-content-between align-items-center p-3 border bg-light cursor-pointer"
      style={{ cursor: "pointer" }}
    >
      <strong>{children}</strong>
      <FaChevronDown
        style={{
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </div>
  );
};

const UniversityAccordion = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Settings</h2>
      <Accordion>
        <Card>
          <CustomToggle eventKey="0">Account</CustomToggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <UniversityAccountSection />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* <Card>
          <CustomToggle eventKey="1">Plans & Billing</CustomToggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <PlansBillingSection
                currentPlan={currentPlan}
                onPlanChange={onPlanChange}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card> */}

        <Card>
          <CustomToggle eventKey="2">Users & Teams</CustomToggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <UniversityUserTeamSection />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* <Card>
          <CustomToggle eventKey="3">Payment Method</CustomToggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              Credit card, PayPal, etc.
            </Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>
    </div>
  );
};

export default UniversityAccordion;
