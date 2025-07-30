import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '/components/Header';
import Footer from '/components/Footer';
import Home from '/components/Home';
import ProductComparisonSection from '/components/ProductComparisonSection';
import ContactPage from '../components/ContactPage';
import AboutSection from '../components/AboutSection';
import RoleSelection from '../components/RoleSelection';
import ManagerHome from '../components/ManagerHome';
import AdminHome from '../components/AdminHome';
import ManagerLogin from '../components/ManagerLogin';
import AdminLogin from '../components/AdminLogin';
import EmployeeLogin from '../components/EmployeeLogin';
import EmployeeHome from '../components/EmployeeHome/EmployeeHome';

function AppContent() {
  const location = useLocation();
  
  // Routes where header and footer should be hidden
  const hideHeaderFooterRoutes = [
    '/', // role selection page
    '/employee-login',
    '/employee-home',
    '/manager-login',
    '/manager-home',
    '/admin-login',
    '/admin-home'
  ];
  
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main>
        <Routes>
        <Route path='/' element={<RoleSelection/>}/>
          <Route path="/home" element={<Home />} />
          <Route path='/employee-login' element={<EmployeeLogin/>} />
          <Route path='/employee-home' element={<EmployeeHome/>} />
          <Route path='/manager-login' element={<ManagerLogin/>} />
          <Route path='/manager-home' element={<ManagerHome/>} />
          <Route path='/admin-login' element={<AdminLogin/>} />
          <Route path='/admin-home' element={<AdminHome/>} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/products" element={<ProductComparisonSection />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
