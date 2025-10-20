import { Card, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";

import { formatNumber, formatCurrency } from "../../../../utils/formatNumber";

/* CSS moved to: src/styles/components/cards/donor-stats-card.css */

export default function DonorStats() {
  // Access donation data from Redux
  const { donations, loading, error } = useSelector((state) => state.donation);

  // ===========================
  // Computed Aggregates
  // ===========================

  // Total number of donations
  const totalDonations = donations.length;

  // Total units donated across all records
  const totalUnits = donations.reduce((sum, d) => {
    const units = Number(d?.units) || 0;
    return sum + units;
  }, 0);

  // Total value = sum of (units * initialValuation)
  const totalValueNumber = donations.reduce((sum, d) => {
    const units = Number(d?.units) || 0;
    const perShare = Number(d?.initialValuation) || 0; // price per unit at donation time
    return sum + units * perShare;
  }, 0);

  // ===========================
  // UI
  // ===========================
  if (loading) {
    return (
      <Card className="shadow mb-4">
        <Card.Body className="text-center py-4">
          <Spinner animation="border" variant="primary" size="sm" /> Loading
          donor stats...
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow mb-4">
        <Card.Body className="text-danger text-center py-3">
          Failed to load donor stats: {error}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="donor-stats">
          {/* Total Donations */}
          <div className="stat-block">
            <div className="stat-value">{totalDonations}</div>
            <div className="stat-label">
              <span>Total Donations</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-donations">
                    The total number of donations you have made.
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Units Donated */}
          <div className="stat-block">
            <div className="stat-value">{formatNumber(totalUnits)}</div>
            <div className="stat-label">
              <span>Units Donated</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-units-donated">
                    The total number of stock units you have contributed.
                  </Tooltip>
                }
              >
                <FaCircleInfo className="info-icon" />
              </OverlayTrigger>
            </div>
          </div>

          <div className="stat-divider"></div>

          {/* Total Amount */}
          <div className="stat-block">
            <div className="stat-value">{formatCurrency(totalValueNumber)}</div>
            <div className="stat-label">
              <span>Total Amount</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-total-amount">
                    The total dollar value of all donated units, calculated as
                    (units x initial valuation per share).
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
