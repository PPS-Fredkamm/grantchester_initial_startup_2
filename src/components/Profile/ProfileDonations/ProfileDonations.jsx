import { Card, Table } from 'react-bootstrap';
import { GoDotFill } from 'react-icons/go';

import './ProfileDonations.css';

export default function ProfileDonations() {
  const donations = [
    {
      donationId: '202509',
      stock: 'University of Pennsylvania',
      amount: '$2,000',
      status: 'Waiting approval',
    },
    {
      donationId: '20240701',
      stock: 'Clemson University',
      amount: '$1,500',
      status: 'Donation verification by university',
    },
    {
      donationId: '20250915',
      stock: 'Penn State University',
      amount: '$2,000',
      status: 'Completed',
    },
    {
      donationId: '20240701',
      stock: 'Clemson University',
      amount: '$1,500',
      status: 'Completed',
    },
    {
      donationId: '20240701',
      stock: 'Clemson University',
      amount: '$1,500',
      status: 'Completed',
    },
    {
      donationId: '20240701',
      stock: 'Clemson University',
      amount: '$1,500',
      status: 'Completed',
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
        <Card.Title>My Donations</Card.Title>
        <Table responsive striped className="donations-table">
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>University</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, idx) => (
              <tr key={idx}>
                <td>
                  <span>
                    <GoDotFill color="#4B9DE7" />#{d.donationId}
                  </span>
                </td>
                <td>
                  <span>{d.stock}</span>
                </td>
                <td>
                  <span>{d.amount}</span>
                </td>
                <td>
                  <span className={`status-pill ${getStatusClass(d.status)}`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
