import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Header = () => {
  const location = useLocation();
  const isHomePage = ['/', '/home', '/about', '/contact', '/products'].includes(location.pathname);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-2 flex justify-between items-center">
        
        {/* Logo + Title */}
        <div className="flex items-center text-2xl font-bold tracking-wide">
          <img
            src="/images/logo-.png" // Replace with your actual image path
            alt="Vreta Logo"
            className="h-12 w-12 object-contain mr-2"
          /> 
          <span>Water Enhancer</span>
        </div>

        {/* Hamburger menu (mobile only) */}
        {isHomePage && (
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? (
                <HiOutlineX className="h-7 w-7 text-white" />
              ) : (
                <HiOutlineMenu className="h-7 w-7 text-white" />
              )}
            </button>
          </div>
        )}

        {/* Navigation (desktop only) */}
        {isHomePage && (
          <nav className="hidden md:flex gap-8 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </nav>
        )}

        {/* CTA (desktop only) */}
        {isHomePage && (
          <a
            href="#buy"
            className="hidden md:block bg-sky-400 hover:bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            Buy Now
          </a>
        )}
      </div>

      {/* Mobile menu panel */}
      {isHomePage && isOpen && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 flex flex-col gap-4 text-sm">
          <Link to="/" onClick={toggleMenu} className="hover:underline">Home</Link>
          <Link to="/about" onClick={toggleMenu} className="hover:underline">About Us</Link>
          <Link to="/products" onClick={toggleMenu} className="hover:underline">Products</Link>
          <Link to="/contact" onClick={toggleMenu} className="hover:underline">Contact</Link>
          <a
            href="#buy"
            onClick={toggleMenu}
            className="mt-2 inline-block bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full font-semibold text-center"
          >
            Buy Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
