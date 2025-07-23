import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { FaServer } from "react-icons/fa";

import AppCtx from "../../context/ApplContext.json";

import "./EnvIndicator.css";

export default function EnvIndicator() {
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
            {AppCtx.apiEnvironment || "unknown"}
          </div>
          <div>
            <strong>Version:</strong> {AppCtx.version || "n/a"}
          </div>
        </Toast.Body>
      </Toast>
    </>
  );
}
