import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Vreta International Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
