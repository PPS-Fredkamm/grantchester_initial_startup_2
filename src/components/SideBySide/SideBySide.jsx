import { Container, Row, Col, Image } from 'react-bootstrap';
import './SideBySide.css';
import UniversityStock from '../../assets/images/SideBySideImages/UniversityStock.png';

export default function SideBySide({ 
  headline = "Grantchester's Stock Grant Program Opens the Door for Private Stock Donations to University Endowments",
  text = "For the first time, universities can accept private stock donations to strengthen their endowments supporting their financial future and the next generation of students.",
  buttonLabel = "Learn More",
  buttonLink = "/for-universities",
  imageSrc = UniversityStock, 
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
