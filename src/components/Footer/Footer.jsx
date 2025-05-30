import { Container } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Alumbiz. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;