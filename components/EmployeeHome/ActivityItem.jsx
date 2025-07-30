import React from "react";
import { FaChartPie, FaUserPlus, FaPhoneAlt, FaSyncAlt, FaCheckCircle, FaRegEdit, FaRegSmileBeam, FaRegFrown, FaRegQuestionCircle } from "react-icons/fa";

export default function ActivityItem({ contact, setSelectedLead, setNotes }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'follow-up': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'interested': return 'bg-teal-100 text-teal-800';
      case 'not interested': return 'bg-red-100 text-red-800';
      case 'not answered': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (contact.status) {
      case 'new': return <FaUserPlus className="text-blue-400" />;
      case 'contacted': return <FaPhoneAlt className="text-yellow-500" />;
      case 'follow-up': return <FaSyncAlt className="text-orange-500" />;
      case 'closed': return <FaCheckCircle className="text-green-500" />;
      case 'interested': return <FaRegSmileBeam className="text-teal-500" />;
      case 'not interested': return <FaRegFrown className="text-red-500" />;
      case 'not answered': return <FaRegQuestionCircle className="text-gray-500" />;
      default: return <FaChartPie className="text-gray-400" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <div className="text-2xl">{getStatusIcon()}</div>
          <div>
            <p className="font-semibold text-gray-900">{contact.fullName}</p>
            <p className="text-sm text-gray-600">{contact.email} • {contact.phone} • {contact.location}</p>
            <p className="text-xs text-gray-400">
              {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`inline-flex items-center rounded-full px-3 py-1 font-semibold text-xs tracking-wide shadow-sm ${getStatusColor(contact.status)}`}>
          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
        </span>
        <button
          onClick={() => {
            setSelectedLead(contact);
            setNotes(contact.notes || '');
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <FaRegEdit /> Manage
        </button>
      </div>
    </div>
  );
}