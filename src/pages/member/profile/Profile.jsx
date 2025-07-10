import { useState } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

import ProfileInfo from '../../../components/profile/profileInfo/ProfileInfo';
import BasicInfo from '../../../components/profile/profileTabs/BasicInfo';
import NotiPreferences from '../../../components/profile/profileTabs/NotiPreferences';
import SecuritySettings from '../../../components/profile/profileTabs/SecuritySettings';
// import { useAuthContext } from '../../../context/AuthProvider';

import './Profile.css';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('basic');

  //   const authCtx = useAuthContext();

  return (
    <Container fluid className="profile-page">
      <div className="profile-container">
        <Row className="profile-content">
          {/* Left Column */}
          <Col xs={12} lg={12} xl={4}>
            <ProfileInfo />
          </Col>

          {/* Right Column */}
          <Col xs={12} lg={12} xl={8}>
            <Card className="profile-card shadow">
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="custom-tabs"
                  justify
                >
                  <Tab eventKey="basic" title="Basic Info">
                    <BasicInfo />
                  </Tab>
                  <Tab eventKey="security" title="Security">
                    <SecuritySettings />
                  </Tab>
                  <Tab eventKey="notifications" title="Notifications">
                    <NotiPreferences />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
