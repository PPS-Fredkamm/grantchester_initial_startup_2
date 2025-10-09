import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";

import "./MarketingHome.css";

export default function MarketingHome() {
	return (
		<div className="marketing-home">
			{/* HERO */}
			<section className="hero-section">
				<div className="hero-overlay" />
				<Container className="hero-content container-narrow">
					<h1 className="hero-title">A Luxury Brand Experience</h1>
					<p className="hero-subtitle">
						Change the way you live, play, and travel. Build community through
						wellness and unforgettable experiences.
					</p>
					<div className="hero-cta">
						<Button className="btn-primary-gradient">Become a Member</Button>
						<Button variant="outline-light">Explore Programs</Button>
					</div>
				</Container>
				<Image
					className="hero-image"
					src="/src/assets/images/HomeBanner.png"
					alt="Hero placeholder"
					fluid
				/>
			</section>

			{/* OUR STORY */}
			<section className="story-section">
				<Container className="container-wide">
					<div className="section-header">
						<h2>Our Story</h2>
						<p>
							We create community and transform lives through world‑class programs,
							premium facilities, and curated travel experiences. Our leadership team
							brings decades of experience across wellness, events, and hospitality.
						</p>
					</div>
					<Row className="align-items-center g-4">
						<Col lg={7}>
							<Image
								className="story-image"
								src="/src/assets/images/House.jpg"
								alt="Story placeholder"
								fluid
							/>
						</Col>
						<Col lg={5}>
							<div className="story-copy">
								<h3>Your World. Your Game.</h3>
								<p>
									From daily programming to destination events, we deliver a cohesive
									brand experience focused on wellness, connection, and growth.
								</p>
								<ul className="check-list">
									<li>Premium facilities and coaching</li>
									<li>Curated events and trips</li>
									<li>Holistic wellness programming</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* FEATURES */}
			<section className="features-section">
				<Container className="container-wide">
					<Row className="g-3">
						<Col md={4}>
							<Card className="feature-card h-100">
								<Card.Img variant="top" src="/src/assets/images/startup.jpg" />
								<Card.Body>
									<Card.Title>Programs</Card.Title>
									<Card.Text>
										Daily clinics, leagues, socials, and private training for all levels.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="feature-card h-100">
								<Card.Img variant="top" src="/src/assets/images/for-universities.jpg" />
								<Card.Body>
									<Card.Title>Events & Trips</Card.Title>
									<Card.Text>
										Signature events and luxury travel experiences across the globe.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="feature-card h-100">
								<Card.Img variant="top" src="/src/assets/images/hiring.jpg" />
								<Card.Body>
									<Card.Title>Wellness</Card.Title>
									<Card.Text>
										Holistic fitness and recovery to support performance and lifestyle.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* MEMBERSHIP CTA */}
			<section className="membership-cta">
				<Container className="container-narrow">
					<Card className="membership-card">
						<Card.Body>
							<Card.Title as="h3">Become a Member</Card.Title>
							<Card.Text>
								Unlock priority access, member pricing, and exclusive experiences.
							</Card.Text>
							<div>
								<Button className="btn-primary-gradient me-2">Join Now</Button>
								<Button variant="link">Learn More</Button>
							</div>
						</Card.Body>
					</Card>
				</Container>
			</section>

			{/* BLOG/NEWS TEASER */}
			<section className="news-section">
				<Container className="container-wide">
					<h3>From the Journal</h3>
					<Row className="g-3">
						<Col md={4}>
							<Card className="news-card h-100">
								<Card.Img variant="top" src="/src/assets/images/clouds.jpg" />
								<Card.Body>
									<Card.Title as="h5">Designing Elevated Member Experiences</Card.Title>
									<Card.Text>
										How we craft thoughtful touchpoints that feel premium and personal.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="news-card h-100">
								<Card.Img variant="top" src="/src/assets/images/contract.jpg" />
								<Card.Body>
									<Card.Title as="h5">Building Community Through Play</Card.Title>
									<Card.Text>
										Programs and rituals that drive belonging and connection.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4}>
							<Card className="news-card h-100">
								<Card.Img variant="top" src="/src/assets/images/Handshake.png" />
								<Card.Body>
									<Card.Title as="h5">Why Wellness Matters</Card.Title>
									<Card.Text>
										Integrating recovery and fitness to support a joyful lifestyle.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
}


