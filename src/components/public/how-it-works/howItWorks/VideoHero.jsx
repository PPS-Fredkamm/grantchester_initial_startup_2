import { Container, Row, Col } from "react-bootstrap";

export default function VideoHero() {
  // Placeholder YouTube video ID - replace with official marketing video ID when ready
  const videoId = "Y-x0efG1seA"; // Placeholder video ID

  return (
    <section className="video-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="How It Works Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
