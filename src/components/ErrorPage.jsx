import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container className="error-page text-center d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4">Oops!</h1>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </Container>
  );
}

export default ErrorPage;
