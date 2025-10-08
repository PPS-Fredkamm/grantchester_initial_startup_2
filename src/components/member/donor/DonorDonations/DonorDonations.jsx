import { useState, useEffect } from "react";
import { Card, Table, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { fetchDonations } from "../../../../redux/slices/donationSlice";
import { formatDate } from "../../../../utils/formatDate";
import { formatCurrency, formatNumber } from "../../../../utils/formatNumber";

import DonationsDropdown from "./DonationsDropdown";
import "./DonorDonations.css";

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
    <Card className="donations-card shadow mb-4">
      <Card.Body>
        <div className="donations-header">
          <Card.Title>My Donations</Card.Title>
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
                <tr className="text-nowrap">
                  <th style={{ width: "8%" }}>Donation ID</th>
                  <th style={{ width: "12%" }}>Date</th>
                  <th style={{ width: "25%" }} className="truncate">
                    University
                  </th>
                  <th style={{ width: "10%" }}>Units</th>
                  <th style={{ width: "15%" }}>Value per Unit</th>
                  <th style={{ width: "10%" }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((d, idx) => (
                    <tr key={d.donationID || `donation-${idx}`}>
                      <td>#{d.donationID}</td>
                      <td>{formatDate(d.donationDate)}</td>
                      <td className="truncate truncate-university">
                        {d.universityCDO?.name || "N/A"}
                      </td>
                      <td>{formatNumber(d.units) || "0"}</td>
                      <td>{formatCurrency(d.currentValuation) || "$0.00"}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-3">
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
