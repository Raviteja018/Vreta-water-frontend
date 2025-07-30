import React from "react";
import { FiMapPin, FiEdit3, FiMail, FiPhone } from "react-icons/fi";

export default function LeadItem({ contact, setSelectedLead, setNotes, setShowLeadsModal }) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return '🆕';
      case 'contacted': return '📞';
      case 'follow-up': return '🔄';
      case 'closed': return '✅';
      case 'interested': return '✨';
      case 'not interested': return '❌';
      case 'not answered': return '📭';
      default: return '📋';
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center text-gray-900 text-lg font-semibold">
            <span className="text-2xl mr-2">{getStatusIcon(contact.status)}</span>
            {contact.fullName}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <FiMail className="text-gray-500" /> {contact.email}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <FiPhone className="text-gray-500" /> {contact.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <FiMapPin className="text-gray-400" /> {contact.location} •{" "}
            <span className="italic">
              Created: {new Date(contact.createdAt).toLocaleDateString()}
            </span>
          </div>
          {contact.notes && (
            <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-2 mt-2 leading-relaxed">
              📝 {contact.notes}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${getStatusColor(contact.status)}`}
          >
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </span>
          <button
            onClick={() => {
              setSelectedLead(contact);
              setNotes(contact.notes || '');
              setShowLeadsModal(false);
            }}
            className="inline-flex items-center gap-1 px-4 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow transition"
          >
            <FiEdit3 className="text-base" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}