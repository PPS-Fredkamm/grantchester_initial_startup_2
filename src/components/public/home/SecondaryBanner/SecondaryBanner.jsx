import { Container, Row, Col } from 'react-bootstrap';
import sectionImage from '../../../../assets/images/House.jpg';

import './SecondaryBanner.css';

function SecondaryBanner() {
  return (
    <div className="secondary-banner">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="secondary-text">
              <h2 className="section-heading">Our Values</h2>
              <p className="section-subtext">The Grantchester AlumBiz Stock Grant Program is redefining the future of University advancement. By integrating cutting-edge enterprise technology with a mission-driven partnership approach, AlumBiz empowers Universities to cultivate enduring alumni relationships, drive diversified giving, and strengthen institutional sustainability. Together, Grantchester and its University partners are creating a new paradigm for philanthropy - one built on technology, transparency, and trust.</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="media-wrap">
              <img
                src={sectionImage}
                alt="Alumni Collaboration"
                className="section-image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SecondaryBanner;
