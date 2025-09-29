import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Footer.css";

function Footer() {
  const version = useSelector((state) => state.app.version);

  return (
    <footer className="footer mt-auto py-3">
      <Container className="text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Proactive Performance Solutions Inc. All rights reserved.
        </p>
        <div>Version {version}</div>
      </Container>
    </footer>
  );
}

export default Footer;
