import { useState } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";

const plans = [
  {
    title: "Basic",
    price: "$0 / month",
    features: ["Access to basic tools", "Email support", "Limited storage"],
  },
  {
    title: "Pro",
    price: "$29 / month",
    features: ["Everything in Basic", "Team collaboration", "Priority support"],
  },
  {
    title: "Enterprise",
    price: "Contact us",
    features: [
      "Custom integrations",
      "Dedicated success manager",
      "24/7 Support",
    ],
  },
];

const PlansBillingSection = ({ currentPlan, onPlanChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSwitchClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleConfirmSwitch = () => {
    if (selectedPlan && selectedPlan !== currentPlan) {
      onPlanChange(selectedPlan);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <Row>
        {plans.map((plan) => (
          <Col key={plan.title} md={4} sm={12} className="mb-4">
            <Card
              className={`h-100 shadow-sm ${
                plan.title === currentPlan ? "border-primary" : ""
              }`}
            >
              <Card.Body>
                <Card.Title>{plan.title}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {plan.price}
                </Card.Subtitle>
                <ul className="ps-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="d-flex justify-content-end mt-3">
                  {plan.title === currentPlan ? (
                    <Button variant="outline-primary" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleSwitchClick(plan.title)}
                    >
                      Switch to {plan.title}
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Plan Switch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to switch to the <strong>{selectedPlan}</strong>{" "}
          plan?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSwitch}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PlansBillingSection;
