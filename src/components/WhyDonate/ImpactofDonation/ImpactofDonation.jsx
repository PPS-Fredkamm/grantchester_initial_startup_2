import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ImpactofDonation() {
  return (
    <Container className="my-5 text-center">
      <h2>The Impact of My Donation</h2>
      <Row className="mt-4">
        <Col md={3}>
          <h3>$18M+</h3>
          <p>Total private stock donated</p>
        </Col>
        <Col md={3}>
          <h3>12</h3>
          <p>Universities funded</p>
        </Col>
        <Col md={3}>
          <h3>800+</h3>
          <p>Students impacted</p>
        </Col>
        <Col md={3}>
          <h3>30%</h3>
          <p>Avg tax savings per donor</p>
        </Col>
      </Row>
    </Container>
  );
}
