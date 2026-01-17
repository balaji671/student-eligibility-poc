import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // New
import { PersistGate } from 'redux-persist/integration/react'; // New
import { store, persistor } from './store/store'; // New
import { Toaster } from 'sonner';
import { PrimeReactProvider } from 'primereact/api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import { AppRoutes } from './routes';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { logout } from './store/slice/authSlice';

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

function AppContent() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
      once: true
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppRoutes
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider>
          <Router>
            <ScreenReaderAnnouncement />
            <Toaster position="top-right" richColors closeButton />
            <AppContent />
          </Router>
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;