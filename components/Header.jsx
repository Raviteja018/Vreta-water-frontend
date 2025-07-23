import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-sky-400">Vreta</span> Water Enhancer
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 font-medium">
 <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>

        {/* CTA Button */}
        <a
          href="#buy"
          className="bg-sky-400 hover:bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition md:block hidden"
        >
          Buy Now
        </a>
      </div>
    </header>
  );
};

export default Header;
