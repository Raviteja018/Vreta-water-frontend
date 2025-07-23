import { Phone, Mail, MapPin } from "lucide-react";
import React from 'react';

export default function ContactPage() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Reach Out To Book Or Ask Anything</h2>
        <p className="mt-4 text-gray-600">
          We’re here to help you experience the full benefits of hydrogen wellness. Whether you’re ready to book, need product details, or just have questions — reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">Phone No: <a href="tel:8143524778" className="text-blue-600">8143524778</a></p>
              <p className="text-gray-600">WhatsApp No: <a href="https://wa.me/918143524778" className="text-green-600">8143524778</a></p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-blue-600 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">avinashuk114@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Location</h4>
              <p className="text-gray-600">
                Flat 108, Plot No 8-54/TE, The Elegancy Apartment, Road No 9/2, Bandari Layout, Nizampet, Qutubullapur, Hyderabad, Telangana, 500090
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps?q=Flat+108,+Plot+No+8+-54/TE,+The+Elegancy+Apartment,+Road+No+9/2,+Bandari+layout,+Nizampet,+Hyderabad,+Telangana,+500090&output=embed"
            className="w-full h-64 rounded-lg border"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email Address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              placeholder="What’s your message about?"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              rows="5"
              placeholder="Type your message here..."
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
