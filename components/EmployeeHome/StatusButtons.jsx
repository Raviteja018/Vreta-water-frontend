import React from "react";
import { FaUserPlus, FaPhoneAlt, FaSyncAlt, FaCheckCircle, FaRegSmileBeam, FaRegFrown, FaRegQuestionCircle } from "react-icons/fa";

export default function StatusButtons({ leadId, updateLeadStatus, notes, loading }) {
  const buttons = [
    { label: 'Mark as Contacted', value: 'contacted', color: 'bg-yellow-500', icon: <FaPhoneAlt /> },
    { label: 'Needs Follow-up', value: 'follow-up', color: 'bg-orange-500', icon: <FaSyncAlt /> },
    { label: 'Mark as Closed', value: 'closed', color: 'bg-green-600', icon: <FaCheckCircle /> },
    { label: 'Reset to New', value: 'new', color: 'bg-blue-600', icon: <FaUserPlus /> },
    { label: 'Mark as Interested', value: 'interested', color: 'bg-teal-600', icon: <FaRegSmileBeam /> },
    { label: 'Not Interested', value: 'not interested', color: 'bg-red-600', icon: <FaRegFrown /> },
    { label: 'Not Answered', value: 'not answered', color: 'bg-gray-500', icon: <FaRegQuestionCircle /> },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => updateLeadStatus(leadId, btn.value, notes)}
            disabled={loading}
            className={`flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-md hover:brightness-110 transition disabled:opacity-50 ${btn.color}`}
          >
            {btn.icon}
            <span className="text-sm">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}