import React from "react";
import { FiUsers, FiPhoneCall, FiClock, FiCheckCircle, FiStar, FiXCircle, FiMinusCircle, FiMessageSquare } from "react-icons/fi";
import StatsCard from "./StatsCards";

export default function StatsGrid({ stats, selectedStatus, setSelectedStatus, setShowLeadsModal }) {
  const statItems = [
    { title: "Total Leads", value: stats.total, status: "all", icon: <FiUsers className="text-2xl text-indigo-600" /> },
    { title: "New", value: stats.new, status: "new", icon: <FiStar className="text-2xl text-blue-500" /> },
    { title: "Contacted", value: stats.contacted, status: "contacted", icon: <FiPhoneCall className="text-2xl text-green-500" /> },
    { title: "Follow-ups", value: stats['follow-up'], status: "follow-up", icon: <FiClock className="text-2xl text-yellow-500" /> },
    { title: "Closed", value: stats.closed, status: "closed", icon: <FiCheckCircle className="text-2xl text-purple-600" /> },
    { title: "Interested", value: stats.interested || 0, status: "interested", icon: <FiMessageSquare className="text-2xl text-emerald-500" /> },
    { title: "Not Interested", value: stats['not interested'] || 0, status: "not interested", icon: <FiXCircle className="text-2xl text-red-500" /> },
    { title: "Not Answered", value: stats['not answered'] || 0, status: "not answered", icon: <FiMinusCircle className="text-2xl text-gray-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item) => (
        <StatsCard
          key={item.status}
          title={item.title}
          value={item.value}
          status={item.status}
          icon={item.icon}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          setShowLeadsModal={setShowLeadsModal}
        />
      ))}
    </div>
  );
}
