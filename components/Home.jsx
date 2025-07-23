import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection'
import React from 'react';
import SolutionsSection from '../components/SolutionSection';
import ProductComparisonSection from '../components/ProductComparisonSection';
import WellnessHighlights from '../components/WellnessHighlights';
import HydrogenBenefits from '../components/HydrogenBenefits';
import JoinAsAgent from '../components/JoinAsAgent';
import ContactPage from '../components/ContactPage';
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








