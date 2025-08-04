import { useState } from "react";
import { Card, Nav, Tab, Row, Col } from "react-bootstrap";
import "./DonationTabs.css";

const newDonations = [
  {
    donor: "John Smith",
    amount: 500,
    date: "2025-06-01",
    type: "Stock",
    shares: 10,
    price: 50,
  },
  {
    donor: "Lisa Johnson",
    amount: 300,
    date: "2025-06-05",
    type: "Cash",
    shares: 0,
    price: 0,
  },
];

const inProgressDonations = [
  {
    donor: "Michael Brown",
    amount: 1000,
    date: "2025-06-03",
    type: "Stock",
    shares: 20,
    price: 50,
  },
  {
    donor: "Emily Davis",
    amount: 750,
    date: "2025-06-06",
    type: "Cash",
    shares: 0,
    price: 0,
  },
];

const processedDonations = [
  {
    donor: "Sarah Wilson",
    amount: 1200,
    date: "2025-06-02",
    type: "Stock",
    shares: 15,
    price: 80,
  },
  {
    donor: "David Lee",
    amount: 600,
    date: "2025-06-04",
    type: "Cash",
    shares: 0,
    price: 0,
  },
];

function DonationTabs() {
  const [key, setKey] = useState("new");

  const renderCards = (donations) => (
    <>
      {/* Header Row (like a table header) */}
      <Card className="mb-2 border-0 bg-transparent">
        <Card.Body className="py-1">
          <Row className="text-center fw-bold text-secondary small">
            <Col>Donor</Col>
            <Col>Amount</Col>
            <Col>Date</Col>
            <Col>Donation Type</Col>
            <Col>Share Total</Col>
            <Col>Price</Col>
            <Col>Market Value</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Donation Rows */}
      {donations.map((donation, index) => (
        <Card className="mb-3 shadow-sm rounded" key={index}>
          <Card.Body>
            <Row className="text-center align-items-center small">
              <Col>{donation.donor}</Col>
              <Col>${donation.amount}</Col>
              <Col>{donation.date}</Col>
              <Col>{donation.type}</Col>
              <Col>{donation.shares}</Col>
              <Col>${donation.price.toFixed(2)}</Col>
              <Col>${(donation.shares * donation.price).toFixed(2)}</Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );

  return (
    <Card className="donation-tabs-wrapper shadow bg-light rounded mb-4">
      <Card.Header className="bg-light border-bottom">
        <Nav variant="tabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav.Item>
            <Nav.Link eventKey="new">New Donations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="progress">In Progress</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="processed">Processed Donations</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className="bg-white">
        <Tab.Container activeKey={key}>
          <Tab.Content>
            <Tab.Pane eventKey="new">{renderCards(newDonations)}</Tab.Pane>
            <Tab.Pane eventKey="progress">
              {renderCards(inProgressDonations)}
            </Tab.Pane>
            <Tab.Pane eventKey="processed">
              {renderCards(processedDonations)}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
}

export default DonationTabs;
