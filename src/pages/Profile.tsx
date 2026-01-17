import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Badge } from 'primereact/badge';
import {
    User,
    Shield,
    Settings,
    Bell,
    Key,
    LogOut,
    Info,
    ChevronRight,
    Lock
} from 'lucide-react';
import { toast } from 'sonner';
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
        { id: 'profile', label: 'Profile Information', icon: User, desc: 'Personal details and contact info' },
        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Manage alerts and messages' },
        { id: 'security', label: 'Security', icon: Shield, desc: 'Password and account safety' },
        { id: 'preferences', label: 'Preferences', icon: Settings, desc: 'System and display settings' }
    ];

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <User size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Account Details</h2>
                                <p className="text-slate-500 text-sm">Update your public profile and contact address</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                                <InputText
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="p-3 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                <InputText
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="p-3 border-slate-200 rounded-xl"
                                    type="email"
                                />
                            </div>
                            <div className="flex flex-col gap-2 opacity-75">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Role</label>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 flex items-center gap-2">
                                    <Shield size={14} /> {profile.role}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 opacity-75">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">LEA Number</label>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600">
                                    {profile.leaNumber}
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-wrap gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Internal ID</p>
                                <p className="font-mono text-sm text-slate-700">{profile.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Last Session</p>
                                <p className="text-sm text-slate-700">{profile.lastLogin}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Activity Count</p>
                                <p className="text-sm text-slate-700">{profile.loginCount} Logins</p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8 pt-6 border-t border-slate-100">
                            <Button
                                label="Update Profile"
                                icon="pi pi-check-circle"
                                onClick={handleSaveProfile}
                                className="bg-slate-900 border-none px-6 py-3 rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200"
                            />
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-800">Notification Settings</h2>
                            <p className="text-slate-500 text-sm">Choose how and when you want to be alerted</p>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all group">
                                    <div className="flex gap-4 items-center">
                                        <div className={`p-2 rounded-lg ${value ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                                            <Bell size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {key === 'emailAlerts' && 'Receive email alerts for important system updates'}
                                                {key === 'duplicateNotifications' && 'Get notified about potential record duplicates'}
                                                {key === 'eligibilityUpdates' && 'Notifications for student eligibility status changes'}
                                                {key === 'systemMaintenance' && 'Critical alerts about upcoming maintenance'}
                                                {key === 'weeklyReports' && 'Automated weekly performance summary reports'}
                                            </p>
                                        </div>
                                    </div>
                                    <Checkbox
                                        checked={value}
                                        onChange={() => handleNotificationToggle(key as keyof typeof notifications)}
                                        className="scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-800">Security & Privacy</h2>
                            <p className="text-slate-500 text-sm">Manage your password and account security</p>
                        </div>

                        <div className="grid gap-6">
                            <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-3xl">
                                <div className="flex items-center gap-2 mb-6 font-bold text-slate-800">
                                    <Key size={18} className="text-blue-600" /> Change Password
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputText type="password" placeholder="Current Password" className="p-3 rounded-xl border-slate-200 shadow-sm" />
                                    <InputText type="password" placeholder="New Password" className="p-3 rounded-xl border-slate-200 shadow-sm" />
                                    <InputText type="password" placeholder="Confirm New" className="p-3 rounded-xl border-slate-200 shadow-sm" />
                                </div>
                                <Button
                                    label="Update Password"
                                    onClick={handlePasswordChange}
                                    className="mt-6! p-button-sm bg-blue-600! border-none! rounded-xl! px-6!"
                                />
                            </div>

                            <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                        <Lock size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Two-Factor Authentication</p>
                                        <p className="text-sm text-slate-500">Adds an extra layer of security to your account.</p>
                                        <div className="mt-2"><Badge value="Recommended" severity="warning" className="text-[10px]" /></div>
                                    </div>
                                </div>
                                <Button
                                    label="Enable 2FA"
                                    className="p-button-outlined p-button-secondary rounded-xl"
                                    onClick={() => toast.info('2FA setup would open in production')}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'preferences':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-800">System Preferences</h2>
                            <p className="text-slate-500 text-sm">Customize your dashboard and interaction style</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2"><Settings size={16} /> Display</h4>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Dashboard View</label>
                                    <Dropdown
                                        options={[{ label: 'Summary View', value: 'summary' }, { label: 'Detailed', value: 'detailed' }]}
                                        placeholder="Select View"
                                        className="w-full rounded-xl border-slate-200"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Pagination</label>
                                    <Dropdown
                                        options={[{ label: '25 per page', value: '25' }, { label: '50 per page', value: '50' }]}
                                        placeholder="Select Limit"
                                        className="w-full rounded-xl border-slate-200"
                                    />
                                </div>
                            </div>

                            <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2"><Info size={16} /> Accessibility</h4>
                                <div className="space-y-3">
                                    {['High contrast mode', 'Large text mode', 'Reduced motion'].map((pref, i) => (
                                        <div key={i} className="flex items-center gap-3 py-1">
                                            <Checkbox checked={i !== 2} />
                                            <span className="text-sm text-slate-700">{pref}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                            <Button label="Reset Defaults" className="p-button-text p-button-secondary rounded-xl text-slate-500" />
                            <Button label="Save Preferences" className="bg-blue-600 border-none px-8 rounded-xl shadow-lg shadow-blue-100" />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="">
            <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Account Settings</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your identity and environment</p>
                </div>
                <div className="hidden md:block">
                    <Badge value="Production Account" severity="info" className="p-2 rounded-lg px-3" />
                </div>
            </header>

            {/* Change: flex-col for mobile, lg:flex-row for desktop */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

                {/* Responsive Navigation Area */}
                <aside className="lg:w-80 flex flex-col gap-6">
                    {/* Mobile: Horizontal scrollable tabs | Desktop: Vertical list */}
                    <div className="bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl md:rounded-[2.5rem] p-2 md:p-4 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <nav className="flex lg:flex-col overflow-x-auto no-scrollbar gap-1">
                            {sections.map((section) => {
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex-shrink-0 lg:w-full group flex items-center gap-3 lg:justify-between p-3 md:p-4 rounded-2xl transition-all duration-300 ${isActive
                                            ? 'bg-slate-900 text-white shadow-lg lg:-translate-y-1'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600'}`}>
                                                <section.icon size={18} className="md:w-5 md:h-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs md:text-sm font-bold whitespace-nowrap">{section.label}</p>
                                                {/* Hide description on mobile to save space */}
                                                <p className={`hidden lg:block text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                                                    {section.desc}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Show chevron only on desktop */}
                                        <ChevronRight size={16} className={`hidden lg:block transition-transform duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Logout button: Hidden on mobile nav, or moved to end of list */}
                        <div className="hidden lg:block mt-6 pt-6 border-t border-slate-100 px-2 pb-2">
                            <button
                                onClick={() => {
                                    localStorage.removeItem('demo_token');
                                    window.location.href = '/login';
                                }}
                                className="w-fit flex items-center gap-4 p-4 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl transition-colors group"
                            >
                                <div className="p-2 bg-rose-50 text-rose-500 rounded-xl group-hover:bg-rose-100">
                                    <LogOut size={20} />
                                </div>
                                <span className="text-sm w-fit">Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Workspace Card: Hidden on very small screens, or shown below content */}
                    <div className="hidden lg:block bg-gradient-to-br from-slate-800 to-black rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Workspace</p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase">Organization</p>
                                    <p className="font-bold text-sm">LEA #{profile.leaNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase">Region</p>
                                    <p className="font-bold text-sm">{profile.county} County</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-white/5 rotate-12">
                            <Shield size={120} />
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1">
                    <div className="bg-white border border-slate-100 rounded-3xl md:rounded-[2.5rem] p-5 md:p-7 shadow-2xl shadow-slate-200/40 relative min-h-[500px]">
                        {renderSectionContent()}
                    </div>

                    {/* Logout button for Mobile only (shown at bottom) */}
                    <div className="lg:hidden mt-6">
                        <button
                            onClick={() => {
                                localStorage.removeItem('demo_token');
                                window.location.href = '/login';
                            }}
                            className="w-full mx-auto flex items-center justify-center gap-4 p-4 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl transition-colors group"
                        >
                            <div className="p-2 bg-rose-50 text-rose-500 rounded-xl group-hover:bg-rose-100">
                                <LogOut size={20} />
                            </div>
                            <span className="text-sm w-fit">Sign Out</span>
                        </button>
                    </div>

                    {/* Modern Help Banner */}
                    <div className="mt-8 md:mt-10 bg-blue-600 rounded-3xl md:rounded-[2rem] p-6 md:p-8 text-white flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-xl shadow-blue-200">
                        <div className="h-12 w-12 md:h-14 md:w-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                            <Info size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-base md:text-lg font-bold">Safe Environment Mode</h3>
                            <p className="text-blue-100 text-xs md:text-sm opacity-90 leading-relaxed">
                                You are in a simulation environment. Profile changes are isolated to this session.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};