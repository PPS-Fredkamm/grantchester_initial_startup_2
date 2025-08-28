import { Container, Row, Col } from 'react-bootstrap';
import sectionImage from '../../../assets/images/House.jpg';

import './SecondaryBanner.css';

function SecondaryBanner() {
  return (
    <div className="secondary-banner">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="secondary-text">
              <h2 className="section-heading">Empowering Your Alumni Community</h2>
              <p className="section-subtext">
                AlumBiz connects graduates, fosters collaboration, and unlocks exclusive resources
                to help your alumni grow professionally and personally.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <img
              src={sectionImage}
              alt="Alumni Collaboration"
              className="section-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SecondaryBanner;
