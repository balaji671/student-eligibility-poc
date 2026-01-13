import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Badge } from 'primereact/badge';
import {
    User,
    Mail,
    Shield,
    Calendar,
    Settings,
    Bell,
    Key,
    LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import { DemoBanner } from '../components/Common/DemoBanner';
import { getUserProfile } from '../utils/mockData';

export const Profile: React.FC = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [profile, setProfile] = useState(getUserProfile());
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        duplicateNotifications: true,
        eligibilityUpdates: true,
        systemMaintenance: false,
        weeklyReports: true
    });

    const handleSaveProfile = () => {
        toast.success('Profile updated successfully (Demo)');
    };

    const handlePasswordChange = () => {
        toast.info('Password change would be processed in production');
    };

    const handleNotificationToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
        toast.info(`Notification setting updated (Demo)`);
    };

    const sections = [
        { id: 'profile', label: 'Profile Information', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'preferences', label: 'Preferences', icon: Settings }
    ];

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <InputText
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full"
                                    aria-label="User full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <InputText
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full"
                                    type="email"
                                    aria-label="User email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <InputText
                                    value={profile.role}
                                    className="w-full"
                                    disabled
                                    aria-label="User role"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">LEA Number</label>
                                <InputText
                                    value={profile.leaNumber}
                                    className="w-full"
                                    disabled
                                    aria-label="LEA number"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded">
                            <h4 className="font-medium text-blue-800 mb-2">System Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-blue-700">User ID</p>
                                    <p className="font-medium">{profile.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-700">Last Login</p>
                                    <p className="font-medium">{profile.lastLogin}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-700">Login Count</p>
                                    <p className="font-medium">{profile.loginCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                label="Save Changes"
                                icon="pi pi-save"
                                onClick={handleSaveProfile}
                                aria-label="Save profile changes"
                            />
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Notification Preferences</h3>
                        <p className="text-gray-600 mb-6">Configure how you receive system notifications</p>

                        <div className="space-y-4">
                            {Object.entries(notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                                    <div>
                                        <p className="font-medium">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {key === 'emailAlerts' && 'Receive email alerts for important updates'}
                                            {key === 'duplicateNotifications' && 'Get notified about potential duplicates'}
                                            {key === 'eligibilityUpdates' && 'Notifications for eligibility status changes'}
                                            {key === 'systemMaintenance' && 'Alerts about system maintenance'}
                                            {key === 'weeklyReports' && 'Weekly summary reports'}
                                        </p>
                                    </div>
                                    <Checkbox
                                        checked={value}
                                        onChange={() => handleNotificationToggle(key as keyof typeof notifications)}
                                        aria-label={`Toggle ${key} notifications`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-yellow-50 rounded">
                            <h4 className="font-medium text-yellow-800 mb-2">Demo Notice</h4>
                            <p className="text-yellow-700 text-sm">
                                Notification settings are simulated. In production, these would control actual email and system notifications.
                            </p>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Security Settings</h3>

                        <div className="space-y-4">
                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-3 flex items-center">
                                    <Key className="h-5 w-5 mr-2" />
                                    Change Password
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Current Password</label>
                                        <InputText type="password" className="w-full" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">New Password</label>
                                        <InputText type="password" className="w-full" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                                        <InputText type="password" className="w-full" placeholder="••••••••" />
                                    </div>
                                </div>
                                <Button
                                    label="Update Password"
                                    icon="pi pi-key"
                                    className="mt-4"
                                    onClick={handlePasswordChange}
                                    aria-label="Update password"
                                />
                            </div>

                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                                <p className="text-gray-600 text-sm mb-4">
                                    Add an extra layer of security to your account
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Status: <Badge value="Not Enabled" severity="warning" /></span>
                                    <Button
                                        label="Enable 2FA"
                                        icon="pi pi-shield"
                                        className="p-button-outlined p-button-sm"
                                        onClick={() => toast.info('2FA setup would open in production')}
                                        aria-label="Enable two-factor authentication"
                                    />
                                </div>
                            </div>

                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-3">Login History</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Current Session</span>
                                        <span className="text-green-600">Active</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Last Login</span>
                                        <span>{profile.lastLogin}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Total Logins</span>
                                        <span>{profile.loginCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'preferences':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">System Preferences</h3>

                        <div className="space-y-4">
                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-3">Display Preferences</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Default Dashboard View</label>
                                        <Dropdown
                                            options={[
                                                { label: 'Summary View', value: 'summary' },
                                                { label: 'Detailed View', value: 'detailed' },
                                                { label: 'Custom View', value: 'custom' }
                                            ]}
                                            placeholder="Select default view"
                                            className="w-full"
                                            aria-label="Select default dashboard view"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Results Per Page</label>
                                        <Dropdown
                                            options={[
                                                { label: '10 results', value: '10' },
                                                { label: '25 results', value: '25' },
                                                { label: '50 results', value: '50' },
                                                { label: '100 results', value: '100' }
                                            ]}
                                            placeholder="Select page size"
                                            className="w-full"
                                            aria-label="Select results per page"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-3">Export Settings</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Checkbox checked={true} />
                                        <label className="ml-2 text-sm">Include headers in CSV exports</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox checked={true} />
                                        <label className="ml-2 text-sm">Compress exported files</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox checked={false} />
                                        <label className="ml-2 text-sm">Send export confirmation emails</label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-3">Accessibility Settings</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Checkbox checked={true} />
                                        <label className="ml-2 text-sm">High contrast mode</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox checked={false} />
                                        <label className="ml-2 text-sm">Reduce motion animations</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox checked={true} />
                                        <label className="ml-2 text-sm">Large text mode</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                label="Reset to Defaults"
                                icon="pi pi-refresh"
                                className="p-button-outlined"
                                onClick={() => toast.info('Preferences reset (Demo)')}
                                aria-label="Reset preferences to defaults"
                            />
                            <Button
                                label="Save Preferences"
                                icon="pi pi-save"
                                onClick={() => toast.success('Preferences saved (Demo)')}
                                aria-label="Save preferences"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <DemoBanner />

            <header>
                <h1 className="text-2xl font-bold text-gray-900">User Profile & Settings</h1>
                <p className="text-gray-600">Manage your account preferences and settings</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <Card className="lg:col-span-1">
                    <div className="space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${activeSection === section.id
                                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                aria-current={activeSection === section.id ? 'page' : undefined}
                                aria-label={`Navigate to ${section.label}`}
                            >
                                <section.icon className="h-5 w-5 mr-3" />
                                <span className="font-medium">{section.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t">
                        <div className="p-4 bg-gray-50 rounded">
                            <h4 className="font-medium mb-2">Account Information</h4>
                            <div className="space-y-1 text-sm">
                                <p className="text-gray-600">Role: <span className="font-medium">{profile.role}</span></p>
                                <p className="text-gray-600">LEA: <span className="font-medium">{profile.leaNumber}</span></p>
                                <p className="text-gray-600">County: <span className="font-medium">{profile.county}</span></p>
                            </div>
                        </div>

                        <Button
                            label="Logout"
                            icon="pi pi-sign-out"
                            className="w-full mt-4 p-button-outlined p-button-danger"
                            onClick={() => {
                                localStorage.removeItem('demo_token');
                                window.location.href = '/login';
                            }}
                            aria-label="Logout from system"
                        />
                    </div>
                </Card>

                {/* Main Content */}
                <Card className="lg:col-span-3">
                    {renderSectionContent()}
                </Card>
            </div>

            {/* Demo Information */}
            <Card className="bg-blue-50 border-blue-200">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="font-medium text-blue-800">Profile Settings Demo</h3>
                        <p className="text-sm text-blue-700 mt-1">
                            This profile page demonstrates user settings management. All changes are simulated and
                            won't persist between sessions. In production, these settings would be saved to your user profile.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};