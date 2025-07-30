import React from "react";
import InfoBlock from "./InfoBlock";
import StatusButtons from "./StatusButtons";
import { IoCloseOutline } from "react-icons/io5";
import { MdEmail, MdPhone, MdLocationOn, MdFlag } from "react-icons/md";

export default function LeadManagementModal({
  selectedLead,
  notes,
  setNotes,
  updateLeadStatus,
  setSelectedLead,
  loading,
}) {
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

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden flex flex-col max-h-[80vh]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight">
              Manage Lead
              <span className="block text-base font-medium text-gray-500 mt-1">
                {selectedLead.fullName}
              </span>
            </h2>
            <button
              onClick={() => {
                setSelectedLead(null);
                setNotes('');
              }}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <IoCloseOutline size={28} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent max-h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoBlock label="Email" value={selectedLead.email} icon={MdEmail} />
            <InfoBlock label="Phone" value={selectedLead.phone} icon={MdPhone} />
            <InfoBlock label="Location" value={selectedLead.location} icon={MdLocationOn} />
            <InfoBlock
              label="Current Status"
              icon={MdFlag}
              value={
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedLead.status)}`}
                >
                  {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                </span>
              }
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-indigo-600 font-medium uppercase text-sm tracking-wide mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              rows={1}
              placeholder="Add notes about this lead..."
            />
          </div>

          {/* Status Buttons */}
          <StatusButtons
            leadId={selectedLead._id}
            updateLeadStatus={updateLeadStatus}
            notes={notes}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => {
              setSelectedLead(null);
              setNotes('');
            }}
            className="px-5 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
