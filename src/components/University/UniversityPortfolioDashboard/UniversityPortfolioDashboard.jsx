import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import './UniversityPortfolioDashboard.css';

const portfolio = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 180, dayChange: '+1.2%', gainsLoss: 300 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 10, price: 250, dayChange: '-0.8%', gainsLoss: -120 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', shares: 25, price: 130, dayChange: '+0.5%', gainsLoss: 80 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 15, price: 145, dayChange: '+2.0%', gainsLoss: 210 },
];

function UniversityPortfolioDashboard() {
  return (
    <Card className="dashboard-wrapper shadow rounded">
      <Card.Body>
        <Row className="dashboard-header align-items-center justify-content-between mb-4">
          <Col xs="auto">
            <h4 className="dashboard-title">My Portfolio</h4>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" size="sm">Filters</Button>
          </Col>
        </Row>

        {/* Header Row */}
        <Card className="dashboard-row mb-2 border-0 bg-transparent">
          <Card.Body className="py-1">
            <Row className="text-center fw-bold text-secondary small">
              <Col>Symbol / Name</Col>
              <Col>Shares</Col>
              <Col>Price (USD)</Col>
              <Col>Market Value</Col>
              <Col>Day Change</Col>
              <Col>Gains/Loss</Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Data Rows */}
        {portfolio.map((item, index) => (
          <Card className="dashboard-row mb-3 shadow-sm bg-white rounded" key={index}>
            <Card.Body className="py-3">
              <Row className="text-center align-items-center small">
                <Col>
                  <div className="fw-bold">{item.symbol}</div>
                  <div className="text-muted small">{item.name}</div>
                </Col>
                <Col>{item.shares}</Col>
                <Col>${item.price.toFixed(2)}</Col>
                <Col>${(item.shares * item.price).toFixed(2)}</Col>
                <Col>{item.dayChange}</Col>
                <Col className={item.gainsLoss >= 0 ? 'text-success' : 'text-danger'}>
                  ${item.gainsLoss.toFixed(2)}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
}

export default UniversityPortfolioDashboard;
