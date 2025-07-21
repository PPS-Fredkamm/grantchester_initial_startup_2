import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Handshake from '../../../assets/Images/SideBySideImage/UniversityStock.png'
import './SideBySide.css';

export default function SideBySide() {
  return (
    <Container fluid className="my-5">
      <Row className="side-by-side-row">
        <Col md={4} lg={7}>
          <div className="side-text">
            <h2>Your Headline Here</h2>
            <p>
              Supporting text about your mission, product, or content.
            </p>
              <a href="#target-section" className="cta-button">Learn More</a>
          </div>
        </Col>
        <Col md={8} lg={5}>
          <div className="side-image-wrapper">
            <Image
              src={Handshake}
              alt="UniversityStock"
              className="side-image"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
