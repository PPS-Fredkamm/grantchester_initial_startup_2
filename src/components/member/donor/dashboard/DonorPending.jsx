import { useEffect, useState } from "react";
import { Card, Table, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import { FiMoreHorizontal, FiClock } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { fetchDonations } from "../../../../redux/slices/donationSlice";
import { formatDate } from "../../../../utils/formatDate";
import DonationTracker from "./DonationTracker";

/* CSS moved to: src/styles/components/cards/donor-pending-card.css */

export default function DonorPendingDonations() {
  const dispatch = useDispatch();
  const userDTO = useSelector((state) => state.auth.userDTO);
  const { donations, loading, error } = useSelector((state) => state.donation);

  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    if (userDTO?.id) {
      dispatch(fetchDonations(userDTO.id));
    }
  }, [dispatch, userDTO?.id]);

  // Filter pending donations only
  const pendingOrders =
    donations?.filter(
      (d) =>
        d?.donationStatus?.name &&
        !d.donationStatus.name.toLowerCase().includes("completed")
    ) || [];

  function getStatusClass(status) {
    const lower = status.toLowerCase();
    if (lower === "completed") return "status-completed";
    if (lower.includes("waiting")) return "status-waiting";
    if (lower.includes("verification")) return "status-verifying";
    if (lower.includes("submitted")) return "status-submitted";
    return "";
  }

  const handleOpenTracker = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  return (
    <>
      <Card className="shadow mt-4">
        <Card.Body>
          <div className="pending-header">
            <div className="pending-title-section">
              <FiClock className="pending-title-icon" />
              <Card.Title>Pending Donations</Card.Title>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" size="sm" /> Loading
              donations...
            </div>
          ) : error ? (
            <div className="text-danger text-center py-3">{error}</div>
          ) : (
            <div className="scrollable-table">
              <Table className="pending-table" responsive={false} striped>
                <thead>
                  <tr>
                    <th>Donation ID</th>
                    <th>Date</th>
                    <th>University</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.length > 0 ? (
                    pendingOrders.map((d, idx) => (
                      <tr key={d.donationID || `donation-${idx}`}>
                        <td>
                          <div className="pending-donation-id">
                            <GoDotFill className="donation-indicator" />#
                            {d.donationID || d.id}
                          </div>
                        </td>
                        <td>{formatDate(d.donationDate)}</td>
                        <td>{d.universityCDO?.name || "N/A"}</td>
                        <td>
                          <span
                            className={`status-pill ${getStatusClass(
                              d.donationStatus?.name || ""
                            )}`}
                          >
                            {d.donationStatus?.name || "Unknown"}
                          </span>
                        </td>
                        <td>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>View Details</Tooltip>}
                          >
                            <button
                              className="pending-action-btn"
                              onClick={() => handleOpenTracker(d)}
                              aria-label="View donation details"
                            >
                              <FiMoreHorizontal />
                            </button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No pending donations
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <DonationTracker
        show={showModal}
        onHide={() => setShowModal(false)}
        donation={selectedDonation}
      />
    </>
  );
}
