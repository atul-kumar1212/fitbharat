import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { Home, Dumbbell, UtensilsCrossed, Bot, User } from 'lucide-react';

import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Diet from './pages/Diet';
import AIChat from './pages/AIChat';
import Profile from './pages/Profile';

import './index.css';

function AppContent() {
  const { isOnboarded } = useUser();

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/ai" element={<AIChat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <Home size={22} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/exercises" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Dumbbell size={22} />
          <span>Workout</span>
        </NavLink>
        <NavLink to="/diet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <UtensilsCrossed size={22} />
          <span>Diet</span>
        </NavLink>
        <NavLink to="/ai" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Bot size={22} />
          <span>AI Coach</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={22} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="app-container">
            <AppContent />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}
