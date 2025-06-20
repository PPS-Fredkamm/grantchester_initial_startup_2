import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './UniversityPriceHistory.css';


// const portfolio = [
//   { company: 'Apple', shares: 50, price: 180 },
//   { company: 'Tesla', shares: 10, price: 250 },
//   { company: 'Amazon', shares: 25, price: 130 },
//   { company: 'Google', shares: 15, price: 145 },
// ];

// Example placeholder data
const priceHistory = [
  { date: '2024-06-01', quantity: 10, price: 185 },
  { date: '2024-06-08', quantity: 15, price: 190 },
  { date: '2024-06-15', quantity: 12, price: 195 },
];

function UniversityPriceHistory({ data = priceHistory }) {
  return (
    <Card className="shadow bg-light rounded p-3 mt-4">
      <Card.Header className="bg-muted text-dark-grey d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Price History</h5>
        <Button variant="outline-primary" size="sm">Check History</Button>
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
