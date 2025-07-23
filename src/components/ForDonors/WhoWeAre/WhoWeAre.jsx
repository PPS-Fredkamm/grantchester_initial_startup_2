import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ShieldCheck, BarChartLine, PeopleFill, CheckCircle } from 'react-bootstrap-icons';
import './WhoWeAre.css';

export default function WhoWeAre() {
  return (
    <Container className="my-5">
      <div className="text-center mb-4">
        <h2>Who We Are</h2>
        <p className="lead">
          We’re driven by values that ensure every donor and university partner benefits from a secure, simple, and impactful giving experience.
        </p>
      </div>

      <Row className="g-4 justify-content-center">
        <Col xs={12} md={6} lg={3}>
          <Card className="who-card text-center h-100">
            <Card.Body>
              <ShieldCheck size={40} className="text-primary mb-3" />
              <Card.Title>Integrity</Card.Title>
              <Card.Text>We operate with transparency and adhere to strict legal and financial compliance.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="who-card text-center h-100">
            <Card.Body>
              <BarChartLine size={40} className="text-primary mb-3" />
              <Card.Title>Expertise</Card.Title>
              <Card.Text>Our platform is built by financial, legal, and education professionals who understand the complexity of stock donations.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="who-card text-center h-100">
            <Card.Body>
              <CheckCircle size={40} className="text-primary mb-3" />
              <Card.Title>Simplicity</Card.Title>
              <Card.Text>We remove the complexity from giving, guiding donors through a streamlined, secure process.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="who-card text-center h-100">
            <Card.Body>
              <PeopleFill size={40} className="text-primary mb-3" />
              <Card.Title>Impact</Card.Title>
              <Card.Text>We help universities unlock funding for scholarships, research, and student support through untapped equity.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
