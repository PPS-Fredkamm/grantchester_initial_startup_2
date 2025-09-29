import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { FaHardHat, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function UnderConstruction({ title = 'Page Under Construction' }) {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <FaHardHat size={64} className="mb-3 text-warning" />
          <h2>{title}</h2>
          <Alert variant="warning" className="mt-3">
            <FaTools className="me-2" />
            This feature is currently being built. Please check back soon!
          </Alert>
          <Button variant="secondary" className="m-3" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
