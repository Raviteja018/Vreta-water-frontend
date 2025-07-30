import React, { useEffect, useState } from "react";
import { HiOutlineBriefcase } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import StatsGrid from "./StatsGrid";
import RecentActivity from "./RecentActivity";
import LeadsModal from "./LeadsModal";
import LeadManagementModal from "./LeadManagementModal";
import useContacts from "../../utils/useContacts";
import Header from "../Header";

export default function EmployeeHome() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState("");
  const {
    contacts,
    stats,
    filteredContacts,
    loading,
    fetchContactsByStatus,
    updateLeadStatus,
  } = useContacts(selectedStatus);

  useEffect(() => {
    if (selectedLead) {
      setNotes(selectedLead.notes || "");
    }
  }, [selectedLead]);

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        
        {/* 🌟 Elegant Home Button */}
        <div className="absolute right-6 top-6 z-10">
          <a
            href="/"
            className="group inline-flex items-center gap-2 px-5 py-2 bg-white border border-indigo-300 text-indigo-700 font-semibold rounded-full shadow hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-300"
          >
            <AiOutlineHome className="text-xl transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Home</span>
          </a>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 xl:px-0">
          {/* Elegant Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-3 text-indigo-600">
              <HiOutlineBriefcase className="text-4xl" />
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
                Employee Dashboard
              </h1>
            </div>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Track your leads, view activity, and manage opportunities in one place.
            </p>
            <div className="w-24 h-1 mt-4 bg-indigo-500 rounded-full"></div>
          </div>

          <StatsGrid
            stats={stats}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            setShowLeadsModal={setShowLeadsModal}
          />

          <RecentActivity
            contacts={contacts}
            setSelectedLead={setSelectedLead}
          />

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
    </>
  );
}
