import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPopup = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const { name, mobile, date } = formData;
    const message = `Hi, I'm ${name}, my mobile number is ${mobile}. I would like to book a hydrogen wellness session on ${date}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918143524778?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Icon */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaWhatsapp size={28} />
      </button>

      {/* Glassmorphic Popup */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/80">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 w-full max-w-md text-white relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-white text-xl"
              onClick={() => setShowForm(false)}
            >
              ✕    
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Book Your Session</h2>

            {/* Name */}
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 mb-4 rounded bg-white/20 border border-white/30 placeholder-white/80 text-white"
            />

            {/* Mobile */}
            <label className="block mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full p-2 mb-4 rounded bg-white/20 border border-white/30 placeholder-white/80 text-white"
            />

            {/* Preferred Date */}
            <label className="block mb-2">Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 mb-4 rounded bg-white/20 border border-white/30 text-white"
            />

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-2"
            >
              Book Now on WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPopup;
