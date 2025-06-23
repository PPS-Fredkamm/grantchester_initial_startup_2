import { Card, Table } from 'react-bootstrap';
import { GoDotFill } from 'react-icons/go';
import { FiMoreHorizontal } from 'react-icons/fi';

import './DonorPending.css';

export default function DonorPendingDonations() {
  const pendingOrders = [
    {
      donationId: '202509',
      university: 'University of Pennsylvania',
      status: 'Waiting approval',
    },
    {
      donationId: '202407',
      university: 'Pittsburgh University',
      status: 'Donation verification by university',
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
    <Card className="shadow mb-4">
      <Card.Body>
        <Table responsive="lg" className="pending-table">
          <thead>
            <tr>
              <th>Donation in process</th>
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
                  <FiMoreHorizontal className="pending-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
