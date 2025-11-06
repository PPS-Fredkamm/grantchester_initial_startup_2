import { useState, useEffect } from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import { FiFileText } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonations } from "../../../../redux/slices/donationSlice";
import { formatDate } from "../../../../utils/formatDate";
import { formatCurrency, formatNumber } from "../../../../utils/formatNumber";
import DonationsDropdown from "./DonationsDropdown";

/* CSS moved to: src/styles/components/tables/donor-donations-table.css */

export default function DonorDonations() {
  const dispatch = useDispatch();
  const userDTO = useSelector((state) => state.auth.userDTO);
  const { donations, loading, error } = useSelector((state) => state.donation);
  const [filter, setFilter] = useState("All");

  // Fetch all donations when user loads the page
  useEffect(() => {
    if (userDTO?.id) {
      dispatch(fetchDonations(userDTO.id));
    }
  }, [dispatch, userDTO?.id]);

  // Styling helper for status pills
  function getStatusClass(status) {
    if (!status) return "";
    const lower = status.toLowerCase();
    if (lower === "completed") return "status-completed";
    if (lower.includes("waiting")) return "status-waiting";
    if (lower.includes("verification")) return "status-verifying";
    if (lower.includes("submitted")) return "status-submitted";
    return "";
  }

  const filteredDonations =
    donations?.filter((d) => {
      const status = d.donationStatus?.name?.toLowerCase() || "";
      if (filter === "All") return true;
      if (filter === "Completed") return status === "completed";
      if (filter === "Waiting Approval") return status.includes("waiting");
      if (filter === "Verifying") return status.includes("verification");
      return true;
    }) || [];

  return (
    <Card className="shadow mt-4 mb-4">
      <Card.Body>
        <div className="donations-header">
          <div className="donations-title-section">
            <FiFileText className="donations-title-icon" />
            <Card.Title>My Donations</Card.Title>
          </div>
          <DonationsDropdown value={filter} onChange={setFilter} />
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
            <Table responsive={false} striped className="donations-table">
              <thead>
                <tr>
                  <th>Donation</th>
                  <th>Date</th>
                  <th>University</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((d, idx) => {
                    const units = Number(d.units) || 0;
                    const perUnit = Number(d.initialValuation) || 0;
                    const totalValue = units * perUnit;
                    return (
                      <tr key={d.donationID || `donation-${idx}`}>
                        <td>
                          <span className="donation-cell">
                            #{d.donationID || d.id}
                          </span>
                        </td>
                        <td>
                          <span className="donation-cell">
                            {formatDate(d.donationDate)}
                          </span>
                        </td>
                        <td>
                          <span className="donation-cell">
                            {d.universityCDO?.name || "N/A"}
                          </span>
                        </td>
                        <td>
                          <div className="donation-amount">
                            <div className="amount-value">
                              {formatCurrency(totalValue)}
                            </div>
                            <div className="amount-details">
                              {formatNumber(d.units)} units ×{" "}
                              {formatCurrency(d.currentValuation)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${getStatusClass(
                              d.donationStatus?.name || ""
                            )}`}
                          >
                            {d.donationStatus?.name || "Unknown"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3">
                      No donations match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
