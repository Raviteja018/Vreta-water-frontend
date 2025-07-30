import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import StatsGrid from "./StatsGrid";
import RecentActivity from "./RecentActivity";
import LeadsModal from "./LeadsModal";
import LeadManagementModal from "./LeadManagementModal";
import useContacts from "../../utils/useContacts";

export default function EmployeeHome() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const {
    contacts,
    stats,
    filteredContacts,
    loading,
    fetchContactsByStatus,
    updateLeadStatus,
  } = useContacts(selectedStatus);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get("http://localhost:4000/api/auth/me", config);
        setCurrentUser(res.data);
      }
    } catch (err) {
      console.error("Error fetching current user", err);
    }
  };

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setNotes(selectedLead.notes || "");
    }
  }, [selectedLead]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">

      {/* 🔴 Logout Button */}
      <div className="flex justify-end sm:absolute sm:right-4 sm:top-4 z-10 mb-4 sm:mb-0">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>


      {/* Container */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6">

        {/* 💼 Dashboard Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 text-indigo-600">
            <HiOutlineBriefcase className="text-3xl sm:text-4xl" />
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-800">
              {currentUser ? `${getGreeting()}, ${currentUser.fullName || currentUser.username}!` : 'Employee Dashboard'}
            </h1>
          </div>
          <p className="mt-2 text-gray-600 text-sm sm:text-base px-2">
            Track your leads, view activity, and manage opportunities in one place.
          </p>
          <div className="w-20 sm:w-24 h-1 mt-4 bg-indigo-500 rounded-full"></div>
        </div>

        {/* 📊 Stats Cards */}
        <StatsGrid
          stats={stats}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          setShowLeadsModal={setShowLeadsModal}
        />

        {/* 📝 Activity List */}
        <RecentActivity
          contacts={contacts}
          setSelectedLead={setSelectedLead}
          setNotes={setNotes}
        />

        {/* 💬 Modal for Lead Details */}
        {showLeadsModal && (
          <LeadsModal
            selectedStatus={selectedStatus}
            filteredContacts={filteredContacts}
            setShowLeadsModal={setShowLeadsModal}
            setSelectedLead={setSelectedLead}
          />
        )}

        {selectedLead && (
          <LeadManagementModal
            selectedLead={selectedLead}
            notes={notes}
            setNotes={setNotes}
            updateLeadStatus={updateLeadStatus}
            setSelectedLead={setSelectedLead}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
