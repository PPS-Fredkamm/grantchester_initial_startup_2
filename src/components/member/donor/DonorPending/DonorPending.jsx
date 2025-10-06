import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";

import {formatDate} from "../../../../utils/formatDate";
import DonationTracker from "../DonationTracker/DonationTracker";

import * as ACEDonation from "../../../../managers/ApiClient-Donation";
import * as ACM from "../../../../managers/ApiClientMethods";

import "./DonorPending.css";

export default function DonorPendingDonations() {
  const userDTO = useSelector((state) => state.auth.userDTO);

  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    async function fetchPendingOrders() {
      try {
        let apiResult;
        let searchCriteria;
        let list;

        searchCriteria = `userID=${userDTO.id}`;
        apiResult = await ACEDonation.SearchDonationCDOAsync(searchCriteria);
        list = ACM.getApiResultData(apiResult);
        
        // Ensure it's always an array
        setPendingOrders(list || []);
      } catch (error) {
        console.error("Error fetching DDL data:", error);
        setPendingOrders([]);
      }
    }
    fetchPendingOrders();
  }, [userDTO.id]);

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
              {pendingOrders.length > 0 ? (
                pendingOrders.map((d) => (
                  <tr key={d.donationID}>
                    <td>
                      <span className="pending-cell">
                        <GoDotFill color="#4B9DE7" />#{d.donationID}
                      </span>
                    </td>
                    <td className="text-nowrap">
                      <span className="pending-cell">{formatDate(d.donationDate)}</span>
                    </td>
                    <td className="text-nowrap">
                      <span className="pending-cell">
                        {d.universityCDO?.name}
                      </span>
                    </td>
                    <td className="text-nowrap">
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
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="pt-3 text-center">
                    No pending donations
                  </td>
                </tr>
              )}
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
