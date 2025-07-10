import React, { useState } from 'react';
import UniversityAccordion from '../../../../components/University/UniversityAccordion/UniversityAccordion';

export default function UniversitySettings() {
  const [currentPlan, setCurrentPlan] = useState('Pro');

  const handlePlanChange = (newPlan) => {
    if (newPlan !== currentPlan) {
      setCurrentPlan(newPlan);
      // Optional: API call here
      console.log(`Plan changed to: ${newPlan}`);
    }
  };

  return (
    <UniversityAccordion
      currentPlan={currentPlan}
      onPlanChange={handlePlanChange}
    />
  );
}
