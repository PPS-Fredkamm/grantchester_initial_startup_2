import { useState } from "react";
import { Card, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";

import DonationTracker from "../DonationTracker/DonationTracker";

import "./DonorPending.css";

export default function DonorPendingDonations() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const pendingOrders = [
    {
      donationId: "773211",
      university: "Duke University",
      amount: "$3,200",
      status: "Submitted",
      date: "2024-03-10",
    },
    {
      donationId: "252407",
      university: "Clemson University",
      amount: "$1,500",
      status: "Donation verification by university",
      date: "2024-03-12",
    },
    {
      donationId: "402509",
      university: "University of Pennsylvania",
      amount: "$2,000",
      status: "Waiting approval",
      date: "2024-03-15",
    },
    {
      donationId: "885144",
      university: "Ohio State University",
      amount: "$2,800",
      status: "Completed",
      date: "2024-03-05",
    },
  ];

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
      <Card className="shadow">
        <Card.Body>
          <Table responsive="lg" className="pending-table">
            <thead>
              <tr>
                <th>Donation in process</th>
                <th>Date</th>
                <th>University</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((d) => (
                <tr key={d.donationId}>
                  <td>
                    <span className="pending-cell">
                      <GoDotFill color="#4B9DE7" />#{d.donationId}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    <span className="pending-cell">{d.date}</span>
                  </td>
                  <td className="text-nowrap">
                    <span className="pending-cell">{d.university}</span>
                  </td>
                  <td className="text-nowrap">
                    <span
                      className={`pending-cell status-pill ${getStatusClass(
                        d.status
                      )}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>View donation status</Tooltip>}
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
              ))}
            </tbody>
          </Table>
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
