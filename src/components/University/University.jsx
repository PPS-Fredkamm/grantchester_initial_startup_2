import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './University.css';
import UniversityBanner from './UniversityBanner/UniversityBanner';
import UniversityNav from './UniversityNav';
import UniversityPortfolioDashboard from './UniversityPortfolioDashboard/UniversityPortfolioDashboard';
import UniversityPriceHistory from './UniversityPriceHistory/UniversityPriceHistory';
// import { Container, Row, Col } from 'react-bootstrap';


export default function University() {
return (
    <>
    <UniversityBanner />

<h2>University Page Loaded!</h2>;
<UniversityNav />
<UniversityPortfolioDashboard />
    </>
);



}