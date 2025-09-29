import { Container, Row, Col, Image } from "react-bootstrap";
import "./HeaderWithImage.css";
import Handshake from "../../../../assets/images/For-Donors.png";

export default function HeaderWithImage({
  headline = "Empowering Donors to Drive Meaningful Impact",
  text = "We make it simple for private companies and individuals to donate stock or equity to universities and institutional endowments — creating opportunities, building relationships, and driving long-term growth.",
  buttonLabel = "Learn More",
  buttonLink = "/for-donors",
  imageSrc = Handshake,
  imageAlt = "Side image",
  reverse = false,
}) {
  return (
    <Container fluid className="my-5">
      <Row className={`side-by-side-row ${reverse ? "flex-row-reverse" : ""}`}>
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
            <Image src={imageSrc} alt={imageAlt} className="side-image" fluid />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
