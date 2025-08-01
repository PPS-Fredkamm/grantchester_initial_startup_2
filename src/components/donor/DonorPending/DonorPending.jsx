import { Card, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { GoDotFill } from 'react-icons/go';
import { FiMoreHorizontal } from 'react-icons/fi';

import './DonorPending.css';

export default function DonorPendingDonations() {
  const pendingOrders = [
    {
      donationId: '402509',
      university: 'University of Pennsylvania',
      amount: '$2,000',
      status: 'Waiting approval',
      date: '2024-03-15',
    },
    {
      donationId: '252407',
      university: 'Clemson University',
      amount: '$1,500',
      status: 'Donation verification by university',
      date: '2024-03-12',
    },
  ];

  function getStatusClass(status) {
    if (status.toLowerCase() === 'completed') return 'status-completed';
    if (status.toLowerCase().includes('waiting')) return 'status-waiting';
    if (status.toLowerCase().includes('verification'))
      return 'status-verifying';
    return '';
  }

  return (
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
            {pendingOrders.map((d, idx) => (
              <tr key={idx}>
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
                    overlay={<Tooltip>View Donation Details</Tooltip>}
                  >
                    <span className="pending-icon-wrapper">
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
  );
}
