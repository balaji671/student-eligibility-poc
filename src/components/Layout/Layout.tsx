import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import bannerImage from "../../assets/images/banner.jpg";
import { LayoutDashboard, Users, Calendar, BarChart3, Settings, LogOut, Menu, X, Bell, Search, User, CircleUserRound, FilesIcon, UserIcon, UserPlus, Upload, ClipboardCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from "primereact/avatar";
import { Dialog } from 'primereact/dialog';
import { ImageUpload, MyScheduleIcon, SessionHistory } from '../Common/SvgIcons';

const POLL_INTERVAL = 30000;

const NotificationCount = () => {
    const unreadNotificationsCount = useSelector((state: any) => state?.notification?.unreadNotificationsCount || 0);
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state?.auth || {});

    useEffect(() => {
        if (!user?.userId) return;
        const interval = setInterval(() => {
            console.log("Notification fetch");
        }, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [user?.userId, dispatch]);

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
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // Auth State Mapping
    const { isAuthenticated, roleType, firstName, lastName, projectType } = useSelector((state: any) => state?.auth?.user || {
        isAuthenticated: true, // Mocked for demo
        roleType: 'admin',
        firstName: 'John',
        lastName: 'Doe'
    });

    const endUserKey = useSelector((state: any) => state?.userManagement?.endUserKey || 'user').toLowerCase();
    const normalizedRole = roleType?.toLowerCase() || '';

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
        if (onLogout) {
            onLogout();
        }
        setVisible(false);
        navigate('/login');
    }, [navigate]);

    const handleNavigate = useCallback(() => {
        navigate('/notifications');
    }, [navigate]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
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
                            <button onClick={handleNavigate} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors cursor-pointer relative">
                                <Bell size={20} />
                                <NotificationCount />
                            </button>
                            <button
                                className={`text-white hover:bg-white/20 ${isProfileDropdownOpen ? "bg-white/20" : ""} p-2 rounded-lg  cursor-pointer`}
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            >
                                <User size={20} />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className='absolute right-4 top-14 w-40 rounded-md overflow-hidden z-50 bg-white shadow-md p-2'>
                                    {profileDropdownItems?.map(item => {
                                        const Icon = item?.icon;
                                        return <button
                                            key={item?.name}
                                            onClick={item?.onClick}
                                            className={"flex gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900  cursor-pointer"}>
                                            <Icon width={24} size={20} />
                                            {item?.name}
                                        </button>
                                    })}
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

                        <div className="flex flex-col items-center space-y-3 pb-4 border-b border-gray-200 w-full">
                            <Avatar style={{ width: '8rem', height: '8rem' }} shape="circle"
                                icon={<UserIcon size={40} />} />
                            <div className='max-w-full'>
                                <p className="text-xs text-gray-500 text-center">Welcome back</p>
                                <p className="font-semibold text-gray-900 text-lg text-center capitalize truncate">{`${firstName} ${lastName}`}</p>
                            </div>
                        </div>

                        <nav className="flex-1 py-6 space-y-2 mx-auto overflow-y-scroll">
                            {navigationItems?.map((item) => {
                                const Icon = item?.icon;
                                return item?.isShow && (
                                    <Link
                                        key={item?.name}
                                        to={item?.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item?.href)
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                                        <Icon width={24} size={20} color={isActive(item?.href) ? '#1447e6' : '#4a5565'} />
                                        {item?.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="pt-4 border-t border-gray-200">
                            <button onClick={() => setVisible(true)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors">
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