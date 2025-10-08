import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";

export default function PendingCompanyStats() {
  const stats = {
    pendingCompanies: 18,
    underReview: 9,
    approvedToday: 3,
    totalSubmittedThisMonth: 42,
  };

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="pending-stats">
          {/* Pending Companies */}
          <div className="stat-block">
            <div className="stat-value">{stats.pendingCompanies}</div>
            <div className="stat-label">
              <span>Pending Companies</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-pending-companies">
                    Total companies awaiting approval or verification by admins
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Under Review */}
          <div className="stat-block">
            <div className="stat-value">{stats.underReview}</div>
            <div className="stat-label">
              <span>Under Review</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-under-review">
                    Company registrations currently being reviewed or contacted
                    for additional information
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
                    Number of company registrations approved within the last 24
                    hours
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
                    Total new company registration forms submitted this month
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
