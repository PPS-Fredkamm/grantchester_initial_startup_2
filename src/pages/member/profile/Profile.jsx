import { useState } from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";

import ProfileInfo from "../../../components/member/profile/profileInfo/ProfileInfo";
import BasicInfo from "../../../components/member/profile/profileTabs/basicInfo/BasicInfo";
import NotiPreferences from "../../../components/member/profile/profileTabs/NotiPreferences";
import SecuritySettings from "../../../components/member/profile/profileTabs/security/SecuritySettings";

// CSS now imported via styles/index.css

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");

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
