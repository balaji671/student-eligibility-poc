import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import bannerImage from "../../assets/images/banner.jpg";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Menu, X, Bell, Search, User, UserIcon, UserPlus, Upload, ClipboardCheck } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { logout } from '../../store/slice/authSlice';
import { Avatar } from "primereact/avatar";
import { Dialog } from 'primereact/dialog';
import { ImageUpload } from '../Common/SvgIcons';

const POLL_INTERVAL = 30000;

const NotificationCount = () => {
    // Corrected to use typed selector
    // const unreadNotificationsCount = useAppSelector((state) => state?.notification?.unreadNotificationsCount || 0);
    const unreadNotificationsCount = 0;
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user?.id) return; // Use 'id' as per your Redux User interface
        const interval = setInterval(() => {
            console.log("Notification fetch for user:", user.id);
        }, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [user?.id]);

    return (
        <>
            {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 border-2 border-white animate-pulse">
                    {unreadNotificationsCount > 99 ? "99+" : unreadNotificationsCount}
                </span>
            )}
        </>
    );
}

interface PrivateLayoutProps {
    onLogout?: () => void;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Auth State Mapping
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    // Derived values from Redux user object
    const firstName = user?.firstName || 'User';
    const lastName = user?.lastName || '';
    const normalizedRole = user?.role?.toLowerCase() || '';

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navigationItems = useMemo(() => [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, isShow: ['admin', 'superadmin'].includes(normalizedRole) },
        { name: 'Student Roster', href: '/students', icon: Users, isShow: ['admin', 'superadmin'].includes(normalizedRole) },
        { name: 'Add Student', href: '/students/new', icon: UserPlus, isShow: ['admin', 'superadmin'].includes(normalizedRole) },
        { name: 'Bulk Upload', href: '/students/upload', icon: Upload, isShow: ['admin', 'superadmin'].includes(normalizedRole) },
        { name: 'Duplicate Review', href: '/duplicates', icon: Users, isShow: ['admin', 'superadmin'].includes(normalizedRole) },
        { name: 'Eligibility Review', href: '/eligibility/1', icon: ClipboardCheck, isShow: ['admin', 'superadmin', 'auditor'].includes(normalizedRole) },
        { name: 'Reports', href: '/reports', icon: BarChart3, isShow: ['admin', 'superadmin', 'auditor'].includes(normalizedRole) },
        { name: 'Profile', href: '/profile', icon: Settings, isShow: true },
        { name: 'Notification', href: '/notifications', icon: Bell, isShow: true },
    ], [normalizedRole]);

    const isActive = (href: string) => location.pathname === href;

    const handleLogout = useCallback(() => {
        dispatch(logout()); // Trigger Redux Logout
        if (onLogout) onLogout();
        setVisible(false);
        navigate('/login');
    }, [navigate, dispatch, onLogout]);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const profileDropdownItems = [
        { name: 'Settings', icon: Settings, onClick: () => { setIsProfileDropdownOpen(false); navigate("/settings") } },
        { name: 'Logout', icon: LogOut, onClick: () => setVisible(true) },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="h-40 relative">
                <div className="flex justify-between xl:justify-end h-full p-4 w-full">
                    <div className="flex items-center gap-4 h-fit xl:hidden">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="bg-white rounded-lg px-4 py-2">
                            <h1 className="text-lg font-bold text-gray-900">LEA-Board</h1>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-4">
                            {/* <SessionTimer /> */}
                            <div className="hidden md:flex items-center bg-white/20 rounded-lg px-3 py-2">
                                <Search size={16} className="text-white/70 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent text-white placeholder-white/70 outline-none text-sm w-48"
                                />
                            </div>
                            <button onClick={() => navigate('/notifications')} className="text-white hover:bg-white/20 p-2 rounded-lg relative">
                                <Bell size={20} />
                                <NotificationCount />
                            </button>
                            <button
                                className={`text-white hover:bg-white/20 ${isProfileDropdownOpen ? "bg-white/20" : ""} p-2 rounded-lg`}
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            >
                                <User size={20} />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className='absolute right-4 top-14 w-48 rounded-xl overflow-hidden z-50 bg-white shadow-xl p-2 border border-slate-100'>
                                    {profileDropdownItems.map(item => (
                                        <button
                                            key={item.name}
                                            onClick={item.onClick}
                                            className="flex gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                        >
                                            <item.icon size={18} />
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                        </div>
                        <div className="flex justify-end">
                            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors w-fit">
                                <ImageUpload />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1">
                <div className="hidden xl:block w-[16%]"></div>
                <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out xl:translate-x-0 xl:absolute xl:top-[3%] xl:bottom-[3%] xl:left-6 xl:inset-0 xl:w-[15%] xl:rounded-lg ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full p-4 w-full">
                        <h1 className="hidden xl:block text-center text-xl font-bold text-gray-900 tracking-wide my-8">LEA-Board</h1>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700 p-1 self-end w-fit xl:hidden cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center space-y-4 pb-6 border-b border-slate-100">
                            <Avatar size="xlarge" shape="circle" icon={<UserIcon size={32} />} className="bg-slate-100 text-slate-400" />
                            <div className='text-center'>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized User</p>
                                <p className="font-bold text-slate-900 text-base capitalize">{`${user?.firstName} ${user?.lastName}`}</p>
                                <p className="text-[10px] text-blue-600 font-bold px-2 py-0.5 bg-blue-50 rounded-full inline-block mt-1">
                                    {`${user?.role?.charAt(0)}${user?.role?.slice(1)}`}
                                </p>
                            </div>
                        </div>

                        <nav className="flex-1 py-6 space-y-1 overflow-y-auto no-scrollbar">
                            {navigationItems.map((item) => (
                                item.isShow && (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive(item.href)
                                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                                    >
                                        <item.icon size={18} />
                                        {item.name}
                                    </Link>
                                )
                            ))}
                        </nav>

                        <div className="pt-4">
                            <button onClick={() => setVisible(true)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 w-full transition-colors">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                    <LogoutDialog visible={visible} onHide={() => setVisible(false)} onLogout={handleLogout} />
                </div>
                {sidebarOpen && (<div className="fixed inset-0 bg-black/50 z-40 xl:hidden" onClick={() => setSidebarOpen(false)} />)}

                <main className="flex-1 max-h-[calc(100vh-10rem)] overflow-y-auto p-6">
                    <Outlet />
                </main>
                {/* Skip to main content link for screen readers */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
                >
                    Skip to main content
                </a>
            </div>
        </div>
    );
};

export default PrivateLayout;

const LogoutDialog = ({ visible, onHide, onLogout }: { visible: boolean, onHide: () => void, onLogout: () => void }) => {
    return (
        <Dialog
            visible={visible}
            modal
            draggable={false}
            resizable={false}
            showHeader={false}
            onHide={onHide}
            className="rounded-3xl overflow-hidden border-none"
            style={{ width: "450px" }}
            contentClassName="p-8 rounded-3xl"
        >
            <div className="text-center">
                <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <LogOut size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">End Session?</h3>
                <p className="text-sm font-medium text-slate-500 mb-8 px-4">
                    You’ll be logged out from your current session. Make sure all your work is saved.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-3.5 px-6 font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all" onClick={onHide}>
                        Stay Logged In
                    </button>
                    <button className="flex-1 py-3.5 px-6 font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-100 rounded-2xl transition-all" onClick={onLogout}>
                        Yes, Logout
                    </button>
                </div>
            </div>
        </Dialog>
    )
}