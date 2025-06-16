import { Container, Row, Col } from 'react-bootstrap';

import ProfileBanner from './ProfileBanner/ProfileBanner';
import ProfileNav from './ProfileNav/ProfileNav';
import ProfileInfoCard from './ProfileInfo/ProfileInfoCard';
import ProfileCTA from './ProfileCTA/ProfileCTA';
import ProfileStats from './ProfileStats/ProfileStats';
import ProfilePendingDonations from './ProfilePending/ProfilePending';
import ProfileDonations from './ProfileDonations/ProfileDonations';

import './Profile.css';

export default function Profile() {
  return (
    <>
      <ProfileBanner />
      <Container fluid className="donor-dashboard">
        <div className="profile-container">
          <ProfileNav />
          <Row className="profile-content">
            {/* Left Column */}
            <Col xs={12} lg={12} xl={3}>
              <ProfileInfoCard />
              <ProfileCTA />
            </Col>
            {/* Right Column */}
            <Col xs={12} lg={12} xl={9}>
              <ProfileStats />
              <ProfilePendingDonations />
              <ProfileDonations />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
