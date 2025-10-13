import UniversityHero from "../../../../components/marketing/forUniversities/UniversityHero";
import UniversityBenefits from "../../../../components/marketing/forUniversities/UniversityBenefits";
import UniversityProcess from "../../../../components/marketing/forUniversities/UniversityProcess";
import UniversityFeatures from "../../../../components/marketing/forUniversities/UniversityFeatures";
import UniversityCTA from "../../../../components/marketing/forUniversities/UniversityCTA";

import "./ForUniversities.css";

export default function ForUniversities() {
  return (
    <div className="for-universities-page">
      <UniversityHero />
      <UniversityBenefits />
      <UniversityProcess />
      <UniversityFeatures />
      <UniversityCTA />
    </div>
  );
}
