import DonorHero from "../../../components/public/how-it-works/forDonors/DonorHero";
import DonorBenefits from "../../../components/public/how-it-works/forDonors/DonorBenefits";
import DonorProcess from "../../../components/public/how-it-works/forDonors/DonorProcess";
import DonorFeatures from "../../../components/public/how-it-works/forDonors/DonorFeatures";
import DonorCTA from "../../../components/public/how-it-works/forDonors/DonorCTA";

export default function ForDonors() {
  return (
    <div className="for-donors-page">
      <DonorHero />
      <DonorBenefits />
      <DonorProcess />
      <DonorFeatures />
      <DonorCTA />
    </div>
  );
}
