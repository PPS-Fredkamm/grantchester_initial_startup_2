import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import startup from '../../../assets/images/SideBySideImage/startup.jpg';

export default function WhatPlatformDoes({
  headline = "Support Innovation with Your Equity",
  text = "Private stock donations help fund next-generation research, student success, and university advancement.",
  buttonLabel,
  buttonLink,
  imageSrc = startup,
  imageAlt = 'Side image',
  reverse = false,
}) {
  return (
    <Container fluid className="my-5">
      <Row className={`side-by-side-row ${reverse ? 'flex-row-reverse' : ''}`}>
        <Col md={4} lg={7}>
          <div className="side-text">
            <h2>{headline}</h2>
            <p>{text}</p>
            {buttonLabel && buttonLink && (
              <a href={buttonLink} className="cta-button">
                {buttonLabel}
              </a>
            )}
          </div>
        </Col>
        <Col md={8} lg={5}>
          <div className="side-image-wrapper">
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="side-image"
              fluid
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}