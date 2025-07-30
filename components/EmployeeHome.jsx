import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChartPie,
  FaUserPlus,
  FaPhoneAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaRegEdit,
  FaRegSmileBeam,
  FaRegFrown,
  FaRegQuestionCircle
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Header from "./Header";

export default function EmployeeHome() {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    'follow-up': 0,
    closed: 0
  });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contact/all");
      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contact/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const fetchContactsByStatus = async (status) => {
    try {
      if (status === 'all') {
        setFilteredContacts(contacts);
      } else {
        const res = await axios.get(`http://localhost:4000/api/contact/status/${status}`);
        setFilteredContacts(res.data);
      }
    } catch (err) {
      console.error("Error fetching contacts by status", err);
    }
  };

  const updateLeadStatus = async (leadId, newStatus, leadNotes = '') => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:4000/api/contact/update-status/${leadId}`, {
        status: newStatus,
        notes: leadNotes
      });

      // Refresh data
      await fetchContacts();
      await fetchStats();
      await fetchContactsByStatus(selectedStatus);

      setSelectedLead(null);
      setNotes('');
    } catch (err) {
      console.error("Error updating lead status", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchStats();

    const interval = setInterval(() => {
      fetchContacts();
      fetchStats();
    }, 30000); // refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchContactsByStatus(selectedStatus);
  }, [selectedStatus, contacts]);

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
      default: return '📋';
    }
  };

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-5xl mx-auto px-4 md:px-8 xl:px-0">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Leads Dashboard
                </h2>
                <p className="text-gray-600 mt-2">
                  Manage and track your customer leads efficiently
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Last updated</div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'all' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('all');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Total Leads</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
                </div>
                <div className="text-3xl text-blue-500"><FaChartPie /></div>
              </div>
            </div>

            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'new' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('new');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">New</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.new}</p>
                </div>
                <div className="text-3xl text-blue-400"><FaUserPlus /></div>
              </div>
            </div>

            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'contacted' ? 'ring-2 ring-yellow-500 bg-yellow-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('contacted');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Contacted</h3>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.contacted}</p>
                </div>
                <div className="text-3xl text-yellow-500"><FaPhoneAlt /></div>
              </div>
            </div>

            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'follow-up' ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('follow-up');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Follow-ups</h3>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{stats['follow-up']}</p>
                </div>
                <div className="text-3xl text-orange-500"><FaSyncAlt /></div>
              </div>
            </div>

            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'closed' ? 'ring-2 ring-green-500 bg-green-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('closed');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Closed</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.closed}</p>
                </div>
                <div className="text-3xl text-green-500"><FaCheckCircle /></div>
              </div>
            </div>
            {/* Interested */}
            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'interested' ? 'ring-2 ring-teal-500 bg-teal-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('interested');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Interested</h3>
                  <p className="text-3xl font-bold text-teal-600 mt-2">{stats.interested || 0}</p>
                </div>
                <div className="text-3xl text-teal-500"><FaRegSmileBeam /></div>
              </div>
            </div>

            {/* Not Interested */}
            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'not interested' ? 'ring-2 ring-red-500 bg-red-50' : ''
                }`}
              onClick={() => {
                setSelectedStatus('not interested');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Not Interested</h3>
                  <p className="text-3xl font-bold text-red-600 mt-2">{stats['not interested'] || 0}</p>
                </div>
                <div className="text-3xl text-red-500"><FaRegFrown /></div>
              </div>
            </div>

            {/* Not Answered */}
            <div
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${selectedStatus === 'not answered' ? 'ring-2 ring-gray-500 bg-gray-100' : ''
                }`}
              onClick={() => {
                setSelectedStatus('not answered');
                setShowLeadsModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Not Answered</h3>
                  <p className="text-3xl font-bold text-gray-600 mt-2">{stats['not answered'] || 0}</p>
                </div>
                <div className="text-3xl text-gray-500"><FaRegQuestionCircle /></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h3>

            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 text-gray-400"><AiOutlineClose /></div>
                <p className="text-gray-500 text-lg">No leads yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.slice(0, 8).map((contact) => {
                  let statusIcon = null;
                  switch (contact.status) {
                    case 'new':
                      statusIcon = <FaUserPlus className="text-blue-400" />;
                      break;
                    case 'contacted':
                      statusIcon = <FaPhoneAlt className="text-yellow-500" />;
                      break;
                    case 'follow-up':
                      statusIcon = <FaSyncAlt className="text-orange-500" />;
                      break;
                    case 'closed':
                      statusIcon = <FaCheckCircle className="text-green-500" />;
                      break;
                    case 'interested':
                      statusIcon = <FaRegSmileBeam className="text-teal-500" />;
                      break;
                    case 'not interested':
                      statusIcon = <FaRegFrown className="text-red-500" />;
                      break;
                    case 'not answered':
                      statusIcon = <FaRegQuestionCircle className="text-gray-500" />;
                      break;
                    default:
                      statusIcon = <FaChartPie className="text-gray-400" />;
                  }
                  return (
                    <div key={contact._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="text-2xl">
                            {statusIcon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {contact.fullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {contact.email} • {contact.phone} • {contact.location}
                            </p>
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
                })}
              </div>
            )}
          </div>

          {/* Leads Modal */}
          {showLeadsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                        <div key={contact._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="text-2xl">{getStatusIcon(contact.status)}</div>
                                <div>
                                  <p className="font-semibold text-gray-900 text-lg">
                                    {contact.fullName}
                                  </p>
                                  <p className="text-gray-600">
                                    {contact.email} • {contact.phone}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    📍 {contact.location} • Created: {new Date(contact.createdAt).toLocaleDateString()}
                                  </p>
                                  {contact.notes && (
                                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                                      📝 {contact.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 font-semibold text-xs tracking-wide shadow-sm ${getStatusColor(contact.status)}`}>
                                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedLead(contact);
                                  setNotes(contact.notes || '');
                                  setShowLeadsModal(false);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
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
          )}

          {/* Lead Management Modal */}
          {selectedLead && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Manage Lead: <span className="text-blue-600">{selectedLead.fullName}</span>
                  </h2>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InfoBlock label="Email" value={selectedLead.email} />
                    <InfoBlock label="Phone" value={selectedLead.phone} />
                    <InfoBlock label="Location" value={selectedLead.location} />
                    <InfoBlock
                      label="Current Status"
                      value={
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedLead.status)}`}>
                          {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                        </span>
                      }
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows={3}
                      placeholder="Add notes about this lead..."
                    />
                  </div>

                  {/* Status Buttons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Mark as Contacted', value: 'contacted', color: 'bg-yellow-500', icon: <FaPhoneAlt /> },
                        { label: 'Needs Follow-up', value: 'follow-up', color: 'bg-orange-500', icon: <FaSyncAlt /> },
                        { label: 'Mark as Closed', value: 'closed', color: 'bg-green-600', icon: <FaCheckCircle /> },
                        { label: 'Reset to New', value: 'new', color: 'bg-blue-600', icon: <FaUserPlus /> },
                        { label: 'Mark as Interested', value: 'interested', color: 'bg-teal-600', icon: <FaRegSmileBeam /> },
                        { label: 'Not Interested', value: 'not interested', color: 'bg-red-600', icon: <FaRegFrown /> },
                        { label: 'Not Answered', value: 'not answered', color: 'bg-gray-500', icon: <FaRegQuestionCircle /> },
                      ].map((btn) => (
                        <button
                          key={btn.value}
                          onClick={() => updateLeadStatus(selectedLead._id, btn.value, notes)}
                          disabled={loading}
                          className={`flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-md hover:brightness-110 transition disabled:opacity-50 ${btn.color}`}
                        >
                          {btn.icon}
                          <span className="text-sm">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedLead(null);
                      setNotes('');
                    }}
                    className="px-5 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div></>

  );
}
