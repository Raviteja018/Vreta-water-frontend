// components/JoinAsAgent.jsx
import React from "react";
import { FaBriefcase, FaStar } from "react-icons/fa";

const JoinAsAgent = () => {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-4xl mx-auto my-10">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-pink-600 text-4xl">
          <FaBriefcase />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          💼 Looking for a Better Opportunity?
        </h2>
        <h3 className="text-xl font-semibold text-pink-600">
          🌟 Join as an Agent Today!
        </h3>
        <p className="text-gray-700">
          Be your own boss. Work flexibly and earn more with every step you take.
        </p>
        <p className="text-gray-700 font-medium">
          This is a great opportunity — don’t miss it!
        </p>
        <a
          href="#"
          className="bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition"
        >
          👉 Join as an Agent
        </a>
        <div className="pt-4 text-gray-600">
          <p>
            Partner with us to promote India’s first 4000 - 6000 ppb hydrogen wellness systems.
          </p>
          <p>Attractive commissions, expert training, and national branding support.</p>
        </div>
      </div>
    </section>
  );
};

export default JoinAsAgent;
