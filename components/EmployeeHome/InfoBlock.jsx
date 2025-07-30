import React from "react";

export default function InfoBlock({ label, value, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1 text-sm font-medium text-indigo-600 uppercase tracking-wide">
        {Icon && <Icon className="text-base" />}
        <span>{label}</span>
      </div>
      <p className="text-gray-800 text-base font-semibold">{value || "—"}</p>
    </div>
  );
}
