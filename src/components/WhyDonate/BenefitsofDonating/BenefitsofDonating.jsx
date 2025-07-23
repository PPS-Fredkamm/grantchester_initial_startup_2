import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrencyDollar, FileEarmarkText } from 'react-bootstrap-icons';

export default function BenefitsofDonating() {
  return (
    <Container className="my-5 text-center">
      <h2>Benefits of Donating</h2>
      <Row className="mt-4 g-4">
        <Col md={6}>
          <CurrencyDollar size={40} className="text-primary mb-2" />
          <h5>Tax Deductions</h5>
          <p>Claim deductions for the full value of your donated stock, reducing your taxable income.</p>
        </Col>
        <Col md={6}>
          <FileEarmarkText size={40} className="text-primary mb-2" />
          <h5>Tax Benefit Guide</h5>
          <p>Understand the specific tax benefits and how to optimize your charitable contribution.</p>
        </Col>
      </Row>
    </Container>
  );
}
