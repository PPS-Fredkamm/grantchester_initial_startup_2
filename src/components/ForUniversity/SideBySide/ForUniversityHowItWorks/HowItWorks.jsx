import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './HowItWorks.css';

// Images to import
import CheckDocument from '../../../../assets/Images/HowItWorks/CheckDocument.png';
import Growth from '../../../../assets/Images/HowItWorks/Growth.png'
import PeopleChatting from '../../../../assets/Images/HowItWorks/PeopleChatting.png'
import StockCert from '../../../../assets/Images/HowItWorks/StockCert.png';

export default function HowItWorks() {
  return (
    <Container fluid className="how-it-works-section py-5">
      <h2 className="section-title text-center mb-5">How It Works</h2>
      <Row className="justify-content-center text-center">
        <Col xs={12} sm={6} md={3} className="how-it-works-step">
          <Image
            src={PeopleChatting}
            alt="Step 1"
            fluid
            className="step-image mb-3"
          />
          <p className="step-text">Step 1: Evaluate your university’s goals and readiness.</p>
        </Col>

        <Col xs={12} sm={6} md={3} className="how-it-works-step">
          <Image
            src={CheckDocument}
            alt="Step 2"
            fluid
            className="step-image mb-3"
          />
          <p className="step-text">Step 2: Receive partnership proposals tailored to your mission.</p>
        </Col>

        <Col xs={12} sm={6} md={3} className="how-it-works-step">
          <Image
            src={StockCert}
            alt="Step 3"
            fluid
            className="step-image mb-3"
          />
          <p className="step-text">Step 3: Match with aligned corporate partners and donors.</p>
        </Col>

        <Col xs={12} sm={6} md={3} className="how-it-works-step">
          <Image
            src={Growth}
            alt="Step 4"
            fluid
            className="step-image mb-3"
          />
          <p className="step-text">Step 4: Grow your programs and track long-term impact.</p>
        </Col>
      </Row>
    </Container>
  );
}
