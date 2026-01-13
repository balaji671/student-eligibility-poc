import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { toast } from 'sonner';

interface HeaderProps {
    onMenuClick: () => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogout }) => {
    const handleLogout = () => {
        toast.info('Logged out successfully (Demo Mode)');
        onLogout();
    };

    return (
        <header
            className="bg-white shadow-sm"
            role="banner"
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <Button
                            icon="pi pi-bars"
                            className="p-button-text p-button-rounded mr-4 lg:hidden!"
                            onClick={onMenuClick}
                            aria-label="Toggle menu"
                        />
                        <div className="flex items-center">
                            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">LEA</span>
                            </div>
                            <div className="ml-3">
                                <h1 className="text-lg font-semibold text-gray-900">
                                    Student Eligibility POC
                                </h1>
                                <p className="text-xs text-gray-500">Demo System</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            icon="pi pi-bell"
                            className="p-button-text p-button-rounded"
                            aria-label="Notifications"
                        />

                        <div className="hidden md:flex items-center space-x-2">
                            <Avatar
                                icon="pi pi-user"
                                shape="circle"
                                aria-label="User profile"
                            />
                            <div className="text-sm">
                                <p className="font-medium">Demo User</p>
                                <p className="text-gray-500">LEA Administrator</p>
                            </div>
                        </div>

                        <Button
                            icon="pi pi-sign-out"
                            className="p-button-text p-button-rounded"
                            onClick={handleLogout}
                            aria-label="Logout"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};