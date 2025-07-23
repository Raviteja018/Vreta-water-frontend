import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '/components/Header';
import Footer from '/components/Footer';
import Home from '/components/Home';
import ProductComparisonSection from '/components/ProductComparisonSection';
import ContactPage from '../components/ContactPage';
import AboutSection from '../components/AboutSection';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/products" element={<ProductComparisonSection />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
