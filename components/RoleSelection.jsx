import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Briefcase, Users } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      label: 'User',
      description: 'Access your dashboard and explore features',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
      bg: 'bg-blue-600',
      hoverBg: 'hover:bg-blue-700',
      path: '/home',
    },
    {
      label: 'Employee',
      description: 'Manage tasks and daily activities',
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
      bg: 'bg-purple-600',
      hoverBg: 'hover:bg-purple-700',
      path: '/employee-login',
    },
    {
      label: 'Manager',
      description: 'Oversee team operations and planning',
      icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
      bg: 'bg-emerald-600',
      hoverBg: 'hover:bg-emerald-700',
      path: '/manager-login',
    },
    {
      label: 'Admin',
      description: 'Control users and system settings',
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
      bg: 'bg-rose-600',
      hoverBg: 'hover:bg-rose-700',
      path: '/admin-login',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-10">
      <div className="bg-white px-6 py-8 sm:px-10 sm:py-12 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg text-center">
        
        {/* Logo */}
        <div className="mb-2">
          <img
            src="/images/logo-.png" // ✅ Fix typo in your original path
            alt="Logo"
            className="mx-auto w-20 sm:w-28 h-auto"
          />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Select Your Role</h2>
        <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Choose how you’d like to continue</p>

        <div className="space-y-4">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => navigate(role.path)}
              className={`w-full flex items-center justify-start gap-3 sm:gap-4 ${role.bg} ${role.hoverBg} text-white py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg`}
            >
              {role.icon}
              <div className="text-left">
                <div className="text-sm sm:text-base font-semibold">{role.label}</div>
                <div className="text-xs sm:text-sm text-white/90">{role.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
