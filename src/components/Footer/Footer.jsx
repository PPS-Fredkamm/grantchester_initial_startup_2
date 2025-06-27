import { Container } from 'react-bootstrap';
import { useApplContext } from '../../context/ApplProvider';
import './Footer.css';

function Footer() {

  const applCtx = useApplContext();

  return (
    <footer className="footer mt-auto py-3">
      <Container className="text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Alumbiz. All rights reserved.
        </p>
        <div>Version {applCtx.ctx.version}</div>
      </Container>
    </footer>
  );
}

export default Footer;
