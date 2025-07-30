import React, { useEffect } from 'react';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Authentication components
import ProtectedRoute from './components/ProtectedRoute';
import AuthGuard from './components/AuthGuard';
import RoleBasedRedirect from './components/RoleBasedRedirect';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AppContent() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
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
          {/* Public Routes */}
          <Route path='/' element={
            <RoleBasedRedirect>
              <RoleSelection/>
            </RoleBasedRedirect>
          }/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/products" element={<ProductComparisonSection />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Login Routes - Only accessible if not authenticated */}
          <Route path='/employee-login' element={
            <RoleBasedRedirect>
              <EmployeeLogin/>
            </RoleBasedRedirect>
          }/>
          <Route path='/manager-login' element={
            <RoleBasedRedirect>
              <ManagerLogin/>
            </RoleBasedRedirect>
          }/>
          <Route path='/admin-login' element={
            <RoleBasedRedirect>
              <AdminLogin/>
            </RoleBasedRedirect>
          }/>
          
          {/* Protected Routes - Role-based access */}
          <Route path='/employee-home' element={
            <AuthGuard requiredRoles={['employee']} fallbackRoute='/employee-login'>
              <EmployeeHome/>
            </AuthGuard>
          }/>
          <Route path='/manager-home' element={
            <AuthGuard requiredRoles={['manager']} fallbackRoute='/manager-login'>
              <ManagerHome/>
            </AuthGuard>
          }/>
          <Route path='/admin-home' element={
            <AuthGuard requiredRoles={['admin']} fallbackRoute='/admin-login'>
              <AdminHome/>
            </AuthGuard>
          }/>
          
          {/* Catch-all route - redirect to role selection */}
          <Route path='*' element={
            <RoleBasedRedirect>
              <RoleSelection/>
            </RoleBasedRedirect>
          }/>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
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
