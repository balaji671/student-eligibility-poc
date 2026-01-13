import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Upload,
    ClipboardCheck,
    FileCheck,
    BarChart3,
    Settings
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/students', icon: Users, label: 'Student Roster' },
        { path: '/students/new', icon: UserPlus, label: 'Add Student' },
        { path: '/students/upload', icon: Upload, label: 'Bulk Upload' },
        { path: '/duplicates', icon: Users, label: 'Duplicate Review' },
        { path: '/eligibility/1', icon: ClipboardCheck, label: 'Eligibility Review' },
        { path: '/reports', icon: BarChart3, label: 'Reports' },
        { path: '/profile', icon: Settings, label: 'Profile' },
    ];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="h-full flex flex-col">
                <div className="p-6 pb-7 border-b border-gray-200 flex items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Navigation Menu
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-1" aria-label="Primary">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                            aria-current="page"
                        >
                            <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-xs font-medium text-yellow-800">POC System</p>
                        <p className="text-xs text-yellow-600 mt-1">
                            This is a demo-only Proof of Concept
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};