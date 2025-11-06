import UniversityHero from "../../../components/public/how-it-works/forUniversities/UniversityHero";
import UniversityBenefits from "../../../components/public/how-it-works/forUniversities/UniversityBenefits";
import UniversityProcess from "../../../components/public/how-it-works/forUniversities/UniversityProcess";
import UniversityFeatures from "../../../components/public/how-it-works/forUniversities/UniversityFeatures";
import UniversityCTA from "../../../components/public/how-it-works/forUniversities/UniversityCTA";

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
