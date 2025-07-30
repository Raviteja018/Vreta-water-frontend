import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ActivityItem from "./ActivityItem";

export default function RecentActivity({ contacts, setSelectedLead, setNotes }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Recent Activity</h3>
      </div>

      {/* Content */}
      {contacts.length === 0 ? (
        <div className="text-center py-16">
          <AiOutlineCloseCircle className="mx-auto text-6xl text-gray-300 mb-4 animate-pulse" />
          <p className="text-lg text-gray-500">No recent leads to show</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.slice(0, 8).map((contact) => (
            <ActivityItem
              key={contact._id}
              contact={contact}
              setSelectedLead={setSelectedLead}
              setNotes={setNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
