import { Container, Row, Col, Image } from 'react-bootstrap';

import UniversityStock2 from '../../../assets/images/for-universities.jpg';

import './SideBySide.css';

export default function SideBySide({ 
  headline = "Empower Universities Through Stock Donations",
  text = "Support institutional endowments, fund the next generation of students, and create lasting impact through private stock contributions.",
  buttonLabel = "Learn More",
  buttonLink = "/for-universities",
  imageSrc = UniversityStock2, 
  imageAlt = 'Side image', 
  reverse = false 
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
