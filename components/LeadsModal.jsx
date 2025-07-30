import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const LeadsModal = ({ 
  showLeadsModal, 
  setShowLeadsModal, 
  selectedStatus, 
  filteredContacts, 
  getStatusColor, 
  setSelectedLead, 
  setNotes 
}) => {
  if (!showLeadsModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedStatus === "all" ? "All Leads" : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Leads`}
              <span className="ml-2 text-blue-600 text-sm">({filteredContacts.length})</span>
            </h3>
            <button
              onClick={() => setShowLeadsModal(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AiOutlineClose className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No leads in this category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <div key={contact._id} className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{contact.fullName}</p>
                      <p className="text-sm text-gray-500">{contact.email} • {contact.phone}</p>
                      <p className="text-xs text-gray-400">📍 {contact.location} • {new Date(contact.createdAt).toLocaleDateString()}</p>
                      {contact.notes && (
                        <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">📝 {contact.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedLead(contact);
                          setNotes(contact.notes || "");
                          setShowLeadsModal(false);
                        }}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsModal;
