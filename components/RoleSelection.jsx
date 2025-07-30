import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Briefcase, Users } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      label: 'User',
      description: 'Explore and access your personalized dashboard',
      icon: <User className="w-6 h-6 mr-2" />,
      bg: 'bg-blue-600',
      hoverBg: 'hover:bg-blue-700',
      path: '/home',
    },
    {
      label: 'Employee',
      description: 'Access employee portal and manage tasks',
      icon: <Users className="w-6 h-6 mr-2" />,
      bg: 'bg-purple-600',
      hoverBg: 'hover:bg-purple-700',
      path: '/employee-login',
    },
    {
      label: 'Manager',
      description: 'Manage team, tasks, and daily operations',
      icon: <Briefcase className="w-6 h-6 mr-2" />,
      bg: 'bg-emerald-600',
      hoverBg: 'hover:bg-emerald-700',
      path: '/manager-login',
    },
    {
      label: 'Admin',
      description: 'Control settings, users, and permissions',
      icon: <ShieldCheck className="w-6 h-6 mr-2" />,
      bg: 'bg-rose-600',
      hoverBg: 'hover:bg-rose-700',
      path: '/admin-login',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Role</h2>
        <p className="text-gray-500 mb-8">Choose the role you want to continue with</p>

        <div className="space-y-4">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => navigate(role.path)}
              className={`w-full flex items-center justify-start gap-4 ${role.bg} ${role.hoverBg} text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg`}
            >
              {role.icon}
              <div className="text-left">
                <div className="text-lg">{role.label}</div>
                <div className="text-sm opacity-80">{role.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
