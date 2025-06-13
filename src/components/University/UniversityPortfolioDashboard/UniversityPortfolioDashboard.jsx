import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './UniversityPortfolioDashboard.css';
import DonationTabs from '../DonationTabs/DonationTabs';
import UniversityPriceHistory from '../UniversityPriceHistory/UniversityPriceHistory'; // ⬅️ Make sure to import it

// Example data
const portfolio = [
  { company: 'Apple', shares: 50, price: 180 },
  { company: 'Tesla', shares: 10, price: 250 },
  { company: 'Amazon', shares: 25, price: 130 },
  { company: 'Google', shares: 15, price: 145 },
];

function UniversityPortfolioDashboard() {
  return (
    <Container fluid className="dashboard-container px-4 py-4">
      <Row className="justify-content-start">
        {/* Dashboard Section */}
        <Col xs={12} md={8} lg={7} xl={6}>
          <div className="dashboard-wrapper p-3 bg-light shadow rounded">
            <Row className="dashboard-header align-items-center justify-content-between mb-4">
              <Col xs="auto">
                <h4 className="dashboard-title">My Portfolio</h4>
              </Col>
              <Col xs="auto">
                <Button variant="outline-primary">Filters</Button>
              </Col>
            </Row>

            {portfolio.map((item, index) => (
              <Card className="dashboard-row mb-3 shadow" key={index}>
                <Card.Body>
                  <Row className="text-center">
                    <Col>{item.company}</Col>
                    <Col>{item.shares}</Col>
                    <Col>${item.price.toFixed(2)}</Col>
                    <Col>${(item.shares * item.price).toFixed(2)}</Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
          <DonationTabs />
        </Col>

        {/* Price History Section */}
        <Col xs={12} md={4} lg={5} xl={6}>
          <UniversityPriceHistory />
        </Col>
      </Row>
    </Container>
  );
}

export default UniversityPortfolioDashboard;
