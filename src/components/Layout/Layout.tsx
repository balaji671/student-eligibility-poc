import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoBanner } from '../Common/DemoBanner';

interface LayoutProps {
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
        
        <main 
          className="flex-1 overflow-y-auto p-4 md:p-6"
          role="main"
          id="main-content"
        >
          <div className="max-w-7xl mx-auto">
            <DemoBanner />
            <Outlet />
          </div>
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