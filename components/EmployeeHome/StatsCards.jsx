import React from "react";
import clsx from "clsx";

export default function StatsCard({ title, value, status, icon, selectedStatus, setSelectedStatus, setShowLeadsModal }) {
  const isSelected = selectedStatus === status;

  const handleClick = () => {
    setSelectedStatus(status);
    setShowLeadsModal(true);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "cursor-pointer p-5 rounded-xl shadow-md transition-all duration-200 ease-in-out",
        "hover:shadow-lg hover:scale-[1.02]",
        isSelected ? "bg-indigo-100 border-2 border-indigo-500" : "bg-white"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 font-medium">{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
