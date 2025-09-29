import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ContactUs.css';
// import grantchester logo
import grantchester from '../../../../assets/images/grantchester.png';

export default function ContactUs() {
  return (
    <Container fluid className="contact-cta-section py-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8}>
          {/* Image on top */}
          <Image
            src={grantchester}
            alt="Contact Us Icon"
            className="contact-image mb-4"
            fluid
          />

          {/* Heading and button */}
          <h2 className="contact-cta-heading">Want to follow up further? Call us today</h2>
          <a href="mailto:info@example.com">
            <Button className="contact-cta-button mt-3" size="lg">
              Email Us
            </Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
}
