import WhyPrivate from "../../../../components/public/whyDonate/WhyPrivate/WhyPrivate";
import WhatPlatformDoes from "../../../../components/public/whyDonate/WhatPlatformDoes/WhatPlatformDoes";
import BenefitsOfDonating from "../../../../components/public/whyDonate/BenefitsOfDonating/BenefitsOfDonating";
import ImpactOfDonation from "../../../../components/public/whyDonate/ImpactOfDonation/ImpactOfDonation";
import ContactUs from "../../../../components/public/forUniversities/ContactUs/ContactUs";

export default function WhyDonate() {
  return (
    <>
      <WhatPlatformDoes />
      <WhyPrivate />
      <BenefitsOfDonating />
      <ImpactOfDonation />
    </>
  );
}
