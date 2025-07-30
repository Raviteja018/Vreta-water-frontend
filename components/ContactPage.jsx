import { Phone, Mail, MapPin } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  const cities = [
    "Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits and start with 6-9.";
    }

    if (!formData.location) {
      newErrors.location = "Please select a city.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/api/contact", formData);
      if (response.status === 201) {
        alert("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Submission failed. Please try again later.");
      }
    }
  };

  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Reach Out To Book Or Ask Anything
        </h2>
        <p className="mt-4 text-gray-600">
          We’re here to help you experience the full benefits of hydrogen wellness.
          Whether you’re ready to book, need product details, or just have questions — reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">
                Phone No: <a href="tel:8143524778" className="text-blue-600">8143524778</a>
              </p>
              <p className="text-gray-600">
                WhatsApp No: <a href="https://wa.me/918143524778" className="text-green-600">8143524778</a>
              </p>
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

          <iframe
            src="https://www.google.com/maps?q=Flat+108,+Plot+No+8+-54/TE,+The+Elegancy+Apartment,+Road+No+9/2,+Bandari+layout,+Nizampet,+Hyderabad,+Telangana,+500090&output=embed"
            className="w-full h-64 rounded-lg border"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location (Select City) *</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
            >
              <option value="">-- Choose a City --</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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
