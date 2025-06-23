import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';

import DonationsDropdown from './DonationsDropdown';
import './DonorDonations.css';

export default function DonorDonations() {
  const [filter, setFilter] = useState('All');

  const donations = [
    {
      donationId: '402509',
      university: 'University of Pennsylvania',
      amount: '$2,000',
      status: 'Waiting approval',
    },
    {
      donationId: '252407',
      university: 'Clemson University',
      amount: '$1,500',
      status: 'Donation verification by university',
    },
    {
      donationId: '207509',
      university: 'Penn State University',
      amount: '$2,000',
      status: 'Completed',
    },
    {
      donationId: '302587',
      university: 'Clemson University',
      amount: '$1,500',
      status: 'Completed',
    },
    {
      donationId: '702509',
      university: 'Louisiana State University',
      amount: '$1,500',
      status: 'Completed',
    },
    {
      donationId: '202406',
      university: 'University of California, Berkley',
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

  const filteredDonations = donations.filter((d) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return d.status.toLowerCase() === 'completed';
    if (filter === 'Waiting Approval')
      return d.status.toLowerCase().includes('waiting');
    if (filter === 'Verifying')
      return d.status.toLowerCase().includes('verification');
    return true;
  });

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <div className="donations-header">
          <Card.Title>My Donations</Card.Title>
          <DonationsDropdown value={filter} onChange={setFilter} />
        </div>

        <Table responsive="lg" striped className="donations-table">
          <thead>
            <tr className='text-nowrap'>
              <th className="w-20">Donation ID</th>
              <th className="w-50">University</th>
              <th className="w-20">Amount</th>
              <th className="w-10">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonations.map((d, idx) => (
              <tr className='text-nowrap' key={idx}>
                <td>
                  <span>#{d.donationId}</span>
                </td>
                <td>
                  <span>{d.university}</span>
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
            {filteredDonations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No donations match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
