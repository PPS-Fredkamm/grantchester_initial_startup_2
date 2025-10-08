import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";

export default function PendingUniversityStats() {
  const stats = {
    pendingUniversities: 7,
    underVerification: 4,
    approvedToday: 2,
    totalSubmittedThisMonth: 15,
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          {/* Pending Universities */}
          <div className="stat-block">
            <div className="stat-value">{stats.pendingUniversities}</div>
            <div className="stat-label">
              <span>Pending Universities</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-pending-universities">
                    Universities awaiting admin verification or approval
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Under Verification */}
          <div className="stat-block">
            <div className="stat-value">{stats.underVerification}</div>
            <div className="stat-label">
              <span>Under Verification</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-under-verification">
                    Universities currently being reviewed or pending document
                    validation
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Approved Today */}
          <div className="stat-block">
            <div className="stat-value">{stats.approvedToday}</div>
            <div className="stat-label">
              <span>Approved Today</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-approved-today">
                    Number of university registrations approved within the last
                    24 hours
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Monthly Submissions */}
          <div className="stat-block">
            <div className="stat-value">{stats.totalSubmittedThisMonth}</div>
            <div className="stat-label">
              <span>Submitted This Month</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-monthly-submissions">
                    Total new university registration forms submitted this month
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
