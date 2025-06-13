import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './UniversityPriceHistory.css';

// Example placeholder data
const priceHistory = [
  { date: '2024-06-01', quantity: 10, price: 185 },
  { date: '2024-06-08', quantity: 15, price: 190 },
  { date: '2024-06-15', quantity: 12, price: 195 },
];

function UniversityPriceHistory({ data = priceHistory }) {
  return (
    <Card className="shadow bg-light rounded p-3 mt-4">
      <Card.Header className="bg-secondary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Price History</h5>
        <Button variant="outline-light" size="sm">Check History</Button>
      </Card.Header>
      <Card.Body>
        <Row className="text-center fw-bold mb-3">
          <Col>Date</Col>
          <Col>Quantity (USD)</Col>
          <Col>Price (USD)</Col>
        </Row>
        {data.map((item, index) => (
          <Row key={index} className="text-center mb-2">
            <Col>{item.date}</Col>
            <Col>${item.quantity.toLocaleString()}</Col>
            <Col>${item.price.toFixed(2)}</Col>
          </Row>
        ))}
      </Card.Body>
    </Card>
  );
}

export default UniversityPriceHistory;
