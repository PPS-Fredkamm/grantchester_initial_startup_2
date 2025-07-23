import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GraphUp, Mortarboard, CheckCircle } from 'react-bootstrap-icons';

export default function WhyPrivate() {
  return (
    <Container className="my-5 text-center">
      <h2>Why Donate Private Stock?</h2>
      <Row className="mt-4 g-4">
        <Col md={4}>
          <GraphUp size={40} className="text-primary mb-2" />
          <h5>Leverage Appreciated Assets</h5>
          <p>Donate stock that has increased in value and avoid capital gains.</p>
        </Col>
        <Col md={4}>
          <Mortarboard size={40} className="text-primary mb-2" />
          <h5>Support Universities</h5>
          <p>Provide crucial funding for scholarships, research, and development.</p>
        </Col>
        <Col md={4}>
          <CheckCircle size={40} className="text-primary mb-2" />
          <h5>Maximize Tax Advantages</h5>
          <p>Receive a charitable deduction based on full fair market value of the stock.</p>
        </Col>
      </Row>
    </Container>
  );
}
