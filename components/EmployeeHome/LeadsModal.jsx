import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import LeadItem from "./LeadItem";

export default function LeadsModal({ selectedStatus, filteredContacts, setShowLeadsModal, setSelectedLead, setNotes }) {
  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedStatus === 'all' ? 'All Leads' : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Leads`}
              <span className="ml-2 text-blue-600">({filteredContacts.length})</span>
            </h3>
            <button
              onClick={() => setShowLeadsModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-gray-400"><AiOutlineClose /></div>
              <p className="text-gray-500 text-lg">No leads in this category</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <LeadItem
                  key={contact._id}
                  contact={contact}
                  setSelectedLead={setSelectedLead}
                  setNotes={setNotes}
                  setShowLeadsModal={setShowLeadsModal}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}