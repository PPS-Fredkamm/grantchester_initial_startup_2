import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Toast } from "react-bootstrap";
import { FaServer } from "react-icons/fa";

import "./EnvIndicator.css";

export default function EnvIndicator() {

  const app = useSelector((state) => state.app);

  const [show, setShow] = useState(false);

  return (
    <>
      {/* Floating Icon Button */}
      <Button
        variant="dark"
        className="env-indicator-btn"
        onClick={() => setShow(!show)}
      >
        <FaServer />
      </Button>

      {/* Toast Popup */}
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={3000}
        autohide
        className="env-indicator-toast"
      >
        <Toast.Body>
          <div>
            <strong>API Environment:</strong>{" "}
            {app.apiEnvironment || "unknown"}
          </div>
          <div>
            <strong>Version:</strong> {app.version || "n/a"}
          </div>
        </Toast.Body>
      </Toast>
    </>
  );
}
