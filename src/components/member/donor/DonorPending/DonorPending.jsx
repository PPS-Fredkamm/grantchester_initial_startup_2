import { useEffect, useState } from "react";
import { Card, Table, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { fetchDonations } from "../../../../redux/slices/donationSlice";
import { formatDate } from "../../../../utils/formatDate";
import DonationTracker from "../DonationTracker/DonationTracker";

import "./DonorPending.css";

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
      <Card className="shadow pending-card">
        <Card.Body>
          <div className="scrollable-table">
            <Table className="pending-table" responsive={false}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Donation</th>
                  <th style={{ width: "20%" }}>Date</th>
                  <th style={{ width: "30%" }}>University</th>
                  <th style={{ width: "20%" }}>Status</th>
                  <th style={{ width: "10%" }}></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <Spinner animation="border" variant="primary" size="sm" />{" "}
                      Loading donations...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="text-danger text-center py-3">
                      {error}
                    </td>
                  </tr>
                ) : pendingOrders.length > 0 ? (
                  pendingOrders.map((d, idx) => (
                    <tr key={d.donationID || `donation-${idx}`}>
                      <td>
                        <span className="pending-cell">
                          <GoDotFill color="#4B9DE7" />#{d.id}
                        </span>
                      </td>
                      <td>
                        <span className="pending-cell">
                          {formatDate(d.donationDate)}
                        </span>
                      </td>
                      <td>
                        <span className="pending-cell">
                          {d.universityCDO?.name}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`pending-cell status-pill ${getStatusClass(
                            d.donationStatus?.name || ""
                          )}`}
                        >
                          {d.donationStatus?.name || "Unknown"}
                        </span>
                      </td>
                      <td>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>More Info</Tooltip>}
                        >
                          <span
                            className="pending-icon-wrapper"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleOpenTracker(d)}
                          >
                            <FiMoreHorizontal className="pending-icon" />
                          </span>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="pt-3 text-center">
                      No pending donations
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
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
