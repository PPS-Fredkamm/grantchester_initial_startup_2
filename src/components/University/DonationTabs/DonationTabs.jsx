import React, { useState } from 'react';
import { Card, Nav, Tab, Row, Col } from 'react-bootstrap';
import './DonationTabs.css';

const newDonations = [
  { donor: 'John Smith', amount: 500, date: '2025-06-01' },
  { donor: 'Lisa Johnson', amount: 300, date: '2025-06-05' },
];

const inProgressDonations = [
  { donor: 'Michael Brown', amount: 1000, date: '2025-06-03' },
  { donor: 'Emily Davis', amount: 750, date: '2025-06-06' },
];

function DonationTabs() {
  const [key, setKey] = useState('new');

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
        </Nav>
      </Card.Header>
      <Card.Body className="bg-white">
        <Tab.Container activeKey={key}>
          <Tab.Content>
            <Tab.Pane eventKey="new">
              {newDonations.map((donation, index) => (
                <Card className="mb-3" key={index}>
                  <Card.Body>
                    <Row>
                      <Col><strong>Donor:</strong> {donation.donor}</Col>
                      <Col><strong>Amount:</strong> ${donation.amount}</Col>
                      <Col><strong>Date:</strong> {donation.date}</Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Tab.Pane>
            <Tab.Pane eventKey="progress">
              {inProgressDonations.map((donation, index) => (
                <Card className="mb-3" key={index}>
                  <Card.Body>
                    <Row>
                      <Col><strong>Donor:</strong> {donation.donor}</Col>
                      <Col><strong>Amount:</strong> ${donation.amount}</Col>
                      <Col><strong>Date:</strong> {donation.date}</Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
}

export default DonationTabs;
