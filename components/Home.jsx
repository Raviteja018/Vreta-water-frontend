import HeroSection from '../components/HeroSection'
import React from 'react';
import SolutionsSection from '../components/SolutionSection';
import WellnessHighlights from '../components/WellnessHighlights';
import HydrogenBenefits from '../components/HydrogenBenefits';
import JoinAsAgent from '../components/JoinAsAgent';
import WhatsAppBookingPopup from '../components/WhatsAppBookingPopup';

function App() {

  return (
    <>
      {/* <Header /> */}
      <main>
        <HeroSection />
        {/* <AboutSection/> */}
        <SolutionsSection/>
        {/* <ProductComparisonSection/> */}
        <WellnessHighlights/>
        <HydrogenBenefits />
        <JoinAsAgent />
        {/* <ContactPage/> */}
        <WhatsAppBookingPopup />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App








