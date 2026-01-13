import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import { AppRoutes } from './routes';

// 508 Compliance announcement element
const ScreenReaderAnnouncement = () => (
  <div
    id="sr-announcement"
    className="sr-only"
    aria-live="polite"
    aria-atomic="true"
  >
    {/* Screen reader announcements will be injected here */}
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Mock authentication check
  React.useEffect(() => {
    // In POC, we'll simulate being authenticated after login
    const token = localStorage.getItem('demo_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('demo_token', 'demo_token_value');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_token');
    setIsAuthenticated(false);
  };

  return (
    <PrimeReactProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <ScreenReaderAnnouncement />
          <Toaster
            position="top-right"
            richColors
            closeButton
            aria-live="assertive"
          />

          <AppRoutes
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </div>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;