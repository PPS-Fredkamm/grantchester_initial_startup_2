import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Footer.css";

function Footer() {
  const version = useSelector((state) => state.app.version);

  return (
    <footer className="footer mt-auto">
      <Container>
        <div className="footer-content">
          <div className="footer-copyright">
            <span>
              &copy; {new Date().getFullYear()} Proactive Performance Solutions
              Inc. All rights reserved.
            </span>
          </div>
          <div className="footer-version">
            <span>Version {version}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
